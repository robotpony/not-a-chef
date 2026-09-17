#!/usr/bin/env bash
# Deploy the built Hugo site (public/) to the server via rsync.
# Reads [deploy] host / remote_path from tools/config.toml.
set -euo pipefail

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

echo "Deploying public/ -> ${HOST}:${REMOTE_PATH}"
rsync -avz --delete public/ "${HOST}:${REMOTE_PATH}/"
echo "Deploy complete."
