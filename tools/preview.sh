#!/usr/bin/env bash
# Start the Hugo dev server (including drafts) and open it in the browser.
set -euo pipefail

cd "$(dirname "$0")/.."

URL="http://localhost:1313/"

# Restart, don't reuse: a hugo server left running from an earlier session
# keeps serving stale theme templates after a Fugu submodule bump (it did on
# 2026-10-14). Stop a hugo already listening on the port, then start fresh.
# Only one started from this repo: other sites' sessions share these ports,
# and their previews aren't ours to stop.
ROOT="$(pwd -P)"
for pid in $(lsof -ti tcp:1313 -sTCP:LISTEN 2>/dev/null || true); do
  if [ "$(ps -o comm= -p "$pid" 2>/dev/null)" != "hugo" ]; then
    continue
  fi
  cwd="$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')"
  if [ "$cwd" = "$ROOT" ]; then
    echo "Stopping this repo's hugo server already on :1313 (pid $pid)."
    kill "$pid"
  else
    echo "Port 1313 is held by another site's hugo (pid $pid, ${cwd:-unknown dir}); stop it or use another port." >&2
    exit 1
  fi
done
for _ in $(seq 1 20); do
  lsof -ti tcp:1313 -sTCP:LISTEN >/dev/null 2>&1 || break
  sleep 0.25
done

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
#
# --renderToMemory: this Hugo version's server writes to public/ by
# default, with drafts, a localhost baseURL, and the livereload script.
# `make deploy` rsyncs public/, so a running preview could ship all of
# that (it did on 2026-09-24: drafts went live, and search fetched
# //localhost:1313/index.json, which triggers Chrome's local network
# access prompt). Keep the server in memory so public/ only ever holds
# real builds.
exec hugo server -D --disableFastRender --renderToMemory --bind 0.0.0.0
