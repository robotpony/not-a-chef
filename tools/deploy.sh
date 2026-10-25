#!/usr/bin/env bash
# Deploy the built Hugo site (public/) to the server via rsync.
# Reads [deploy] host / remote_path from tools/config.toml.
# Pass --dry-run to list what would change without touching the server.
set -euo pipefail

# .dh-diag is DreamHost's own file in the web root; --delete would remove it.
RSYNC_FLAGS=(-avz --delete --exclude .dh-diag)
if [[ "${1:-}" == "--dry-run" ]]; then
  RSYNC_FLAGS+=(--dry-run)
fi

cd "$(dirname "$0")/.."

CONFIG="tools/config.toml"

if [[ ! -f "$CONFIG" ]]; then
  echo "error: $CONFIG not found." >&2
  echo "Copy tools/config.toml.example to tools/config.toml and fill in [deploy]." >&2
  exit 1
fi

# The system python3 (Apple's Xcode CLT one) can be older than 3.11 and lack
# tomllib; prefer a homebrew python new enough to have it.
PYTHON=""
for candidate in python3.12 python3.13 python3.11 python3; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c 'import tomllib' >/dev/null 2>&1; then
    PYTHON="$candidate"
    break
  fi
done

if [[ -z "$PYTHON" ]]; then
  echo "error: no python3 with tomllib (3.11+) found on PATH." >&2
  echo "Install one (e.g. 'brew install python3') or upgrade the system python3." >&2
  exit 1
fi

read_deploy_field() {
  "$PYTHON" -c "
import tomllib
with open('$CONFIG', 'rb') as f:
    data = tomllib.load(f)
print(data.get('deploy', {}).get('$1', ''))
"
}

HOST=$(read_deploy_field host)
REMOTE_PATH=$(read_deploy_field remote_path)

if [[ -z "$HOST" || -z "$REMOTE_PATH" ]]; then
  echo "error: [deploy] host and remote_path must both be set in $CONFIG" >&2
  exit 1
fi

if [[ ! -d public ]]; then
  echo "error: public/ not found — run 'hugo --minify' first." >&2
  exit 1
fi

if [[ " ${RSYNC_FLAGS[*]} " == *" --dry-run "* ]]; then
  echo "Dry run: public/ -> ${HOST}:${REMOTE_PATH} (nothing will be changed)"
  rsync "${RSYNC_FLAGS[@]}" public/ "${HOST}:${REMOTE_PATH}/"
  echo "Dry run complete."
else
  # Each deploy is tagged deploy-YYYY-MM-DD (-2, -3 for later ones that
  # day), so the tag has to match what ships: refuse uncommitted work.
  # data/build.toml is the exception: publish.sh bumps it before the build
  # and commits it once this deploy succeeds.
  if [[ -n "$(git status --porcelain -- . ':!data/build.toml')" ]]; then
    echo "error: uncommitted changes; commit them before deploying." >&2
    git status --short >&2
    exit 1
  fi
  TAG="deploy-$(date +%F)"
  n=1
  while git rev-parse -q --verify "refs/tags/$TAG" >/dev/null; do
    n=$((n + 1))
    TAG="deploy-$(date +%F)-$n"
  done
  printf '%s %s\n' "$TAG" "$(git rev-parse --short HEAD)" > public/version.txt

  echo "Deploying public/ -> ${HOST}:${REMOTE_PATH} as $TAG"
  rsync "${RSYNC_FLAGS[@]}" public/ "${HOST}:${REMOTE_PATH}/"
  git tag "$TAG"
  echo "Deploy complete; tagged $TAG (push tags with 'git push --tags')."
fi
