# Methods

Draft spec. Defines what a method is, how it differs from a recipe or an essay, what one should contain, and how methods fit into the site. The build work is tracked in `PLAN.md` §Methods.

## What a method is

A method explains how a kind of food or a cooking process works in general, so you can make many dishes from it. A recipe is one specific dish. A method is the pattern behind several of them.

The test: after reading it, could you cook something that isn't written down anywhere on the site?

## Kinds of method

1. **Technique method.** One process that works across many dishes.
   - Reverse cooking (reverse sear, water frying)
   - Stock: what extracts well, and the remove-solids, reduce, strain sequence
   - Foil packets: getting things that cook at different speeds to finish together and share flavour, while keeping it simple
2. **Ratio method.** A proportion you can scale or adjust, with its acceptable range.
   - Food ratios: dressings, mayo, brines
3. **Dish family method.** A type of food broken into its parts, each of which is its own small method.
   - Burgers: patty construction, patty seasoning, cooking methods, assembly, sauces, major variations, things that are not burgers
   - Each part can link to a technique method (e.g. patty cooking → reverse sear or water frying)

## What a method contains

- **The principle first.** One paragraph on how it works, like the opening of the reverse cooking page ("the gentle phase controls doneness; the hot phase is only for crust").
- **The variables.** Ratios, temperatures, order of steps, timing, with ranges rather than single values where the range matters.
- **Steps or stages.** Kept general, not tied to one dish's quantities.
- **Why each step is there.** For example, burgers are seasoned after cooking because salting raw meat early changes its texture.
- **How it fails.** Ingredients to avoid in stock, or what happens when a chicken burger has no cold crunch.
- **Decision points and variations.** Pick the patty by how much time you have, pick the build by mood.
- **Prep-ahead and keeping it simple,** when relevant.
- **Recipes that use it.** Links to the specific dishes.
- **Diagrams,** when layering or a ratio is the point (see Diagrams).

## What isn't a method

- **A story essay.** It gives the reason for a method (the two burger essays, Camp cooking). It should link to the method, but it doesn't replace it.
- **A recipe.** It's a single dish with fixed quantities.
- **A glossary entry.** It defines a term but doesn't teach you to do anything.
- **An ingredient-choice essay with only a little process in it.** Why ingredients matter in stock is close, but it would need the process and ratios pulled forward to become one.

## Where methods live

**The folder decides.** Methods live in `content/essays/methods/`, next to `reference-essays/`. A page in that folder is a method; a page outside it isn't, whatever its tags say. The folder's `_index.md` cascades the `method` tag to everything in it, so the tag can't drift from the folder. `/lint` flags a page in the folder that overrides `tags` without `method` (a page's own `tags` replaces the cascaded value rather than adding to it).

Method-like pages in `content/reference/` move into the folder, with `aliases:` for their old URLs:

- `reverse-cooking-reverse-sear-and-water-frying.md`
- `food-ratios-for-creating-your-own-recipes.md`

## Folders, tags, and families

A folder is a forced tag with two extra effects:

| | Folder (Hugo section) | Tag or taxonomy |
|---|---|---|
| How many per page | Exactly one | Any number |
| Optional | No, every page has one | Yes |
| Sets the URL | Yes | No |
| Picks the template | Yes | No (term pages only) |

Hugo's `cascade` makes the link literal: a folder's `_index.md` can set a tag or taxonomy term on every page below it (tested on Hugo 0.166). So a folder can stand in for a tag, but a tag can't stand in for a folder, because a page can only be in one.

That's why **families are a taxonomy, not folders**. Water frying belongs to burgers and to ground meat; a folder would force it to pick one.

- **`family`** is a taxonomy, set up like `cuisine`: `family: [burgers]` in frontmatter, with `content/family/burgers/_index.md` holding the family's definition and the order of its parts.
- **`part`** is a frontmatter field on a method page naming which part of the family it covers (e.g. `part: Patty construction`).
- Method pages, recipes, and stories all carry `family`, so the family page collects all three without any other wiring.
- Folders can still group a family's method files on disk (`content/essays/methods/burgers/`), and that folder's `_index.md` can cascade `family: [burgers]`. A page in it that belongs to a second family lists both.

## Concept pages

A **concept page** is a named idea with a short definition, an icon, a chip on cards, a full essay, and a list of what belongs to it. There are three kinds:

| Kind | Example | Membership |
|---|---|---|
| Principle | Win the fridge | Tag |
| Status | Test kitchen | `draft: true` |
| Method | Methods, and each family | Folder (methods), taxonomy (families) |

Today principle and status are built separately (`principle/term.html` and `principle-chip.html`; `development/*`). They should share:

- the header with its kind suffix
- the definition callout and the "Read the full essay" link
- the icon, chip, and popover
- the "Reference & further reading" list

What stays per kind is how membership is decided and the body layout: a flat recipe grid for a principle, a draft list for status, parts in order for a family.

The method chip is the fan-out icon (`assets/icons/methods/fan-out.svg`) in the accent colour, decided 2026-10-10 (`mockups/STYLE.md` Method chip, `mockups/methods-icon.html`).

The shared templates are Fugu work (`themes/fugu`), handed to the Fugu agent. This repo supplies the `_index.md` files, icons, and config.

## Ontology

| Entity | Role |
|---|---|
| Recipe | One dish with fixed quantities |
| Story | An essay that gives the reason for a method |
| Method | A general pattern (technique, ratio, or part of a family) |
| Family | A dish type made of parts |
| Concept | A named idea with an icon and a list: principle, status, or method |
| Glossary term | A definition only |

| Relation | Carried by |
|---|---|
| Recipe **uses** method | Wiki link in the recipe; optional `method:` field (open) |
| Method **is part of** family | `family` taxonomy + `part` |
| Method **builds on** technique method | Wiki link |
| Story **motivates** method or family | `family` taxonomy on the story; wiki link |
| Principle **applies to** recipe | Principle tag |
| Test kitchen **marks** any page | `draft: true` |

Documented in full in `docs/ARCHITECTURE.md` ("Content model", with a diagram), and briefly for readers in `README.md`.

## Diagrams

`formula` draws one horizontal row joined by operators: right for ratios, wrong for layers. Methods add a sibling block, ` ```stack `, drawn top to bottom:

```stack
bun-top   | Toasted bun      | soft, toasted
lettuce   | Shredded lettuce | cold crunch
onion     | Raw onion        | sharp
patty     | Thin patty       | salt, fat, savoury
bun-base  | Toasted bun      | barrier
caption: Deluxe build, top to bottom
```

- One layer per line: `icon | label | role`. Roles use the vocabulary the chicken burger essay established (cold crunch, sharp, fat, salt), so the diagram says why each layer is there.
- `repeat:` covers repeated layers (lasagne).
- It reuses the formula icon set (`assets/icons/formula/`), with the same unknown-icon warning and the same Obsidian fallback (plain text).
- Layering needs new icons: bun halves, lettuce, onion, tomato, pickle, cheese slice, sauce, patty, pasta sheet, ragù, béchamel, bread slice, and so on.
- A later `pairing` block (a texture-by-flavour grid) could cover flavour combinations. `stack` comes first.
- The look gets mocked and settled in `mockups/STYLE.md` and `style.html` before it's built.

Shapes to cover first: sandwich construction, burger construction, lasagne layering.

## Candidates already on the site

| Method | Kind | Source |
|---|---|---|
| Reverse cooking | Technique | `content/reference/reverse-cooking-reverse-sear-and-water-frying.md`, already a method; moves |
| Food ratios | Ratio | `content/reference/food-ratios-for-creating-your-own-recipes.md` (draft), already a method; moves |
| Stock | Technique + ratio | Why ingredients matter in stock, plus the four stock recipes |
| Foil packets | Technique | Camp cooking |
| Burgers | Dish family | The quest for the perfect burger, The impossible quest for the perfect chicken burger, White Spot burgers, the burger sauce recipes |

## Open questions

- Should recipe frontmatter have a `method:` field, or are wiki links enough to connect a recipe to its methods?
- Do methods use `formula` blocks for their ratios, the way recipes do? (Likely yes; nothing stops it.)
