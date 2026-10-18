# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md`; template changes go to fugu-agent. Work on a single draft page lives in its `working_on` line (`make drafts`), not here. Questions waiting on Bruce live in `docs/REVIEW.md`.

## Diagrams

Formula diagrams (`FORMAT.md` §Formula diagrams) for Mechanics that already state a ratio. The first batch (twelve pages, today's icons) is reviewed.

The second batch (eighteen recipes and the stock method, with the fifteen icons from Fugu `1d8dbe6`) is drawn and in review (`docs/REVIEW.md`). Still waiting: Teriyaki (state its percentages in the Mechanic first), Granola bars (a nut icon, once a second recipe needs one), and the Food ratios tables (once that method leaves the test kitchen).

Stacks (the exploded layer kit):

- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.

## Methods

Spec: `docs/METHODS.md`.

- [ ] New method: foil packets (from Camp cooking); then link Camp cooking to it.
- [ ] Timeline flags: non-food context markers (Burger King opens, a world's fair). Decide body vs `flags` frontmatter, mock in `mockups/methods-pages.html`, hand off to fugu-agent.

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
