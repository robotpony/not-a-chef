# Your dad is not a chef (an Alderson family cookbook)

This is a cookbook project, collecting recipes from my personal sources: originally a combination of markdown files in an Obsidian vault and a drive of Google docs.

This repo is now the source of truth for recipes. The Google Docs archive was fully migrated in and its local copy deleted; new recipes are drafted in the Obsidian vault (`~/writing/me/recipes`) and pulled in with `/migrate`.

## Project goals

1. Organized and clear source for personal recipes (as a simple Hugo site)
2. Capture simple essays about food, and reference pages (posts + pages, same Hugo site)
3. Be the source of truth for these recipes (done for the Google Docs archive; other family additions get moved in by hand as they turn up).
4. Be compatible with PDF generation (based on the Hugo docs, possibly using a separate or custom tool)
5. Be compatible with Obsidian (which will be the main editor)
6. Be compatible with Claude (the main LLM, using claude code stand-alone beside Obsidian)


## Tech plan

- Hugo to provide the static website for recipes, food log, and reference pages
- Obsidian for local editing
- Other tools TBD

Hugo + Obsidian suggest Markdown + clear YAML front-matter.

Style guide should be pulled + updated from the Obsidian source.

## Setup (per machine)

Copy `tools/config.toml.example` to `tools/config.toml` (gitignored — holds machine-specific paths and the deploy target) and fill in:

- `[vault] recipes` — path to the Obsidian vault's recipes folder, for `/migrate`
- `[deploy] host` / `remote_path` — where `/publish` sends the built site

For `[deploy] host`, add an alias to `~/.ssh/config` (with its own `IdentityFile`) rather than putting a username or key path in `config.toml`:

```
# ~/.ssh/config
Host not-a-chef
    HostName 203.0.113.10
    User deploy
    IdentityFile ~/.ssh/id_ed25519_not_a_chef
```

Then use that alias as `host` in `tools/config.toml`.

## Building and deploying

- `make preview` — run the Hugo dev server locally (`/preview`)
- `make build` — build the static site to `public/`
- `make deploy` — build, then rsync `public/` to the server via `tools/deploy.sh` (`/publish`)

## License

Content (recipes, essays, reference pages) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share and adapt with attribution, same license. The source code (Hugo templates, migration tools) is MIT. See [LICENSE](LICENSE) for full terms.
