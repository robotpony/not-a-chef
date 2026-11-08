#!/usr/bin/env bash
# Build and publish the site. One entry point for the steps that otherwise
# live in the Makefile and tools/deploy.sh.
#
#   tools/publish.sh            build HEAD clean, check, deploy, count the build
#   tools/publish.sh build      build public/ from the working tree (local look)
#   tools/publish.sh check      sanity-check the content and the current public/
#   tools/publish.sh dry-run    build HEAD clean, check, show what rsync would change
#   tools/publish.sh deploy     deploy the current public/, if it's a clean build of HEAD
set -Eeuo pipefail

cd "$(dirname "$0")/.."
REPO="$PWD"
GIT_DIR_COMMON="$(cd "$(git rev-parse --git-common-dir)" && pwd)"
LOCK="$GIT_DIR_COMMON/publish.lock"
# Written after a clean build: the commit public/ was built from. A
# working-tree build removes it, so 'deploy' can't ship a local look.
BUILT_MARKER="$GIT_DIR_COMMON/publish-built"
BUILD_FILE="data/build.toml"
WORKTREE=""

usage() {
  sed -n '5,9p' "$0" | sed 's/^# \{0,1\}//'
}

cleanup() {
  if [[ -n "$WORKTREE" ]]; then
    git worktree remove --force "$WORKTREE" 2>/dev/null || rm -rf "$WORKTREE"
    git worktree prune
  fi
  rmdir "$LOCK" 2>/dev/null || true
}

# One publish at a time: two would race on public/, the build number, and
# the server. A stale lock (a killed run) is removed by hand; the error says how.
take_lock() {
  if ! mkdir "$LOCK" 2>/dev/null; then
    echo "error: another publish is running (lock: $LOCK)." >&2
    echo "If none is, remove it: rmdir '$LOCK'" >&2
    exit 1
  fi
  trap cleanup EXIT
}

# Called first by anything that builds, so a Hugo that's too old stops the
# run before the build number moves. Versions are in .hugo-version.
check_hugo() {
  themes/hugo-warped/tools/check-hugo.sh
}

dirty_files() {
  git status --porcelain --ignore-submodules=none -- . ":!$BUILD_FILE"
}

# Publishes ship HEAD, so uncommitted work would silently stay behind; stop
# before anything is built or counted. Each deploy is tagged, and the tag
# has to match what ships.
require_clean() {
  if [[ -n "$(dirty_files)" ]]; then
    echo "error: uncommitted changes; commit them before publishing." >&2
    dirty_files | sed 's/^/  /' >&2
    exit 1
  fi
}

# A dry run is allowed on a dirty tree, but it shows HEAD, not the edits.
note_dirty() {
  if [[ -n "$(dirty_files)" ]]; then
    echo "note: uncommitted changes aren't in this build; a publish ships HEAD and refuses until they're committed."
  fi
}

# A detached worktree of HEAD, with each theme submodule filled from the
# commit HEAD records (git archive from the local submodule, so no network
# and the submodules' own checkouts aren't touched). A worktree rather than
# an export because enableGitInfo needs the repo for page dates.
prepare_worktree() {
  WORKTREE="$(mktemp -d "${TMPDIR:-/tmp}/not-a-chef-build.XXXXXX")"
  rmdir "$WORKTREE"
  git worktree add --quiet --detach "$WORKTREE" HEAD
  local mode type sha path
  while read -r mode type sha path; do
    [[ "$type" == "commit" ]] || continue
    if ! git -C "$path" cat-file -e "$sha^{commit}" 2>/dev/null; then
      echo "error: $path doesn't have $sha, the commit HEAD records; run 'git submodule update'." >&2
      exit 1
    fi
    mkdir -p "$WORKTREE/$path"
    git -C "$path" archive "$sha" | tar -x -C "$WORKTREE/$path"
  done < <(git ls-tree -r HEAD)
}

# --cleanDestinationDir: drop anything in public/ this build didn't write
# (old drafts, deleted pages) so rsync --delete can't ship it.
# HUGO_PARAMS_BUILDHASH reaches the footer as site.Params.buildhash: the
# commit built from, with a "+" when the tree has uncommitted changes.
# The image cache stays in the repo's resources/, shared with local builds.
hugo_build() {
  local src="$1" hash="$2"
  (cd "$src" && HUGO_PARAMS_BUILDHASH="$hash" HUGO_RESOURCEDIR="$REPO/resources" \
    hugo --minify --cleanDestinationDir --destination "$REPO/public")
}

build_clean() {
  echo "Building $(git rev-parse --short HEAD) from a clean worktree..."
  cp "$BUILD_FILE" "$WORKTREE/$BUILD_FILE"
  hugo_build "$WORKTREE" "$(git rev-parse --short HEAD)"
  git rev-parse HEAD > "$BUILT_MARKER"
}

build_local() {
  echo "Building site from the working tree..."
  rm -f "$BUILT_MARKER"
  local hash
  hash=$(git rev-parse --short HEAD)
  if [[ -n "$(dirty_files)" ]]; then
    hash="$hash+"
  fi
  hugo_build "$REPO" "$hash"
}

# Full publishes only: count this one. Undone by restore_build if the
# publish fails, committed by commit_build once the deploy succeeds.
bump_build() {
  local n
  n=$(sed -nE 's/^number = ([0-9]+)$/\1/p' "$BUILD_FILE")
  BUILD_NUMBER=$((n + 1))
  sed -i '' -E "s/^number = [0-9]+$/number = $BUILD_NUMBER/" "$BUILD_FILE"
  trap restore_build ERR
  echo "Build $BUILD_NUMBER."
}

restore_build() {
  git checkout -- "$BUILD_FILE"
  echo "Publish failed; build number left at its last value." >&2
}

commit_build() {
  trap - ERR
  git commit --quiet -m "Publishes build $BUILD_NUMBER." -- "$BUILD_FILE"
}

# Refuse to publish a page with broken frontmatter, such as a new Food Log
# month with none: Hugo builds those without complaint. Skips what Hugo skips
# (ALL-CAPS working notes, ignoreFiles in hugo.toml). Warnings don't block.
# Runs in the tree being built: the worktree for a publish, else the repo.
check_content() {
  local dir="${1:-$REPO}" files=() f output
  while IFS= read -r f; do
    files+=("$f")
  done < <(cd "$dir" && find content -name '*.md' | grep -vE '/[A-Z][A-Z0-9_-]*\.md$')

  if ! output=$(cd "$dir" && python3 themes/fugu/tools/frontmatter.py check "${files[@]}" 2>&1); then
    echo "error: frontmatter check failed:" >&2
    echo "$output" | grep -B1 'ERROR' | grep -v '^--$' | sed 's/^/  /' >&2
    exit 1
  fi
  echo "Checked frontmatter: ok."
}

# Refuse to ship a public/ that came from a dev server or a draft build.
check() {
  if [[ ! -d public ]]; then
    echo "error: public/ not found; run 'tools/publish.sh build' first." >&2
    exit 1
  fi

  local hits
  hits=$(grep -rlE 'localhost:1313|livereload\.js' public 2>/dev/null | head -5 || true)
  if [[ -n "$hits" ]]; then
    echo "error: public/ contains dev-server output (localhost / livereload):" >&2
    echo "$hits" | sed 's/^/  /' >&2
    echo "Rebuild with 'tools/publish.sh build' before deploying." >&2
    exit 1
  fi

  if [[ ! -f public/index.html ]]; then
    echo "error: public/index.html missing; the build looks incomplete." >&2
    exit 1
  fi

  echo "Checked public/: ok."
}

# 'deploy' ships public/ as it is, so it has to be a clean build of HEAD.
require_built_from_head() {
  if [[ ! -f "$BUILT_MARKER" || "$(cat "$BUILT_MARKER")" != "$(git rev-parse HEAD)" ]]; then
    echo "error: public/ isn't a clean build of HEAD (a local build, or an older commit)." >&2
    echo "Run 'tools/publish.sh dry-run' to rebuild it, or 'tools/publish.sh' to publish." >&2
    exit 1
  fi
}

# The server's version.txt should now be the one deploy.sh just wrote.
# Runs after the deploy is counted: a mismatch means a cache or the wrong
# web root, not a failed upload, so it's reported rather than undone.
live_check() {
  local base want got
  base=$(sed -nE 's/^baseURL = "([^"]+)"$/\1/p' config/_default/hugo.toml)
  want=$(cat public/version.txt)
  if ! got=$(curl -fsS --max-time 20 -H 'Cache-Control: no-cache' "${base%/}/version.txt?$(date +%s)" 2>&1); then
    echo "warning: couldn't fetch ${base%/}/version.txt to check the deploy: $got" >&2
    return 1
  fi
  if [[ "$got" != "$want" ]]; then
    echo "warning: the live site says '$got', expected '$want'." >&2
    return 1
  fi
  echo "Live: $got."
}

cmd="${1:-all}"

case "$cmd" in
  all)
    take_lock
    check_hugo
    require_clean
    prepare_worktree
    check_content "$WORKTREE"
    bump_build
    build_clean
    check
    tools/deploy.sh
    commit_build
    live_check
    ;;
  build)
    take_lock
    check_hugo
    build_local
    ;;
  check)
    check_content
    check
    ;;
  dry-run)
    take_lock
    check_hugo
    note_dirty
    prepare_worktree
    check_content "$WORKTREE"
    build_clean
    check
    tools/deploy.sh --dry-run
    ;;
  deploy)
    take_lock
    require_clean
    require_built_from_head
    check
    tools/deploy.sh
    live_check
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    echo "error: unknown command '$cmd'" >&2
    usage >&2
    exit 1
    ;;
esac
