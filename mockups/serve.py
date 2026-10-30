#!/usr/bin/env python3
"""Serve the built site with mockups/ beside it, on one origin.

Mocks that load real pages (soft-colour-full.html) need them on the same
origin to restyle them, and the built pages use root-relative URLs, so
public/ is served at / and this folder at /mockups/.

    python3 mockups/serve.py [port]      # default 8765
    open http://localhost:8765/mockups/soft-colour-full.html

Run `hugo --quiet` first if public/ is stale.
"""
import functools
import http.server
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(os.path.dirname(HERE), "public")


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean = path.split("?", 1)[0].split("#", 1)[0]
        if clean == "/mockups" or clean.startswith("/mockups/"):
            rel = clean[len("/mockups"):]
            return http.server.SimpleHTTPRequestHandler.translate_path(self, rel).replace(PUBLIC, HERE, 1)
        return super().translate_path(path)

    def log_message(self, *args):
        pass


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
handler = functools.partial(Handler, directory=PUBLIC)
print(f"Serving public/ at http://localhost:{port}/ and mockups/ at /mockups/")
http.server.ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
