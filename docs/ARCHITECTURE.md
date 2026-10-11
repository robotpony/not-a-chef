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

Standard Hugo site with two stacked themes, both git submodules: `theme = ["fugu", "blowfish"]`. Hugo looks for each layout, partial and asset in this order:

1. This repo (`layouts/`, `assets/`): the Not a Chef design and branding: `custom.css`, the `not-a-chef` colour scheme, the homepage, header, footer, favicons, and fonts (`layouts/partials/fonts.html`).
2. Fugu (`themes/fugu/`, [hugo-theme-fugu](https://github.com/robotpony/hugo-theme-fugu)): the reusable cookbook theme: page templates, render hooks, recipe cards, sidebars, client JS, the formula icon kit, archetypes, and the content tools. See PLAN.md "Release hugo-theme-fugu".
3. Blowfish (`themes/blowfish/`): everything neither of the above overrides.

The settled design (`mockups/STYLE.md`) didn't match any Blowfish layout, so Fugu overrides much of it. Four content sections, all written by hand in this repo:

| Section | Path |
|---|---|
| Recipes | `content/recipes/` |
| Essays | `content/essays/` |
| Reference | `content/reference/` |
| The Food Log | `content/the-food-log/` |

Custom layouts:

- `layouts/index.html` — the homepage
- `themes/fugu/layouts/<section>/list.html` — card-grid listings for each section; `themes/fugu/layouts/recipes/list.json.json` builds `public/recipes/index.json`
- `themes/fugu/layouts/_default/single.html` — every single page (rewrites `[[wiki links]]` in `.RawContent` to standard links before goldmark parses them), with the recipe sidebar or the reading sidebar
- `themes/fugu/layouts/_default/term.html` — tag and cuisine pages, including principle tags
- `themes/fugu/layouts/_default/_markup/` — render hooks: `render-link.html` (wiki links, glossary links), `render-heading.html` (flags ingredient and sidebar sections), `render-image.html` (Photos module), `render-table.html` (scroll wrapper), `render-codeblock-formula.html` (formula diagrams)
- `assets/css/custom.css` — the design system's CSS; `themes/fugu/assets/icons/formula/` — the formula diagram icon kit

Client-side JS (`themes/fugu/assets/js/`) is plain, dependency-free, and progressive: `ingredients.js` (check-off, scaling, unit conversion), `automagic-sidebar.js` (moves Mechanic/To serve/Notes/photos into the sidebar, photo viewer), `search.js` (Fuse.js search, pinned results first). With JS off every page still reads and prints.

### .claude/commands/

Project-specific Claude Code slash commands. These are markdown files in `.claude/commands/` that describe what the agent should do. See DESIGN.md for the full list and their intended behavior.

## Content model

The site is a small ontology: a few kinds of page, and a few relations between them carried by folders, frontmatter, and wiki links. The definitions are in docs/METHODS.md; this is the map.

```
                    Concept (named idea + icon + list)
          ┌───────────────┼──────────────────┐
      Principle         Status             Method
   (win-the-fridge)  (test kitchen) (methods, blueprints)
          │               │                  │
       applies to       marks             is part of
          │               │                  │
          ▼               ▼                  ▼
       Recipe ◄─── uses ─── Method ───► Blueprint ◄── motivates ── Story
                              │
                          builds on
                              ▼
                       technique Method
```

| Entity | What it is | Where it lives |
|---|---|---|
| Recipe | One dish with fixed quantities | `content/recipes/` |
| Story | An essay that gives the reason for a method | `content/essays/<type>/` |
| Method | A general pattern: technique, ratio, or part of a blueprint | `content/essays/methods/` |
| Blueprint | A dish type made of parts | `blueprint` taxonomy, `content/blueprint/<slug>/_index.md` |
| Build | A named combination of one pick per part, with a profile | A method page with `build`, `profile`, `picks` |
| Option | A choice within a part (thick, thin, paper thin) | A row under `## Options` in the part's method |
| Concept | A named idea with a definition, icon, chip, essay, and list | tag `_index.md` (principle), `[fugu.development]` (status), the `method` tag and blueprint terms (method) |
| Glossary term | A definition only | `content/reference/glossary.md` |

| Relation | Carried by |
|---|---|
| Recipe uses method | Wiki link in the recipe |
| Method is part of blueprint | `blueprint` + `part` frontmatter |
| Build picks an option per part | `picks` on the build page |
| Recipe is an instance of build | `build` on the recipe, matching the build page's `build` |
| Method builds on technique method | Wiki link |
| Story motivates method or blueprint | `blueprint` on the story; wiki link |
| Principle applies to recipe | The principle's tag |
| Test kitchen marks a page | `draft: true` |

A folder is an exclusive, mandatory tag that also sets the URL and template; a tag or taxonomy is optional and many-to-many. So whatever a page can only be one of (recipe, essay type, method) is a folder, and whatever it can be several of (tags, cuisine, blueprint) is a taxonomy. The essays `_index.md` cascades the `method` tag onto `methods/`, so the folder and the tag agree.

Concept pages (principle, status, method) are meant to share one set of Fugu partials (docs/PLAN.md, Methods phase 2). Until then, principle pages use `term.html`'s `principle: true` branch, test kitchen uses `partials/development/`, and methods and blueprints render as plain term pages.

## Key Design Decisions

**One repo, edited in place.** The repo is the vault: no copy step, no second source to drift. This replaced the earlier copy-on-migrate design (separate vault, one-way `migrate.py`), retired 2026-09.

**Obsidian syntax stays in the source; Hugo translates at build time.** `[[Recipe Name]]` wiki links and ```` ```formula ```` blocks stay as written, so files remain Obsidian-compatible and readable as plain text; render hooks turn them into links and diagrams during the build. Cross-references don't require knowing file paths.

**Three layers, and no fourth.** Every feature lives in exactly one of these:

1. **Source**: Markdown and YAML frontmatter in `content/` (format in FORMAT.md), plus optional hand-maintained lookup tables under `data/`. The only layer a person edits; git is the only history.
2. **Build time**: whatever Hugo can compute from the source and write out as static HTML or JSON (`public/recipes/index.json`, render hooks, related content). No server, database, or live API calls.
3. **Client time**: the JS in `themes/fugu/assets/js/`, reading the rendered page and the build output to do what a static page can't (scaling, unit conversion, check-off). Every client feature must degrade safely: with JS off or failing, the page stays readable and printable.

A live backend (accounts, shared server-side state) was considered for saved recipes, personal notes, ratings, and reader-side change tracking, and deferred rather than designed around a guess: anything shared across family members or devices breaks the static-site decision. Author-side change tracking already exists as git history.

**Config over convention for machine paths.** The deploy target is machine-specific. A committed `config.toml.example` plus a gitignored `config.toml` keeps setup explicit without making the tools fragile on a different machine.

**Python and shell for tooling.** The tools are simple file processors (`frontmatter.py` and `drafts.py` are stdlib only) — no need for a build system or Node ecosystem.

**No CMS.** Obsidian is the authoring environment; there is no web-based editor. Publishing is a deliberate act (`/publish`: build, check, deploy). This keeps the content in plain files and avoids CMS lock-in.
