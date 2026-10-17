# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md`; template changes go to fugu-agent. Work on a single draft page lives in its `working_on` line (`make drafts`), not here.

## Next

- [ ] Move the reference essays (Win the fridge, Test kitchen) to Reference (decided 2026-10-17). Both URLs are live under `/essays/reference-essays/`. Fugu ties the glossary popover (`render-link.html`) and a principle tag's essay (`principle/term.html`) to the essay section, so it needs a Fugu change first (fugu-agent). Then move the files and update `params.toml` `[fugu.development] page`, FORMAT.md, DESIGN.md, and CLAUDE.md. Redirects only if Bruce says so.
- [ ] Cross-link, topical pass (the exact-title pass is done). Candidates: Slick spaghetti → Meat sauce (AKA American bolognese); Chicken sandwich, mall style → Pan-fried chicken burger or the chicken burger essay; Garbage plates → Baked mac & cheese; Chili costing (2022) → Canadian chili, if it's the same chili; Burger night costing (2022) → the burgers blueprint; Flour protein content ← the pizza doughs that add vital wheat gluten; Camp cooking → the foil packets method once it exists.

## Diagrams

Formula diagrams (`FORMAT.md` §Formula diagrams) for Mechanics that already state a ratio.

**Review the first batch** (2026-10-17, drawn with today's icons; `hugo server -D`, then each page in Chrome at desktop and phone width, light and dark). On each: does the diagram match the sentence above it, does it sit well in the sidebar, and is the card strip on the recipe list readable?

- [ ] Ratio with a bar, roux: [Simple chicken, pork, and beef gravy](http://localhost:1313/recipes/simple-chicken-pork-and-beef-gravy/) (roux : liquid 1:5). The two icons in the roux slot draw small in the sidebar; keep the pair or use butter alone?
- [ ] Add, with a result: [Baked mac & cheese](http://localhost:1313/recipes/baked-mac-cheese/) (roux 1:1 + milk + cheese = mornay).
- [ ] Hydration, one pattern on five pages (flour : water with a bar): [Baguettes](http://localhost:1313/recipes/baguettes/) 100:75, [Pizza dough 2021](http://localhost:1313/recipes/pizza-dough-2021-edition/) 100:67, [Lazy pizza dough 2022](http://localhost:1313/recipes/lazy-pizza-dough-2022/) 100:70, [Pizza dough 2022](http://localhost:1313/recipes/pizza-dough-2022-edition/) 100:75, [Ramen noodles](http://localhost:1313/recipes/ramen-noodles/) 100:36. Does "100" read as baker's percentage, or should it say so?
- [ ] Add, no result: [Fresh egg pasta](http://localhost:1313/recipes/fresh-egg-pasta/) (250 g flour + 2 eggs + 4 yolks, both egg slots the same icon).
- [ ] Ratio with a bar: [Oklahoma fried onion burger](http://localhost:1313/recipes/oklahoma-fried-onion-burger/) (beef : onion 2:1), [Rich veg/mushroom stock](http://localhost:1313/recipes/rich-vegmushroom-stock/) (veg : water 2:3).
- [ ] Ratio without a bar: [Breakfast sausage](http://localhost:1313/recipes/breakfast-sausage/) (meat : salt 100 : 1.5–2). A range as the ratio number; the bar is left off because 1.5 of 100 is a sliver.
- [ ] Sequence, the first one on the site, in a method's body rather than a sidebar: [Reverse cooking](http://localhost:1313/methods/reverse-cooking-reverse-sear-and-water-frying/) (gentle → hot, italic notes under each step).
- [ ] Card strips: the [recipes list](http://localhost:1313/recipes/) now has formula strips on eleven more cards, across its pages (and the methods list has one); check the strips read at 24px and the intros clamp evenly beside cards without one.
- [ ] Obsidian: open two of the recipes and check the block reads as plain text.

**New icons** (`mockups/formula-icons-2.html`, proposed 2026-10-17): lemon, vinegar, soy, honey, jar, pickle, mustard, lentils, oats, fruit, sugar, pepper, herb, strainer, oven. Once Bruce settles them, fugu-agent adds them to `assets/icons/formula/`, then these get diagrams:

- [ ] Acid: Classic French dressing (oil : lemon 1:1), Greek marinade (1:1), Lemon chicken marinade (1.6:1), Asian slaw dressing (2:1), Sandwich sour pickles (water : vinegar 1.2:1), and the Food ratios dressing and mayo tables.
- [ ] Soy: Chashu pork (water : soy : mirin 1:1:1), Ramen eggs (1:1:½:½:½), Sweet soy sauce, Teriyaki sauce, Garlic ginger wing sauce (soy : honey : hoisin).
- [ ] Jar, pickle, mustard: Bruce's burger sauce (1:1:1), Mozza burger sauce.
- [ ] Lentils: Dal tadka (1:4–5), Coconut lentils (1:3), Basic beans and lentils.
- [ ] Oats, fruit, sugar: Baked oatmeal, Fruit compote (10:1), Granola bars (needs a nut icon too).
- [ ] Pepper, herb: McDouble seasoning (salt : MSG : pepper 4:2:1), Cottage pie (1:1:1:1), Bruce's poultry and pork rub (salt : sugar).
- [ ] Oven, strainer: the Stock method sequence (roast → extract → lift out → reduce → strain); swap the clock for the oven in Reverse cooking.

Stacks (the exploded layer kit):

- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one. Drop "v1" from the layer kit in STYLE.md once Bruce calls it settled.

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
