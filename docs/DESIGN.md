# Design

## Hugo site

### Content sections

Six sections, each with a list view and individual pages. Every listing uses the same recipe card (`.rcard`, `themes/fugu/layouts/partials/recipe-card.html`; see `mockups/STYLE.md` "Recipe card").

**Recipes** (`/recipes/`, `themes/fugu/layouts/recipes/list.html`)
- Listing: card grid (taxonomy row, title, intro, Prep/Cook/Serves)
- Individual: ingredients with check-off, scaling and unit conversion (ARCHITECTURE.md lists the client JS), method, and a right sidebar that the sections in `recipeSidebar` (`config/_default/params.toml`: photos, To serve, Notes, Variations, Equipment) are moved into; Mechanic stays in the article as a callout
- Filterable by tag and cuisine (term pages, `themes/fugu/layouts/_default/term.html`)
- Searchable via Fuse.js (Blowfish built-in, project override in `themes/fugu/assets/js/search.js`)

**Drinks** (`/drinks/`, `themes/fugu/layouts/drinks/list.html`)
- Recipes in their own section (`drinkSection` in `params.toml`): the same recipe page, a drinks list, and entries in `public/recipes/index.json`

**Essays** (`/essays/`, `themes/fugu/layouts/essays/list.html`)
- Listing: card grid; the card's top row is the essay's format from its folder, the stat line is reading time
- Individual: article layout with the reading sidebar

**Reference** (`/reference/`, `themes/fugu/layouts/reference/list.html`)
- Listing: card grid, reading time in the stat line
- Individual: article layout with the reading sidebar (technique guides, ratio tables, glossaries); reference essays are in `content/reference/essays/` (`referenceEssays` in `params.toml`)

**Methods** (`/methods/`, `themes/fugu/layouts/methods/list.html`)
- Listing: the methods list, with each blueprint as a block of its parts and build names; a blueprint folder (`/methods/burgers/`) gets the blueprint page (parts, lineage, build cards)
- Individual: essay page treatment, with part or build navigation inside a blueprint. Model and format: `docs/METHODS.md`

**The Food Log** (`/the-food-log/`, `themes/fugu/layouts/the-food-log/list.html`)
- Listing: one card per month, intro from the month's summary paragraph (`/food-log-summary`)
- Individual: article layout with the reading sidebar

### Blowfish layout choices

Superseded by the mockups: see `mockups/STYLE.md`/`mockups/style.html`, `mockups/COMPONENTS.md`/`mockups/components.html`, and `mockups/archived/homepage.html` (built in the old plan's Phase 6, squashed 2026-09-25). None of Blowfish's built-in homepage layouts (`hero`/`profile`/`page`/`card`/`background`) match the settled design: no hero photography anywhere in the system (it's typography- and data-driven), so the homepage needs a custom `layouts/index.html` rather than the `background` layout this section used to specify. Recipe listing and individual pages likewise use custom templates (`themes/fugu/layouts/recipes/list.html`, and `themes/fugu/layouts/_default/single.html` for every single page); Blowfish's default `list`/`article` layouts don't have the recipe card, ingredient-check, or Mechanic callout components at all.

**Blowfish settings to enable:**
- Search (Fuse.js): on
- Dark mode: follow system preference
- Taxonomies: `tags`, `cuisine` (cuisine is useful as a browse dimension)
- Table of contents: on for recipes with multiple components

### Hugo frontmatter additions

`draft`, `description`, `pinned`, and the rest of the frontmatter are specified in Fugu's `themes/fugu/docs/frontmatter.md`, with this site's house rules in `docs/FORMAT.md`. Test kitchen (`draft`) is below.

The homepage's "Recently added" row stays date-sorted; `pinned` doesn't touch it.

### Wiki link render hook

`themes/fugu/layouts/_default/_markup/render-link.html` intercepts links during the build. For any link destination matching the pattern `[[Title]]` (or `[Title](Title)` after Obsidian→markdown conversion), the hook looks up a page whose `.Title` matches and emits a proper Hugo relative URL.

Unresolved wiki links fall back to plain text with a `broken-link` CSS class so they're visible in review.

### Other render hooks

All in `themes/fugu/layouts/_default/_markup/`:

- `render-heading.html`: flags each h2 as an ingredient section or a sidebar section (To serve, Notes, …) for the client-side walks in `ingredients.js` and `automagic-sidebar.js`
- `render-image.html`: builds thumbnail and display copies for the Photos sidebar module (`FORMAT.md` §Photos)
- `render-table.html`: wraps tables in a scroll container so wide ones don't push a phone page sideways
- `render-codeblock-formula.html`: formula diagrams, below
- `render-codeblock-stack.html`: stack diagrams (exploded builds), from the layer kit in `themes/fugu/assets/icons/layers/` (`themes/hugo-warped/fences/stack.md`)
- `render-codeblock-flow.html`: flow diagrams, boxed steps joined by arrows (`themes/hugo-warped/fences/flow.md`)

Every fence hook reads its block with hugo-warped's `partials/hugo-warped/parse.html` and warns with `warn.html` (each warning carries the spec's code, e.g. `formula [unknown-token]:`), then draws what the parse kept. A block with nothing valid to draw shows its source.

### Formula diagrams

A ```` ```formula ```` fenced block (`themes/hugo-warped/fences/formula.md`) is drawn at build time as one row of icons joined by `+`, `:` or `→`, with a label, quantity, and optional swaps under each icon. No client JS.

- `render-codeblock-formula.html` takes the parsed block: one slot per line, fields split on `|`, operator at the start of each later line, an optional closing `=` result, optional `caption:` and `bar:` lines. An unknown icon key draws a dashed placeholder; what warns is in the spec, not here. The figure gets an `aria-label` built from the slot text; the icons are `aria-hidden`.
- `themes/fugu/layouts/partials/formula-slot.html` draws one slot. Icons come from `assets/icons/formula/<key>.svg` via `resources.Get` and are inlined, not `<img>`, so `currentColor` and the theme tokens apply and dark mode works.
- CSS is in `assets/css/custom.css` (the "Formula diagram" block). The compact size keys off `.recipe-sidebar-section`, so a formula in a sidebar section (Notes, say) shrinks to fit on its own; nothing for the author to set. Mechanic stays in the article now, so its formulas draw full size.
- `themes/fugu/layouts/recipes/list.json.json` sets `has_formula` per recipe in `public/recipes/index.json`.
- Design and the icon kit gallery: `mockups/formula-diagrams.html`; component spec: `mockups/STYLE.md` "Formula diagram". The card strip from that mockup's §5 is `themes/fugu/layouts/partials/formula-strip.html`, drawn on recipe cards.

### Test kitchen (drafts)

A page with `draft: true` is published (`buildDrafts = true` in `config/_default/hugo.toml`) as a **Test kitchen** page: still being tested, cookable, expected to change. It gets a banner under its title and tags, and a mark leading the top row of its card. Taking `draft` out makes it a keeper, and both go away. Built in Fugu (`themes/fugu/layouts/partials/development/`); designed in `mockups/in-development.html`; component spec in `mockups/STYLE.md` "Draft state".

**Per page** (frontmatter, any section):

```yaml
draft: true
working_on: Getting them to hold without the egg. Chickpea flour next.   # optional
```

`working_on` is one line on what's being tried next. It shows under a dotted line in the banner and in `public/recipes/index.json`. Leave it out and nothing is shown.

**Site-wide words** are in `config/_default/params.toml` `[fugu.development]`. What each key does is in Fugu's `themes/fugu/docs/configuration.md`; ours:

| Key | Ours |
|---|---|
| `label` | Test kitchen |
| `message` | We're still testing this one. Cook it, change it, … |
| `short` | Testing (the card chip, where "Test kitchen" crowded the top row) |
| `note` | Working on |
| `page` | `reference/essays/test-kitchen` |
| `more` | How the test kitchen works |
| `heading` | In the test kitchen now |
| `empty` | Nothing is in the test kitchen right now. |
| `icon` | `icons/development/pot-steam.svg` |

A key left out of `params.toml` falls back to Fugu's default ("In development" and so on).

**The explainer page** is `content/reference/essays/test-kitchen.md`, a reference essay. Its `description` is its card intro. The list of drafts replaces its Related section at the bottom of the page, under `heading`; there's nothing to add to the file for it.

**Turning it off:** `showDraftLabel = false` under `[article]` in `params.toml` hides the banner (the card chip stays; it follows `.Draft`). `buildDrafts = false` in `hugo.toml` stops publishing drafts at all, and the explainer's list then shows `empty`.

**Look:** `assets/css/custom.css`, the "Test kitchen" block (`.dev-strip`, `.dev-chip`, `.dev-icon`). The card chip is a plain link, no popover (2026-10-11). The strip is as wide as the body column (65ch of 16px Lora), not the page header.

### URL structure

```
/recipes/dal-tadka/
/drinks/chai/
/methods/burgers/builds/drive-in-deluxe/
/essays/technique-essays/why-ingredients-matter-in-stock/
/reference/flour-protein-content/
/reference/essays/win-the-fridge/
/tags/mains/
/cuisine/indian/
```

Slugs are derived from the filename (kebab-case), under the page's folders (an essay's type, a blueprint's `builds/`). No date prefixes in recipe or essay URLs, since recipes don't have publication dates in the way blog posts do.

---

## Claude Code commands

Project slash commands are markdown files in `.claude/commands/`; each file is the full description of what the agent does.

| Command | What it does |
|---|---|
| `/recipe-new` | A recipe stub from Fugu's archetype, in the Test kitchen |
| `/lint` | Checks content: frontmatter, fences, methods and blueprints, glossary entries; changes nothing |
| `/preview` | `tools/preview.sh`: the dev server with drafts, opened in Chrome |
| `/publish` | `tools/publish.sh`: build HEAD clean, deploy, count the build |
| `/image-add` | Adds photos to a recipe, essay or Food Log page |
| `/food-log-summary` | Writes or refreshes a Food Log month's opening summary |
| `/glossary-link` | Links glossary terms on their first mention, reviewed in chat |
| `/glossary-new` | Adds glossary entries with a first-draft definition |
| `/glossary-candidates` | Finds words worth adding to the glossary |

## Publishing

`tools/publish.sh help` lists its commands; the comment at the top of the script says how a publish works (the lock, the clean worktree of HEAD, the checks, the build number). Each real deploy tags the commit `deploy-YYYY-MM-DD` (`-2` for a second that day), so `git log deploy-A..deploy-B` is the changelog between two deploys. Tags stay local until `git push --tags`.

## Content tools

Fugu's `docs/tools.md` (`themes/fugu/docs/tools.md`) lists every tool: what it does, an example, and what it needs. Each tool's `--help` is the detailed reference: `frontmatter.py`, `drafts.py` (both stdlib Python) and `add-image.sh` in `themes/fugu/tools/`.

`frontmatter.py check --help` lists the required and recommended fields per section.
