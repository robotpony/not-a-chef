#!/usr/bin/env bash
# Start the Hugo dev server (including drafts) and open it in the browser.
set -euo pipefail

cd "$(dirname "$0")/.."

URL="http://localhost:1313/"

open_browser() {
  # Wait for the server to actually answer before opening a tab on it.
  # Opens in Chrome specifically (not the system default browser) — the
  # Claude-in-Chrome extension used to test this site only sees Chrome tabs.
  for _ in $(seq 1 30); do
    if curl -sf -o /dev/null "$URL"; then
      open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || true
      return
    fi
    sleep 0.5
  done
}

open_browser &

# --disableFastRender: Fast Render Mode has gone stale mid-session during
# heavy template/config editing (served published-only counts despite -D
# until restarted) — full rebuilds on every change cost a little speed but
# avoid silently serving wrong content while previewing.
exec hugo server -D --disableFastRender --bind 0.0.0.0
