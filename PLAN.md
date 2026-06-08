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

- [ ] Create `tools/config.toml.example` with vault path placeholders
- [ ] Copy to `tools/config.toml` (gitignored) with local paths
- [ ] Write `tools/migrate.py` with click CLI (config.toml + env var + --source flag resolution)
- [ ] Test against a few sample recipes; verify output matches FORMAT.md
- [ ] Run full migration: `python tools/migrate.py --source ~/writing/development-notes/recipes`
- [ ] Verify Hugo builds with all recipes
- [ ] Check wiki links resolve (pick 2-3 recipes with cross-references)
- [ ] Write `.claude/commands/migrate.md`
- [ ] Write `.claude/commands/lint.md`

**Output:** Hugo site with 69 personal recipes. All published (no drafts). `/recipes/` listing and individual pages work.

## Phase 2: Family archive normalization

Migrate the family archive from `development-notes/gdrive/Alderson Family Recipes/`.

- [ ] Write `tools/normalize.py` with click CLI
- [ ] Implement skip list for meta files (Recipe Template, How to add a recipe, About...)
- [ ] Implement folder-to-tag mapping (see ARCHITECTURE.md)
- [ ] Run `--dry-run` first; review what would be created
- [ ] Run full normalization; review drafts
- [ ] Promote drafts to published as they pass review
- [ ] Write `.claude/commands/gdrive-migrate.md`

**Conflict resolution:** Some personal and family archive recipes overlap (two Chai versions, etc.). Keep the personal recipe; normalize the family archive version as a draft and decide at review time whether to merge, replace, or discard.

**Output:** Family archive integrated as drafts. Published after per-file review. `/recipes/` listing is substantially complete.

## Phase 3: Essays and reference pages

Scaffold essays content type and migrate reference material.

- [ ] Essays: add Hugo content type config, verify layout
- [ ] Reference: normalize and migrate appendices from `gdrive/X. Appendices/`
- [ ] Update vault with any publishable essay drafts
- [ ] Migrate essays manually from vault when ready
- [ ] Write `.claude/commands/recipe-new.md`

**Output:** All three content sections populated. Site is structurally complete.

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
