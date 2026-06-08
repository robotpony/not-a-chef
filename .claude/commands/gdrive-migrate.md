# /gdrive-migrate

Migrate and normalize family archive recipes from the gdrive vault into content/ as drafts.

Run `python tools/normalize.py` with any arguments the user provides. If no arguments, run without arguments (processes all new or changed files).

Report the results: files written, duplicates flagged, skipped (meta files), flagged (no ingredients found), and errors.

Remind the user that all output files are draft: true and need review before publishing.

If tools/config.toml does not exist, remind the user to copy tools/config.toml.example to tools/config.toml and set their vault paths.
