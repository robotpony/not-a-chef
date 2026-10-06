# /migrate

**Retired.** The Obsidian vault is this repo now (see CLAUDE.md, Content sources), so there's no separate vault to migrate from. If invoked, say so and stop, unless the user explicitly asks to run `tools/migrate.py` against some other folder.

Migrate personal recipes from the Obsidian vault into content/recipes/.

Run `python tools/migrate.py` with any arguments the user provides. If no arguments, run without arguments (migrates all new or changed files).

Report the results clearly: how many files were new, updated, skipped, and any errors.

If tools/config.toml does not exist, remind the user to copy tools/config.toml.example to tools/config.toml and set their vault paths.
