#!/usr/bin/env bash
# Deploy the built Hugo site (public/) to the server via rsync.
# Reads [deploy] host / remote_path from tools/config.toml.
# Pass --dry-run to list what would change without touching the server.
set -euo pipefail

RSYNC_FLAGS=(-avz --delete)
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

read_deploy_field() {
  python3 -c "
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
  echo "Deploying public/ -> ${HOST}:${REMOTE_PATH}"
  rsync "${RSYNC_FLAGS[@]}" public/ "${HOST}:${REMOTE_PATH}/"
  echo "Deploy complete."
fi
