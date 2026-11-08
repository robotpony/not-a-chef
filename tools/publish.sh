#!/usr/bin/env bash
# Build and publish the site. One entry point for the steps that otherwise
# live in the Makefile and tools/deploy.sh.
#
#   tools/publish.sh            build HEAD clean, check, deploy, count the build (make publish, make deploy)
#   tools/publish.sh build      build public/ from the working tree, to look at locally; never deployable
#   tools/publish.sh check      check the content and the current public/; changes nothing
#   tools/publish.sh dry-run    build HEAD clean, check, show what rsync would change; deploys nothing
#   tools/publish.sh deploy     ship the public/ a dry-run built, untouched since; no rebuild, build not counted
#
# A full publish ships HEAD and nothing else. It takes a lock (one publish
# at a time), refuses uncommitted changes, and builds a detached worktree of
# HEAD in a temp folder, each theme submodule filled from the commit HEAD
# records (git archive, no network). There it stops on a frontmatter error,
# builds into the repo's public/ (hugo --minify --cleanDestinationDir,
# sharing the resources/ image cache), refuses dev-server output, runs
# tools/deploy.sh (rsync --checksum --delete), and fetches the live
# version.txt to confirm it. The build number in data/build.toml is bumped
# before the build and committed after the deploy; the footer shows
# "Build N · hash" ("Build dev" on the local server).
set -Eeuo pipefail

cd "$(dirname "$0")/.."
REPO="$PWD"

if [[ ! -f themes/fugu/hugo.toml || ! -f themes/hugo-warped/tools/check-hugo.sh ]]; then
  echo "error: the theme submodules are missing; run 'git submodule update --init'." >&2
  exit 1
fi
GIT_DIR_COMMON="$(cd "$(git rev-parse --git-common-dir)" && pwd)"
LOCK="$GIT_DIR_COMMON/publish.lock"
# Written after a clean build: the commit public/ was built from, then a
# fingerprint of public/ itself. A working-tree build removes it, and any
# other write to public/ (a plain 'hugo', which rewrites it without moving
# HEAD) changes the fingerprint, so 'deploy' can't ship a local look.
BUILT_MARKER="$GIT_DIR_COMMON/publish-built"
BUILD_FILE="data/build.toml"
WORKTREE=""
BUILD_BUMPED=""

usage() {
  sed -n '5,9p' "$0" | sed 's/^# \{0,1\}//'
}

cleanup() {
  if [[ -n "$BUILD_BUMPED" ]]; then
    restore_build
  fi
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
  printf '%s\n%s\n' "$(git rev-parse HEAD)" "$(public_fingerprint)" > "$BUILT_MARKER"
}

# Every file's path, size and modification time (Python, as stat's flags
# differ between macOS and Linux). version.txt is left out: deploy.sh
# writes it into public/ as it ships.
public_fingerprint() {
  python3 -c '
import hashlib, os
h = hashlib.sha1()
for root, dirs, files in os.walk("public"):
    dirs.sort()
    for name in sorted(files):
        path = os.path.join(root, name)
        if path == "public/version.txt":
            continue
        st = os.stat(path)
        h.update(f"{path} {st.st_size} {st.st_mtime_ns}\n".encode())
print(h.hexdigest())'
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

# Full publishes only: count this one. Undone by cleanup (the EXIT trap)
# if the publish stops for any reason, an explicit exit included;
# committed by commit_build once the deploy succeeds.
bump_build() {
  local n
  n=$(sed -nE 's/^number = ([0-9]+)$/\1/p' "$BUILD_FILE")
  if [[ ! "$n" =~ ^[0-9]+$ ]]; then
    echo "error: can't read 'number = N' from $BUILD_FILE." >&2
    exit 1
  fi
  BUILD_NUMBER=$((n + 1))
  sed -E "s/^number = [0-9]+$/number = $BUILD_NUMBER/" "$BUILD_FILE" > "$BUILD_FILE.tmp"
  mv "$BUILD_FILE.tmp" "$BUILD_FILE"
  BUILD_BUMPED=1
  echo "Build $BUILD_NUMBER."
}

restore_build() {
  BUILD_BUMPED=""
  git checkout -- "$BUILD_FILE"
  echo "Publish failed; build number left at its last value." >&2
}

commit_build() {
  BUILD_BUMPED=""
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
    # The ERROR lines and the file each belongs to; all of it when there
    # are none (a traceback, a missing file).
    if grep -q 'ERROR' <<<"$output"; then
      grep -B1 'ERROR' <<<"$output" | grep -v '^--$' | sed 's/^/  /' >&2
    else
      sed 's/^/  /' <<<"$output" >&2
    fi
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

# Before building anything: a publish or dry run without a deploy
# target would build the whole site only for deploy.sh to stop.
require_config() {
  if [[ ! -f tools/config.toml ]]; then
    echo "error: tools/config.toml not found." >&2
    echo "Copy tools/config.toml.example to tools/config.toml and fill in [deploy]." >&2
    exit 1
  fi
}

# 'deploy' ships public/ as it is, so it has to be a clean build of HEAD.
# Two checks, each with its own error: the clean build was of HEAD, and
# nothing has written to public/ since.
require_built_from_head() {
  local built_sha="" built_print=""
  if [[ -f "$BUILT_MARKER" ]]; then
    { read -r built_sha; read -r built_print; } < "$BUILT_MARKER" || true
  fi
  if [[ "$built_sha" != "$(git rev-parse HEAD)" ]]; then
    echo "error: public/ isn't a clean build of HEAD (a local build, or an older commit)." >&2
    echo "Run 'tools/publish.sh dry-run' to rebuild it, or 'tools/publish.sh' to publish." >&2
    exit 1
  fi
  if [[ "$built_print" != "$(public_fingerprint)" ]]; then
    echo "error: public/ has changed since the clean build (a plain 'hugo' run, or a preview writing to it)." >&2
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
    require_config
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
    take_lock
    check_content
    check
    ;;
  dry-run)
    require_config
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
    require_config
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
