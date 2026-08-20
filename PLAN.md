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

Migrate the 69 personal recipes from `development-notes/recipes/` (the vault has since moved to `~/writing/me/recipes/`).

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
- [ ] Review drafts; promote to published as they pass — **144 of 153 family-archive recipes are still `draft: true`** as of 2026-08-20
- [x] Write `.claude/commands/gdrive-migrate.md` (since removed, see below)

**Conflict resolution:** Some personal and family archive recipes overlap (two Chai versions, etc.). Personal recipe kept; family archive version normalized as a draft. Per-file merge/replace/discard decisions have not been made yet.

**Output:** Family archive migrated into `content/recipes/` but not reviewed. The `gdrive/` source folder has since been deleted, so this repo is the only remaining copy of that content — the review step can no longer be skipped by going back to check the source. `tools/normalize.py` and `.claude/commands/gdrive-migrate.md` were removed since there's no longer a source to re-run them against; any further family recipes get added by hand.

## Phase 3: Essays and reference pages

Scaffold essays content type and migrate reference material.

- [ ] Essays: add Hugo content type config, verify layout
- [x] Reference: normalize and migrate appendices from `gdrive/X. Appendices/`
- [x] CSV data: import planning/research CSVs to `content/reference/` as markdown tables
- [ ] Update vault with any publishable essay drafts
- [ ] Migrate essays manually from vault when ready
- [x] Write `.claude/commands/recipe-new.md`

**Output:** All three content sections populated. Site is structurally complete.

## Phase 3a: Binary recipe import (Recipes to process) — BLOCKED

Import ~80 unprocessed family recipes from `gdrive/X. Appendices/Recipes to process/`. These were `.doc`/`.docx`/`.pdf` files that cannot be read with standard tools.

**Blocked:** the `gdrive/` folder has been deleted; this source no longer exists. If any of these unprocessed recipes are still wanted, they need to be pulled from the original Google Drive (or another backup) by hand, not through a batch import tool.

- [ ] Install pandoc (`brew install pandoc`) or confirm availability
- [ ] Write `tools/import-legacy.py` — batch converts `.doc`/`.docx` to markdown, normalizes frontmatter, outputs to `content/recipes/` as `draft: true`
- [ ] Handle `.pdf` separately (e.g., `not-afterthoughts-bake-mega-file.pdf`, 8 pages)
- [ ] Review and promote drafts

**Output:** Legacy recipe archive available for review and promotion.

## Phase 3b: CSV rendering

Add the ability to render structured CSV/table data in Hugo pages — for costing sheets, flour comparisons, and menu data already imported to `content/reference/`.

- [ ] Evaluate options: Hugo shortcode, embedded markdown tables (current approach), or a lightweight JS table library
- [ ] Implement chosen approach
- [ ] Update CSV-sourced reference pages to use new rendering

**Output:** Structured data pages are readable and browsable in the published site.

## Phase 4: Obsidian vault integration

- [x] Vault confirmed at `~/writing/me/` (staging ground for notes and in-progress recipes)
- [x] Migration tool tested against the live vault
- [ ] Verify wiki links resolve in both Obsidian and Hugo
- [ ] Establish review workflow: edit in Obsidian → run `/migrate` → check in Hugo

**Output:** End-to-end authoring workflow validated.

## Phase 5: Self-hosted deployment

- [ ] Decide on host and server setup
- [ ] Write `tools/deploy.sh` using rsync or similar
- [ ] Add `make deploy` target
- [x] Write `.claude/commands/publish.md` (falls back gracefully — builds and stops with a reminder if `tools/deploy.sh` doesn't exist yet)
- [ ] Test full deploy: build → transfer → verify live site
- [ ] Set up automated builds (cron or webhook) if desired

**Output:** Site live on your server. Manual deploy with a single command.

## Phase 6: Theme customization

Tune the existing Blowfish theme rather than replace it. Recipes are the primary content type; the theme should read well as a cookbook, not a generic blog.

- [ ] Define a colour palette (light and dark) that fits a food/cookbook site, not Blowfish's default scheme
- [ ] Choose a typeface pairing: one for headings/UI, one for recipe body text (ingredients and method need to be easy to scan, not just readable)
- [ ] Design the recipe card component used on the `/recipes/` grid: title, cuisine, tags, prep time, optional featured image
- [ ] Style ingredient lists and method prose so they're visually distinct from each other at a glance
- [ ] Verify dark mode across all three content types, not just the homepage
- [ ] Decide whether `featured: false` (already in the frontmatter schema, see DESIGN.md) is worth wiring up to an actual homepage card grid, or drop it

**Output:** A site that looks like a cookbook, in both light and dark mode.

## Phase 7: UX improvements

Four areas, roughly in priority order. Some of this depends on Phase 6 landing first since card and typography decisions affect layout work here.

**Recipe browsing and filtering**
- [ ] Verify the `tags` and `cuisine` taxonomy pages are usable as filters, not just link dumps
- [ ] Check Fuse.js search relevance against real recipe titles, tags, and ingredient text
- [ ] Add sort or filter controls to the recipe listing (by cuisine, prep time, tag) if Blowfish supports it natively; otherwise scope a shortcode

**Single recipe readability**
- [ ] Print-friendly view: ingredients and method only, no nav chrome, works from a browser print dialog
- [ ] Servings scaling (multiply ingredient quantities on the page) — flag as a stretch goal; likely needs client-side JS and may not be worth the complexity for a family site
- [ ] Mobile layout check for the "phone propped up while cooking" case: large touch targets, no accidental nav taps
- [ ] Confirm wiki-link cross-references (e.g. `[[Pizza Sauce]]` as an ingredient) are visually clear as links, not just plain text

**Essay and reference layout**
- [ ] Migrate at least one real essay from the vault so the default article layout gets verified against real content (currently unverified, see Phase 3)
- [ ] Table of contents behavior on long reference pages (technique guides, glossaries)
- [ ] Resolve CSV/table rendering (Phase 3b) as part of this pass, not separately

**Navigation and homepage**
- [ ] Design the homepage `background` layout: hero image, tagline, links into Recipes and Essays (per DESIGN.md's original intent, not yet built)
- [ ] Verify the footer taxonomy links (Tags, Cuisines) work end to end
- [ ] Cross-link essays and reference pages to related recipes where it makes sense

**Output:** The site is easy to browse, easy to cook from on a phone, and essays/reference pages don't feel like an afterthought.

## Phase 8: Publishing tools

Two unrelated tracks under one banner: finishing the deploy pipeline, and building tooling for the draft-review backlog from Phase 2.

**Finish self-hosted deploy**

This is Phase 5, unchanged. Listed here again only because it's part of "publishing tools" as a project: decide on host, write `tools/deploy.sh`, test a full deploy end to end.

**Draft review tooling**

144 of 153 family-archive recipes are still `draft: true` (see Phase 2). Reviewing them one at a time by hand is slow. Scope some tooling to speed it up:

- [ ] A review workflow, likely a `/review-draft` command, that surfaces one draft at a time with a summary (title, tags, source folder) and a clear publish/merge/discard decision
- [ ] A duplicate report: cross-reference draft titles against published personal recipes to flag likely overlaps before review starts, so obvious duplicates get triaged first
- [ ] A way to flip `draft: true` → `false` without hand-editing YAML frontmatter, either a CLI flag on an existing tool or a small standalone script
- [ ] Surface review progress somewhere visible (e.g. a count in `public/recipes/index.json` or a note in `CLAUDE.md`), so it's obvious how much backlog remains without grepping frontmatter

**Output:** Deploy is a single command. The 144-draft backlog has a workflow instead of being 144 individual manual edits.

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

Phases 6, 7, and 8 sit outside this chain:

- **Phase 6** (theme) and **Phase 7** (UX) only need Phase 1's published recipes to preview against. Neither depends on Phase 2's draft backlog or on Phase 5. Do Phase 6 before Phase 7: card and typography decisions there affect the layout work in Phase 7.
- **Phase 8** is two independent tracks. The deploy track duplicates Phase 5, do that work once, not twice. The draft-review-tooling track depends only on Phase 2 already being underway (it is) and can start any time.
