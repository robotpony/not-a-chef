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
