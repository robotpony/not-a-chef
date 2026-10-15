#!/usr/bin/env bash
# Build and publish the site. One entry point for the steps that otherwise
# live in the Makefile and tools/deploy.sh.
#
#   tools/publish.sh            build, check, deploy, count the build
#   tools/publish.sh build      build public/ only
#   tools/publish.sh check      sanity-check the current public/
#   tools/publish.sh dry-run    build, check, show what rsync would change
#   tools/publish.sh deploy     check and deploy the current public/ (no rebuild)
set -euo pipefail

cd "$(dirname "$0")/.."

usage() {
  sed -n '5,9p' "$0" | sed 's/^# \{0,1\}//'
}

# --cleanDestinationDir: drop anything in public/ this build didn't write
# (old drafts, deleted pages) so rsync --delete can't ship it.
# HUGO_PARAMS_BUILDHASH reaches the footer as site.Params.buildhash: the
# commit built from, with a "+" when the tree has uncommitted changes.
build() {
  echo "Building site..."
  local hash
  hash=$(git rev-parse --short HEAD)
  if [[ -n "$(git status --porcelain -- . ':!data/build.toml' 2>/dev/null)" ]]; then
    hash="$hash+"
  fi
  HUGO_PARAMS_BUILDHASH="$hash" hugo --minify --cleanDestinationDir
}

BUILD_FILE="data/build.toml"

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

# Content that isn't committed still publishes; say so, but don't block.
warn_dirty() {
  if [[ -n "$(git status --porcelain -- content 2>/dev/null)" ]]; then
    echo "note: content/ has uncommitted changes; they will be published."
  fi
}

cmd="${1:-all}"

case "$cmd" in
  all)
    warn_dirty
    bump_build
    build
    check
    tools/deploy.sh
    commit_build
    ;;
  build)
    build
    ;;
  check)
    check
    ;;
  dry-run)
    warn_dirty
    build
    check
    tools/deploy.sh --dry-run
    ;;
  deploy)
    check
    tools/deploy.sh
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
