# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md`; template changes go to fugu-agent. Work on a single draft page lives in its `working_on` line (`make drafts`), not here.

## Next

- [ ] Move the reference essays (Win the fridge, Test kitchen) to Reference (decided 2026-10-17). Both URLs are live under `/essays/reference-essays/`. Fugu ties the glossary popover (`render-link.html`) and a principle tag's essay (`principle/term.html`) to the essay section, so it needs a Fugu change first (fugu-agent). Then move the files and update `params.toml` `[fugu.development] page`, FORMAT.md, DESIGN.md, and CLAUDE.md. Redirects only if Bruce says so.
- [ ] Cross-link, topical pass (the exact-title pass is done). Candidates: Slick spaghetti → Meat sauce (AKA American bolognese); Chicken sandwich, mall style → Pan-fried chicken burger or the chicken burger essay; Garbage plates → Baked mac & cheese; Chili costing (2022) → Canadian chili, if it's the same chili; Burger night costing (2022) → the burgers blueprint; Flour protein content ← the pizza doughs that add vital wheat gluten; Camp cooking → the foil packets method once it exists.

## Diagrams

Formula diagrams (`FORMAT.md` §Formula diagrams) for Mechanics that already state a ratio. The first batch (twelve pages, today's icons) is reviewed.

**New icons** (`mockups/formula-icons-2.html`, approved 2026-10-17, with its answers: mirin shares the vinegar bottle, MSG uses the salt shaker, no nut icon yet, French dressing draws its 1:1 only). With fugu-agent to add to `assets/icons/formula/` (SVGs in `mockups/formula-icons-2/`). When they land, bump Fugu and draw:

- [ ] Acid: Classic French dressing (oil : lemon 1:1), Greek marinade (1:1), Lemon chicken marinade (1.6:1), Asian slaw dressing (2:1), Sandwich sour pickles (water : vinegar 1.2:1), and the Food ratios dressing and mayo tables.
- [ ] Soy: Chashu pork (water : soy : mirin 1:1:1), Ramen eggs (1:1:½:½:½), Sweet soy sauce, Teriyaki sauce, Garlic ginger wing sauce (soy : honey : hoisin).
- [ ] Jar, pickle, mustard: Bruce's burger sauce (1:1:1), Mozza burger sauce.
- [ ] Lentils: Dal tadka (1:4–5), Coconut lentils (1:3), Basic beans and lentils.
- [ ] Oats, fruit, sugar: Baked oatmeal, Fruit compote (10:1), Granola bars waits for a second recipe that needs a nut icon.
- [ ] Pepper, herb: McDouble seasoning (salt : MSG : pepper 4:2:1), Cottage pie (1:1:1:1), Bruce's poultry and pork rub (salt : sugar).
- [ ] Oven, strainer: the Stock method sequence (roast → extract → lift out → reduce → strain); swap the clock for the oven in Reverse cooking.

Stacks (the exploded layer kit):

- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.

## Methods

Spec: `docs/METHODS.md`.

- [ ] New method: foil packets (from Camp cooking).
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
