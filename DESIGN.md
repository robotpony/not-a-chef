# Design

## Hugo site

### Content sections

Three sections, each with a list view and individual pages.

**Recipes** (`/recipes/`)
- Listing: grid of recipe cards showing title, cuisine, tags, and prep time
- Individual: full recipe with large body type, ingredient list, method, notes
- Filterable by tag (Blowfish taxonomy pages)
- Searchable via Fuse.js (Blowfish built-in)

**Essays** (`/essays/`)
- Listing: chronological list, title and date
- Individual: article layout, full width prose

**Reference** (`/reference/`)
- Listing: simple alphabetical or sectioned list
- Individual: article layout (technique guides, ratio tables, glossaries)

### Blowfish layout choices

Homepage: `background` layout — full-screen food image with title and tagline, links to Recipes and Essays. Establishes tone before the browser reaches the listing pages.

Recipe listing: `list` layout with card grid. Each card shows title, tags, and (if set) a featured image.

Individual recipe and essay: default `article` layout. Wide readable column, table of contents for longer pages.

**Blowfish settings to enable:**
- Search (Fuse.js) — on
- Dark mode — follow system preference
- Taxonomies — `tags`, `cuisine` (cuisine is useful as a browse dimension)
- Table of contents — on for recipes with multiple components

### Hugo frontmatter additions

Hugo needs a few fields not in the recipe vault format:

```yaml
draft: false          # set to true during review; false = published
description: ""       # optional short blurb for SEO and cards
featured: false       # pin to homepage card grid (optional)
```

migrate.py adds `draft: false` on personal recipes (already reviewed).

### Wiki link render hook

`layouts/_default/_markup/render-link.html` intercepts links during the build. For any link destination matching the pattern `[[Title]]` (or `[Title](Title)` after Obsidian→markdown conversion), the hook looks up a page whose `.Title` matches and emits a proper Hugo relative URL.

Unresolved wiki links fall back to plain text with a `broken-link` CSS class so they're visible in review.

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

### `/migrate`

Migrates one or more personal recipes from the vault into `content/recipes/`.

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
- Opens a reminder to add the recipe to the vault too (the vault is the editing source)

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

- Runs `hugo build`
- Runs the deploy script (`tools/deploy.sh`)
- Reports build output and any errors

---

## Migration tool CLI

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
