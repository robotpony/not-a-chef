# Architecture

## Overview

This repo is the source of truth for recipes, and it is also the Obsidian vault: recipes, essays, reference pages, and the Food Log are drafted and edited here directly, in `content/`. The family archive (Google Docs export) was fully migrated in and its local copy deleted, so it no longer feeds the build; anything still needed from it gets moved in by hand.

```
Obsidian (this repo, edited in place)
  │
  └── content/  recipes/  essays/  reference/  the-food-log/
          │
          Hugo + Blowfish build
            ├── render hooks: wiki links, headings, images, tables, formula diagrams
            ├── list.json.json → public/recipes/index.json
            └── assets/js: ingredients.js, automagic-sidebar.js, search.js (client-side, no build step)
          │
          public/ (static HTML)
          │
          self-hosted server (tools/publish.sh → tools/deploy.sh, rsync)
```

Until 2026-09 recipes were drafted in a separate vault (`~/writing/me/recipes/`) and copied in one-way by `tools/migrate.py` (`/migrate`). That workflow is retired; the tool is still in `tools/` for history.

## Components

### tools/

- `frontmatter.py` — check, get, set, and unset frontmatter across content; stdlib only
- `drafts.py` — list everything marked `draft: true`
- `add-image.sh` — strip metadata, fix rotation, and size a photo for `static/images/`
- `preview.sh`, `publish.sh`, `deploy.sh` — dev server; build and check for dev-server output; rsync to the host
- `config.toml` (gitignored, from `config.toml.example`) — machine-specific deploy target (and the retired vault path)
- `migrate.py` — retired (see Overview)

CLI details are in DESIGN.md.

### Hugo site

Standard Hugo site with Blowfish as the theme (git submodule). Three content sections:

Standard Hugo site with Blowfish as the theme (git submodule), heavily overridden: the settled design (`mockups/STYLE.md`) didn't match any Blowfish layout. Four content sections, all written by hand in this repo:

| Section | Path |
|---|---|
| Recipes | `content/recipes/` |
| Essays | `content/essays/` |
| Reference | `content/reference/` |
| The Food Log | `content/the-food-log/` |

Custom layouts:

- `layouts/index.html` — the homepage
- `layouts/<section>/list.html` — card-grid listings for each section; `layouts/recipes/list.json.json` builds `public/recipes/index.json`
- `layouts/_default/single.html` — every single page (rewrites `[[wiki links]]` in `.RawContent` to standard links before goldmark parses them), with the recipe sidebar or the reading sidebar
- `layouts/_default/term.html` — tag and cuisine pages, including principle tags
- `layouts/_default/_markup/` — render hooks: `render-link.html` (wiki links, glossary links), `render-heading.html` (flags ingredient and sidebar sections), `render-image.html` (Photos module), `render-table.html` (scroll wrapper), `render-codeblock-formula.html` (formula diagrams)
- `assets/css/custom.css` — the design system's CSS; `assets/icons/formula/` — the formula diagram icon kit

Client-side JS (`assets/js/`) is plain, dependency-free, and progressive: `ingredients.js` (check-off, scaling, unit conversion), `automagic-sidebar.js` (moves Mechanic/To serve/Notes/photos into the sidebar, photo viewer), `search.js` (Fuse.js search, pinned results first). With JS off every page still reads and prints.

### .claude/commands/

Project-specific Claude Code slash commands. These are markdown files in `.claude/commands/` that describe what the agent should do. See DESIGN.md for the full list and their intended behavior.

## Key Design Decisions

**One repo, edited in place.** The repo is the vault: no copy step, no second source to drift. This replaced the earlier copy-on-migrate design (separate vault, one-way `migrate.py`), retired 2026-09.

**Obsidian syntax stays in the source; Hugo translates at build time.** `[[Recipe Name]]` wiki links and ```` ```formula ```` blocks stay as written, so files remain Obsidian-compatible and readable as plain text; render hooks turn them into links and diagrams during the build. Cross-references don't require knowing file paths.

**Config over convention for machine paths.** The deploy target is machine-specific. A committed `config.toml.example` plus a gitignored `config.toml` keeps setup explicit without making the tools fragile on a different machine.

**Python and shell for tooling.** The tools are simple file processors (`frontmatter.py` and `drafts.py` are stdlib only) — no need for a build system or Node ecosystem.

**No CMS.** Obsidian is the authoring environment; there is no web-based editor. Publishing is a deliberate act (`/publish`: build, check, deploy). This keeps the content in plain files and avoids CMS lock-in.
