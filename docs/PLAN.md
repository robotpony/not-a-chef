# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md`; template changes go to fugu-agent.

## Site

- [ ] Checks against real content: Fuse.js search relevance, the homepage, footer Tags/Cuisines links, related content (`partials/related.html`), RSS in a real reader, phone-while-cooking touch targets.
- [ ] Cross-link essays and reference pages to related recipes.
- [ ] Whether reference essays (Win the fridge, Test kitchen) belong in essays or Reference.
- [ ] *Deferred.* Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search).

## Methods

Spec: `docs/METHODS.md`.

- [ ] One-pan pasta: the American bolognese build is still a test kitchen stub.
- [ ] New methods: stock (from Why ingredients matter in stock and the four stock recipes); foil packets (from Camp cooking).
- [ ] Timeline flags: non-food context markers (Burger King opens, a world's fair). Decide body vs `flags` frontmatter, mock in `mockups/methods-pages.html`, hand off to fugu-agent.
- [ ] Blueprint and build pages: mock if they change visibly; check at phone width and light mode.
- [ ] Later: a part-by-part build comparison table (needs a strict `## Picks` list to parse).

## Diagrams

- [ ] Diagram more Mechanics that already state a ratio (`FORMAT.md` §Formula diagrams).
- [ ] Check ratio (`:`) and sequence (`→`) diagrams the first time real content uses one; retest a formula inside Mechanic on the live site.
- [ ] Veg patties: swaps are listed in both the Mechanic bullets and the diagram; trim one.
- [ ] Stack diagrams for sandwiches and lasagne, once there's a page for them. Drop "v1" from the layer kit in STYLE.md once Bruce calls it settled.

## Test kitchen

- [ ] Live with it: does "Test kitchen" read oddly on a reference page; is the card mark too loud on the Test kitchen list.
- [ ] Add `working_on` lines to current drafts.

## Format and data

- [ ] Run Fugu's validator, once it exists, over all recipes; file each discrepancy as spec or content bug.
- [ ] Sketched for Fugu's build-time enrichment: `data/ingredient_prices.yaml` (rough unit prices, `updated:` date) and `data/departments.yaml` (store-walking order, ingredient → department). Both key on a canonical ingredient name; prototype the matching against real recipes first.

## Fugu follow-through

- [ ] After each Fugu change: bump the submodule, check the site renders the same.
- [ ] When Fugu gets its own CSS (Fugu §5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Code review

*Deferred (2026-10-14).* One area per pass with `/code-review high`; record each finding as fixed, won't fix (why), or moved to Fugu's plan. Template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [ ] Fugu templates and render hooks (empty sections, no cuisine, no date, drafts in card lists).
- [ ] Fugu JS (`ingredients.js`, `automagic-sidebar.js`, `search.js`): JS off, keyboard, screen reader, double listeners.
- [ ] Tools: Fugu's Python/shell tools, `tools/*.sh`, the Makefile; fresh clone with submodule uninitialised.
- [ ] Site `layouts/`: what Fugu now does better, accidental shadowing.
- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] Accessibility: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.
- [ ] Known suspect: test kitchen SVG inlined twice per draft card.

## Doc review

*Deferred, after the code review*, before Fugu's docs (§7).

- [ ] Inventory every doc here and in Fugu: keep, move, merge, or delete.
- [ ] Stale facts, line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md.
- [ ] Overlap: tool CLIs in both `DESIGN.md` and Fugu's `--help`.
- [ ] Run `/mx:content-check` over the docs.
- [ ] Last: cut both CLAUDE.md files to what an agent needs to start.
