#!/usr/bin/env python3
"""Print one of Fugu's heading lists, comma-joined, for the Makefile.

    tools/fugu-headings.py not-ingredients    headings that mark a section as not ingredients
    tools/fugu-headings.py sidebar             the headings Fugu moves into the recipe sidebar

Reads the merged config through `hugo config`, so a site override in
config/_default/params.toml wins over Fugu's default, and a list written
across several lines reads the same. Exits non-zero rather than print an
empty list. Standard library only.
"""
import json
import subprocess
import sys

SIDEBAR = ["mechanic", "to-serve", "variations", "notes", "equipment"]


def main():
    if len(sys.argv) != 2 or sys.argv[1] not in ("not-ingredients", "sidebar"):
        sys.exit(__doc__.strip().split("\n\n")[1])
    out = subprocess.run(["hugo", "config", "--format", "json"],
                         capture_output=True, text=True, check=True).stdout
    headings = json.loads(out).get("params", {}).get("fugu", {}).get("headings", {})
    if sys.argv[1] == "not-ingredients":
        words = headings.get("notingredients", [])
    else:
        words = [w for key in SIDEBAR for w in headings.get(key, [])]
    if not words:
        sys.exit(f"error: no {sys.argv[1]} headings in params.fugu.headings")
    print(",".join(words))


if __name__ == "__main__":
    main()
