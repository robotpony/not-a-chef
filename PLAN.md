# Plan

The phased build plan was squashed after release (2026-09-25, `e6346f4`); its history is in git. This file now tracks future work only. Each item says what it is, why, and roughly how, so it can be picked up cold.

## Future

### Formula strip on recipe cards

Show a recipe's formula diagram as a 24px strip on its card, so a recipe's shape is visible while browsing (homepage "Recently added", `/recipes/`, tag and cuisine pages). Mocked up in `mockups/formula-diagrams.html` §5; not built.

- Cards don't render the recipe body, so `layouts/partials/recipe-card.html` has to find the ```` ```formula ```` block in `.RawContent` itself and pull each line's operator and icon keys (plus the numbers, for a `:` ratio). Labels, quantities, swaps and the `=` result never show on the card.
- Draw it with a small partial (e.g. `partials/formula-strip.html`) from the same `assets/icons/formula/` files the recipe page uses, after the intro (`rcard-intro`).
- On cards with a strip, clamp the intro to 2 lines instead of 3, so every card stays the same height. CSS for `.rcard-formula` is in the mockup.
- Automatic from then on: any recipe with a `formula` block gets the strip; recipes without one are unchanged. `has_formula` in `public/recipes/index.json` already says which recipes have one.

### Formula diagram follow-ups

- [ ] `/lint` (`.claude/commands/lint.md`) checks formula blocks: unknown icon keys, mixed operators, more than five slots. The build already warns on all three (`render-codeblock-formula.html`), so this is about catching them before a build.
- [ ] Diagram more Mechanics. 97 recipes have a `## Mechanic`; the ones that state a ratio are candidates. Only draw a ratio the text already states (`FORMAT.md` §Formula diagrams).
- [ ] Grow the icon kit as recipes need it. A new key is one SVG in `assets/icons/formula/` drawn on the kit's rules (`mockups/STYLE.md` "Formula diagram"), plus a tile in the mockup's §6 kit gallery so the gallery stays the reference.
- [ ] Ratio (`:`) and sequence (`→`) diagrams are built but unused on a real page; check them against real content the first time one is written.

### Formula diagram: retest and open decisions

Built and checked 2026-10-06 in Chrome, dark mode, desktop width only. Still to do:

- [ ] Retest veg patties in light mode. The mockup was checked in both themes; the live page only in dark.
- [ ] Retest on a phone-width viewport: the diagram is now in the intro (full size, body column) and should wrap with each operator staying attached to its slot.
- [ ] Retest a formula inside Mechanic (compact, sidebar) on the live site, since veg patties no longer has one there.
- [ ] Decide about the duplicate swaps on veg patties: the Mechanic bullets list the swaps for each slot, and the diagram's swap lines repeat them. Either trim the bullets to quantities and notes, or drop the fourth field from the block.

### Carried over from the old plan

Unfinished items from the squashed Phases 7–9 (`git show e6346f4^:PLAN.md`). Items the code shows are done were dropped: the `.rcard` listings, heading-free card summaries, wiki-link styling and resolution, table scrolling, scaling and unit conversion, deploy, draft tooling (`drafts.py`, `frontmatter.py set`), and clean meta descriptions (`page-description.html`). Some of what's left may be partly done; check before starting.

**Site polish**
- [ ] Tags on recipe headers and related cards: neutral outline per `mockups/STYLE.md` ("Tag — never colored"). They still render with an accent border (seen on veg patties, 2026-10-06).
- [ ] Tag cleanup: drop tags that repeat the cuisine; merge near-duplicates (Bread/Breads, Dressing/Dressings).
- [ ] Check that tag and cuisine term pages work as filters, not just link lists.
- [ ] Check Fuse.js search relevance against real titles, tags, and ingredient text.
- [ ] Sort or filter controls on `/recipes/` (cuisine, prep time, tag).
- [ ] Phone-while-cooking check: large touch targets, no accidental nav taps.
- [ ] Table of contents behaviour on long reference pages.
- [ ] Check the homepage against real content, and the footer's Tags/Cuisines links end to end.
- [ ] Cross-link essays and reference pages to related recipes where it makes sense.
- [ ] Check that Hugo's related content (`partials/related.html`, keyed on tags and cuisine) gives reasonable suggestions before considering a manual `related:` field.

**Recipe format and validator** (`SPEC.md`)
- [ ] Prototype ingredient-name canonicalization (`"450g butternut squash, peeled and diced"` → `butternut squash`) against a real slice of recipes. `SPEC.md` §6 calls it the fragile part; de-risk it before designing the data files further.
- [ ] Validator (`tools/validate_recipe.py` or a `/lint` extension) for `SPEC.md` §8: frontmatter types, ingredient-line parse rate, `## Substitutions` grammar, `####` group placement, formula blocks.
- [ ] Run it against all published recipes as a baseline; file each discrepancy as a spec bug or a content bug.
- [ ] Wire it into `/lint` so structural and frontmatter checks run as one command.

**Build-time enrichment**
- [ ] Parsed ingredients per recipe in `public/recipes/index.json` (or a sibling file), the shared input for the ingredient features below.
- [ ] `data/ingredient_prices.yaml` joined into a rough per-recipe cost (approximate by design, `SPEC.md` §6).
- [ ] `data/departments.yaml`: grocery department order and ingredient → department mapping, for the shopping list and pantry tool.
- [ ] schema.org `Recipe` JSON-LD partial, from frontmatter and `## Equipment`.

**Cooking-time features** (client JS, alongside `ingredients.js`; the old plan's `warped-food.js` was never started)
- [ ] Optional-ingredient toggle, using the `(optional)` marker (`SPEC.md` §3).
- [ ] Print view: ingredients and method only, tuned for the browser print dialog.
- [ ] Cook mode: larger text, keep-awake via the Wake Lock API where available.
- [ ] Substitutions: an interactive swap control on top of the static `## Substitutions` section.
- [ ] Shopping list across selected recipes, in department order.
- [ ] Win-the-fridge / pantry tool: on-hand ingredients → matching recipes.
- [ ] Method check-off: tap a method sentence to strike it, kept in `localStorage` per recipe. Ingredient check-off already exists; check whether it persists.

**Deferred, on purpose** (`SPEC.md` §10): saved recipes, personal notes, ratings, and reader-side change tracking need a backend; nutrition data has no model yet.

### Docs

- [ ] `FORMAT-ESSAYS.md` says essays are outlined in a vault at `writing/essays/` and migrated by hand. Confirm whether that's still true now that this repo is the vault, and update it.
