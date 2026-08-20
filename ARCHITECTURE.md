# Architecture

## Overview

This repo is the source of truth for recipes. New recipes are drafted in the Obsidian vault and pulled in one-way through a Python migration tool; once content lands in `content/`, this repo owns it. The family archive (Google Docs export) was fully migrated in and its local copy deleted, so it no longer feeds the build; anything still needed from it gets moved in by hand.

```
Obsidian vault (~/writing/me/)
  │
  └── recipes/               (drafting/staging area)
          │
          └── migrate.py ──────────────────────────────→ content/recipes/
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

Migrates personal recipes from `~/writing/me/recipes/` to `content/recipes/`.

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

### tools/config.toml

The vault path is machine-specific and must not be hardcoded or committed. `tools/migrate.py` reads it from a local config file.

`tools/config.toml` (gitignored):
```toml
[vault]
recipes = "~/writing/me/recipes"
```

`tools/config.toml.example` (committed) — the template new contributors copy.

**Resolution order** (first match wins):
1. CLI flag (`--source PATH`)
2. Environment variable (`VAULT_RECIPES_PATH`)
3. `tools/config.toml`
4. Error — the tool exits with a clear message rather than using a silent default

Parsed with `tomllib` (Python 3.11+ stdlib). No extra dependency.

### Hugo site

Standard Hugo site with Blowfish as the theme (git submodule). Three content sections:

| Section | Path | Source |
|---|---|---|
| Recipes | `content/recipes/` | migrate.py |
| Essays | `content/essays/` | manual migration from vault |
| Reference | `content/reference/` | manual |

Custom layouts needed:

- `layouts/_default/_markup/render-link.html` — render hook that converts `[[Recipe Name]]` wiki links to proper Hugo internal links at build time. Resolves by matching the `title` field in target page frontmatter.

### .claude/commands/

Project-specific Claude Code slash commands. These are markdown files in `.claude/commands/` that describe what the agent should do. See DESIGN.md for the full list and their intended behavior.

## Key Design Decisions

**Copy-on-migrate, not live reference.** The Hugo content directory is not a symlink into the vault. This keeps the two repos independent: the vault can reorganize files without breaking the Hugo build, and the Hugo content can accumulate Hugo-specific metadata (SEO descriptions, featured images, custom slugs) without polluting Obsidian.

**Wiki links resolved at build time, not migration time.** The `[[Recipe Name]]` syntax stays intact in migrated files. A Hugo render hook converts them during the build. This means migrated files remain Obsidian-compatible (usable as a portable corpus) and cross-references don't require knowing file paths.

**Config over convention for vault paths.** Vault paths are machine-specific. A committed `config.toml.example` plus a gitignored `config.toml` keeps setup explicit without making the tools fragile on a different machine. The resolution order (CLI flag → env var → config file → error) supports both interactive use and CI/automation.

**Re-runnable migrations as the primary workflow.** The tools are designed to be run repeatedly, not just once. As new recipes are added to the vault, a single `/migrate` run pulls them in without touching already-migrated content. This removes the need for manual tracking of what's been migrated.

**Python for tooling.** `python-frontmatter` provides clean YAML+markdown parsing. `click` gives a proper CLI. The tools are simple file processors — no need for a build system or Node ecosystem.

**No CMS.** Obsidian is the authoring environment; there is no web-based editor. Publishing is a deliberate act (run migrate.py, build, deploy). This keeps the content in plain files and avoids CMS lock-in.
