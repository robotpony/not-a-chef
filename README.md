# Bruce loves to cook

Our family cookbook.

Recipes, drinks, food essays, methods, reference pages and a food log, published as a Hugo site at https://bruce-loves-to-cook.ca. This repo is the source of truth and is also the Obsidian vault, so pages are written and edited here directly; the family's Google Docs archive was migrated in and retired. Claude Code works beside Obsidian on the same files.

## Tech plan

- Hugo to provide the static website (https://bruce-loves-to-cook.ca) for recipes, drinks, essays, methods, reference pages, and the food log
- Obsidian for local editing
- Small Python and shell tools: the content tools (frontmatter checks, drafts list, image processing) ship with the Fugu theme in `themes/fugu/tools/`; this site's own preview, publish, and deploy scripts are in `tools/`

Hugo + Obsidian suggest Markdown + clear YAML front-matter.

## Site features

- **Pinning**: `pinned: true` floats a page to the top of its section, its term pages and search, rarely. Fugu's `docs/frontmatter.md` has the details.
- **Formula diagrams**: a ```` ```formula ```` block in a recipe draws its ratio as a row of icons (beans + starch + veg + binder), at build time. Stack and flow diagrams work the same way; the fence specs live in hugo-warped (`themes/hugo-warped/fences/`). See docs/FORMAT.md §Formula diagrams and docs/DESIGN.md.
- **Methods and blueprints**: a method (`content/methods/`) explains how a kind of food or a process works in general, so you can cook what isn't written down; methods are listed at `/methods/`. A blueprint is a dish type made of parts, a folder under methods (`content/methods/burgers/`, at `/methods/burgers/`): its parts are in `parts/`, and its builds, named combinations of picks, are in `builds/`. How recipes, stories, methods, blueprints, and concepts relate is in docs/ARCHITECTURE.md §Content model and docs/METHODS.md.
- **Tag reference pages**: a tag can carry its own `content/tags/<slug>/_index.md`; marked `principle: true`, it becomes a short reference page (used for `win-the-fridge`). Fugu's `docs/frontmatter.md` "Principle tags" has the details.

## Setup (per machine)

The themes are git submodules: clone with `git clone --recurse-submodules`, or run `git submodule update --init` in an existing clone. Every `make` target and tool stops with that hint until they're there.

Copy `tools/config.toml.example` to `tools/config.toml` (gitignored; it holds the machine-specific deploy target) and fill in:

- `[deploy] host` / `remote_path`: where `/publish` sends the built site

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

- `make preview`: run the Hugo dev server locally (`/preview`)
- `make build`: build the working tree to `public/`, for a local look
- `make check`: check content frontmatter and the current `public/`
- `make dry-run`: build HEAD from a clean worktree and show what rsync would change
- `make deploy`: publish HEAD (`/publish`). It refuses uncommitted changes, builds clean, rsyncs `public/` to the server via `tools/deploy.sh`, and checks the live site
- `make drafts`: list every page in the Test kitchen (`draft: true`)
- `tools/publish.sh deploy`: ship the `public/` a dry run just built, without rebuilding or counting the build; it refuses if HEAD has moved or anything has written to `public/` since

### Server requirements

The deploy target must be a plain static file host serving `public/` directly, with no server-side app and no build step. Two things depend on the server itself, not just the rsynced files:

- **Custom 404 page.** Hugo builds `public/404.html`, and `static/.htaccess` (copied through as-is) tells Apache to serve it: `ErrorDocument 404 /404.html`. This only takes effect if the server's `AllowOverride` permits `.htaccess` directives (specifically `FileInfo`) for the docroot. If it doesn't, missing URLs fall through to Apache's own default error page instead of the themed one, with no error at build or deploy time to flag it. On a different host (nginx, Caddy, a CDN/static host like Netlify or Cloudflare Pages), `.htaccess` does nothing, and the 404-page rule has to be set up in that host's own way (nginx: `error_page 404 /404.html;`; Netlify/Cloudflare Pages: this just works by convention).
- **HTTPS/domain config**: out of scope for this repo; set up per host as needed.

## License

Content (recipes, essays, reference pages) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/): share and adapt with attribution, under the same licence. The source code (Hugo templates and tools) is MIT. See [LICENSE](LICENSE) for full terms.
