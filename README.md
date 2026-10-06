# Bruce loves to cook

Our family cookbook.

This is a cookbook project, collecting recipes from my personal sources: originally a combination of markdown files in an Obsidian vault and a drive of Google docs.

This repo is now the source of truth for recipes, and it is the Obsidian vault: everything is drafted and edited here directly. The Google Docs archive was fully migrated in and its local copy deleted.

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
- Small Python and shell tools in `tools/` (frontmatter checks, drafts list, image processing, deploy)

Hugo + Obsidian suggest Markdown + clear YAML front-matter.

Style guide should be pulled + updated from the Obsidian source.

## Site features

- **Pinning** — any recipe, essay, or reference page can set `pinned: true` in its frontmatter to float to the top of its section's list, its tag/cuisine term pages, and search results. Rare by design, not a general-purpose sort override. See DESIGN.md.
- **Formula diagrams** — a ```` ```formula ```` block in a recipe draws its ratio as a row of icons (beans + starch + veg + binder), at build time. See FORMAT.md §Formula diagrams and DESIGN.md.
- **Tag reference pages** — a tag can carry its own `content/tags/<slug>/_index.md` for a description, and, when marked `principle: true`, a definition callout plus a "Reference & further reading" list pulled from anything else tagged with it that isn't a recipe (used today for `win-the-fridge`). See `layouts/_default/term.html`.

## Setup (per machine)

Copy `tools/config.toml.example` to `tools/config.toml` (gitignored — holds the machine-specific deploy target) and fill in:

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

### Server requirements

The deploy target must be a plain static file host serving `public/` directly — no server-side app, no build step. Two things depend on the server itself, not just the rsynced files:

- **Custom 404 page.** Hugo builds `public/404.html`, and `static/.htaccess` (copied through as-is) tells Apache to serve it: `ErrorDocument 404 /404.html`. This only takes effect if the server's `AllowOverride` permits `.htaccess` directives (specifically `FileInfo`) for the docroot — if it doesn't, missing URLs will fall through to Apache's own default error page instead of the themed one, with no error at build or deploy time to flag it. On a different host (nginx, Caddy, a CDN/static host like Netlify or Cloudflare Pages), `.htaccess` does nothing — the 404-page rule has to be reconfigured in that host's own way (nginx: `error_page 404 /404.html;`; Netlify/Cloudflare Pages: this just works by convention).
- **HTTPS/domain config** — out of scope for this repo; set up per host as needed.

## License

Content (recipes, essays, reference pages) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share and adapt with attribution, same license. The source code (Hugo templates, migration tools) is MIT. See [LICENSE](LICENSE) for full terms.
