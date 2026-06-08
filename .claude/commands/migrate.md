# /migrate

Migrate personal recipes from the Obsidian vault into content/recipes/.

Run `python tools/migrate.py` with any arguments the user provides. If no arguments, run without arguments (migrates all new or changed files).

Report the results clearly: how many files were new, updated, skipped, and any errors.

If tools/config.toml does not exist, remind the user to copy tools/config.toml.example to tools/config.toml and set their vault paths.
