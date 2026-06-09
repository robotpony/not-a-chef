# Architecture

## Overview

Content flows from two sources in the Obsidian vault through Python migration tools into a Hugo static site. The migration tools are one-way: once content lands in `content/`, this repo owns it. The vault remains the authoring environment.

```
Obsidian vault (development-notes/)
  │
  ├── recipes/               (69 personal recipes, active)
  │       │
  │       └── migrate.py ──────────────────────────────→ content/recipes/
  │
  └── gdrive/Alderson Family Recipes/   (family archive, ~170 md files)
          │
          └── normalize.py ─────────────────→ content/recipes/
                                              content/reference/
                                              [skip: meta/template files]
                                                       │
                                              writing/essays/ ──(manual)──→ content/essays/
                                                       │
                                               Hugo + Blowfish build
                                                       │
                                               public/ (static HTML)
                                                       │
                                               self-hosted server (rsync/deploy script)
```

## Components

### tools/migrate.py

Migrates personal recipes from `development-notes/recipes/` to `content/recipes/`.

Responsibilities:
- Parse YAML frontmatter and validate required fields (`title`, `tags`)
- Normalize minor inconsistencies (ensure tags are plain strings, strip stray `#` prefixes, etc.)
- Add Hugo-specific fields if missing (`draft: false`)
- Write normalized file to `content/recipes/{slug}.md`
- Report: files migrated, skipped (already current), errors

Does not rewrite body content. The body format from the vault is already correct.

**Incremental sync.** The script is safe to re-run at any time. Each run compares source files against existing content and acts accordingly:

| Condition | Action |
|---|---|
| Title not in `content/recipes/` | Migrate (new) |
| Title exists, source newer than dest | Re-migrate (updated in vault) |
| Title exists, source not newer | Skip (unchanged) |
| Title in `content/` but not in vault | Warn only — never auto-delete |

A `--force` flag re-migrates all files regardless of mtime. Use this after changing the migration logic itself.

### tools/normalize.py

Normalizes and migrates family archive files from `development-notes/gdrive/Alderson Family Recipes/` into `content/`.

The gdrive files have Google Docs provenance: only `gdrive_id`, `gdrive_path`, `google_document`, and `synced` in frontmatter; title buried in the body as a `# Heading`; inconsistent ingredient list style (`*` vs `-`); nested inline notes.

Responsibilities:
- **Skip** meta files: Recipe Template, How to add a recipe, About the Alderson Family book
- **Route** by source folder: `X. Appendices/` → `content/reference/`; all others → `content/recipes/`
- Strip gdrive frontmatter fields
- Extract `title` from first `# Heading` in the body
- Infer `tags` from folder path (see tag mapping below)
- Set `source: family`
- Normalize ingredient bullets (`*` → `-`)
- Check for title conflicts with existing `content/recipes/` files; flag duplicates explicitly
- Write to `content/{section}/{slug}.md` as a draft (`draft: true`) for review
- Report: files normalized, skipped, flagged for manual review

Outputs drafts, not published files. The operator reviews and sets `draft: false` when satisfied.

**Duplicate detection.** Before writing, normalize.py builds a title index from existing `content/recipes/` files. If the incoming title matches an existing file, the output is still written as a draft but tagged `[duplicate]` in the report and a `_duplicate_of` YAML field is added to the frontmatter. This surfaces the conflict for manual resolution — merge, replace, or discard — rather than silently overwriting or skipping.

```yaml
_duplicate_of: content/recipes/chai.md
```

The underscore prefix follows the convention for private/meta fields; Hugo ignores fields it doesn't recognize.

**Incremental sync.** Same semantics as migrate.py: re-running is safe. Files already in `content/` are skipped unless the source is newer or `--force` is passed.

**Folder-to-tag mapping:**

| gdrive folder | tags |
|---|---|
| Appetizers and sides | [appetizers, sides] |
| Bases and flavour bombs | [bases] |
| Breads and pastas | [breads] |
| Desserts | [desserts] |
| Drinks | [drinks] |
| Mains/Breakfast | [mains, breakfast] |
| Mains/Casseroles | [mains, casseroles] |
| Mains/Curries | [mains, curries] |
| Mains/Dumplings | [mains, dumplings] |
| Mains/Mashes | [mains, mashes] |
| Mains/Meat/Beef | [mains, beef] |
| Mains/Meat/Burgers | [mains, burgers] |
| Mains/Meat/Pork | [mains, pork] |
| Mains/Meat/Poultry | [mains, poultry] |
| Mains/Rice bowls | [mains, rice-bowls] |
| Mains/Soups | [mains, soups] |
| Mains/Stews | [mains, stews] |
| Mains/Stir fries | [mains, stir-fries] |
| Salads | [salads] |
| Sauces, dips, and condiments | [sauces] |
| X. Appendices | reference section |

### tools/config.toml

Vault paths are machine-specific and must not be hardcoded or committed. Both tools read paths from a local config file.

`tools/config.toml` (gitignored):
```toml
[vault]
recipes = "~/writing/development-notes/recipes"
gdrive   = "~/writing/development-notes/gdrive/Alderson Family Recipes"
```

`tools/config.toml.example` (committed) — the template new contributors copy.

**Resolution order** for each path (first match wins):
1. CLI flag (`--source PATH`)
2. Environment variable (`VAULT_RECIPES_PATH` or `VAULT_GDRIVE_PATH`)
3. `tools/config.toml`
4. Error — the tool exits with a clear message rather than using a silent default

Parsed with `tomllib` (Python 3.11+ stdlib). No extra dependency.

### Hugo site

Standard Hugo site with Blowfish as the theme (git submodule). Three content sections:

| Section | Path | Source |
|---|---|---|
| Recipes | `content/recipes/` | migrate.py + normalize.py |
| Essays | `content/essays/` | manual migration from vault |
| Reference | `content/reference/` | normalize.py (appendices) |

Custom layouts needed:

- `layouts/_default/_markup/render-link.html` — render hook that converts `[[Recipe Name]]` wiki links to proper Hugo internal links at build time. Resolves by matching the `title` field in target page frontmatter.

### .claude/commands/

Project-specific Claude Code slash commands. These are markdown files in `.claude/commands/` that describe what the agent should do. See DESIGN.md for the full list and their intended behavior.

## Key Design Decisions

**Copy-on-migrate, not live reference.** The Hugo content directory is not a symlink into the vault. This keeps the two repos independent: the vault can reorganize files without breaking the Hugo build, and the Hugo content can accumulate Hugo-specific metadata (SEO descriptions, featured images, custom slugs) without polluting Obsidian.

**Wiki links resolved at build time, not migration time.** The `[[Recipe Name]]` syntax stays intact in migrated files. A Hugo render hook converts them during the build. This means migrated files remain Obsidian-compatible (usable as a portable corpus) and cross-references don't require knowing file paths.

**Drafts for family archive.** normalize.py outputs `draft: true`. The family archive recipes have inconsistent quality and some may duplicate personal recipes (there are two Chai recipes). Review before publishing prevents low-quality content from going live.

**Config over convention for vault paths.** Vault paths are machine-specific. A committed `config.toml.example` plus a gitignored `config.toml` keeps setup explicit without making the tools fragile on a different machine. The resolution order (CLI flag → env var → config file → error) supports both interactive use and CI/automation.

**Re-runnable migrations as the primary workflow.** The tools are designed to be run repeatedly, not just once. As new recipes are added to the vault, a single `/migrate` run pulls them in without touching already-migrated content. This removes the need for manual tracking of what's been migrated.

**Python for tooling.** `python-frontmatter` provides clean YAML+markdown parsing. `click` gives a proper CLI. The tools are simple file processors — no need for a build system or Node ecosystem.

**No CMS.** Obsidian is the authoring environment; there is no web-based editor. Publishing is a deliberate act (run migrate.py, build, deploy). This keeps the content in plain files and avoids CMS lock-in.
