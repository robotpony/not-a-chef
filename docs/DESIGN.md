# Design

## Hugo site

### Content sections

Four sections, each with a list view and individual pages. Every listing uses the same recipe card (`.rcard`, `themes/fugu/layouts/partials/recipe-card.html`; see `mockups/STYLE.md` "Recipe card").

**Recipes** (`/recipes/`, `themes/fugu/layouts/recipes/list.html`)
- Listing: card grid (taxonomy row, title, intro, Prep/Cook/Serves)
- Individual: ingredients with check-off, scaling and unit conversion (`themes/fugu/assets/js/ingredients.js`), method, and a right sidebar that Mechanic, To serve, Notes and photos are moved into (`themes/fugu/assets/js/automagic-sidebar.js`)
- Filterable by tag and cuisine (term pages, `themes/fugu/layouts/_default/term.html`)
- Searchable via Fuse.js (Blowfish built-in, project override in `themes/fugu/assets/js/search.js`)

**Essays** (`/essays/`, `themes/fugu/layouts/essays/list.html`)
- Listing: card grid; the card's top row is the essay's format from its folder, the stat line is reading time
- Individual: article layout with the reading sidebar

**Reference** (`/reference/`, `themes/fugu/layouts/reference/list.html`)
- Listing: card grid, reading time in the stat line
- Individual: article layout with the reading sidebar (technique guides, ratio tables, glossaries)

**The Food Log** (`/the-food-log/`, `themes/fugu/layouts/the-food-log/list.html`)
- Listing: one card per month, intro from the month's summary paragraph (`/food-log-summary`)
- Individual: article layout with the reading sidebar

### Blowfish layout choices

Superseded by the mockups — see `mockups/STYLE.md`/`mockups/style.html`, `mockups/COMPONENTS.md`/`mockups/components.html`, and `mockups/archived/homepage.html` (built in the old plan's Phase 6, squashed 2026-09-25). None of Blowfish's built-in homepage layouts (`hero`/`profile`/`page`/`card`/`background`) match the settled design: no hero photography anywhere in the system (it's typography- and data-driven), so the homepage needs a custom `layouts/index.html` rather than the `background` layout this section used to specify. Recipe listing and individual pages likewise use custom templates (`themes/fugu/layouts/recipes/list.html`, and `themes/fugu/layouts/_default/single.html` for every single page) — Blowfish's default `list`/`article` layouts don't have the recipe card, ingredient-check, Mechanic callout, or stat-rail components at all.

**Blowfish settings to enable:**
- Search (Fuse.js) — on
- Dark mode — follow system preference
- Taxonomies — `tags`, `cuisine` (cuisine is useful as a browse dimension)
- Table of contents — on for recipes with multiple components

### Hugo frontmatter additions

Hugo needs a few fields not in the recipe vault format:

```yaml
draft: false          # true = published in the Test kitchen (banner + card mark); see FORMAT.md
description: ""       # optional short blurb for SEO and cards
```

```yaml
pinned: true          # optional; floats this page to the top of its listings and search
```

(`featured` was considered — pin a recipe to the homepage card grid — but dropped 2026-09-17 building Phase 6.3: no recipe uses it, and "recently added" is real date-sorted data already. A real need showed up 2026-09-27: the win-the-fridge reference essay (`content/essays/reference-essays/win-the-fridge.md`) needed to surface ahead of everything else, so it came back as `pinned`, scoped wider than the original proposal — any page in any section, not just recipes on the homepage. It floats pinned pages to the top of `themes/fugu/layouts/recipes/list.html`, `themes/fugu/layouts/essays/list.html`, `themes/fugu/layouts/reference/list.html`, and `themes/fugu/layouts/_default/term.html` (a stable partition: pinned pages first, everything else keeps its existing order), and to the top of matching results in the Fuse.js search modal — `themes/fugu/layouts/_default/index.json` (project override of the theme's, adds a `pinned` field) feeds `themes/fugu/assets/js/search.js` (project override of the theme's, stable-sorts pinned matches first). It still doesn't touch the homepage's "recently added" row, which stays real date-sorted data per the original reasoning above.)

### Wiki link render hook

`themes/fugu/layouts/_default/_markup/render-link.html` intercepts links during the build. For any link destination matching the pattern `[[Title]]` (or `[Title](Title)` after Obsidian→markdown conversion), the hook looks up a page whose `.Title` matches and emits a proper Hugo relative URL.

Unresolved wiki links fall back to plain text with a `broken-link` CSS class so they're visible in review.

### Other render hooks

All in `layouts/_default/_markup/`:

- `render-heading.html` — flags each h2 as an ingredient section or a sidebar section (Mechanic, To serve, Notes, …) for the client-side walks in `ingredients.js` and `automagic-sidebar.js`
- `render-image.html` — builds thumbnail and display copies for the Photos sidebar module (`FORMAT.md` §Photos)
- `render-table.html` — wraps tables in a scroll container so wide ones don't push a phone page sideways
- `render-codeblock-formula.html` — formula diagrams, below

### Formula diagrams

A ```` ```formula ```` fenced block (`FORMAT.md` §Formula diagrams) is drawn at build time as one row of icons joined by `+`, `:` or `→`, with a label, quantity, and optional swaps under each icon. No client JS.

- `render-codeblock-formula.html` parses the block: one slot per line, fields split on `|`, operator at the start of each later line, optional `caption:` and `bar:` lines. It warns at build time on an unknown icon key (drawing a dashed placeholder), mixed operators, or more than five slots. The figure gets an `aria-label` built from the slot text; the icons are `aria-hidden`.
- `themes/fugu/layouts/partials/formula-slot.html` draws one slot. Icons come from `assets/icons/formula/<key>.svg` via `resources.Get` and are inlined, not `<img>`, so `currentColor` and the theme tokens apply and dark mode works.
- CSS is in `assets/css/custom.css` (the "Formula diagram" block). The compact size keys off `.recipe-sidebar-section`, so a formula inside Mechanic shrinks to fit the sidebar on its own; nothing for the author to set.
- `themes/fugu/layouts/recipes/list.json.json` sets `has_formula` per recipe in `public/recipes/index.json`.
- Design and the icon kit gallery: `mockups/formula-diagrams.html`; component spec: `mockups/STYLE.md` "Formula diagram". The card strip in that mockup's §5 isn't built (see `PLAN.md`).

### Test kitchen (drafts)

A page with `draft: true` is published (`buildDrafts = true` in `config/_default/hugo.toml`) as a **Test kitchen** page: still being tested, cookable, expected to change. It gets a banner under its title and tags, and a mark leading the top row of its card. Taking `draft` out makes it a keeper, and both go away. Built in Fugu (`themes/fugu/layouts/partials/development/`); designed in `mockups/in-development.html`; component spec in `mockups/STYLE.md` "Draft state".

**Per page** (frontmatter, any section):

```yaml
draft: true
working_on: Getting them to hold without the egg. Chickpea flour next.   # optional
```

`working_on` is one line on what's being tried next. It shows under a dotted line in the banner, in the card's popover, and in `public/recipes/index.json`. Leave it out and nothing is shown.

**Site-wide words** (`config/_default/params.toml`, `[fugu.development]`; Fugu's defaults and comments are in `themes/fugu/hugo.toml`):

| Key | Where it shows | Ours |
|---|---|---|
| `label` | Bold, at the start of the banner; the popover heading | Test kitchen |
| `message` | The banner's sentence, after the label | We're still testing this one. Cook it, change it, … |
| `short` | The card chip only, where "Test kitchen" crowded the top row (the popover and banner keep `label`) | Testing |
| `hover` | The card popover's text | Still being tested. It works, but … |
| `note` | The label before a page's `working_on` line ("Working on: …") | Working on |
| `page` | The explainer page the banner and popover link to, which also lists every draft in place of its Related section. A path as `site.GetPage` takes it; `""` drops the link and the list | `essays/reference-essays/test-kitchen` |
| `more` | The text of that link (an arrow is added) | How the test kitchen works |
| `heading` | The heading over that list | In the test kitchen now |
| `empty` | What the explainer page's list says when there are no drafts | Nothing is in the test kitchen right now. |
| `icon` | An SVG under `assets/`, inlined in the banner, chip, and popover; `""` draws a dot instead | `icons/development/pot-steam.svg` |

A key left out of `params.toml` falls back to Fugu's default ("In development" and so on).

**The explainer page** is `content/essays/reference-essays/test-kitchen.md`, edited like any essay. Its `description` is its card intro. The list of drafts replaces its Related section at the bottom of the page, under `heading`; there's nothing to add to the file for it.

**Turning it off:** `showDraftLabel = false` under `[article]` in `params.toml` hides the banner (the card chip stays; it follows `.Draft`). `buildDrafts = false` in `hugo.toml` stops publishing drafts at all, and the explainer's list then shows `empty`.

**Look:** `assets/css/custom.css`, the "Test kitchen" block (`.dev-strip`, `.dev-chip`, `.dev-icon`); the card popover is the shared Popover component (`.pop`, `.pop-dev`). The strip is as wide as the body column (65ch of 16px Lora), not the page header.

### URL structure

```
/recipes/dal-tadka/
/recipes/chai/
/essays/the-case-for-mise-en-place/
/reference/meat-doneness/
/tags/mains/
/cuisine/indian/
```

Slugs are derived from the filename (kebab-case). No date prefixes in recipe or essay URLs — recipes don't have publication dates in the way blog posts do.

---

## Claude Code commands

Project-specific slash commands in `.claude/commands/`. Each is a markdown file that describes what the agent should do when invoked.

### `/migrate` (retired)

Retired with the two-vault workflow: the Obsidian vault is this repo now, so there's nothing to migrate from. Kept for history. It migrated one or more personal recipes from the vault into `content/recipes/`.

```
/migrate [filename or "all"]
```

- Default (no args): migrates all new or changed files from `~/writing/me/recipes/`
- With filename: migrates that specific recipe
- Calls `tools/migrate.py`
- Reports what was added, updated, or skipped

### `/recipe-new`

Creates a new recipe stub in the correct location.

```
/recipe-new "Recipe Title"
```

- Generates a file in `content/recipes/{slug}.md` with populated frontmatter template
- Today's date pre-filled
- Title set in sentence case

### `/lint`

Validates all recipe files in `content/recipes/` and `content/essays/` against FORMAT.md rules.

```
/lint [path]
```

- Checks required frontmatter fields, tag format, draft status
- Reports files with missing or malformed fields
- Does not modify files

### `/preview`

Starts Hugo dev server locally.

```
/preview
```

- Runs `hugo server -D` (includes drafts)
- Reports the local URL

### `/publish`

Builds the site and deploys to the self-hosted server.

```
/publish
```

- Runs `tools/publish.sh`: builds with `hugo --minify --cleanDestinationDir`, refuses to ship a `public/` containing dev-server output (localhost URLs, livereload), then runs `tools/deploy.sh` (rsync)
- Reports build output and any errors
- `tools/publish.sh dry-run` shows what rsync would change without deploying; `build`, `check`, and `deploy` run the steps individually

### `/image-add`

Adds one or more photos to a recipe, essay, or Food Log page.

```
/image-add <image path(s)> <post title or file>
```

- Finds the post by title, slug, or path, and picks the matching `static/images/<section>/` folder
- Names each file from the post's slug and what the photo shows; never overwrites
- Processes each one with `themes/fugu/tools/add-image.sh` (bakes in rotation, strips metadata, caps the long edge at 2000 px)
- Places the markdown image where it belongs in the text, with descriptive alt text (`FORMAT.md` §Photos)

### `/food-log-summary`

Writes or refreshes a Food Log month's opening summary paragraph.

```
/food-log-summary [month file, e.g. 2026-September]
```

- Defaults to the most recently modified file in `content/the-food-log/`
- Reads the month's entries and writes a short prose paragraph (what was cooked, tested, or planned) as the first thing in the body, before the first `## <Day>` heading — replacing one already there rather than stacking
- This paragraph is what the recipe-card intro fallback picks up, so it's what shows on the Food Log list page and the homepage's "From the food log" band
- Run on demand, not automatically — the log gets small edits constantly and re-summarizing on every one would be noisy

---

## Migration tool CLI (retired)

Kept for history; not part of any current workflow (see `/migrate` above).

### config.toml

Copy `tools/config.toml.example` to `tools/config.toml` (gitignored) and set the vault path for your machine:

```toml
[vault]
recipes = "~/writing/me/recipes"
```

Path resolution order: `--source` flag → env var → `config.toml` → error.

### migrate.py

```
python tools/migrate.py [options] [file]

Options:
  --source PATH    Override vault recipes path (default: from config.toml or VAULT_RECIPES_PATH)
  --dest PATH      Override Hugo content/recipes/ path (default: ./content/recipes)
  --force          Re-migrate all files, ignoring mtime
  --dry-run        Show what would change, don't write files
  --verbose        Show per-file details

Arguments:
  file             Single filename to migrate (default: all)
```

Output (human-readable):
```
✓ new:      dal-tadka.md
✓ updated:  chai.md  (vault newer)
  skipped:  pizza-dough.md  (unchanged)
! error:    broken-recipe.md  (missing required field: title)
! removed:  old-recipe.md  (not in vault — remove manually if intended)

5 files checked: 1 new, 1 updated, 1 skipped, 1 error, 1 warning
```

---

## Frontmatter tool CLI

`themes/fugu/tools/frontmatter.py` — no third-party dependencies (stdlib only). Reviews frontmatter across `content/recipes/`, `content/essays/`, and `content/reference/`, and provides get/set/unset for scripted edits (e.g. by Claude, across many files at once). It parses the constrained YAML subset this vault actually uses (flat scalars, flow lists, occasional block lists, folded long values) — not general YAML — so it never needs `pyyaml` installed.

```
python themes/fugu/tools/frontmatter.py check [paths...] [--json]
python themes/fugu/tools/frontmatter.py get <file> [field] [--json]
python themes/fugu/tools/frontmatter.py set <file> <field> <value> [--type str|int|bool|list]
python themes/fugu/tools/frontmatter.py unset <file> <field>
```

`check` validates required fields (`title`+`tags` for recipes, `title`+`date` for essays, `title` for reference), warns on missing recommended fields (`source`/`date`/`draft` for recipes, `tags`/`draft` for essays, `source`/`tags`/`draft` for reference), checks `tags`/`date`/`draft` types, and flags duplicate recipe titles. Exits non-zero only on errors (missing required fields, bad types) — missing recommended fields are warnings and don't fail the run. `_index.md` and dotfiles (scratch notes like `.ideas.md`) are skipped.

`set` preserves the rest of the file untouched (comments, field order, other values) and inserts new fields in `FIELD_ORDER` position when the key doesn't already exist.

---

## Drafts tool CLI

`themes/fugu/tools/drafts.py` — lists everything marked `draft: true` across `content/recipes/`, `content/essays/`, `content/reference/`, and `content/the-food-log/`. Reuses `frontmatter.py`'s parser directly (no separate frontmatter logic).

```
python themes/fugu/tools/drafts.py [paths...] [--json]
```

Groups results by content type (recipes, essays, reference pages, log entries) with title and path. `--json` prints a flat list of `{path, kind, title}` objects instead.
