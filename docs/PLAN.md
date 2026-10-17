# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md`; template changes go to fugu-agent. Work on a single draft page lives in its `working_on` line (`make drafts`), not here.

## Next

- [ ] Checks against real content: Fuse.js search relevance, the homepage, footer Tags/Cuisines links, related content (`partials/related.html`), RSS in a real reader, phone-while-cooking touch targets, blueprint and build pages at phone width and in light mode, and the test kitchen banner and card mark in use (does the banner read oddly on a reference page; is the mark too loud on the Test kitchen list).
- [ ] Decide: do the reference essays (Win the fridge, Test kitchen) belong in essays or Reference?
- [ ] Cross-link essays and reference pages to related recipes.
- [ ] Diagram the Mechanics that already state a ratio (`FORMAT.md` §Formula diagrams). Only veg patties has one so far, so the first ratio (`:`) and sequence (`→`) diagrams need a check on the live site, as does a formula inside a Mechanic.

## Methods

Spec: `docs/METHODS.md`.

- [ ] New method: foil packets (from Camp cooking).
- [ ] Timeline flags: non-food context markers (Burger King opens, a world's fair). Decide body vs `flags` frontmatter, mock in `mockups/methods-pages.html`, hand off to fugu-agent.
- [ ] Stack diagrams for sandwiches and lasagne, once a build page needs one. Drop "v1" from the layer kit in STYLE.md once Bruce calls it settled.

## Fugu follow-through

Fugu's plan owns the validator, ingredient prices and departments, the builds comparison table, and the review of its own templates, JS, and tools. This side:

- [ ] After each Fugu change: bump the submodule, check the site renders the same.
- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug.
- [ ] When Fugu gets its own CSS (Fugu §5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Review

*Deferred (2026-10-14).* Code first, then docs, then Fugu's docs (§7).

Code, one area per pass with `/code-review high`; record each finding as fixed, won't fix (why), or moved to Fugu's plan. Template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [ ] Site `layouts/`: what Fugu now does better, accidental shadowing.
- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] `tools/*.sh` and the Makefile, from a fresh clone with the submodule uninitialised.
- [ ] Accessibility on the built site: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.

Docs:

- [ ] Inventory every doc here: keep, move to Fugu, merge, or delete. Tool CLIs in both `DESIGN.md` and Fugu's `--help` are the known overlap.
- [ ] Stale facts, line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md. Then `/mx:content-check`.
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Deferred

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search).
