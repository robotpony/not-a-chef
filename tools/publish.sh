#!/usr/bin/env bash
# Build and publish the site. One entry point for the steps that otherwise
# live in the Makefile and tools/deploy.sh.
#
#   tools/publish.sh            build, check, deploy (the usual path)
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
build() {
  echo "Building site..."
  hugo --minify --cleanDestinationDir
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
    build
    check
    tools/deploy.sh
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
