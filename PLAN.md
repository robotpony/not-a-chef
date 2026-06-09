# Plan

Phased. Each phase ships something usable.

## Phase 0: Hugo scaffolding

Set up the site skeleton before any content migration.

- [x] Initialize Hugo site: `hugo new site .`
- [x] Add Blowfish as a git submodule: `themes/blowfish/`
- [x] Configure `hugo.toml`: site name, base URL, language, Blowfish settings
- [x] Create empty content sections: `content/recipes/`, `content/essays/`, `content/reference/`
- [x] Configure taxonomies: `tags`, `cuisine`
- [x] Add wiki link render hook: `layouts/_default/_markup/render-link.html`
- [x] Verify `hugo build` succeeds (16 pages, 55ms)
- [x] Add `.claude/commands/` with stub command files

**Note:** Hugo upgraded to 0.163.0 (Blowfish required 0.158+). Blowfish version warning is a false positive — build succeeds.

**Output:** Buildable Hugo site with no content. ✓

## Phase 1: Personal recipe migration

Migrate the 69 personal recipes from `development-notes/recipes/`.

- [x] Create `tools/config.toml.example` with vault path placeholders
- [x] Copy to `tools/config.toml` (gitignored) with local paths
- [x] Write `tools/migrate.py` with click CLI (config.toml + env var + --source flag resolution)
- [x] Test against a few sample recipes; verify output matches FORMAT.md
- [x] Run full migration: 68 recipes migrated (65 personal + 3 from test run)
- [x] Verify Hugo builds with all recipes (196 pages, 112ms)
- [x] Wiki links: no cross-references in current vault recipes; render hook tested and ready
- [x] Write `.claude/commands/migrate.md`
- [x] Write `.claude/commands/lint.md`

**Notes:**
- `Food log.md` is skipped automatically (not a recipe)
- Title-based slugs are used (not source filenames) — some recipes have longer slugs than their vault filenames
- Tags flow-sequence format preserved: `[mains, weeknight]`
- `cuisine: "#Indian"` normalized to `cuisine: Indian` automatically

**Output:** Hugo site with 68 personal recipes, all published. ✓

## Phase 2: Family archive normalization

Migrate the family archive from `development-notes/gdrive/Alderson Family Recipes/`.

- [x] Write `tools/normalize.py` with click CLI
- [x] Implement skip list for meta files (Recipe Template, How to add a recipe, About...)
- [x] Implement folder-to-tag mapping (see ARCHITECTURE.md)
- [x] Run `--dry-run` first; review what would be created
- [x] Run full normalization — 163 files written (140 new, 3 duplicates, 24 pre-run)
- [ ] Review drafts; promote to published as they pass
- [x] Write `.claude/commands/gdrive-migrate.md`

**Conflict resolution:** Some personal and family archive recipes overlap (two Chai versions, etc.). Keep the personal recipe; normalize the family archive version as a draft and decide at review time whether to merge, replace, or discard.

**Output:** Family archive integrated as drafts. Published after per-file review. `/recipes/` listing is substantially complete.

## Phase 3: Essays and reference pages

Scaffold essays content type and migrate reference material.

- [ ] Essays: add Hugo content type config, verify layout
- [x] Reference: normalize and migrate appendices from `gdrive/X. Appendices/`
- [x] CSV data: import planning/research CSVs to `content/reference/` as markdown tables
- [ ] Update vault with any publishable essay drafts
- [ ] Migrate essays manually from vault when ready
- [ ] Write `.claude/commands/recipe-new.md`

**Output:** All three content sections populated. Site is structurally complete.

## Phase 3a: Binary recipe import (Recipes to process)

Import ~80 unprocessed family recipes from `gdrive/X. Appendices/Recipes to process/`. These are `.doc`/`.docx`/`.pdf` files that cannot be read with standard tools.

- [ ] Install pandoc (`brew install pandoc`) or confirm availability
- [ ] Write `tools/import-legacy.py` — batch converts `.doc`/`.docx` to markdown, normalizes frontmatter, outputs to `content/recipes/` as `draft: true`
- [ ] Handle `.pdf` separately (e.g., `not-afterthoughts-bake-mega-file.pdf`, 8 pages)
- [ ] Review and promote drafts

**Note:** `pandoc` is required. Run `brew install pandoc` before starting this phase.

**Output:** Legacy recipe archive available for review and promotion.

## Phase 3b: CSV rendering

Add the ability to render structured CSV/table data in Hugo pages — for costing sheets, flour comparisons, and menu data already imported to `content/reference/`.

- [ ] Evaluate options: Hugo shortcode, embedded markdown tables (current approach), or a lightweight JS table library
- [ ] Implement chosen approach
- [ ] Update CSV-sourced reference pages to use new rendering

**Output:** Structured data pages are readable and browsable in the published site.

## Phase 4: Obsidian vault integration

- [ ] Install Obsidian vault at the path this project expects
- [ ] Test migration tools against local vault (not just the cached gdrive copy)
- [ ] Verify wiki links resolve in both Obsidian and Hugo
- [ ] Establish review workflow: edit in Obsidian → run `/migrate` → check in Hugo

**Output:** End-to-end authoring workflow validated.

## Phase 5: Self-hosted deployment

- [ ] Decide on host and server setup
- [ ] Write `tools/deploy.sh` using rsync or similar
- [ ] Add `make deploy` target
- [ ] Write `.claude/commands/publish.md`
- [ ] Test full deploy: build → transfer → verify live site
- [ ] Set up automated builds (cron or webhook) if desired

**Output:** Site live on your server. Manual deploy with a single command.

---

## Dependencies

```
Phase 0 → Phase 1 → Phase 2
                 ↘           ↘
                  Phase 3   Phase 4
                       ↘       ↓
                        Phase 5
```

Phase 0 is a blocker for everything. Phase 1 and Phase 3 can overlap once Phase 0 is done. Phase 4 (Obsidian install) can start as soon as Phase 1 is complete enough to test against.
