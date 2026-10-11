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
3. **Blueprint method.** A type of food broken into its parts, each of which is its own small method, and the builds that combine them (see Inside a blueprint).
   - Burgers: patty construction, patty seasoning, cooking, assembly, sauces, things that are not burgers; builds such as drive-in deluxe, fast-food double, and grilled onion
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

**The folder decides.** Methods live in `content/essays/methods/`, next to `reference-essays/`. A page in that folder is a method; a page outside it isn't, whatever its tags say. `content/essays/_index.md` cascades the `method` tag onto `/essays/methods/**`. The folder has no `_index.md` of its own: one would make it a Hugo section, and its pages would drop out of the essays list (the same reason `reference-essays/` has none). A page's own `tags` replaces the cascaded value rather than adding to it, and nearly every essay sets `tags`, so each method lists `method` itself; the cascade is the backstop and `/lint` checks the rest.

Method-like pages in `content/reference/` move into the folder, with `aliases:` for their old URLs:

- `reverse-cooking-reverse-sear-and-water-frying.md`
- `food-ratios-for-creating-your-own-recipes.md`

## Folders, tags, and blueprints

A folder is a forced tag with two extra effects:

| | Folder (Hugo section) | Tag or taxonomy |
|---|---|---|
| How many per page | Exactly one | Any number |
| Optional | No, every page has one | Yes |
| Sets the URL | Yes | No |
| Picks the template | Yes | No (term pages only) |

Hugo's `cascade` makes the link literal: an `_index.md` can set a tag or taxonomy term on every page below it (tested on Hugo 0.166). So a folder can stand in for a tag, but a tag can't stand in for a folder, because a page can only be in one.

That's why **blueprints are a taxonomy, not folders**. (They were briefly called families; renamed 2026-10-10 because the existing `family` tag already means recipes that come from our family historically.) Water frying belongs to burgers and to ground meat; a folder would force it to pick one.

- **`blueprint`** is a taxonomy, set up like `cuisine`: `blueprint: [burgers]` in frontmatter, with `content/blueprint/burgers/_index.md` holding the blueprint's definition and the order of its parts.
- **`part`** is a frontmatter field on a method page naming which part of the blueprint it covers (e.g. `part: Patty construction`).
- Method pages, recipes, and stories all carry `blueprint`, so the blueprint page collects all three without any other wiring.
- Folders can still group a blueprint's method files on disk (`content/essays/methods/burgers/`), with `blueprint: [burgers]` set on each page (or cascaded by path from `content/essays/_index.md`, never from an `_index.md` in the folder, for the reason above). A page that belongs to a second blueprint lists both.

## Inside a blueprint: parts, options, and builds

A blueprint varies in two different ways, and they're modelled separately (decided 2026-10-10).

```
Blueprint (burgers)
 ├── Parts      patty construction, seasoning, cooking, assembly, sauces, not burgers
 │    └── Options   thick / thin / paper thin           (inside the part's method)
 └── Builds     drive-in deluxe, fast-food double, grilled onion   (one page each)
      └── Recipes   White Spot burgers = drive-in deluxe, with quantities
```

**Parts** are the slots every dish of this type fills. Each part is covered by one or more method pages (`part: Patty construction`). A blueprint's `_index.md` lists its parts in order (`parts:`).

**Options** are the choices within one part: a burger patty is thick, thin, or paper thin. An option isn't a page. It's a row in its part's method, under `## Options`, saying when to pick it and what it changes elsewhere, because options have knock-on effects: a thick patty needs a reverse sear or the grill, a thin one goes on the griddle, a paper-thin one gets smashed on a very hot surface.

```markdown
## Options

| Option | Pick it when | Changes |
|---|---|---|
| Thick (170 g+) | You want a pink centre and a grill | Cooking: reverse sear or grill |
| Thin (115–140 g) | Most of the time | Cooking: griddle, flip once |
| Paper thin (smashed) | You want lacy, crisp edges | Cooking: smash on a very hot griddle |
```

**Builds** are named combinations: one pick per part that lands on a recognizable profile. The fast-food double is salty, sweet, and rich with little crunch; the drive-in deluxe is cold crunch and sharp against a salty patty; the grilled onion burger is sweet and savoury with one soft, even texture. Builds can be very different and complex, so **each build is its own page**: a method page in `content/essays/methods/` (it's a general pattern, not a dish with quantities) with:

| Field | On | Meaning |
|---|---|---|
| `blueprint` | build, recipe | The blueprint it belongs to (`[burgers]`) |
| `build_name` | build page | The build's name (`Drive-in deluxe`). Unique within its blueprint. Not `build`: Hugo reserves that key for its own build options, and the site fails to build. |
| `build_name` | recipe | Which build the recipe is an instance of: the same name as the build page's `build_name` |
| `profile` | build page | Free text, one line: what it tastes and feels like (`Cold crunch and sharp against a salty patty`). Free text for now; a fixed vocabulary can come later if builds need comparing by it. |
| `picks` | build page | One pick per part, as a list of `"Part: pick"` strings in the blueprint's part order. A list, not a map, because the content tools read flat frontmatter (`frontmatter.py`). |
| `origin` | build page | Optional. Free text, short: where and when the build comes from (`Drive-in, 1960s`). Shown under the build's title on its card and page. |
| `era` | build page | Optional. A year (`1960`) that places the build on the blueprint's lineage timeline. Free-text `origin` can't be sorted, so the two travel together. |

```yaml
---
title: Drive-in deluxe burger
date: 2026-10-10
tags: [method, burgers]
blueprint: [burgers]
build_name: Drive-in deluxe
profile: Cold crunch and sharp against a salty patty
picks:
  - "Patty construction: thin, 140 g"
  - "Patty seasoning: after cooking"
  - "Cooking: griddle, flip once"
  - "Assembly: lettuce, tomato, raw and fried onion, pickle"
  - "Sauces: ketchup and mustard, kept separate"
---
```

And on a recipe that's an instance of it:

```yaml
blueprint: [burgers]
build_name: Drive-in deluxe
```

A build page reads like any method: the principle of the build first (why these picks go together), then why the picks go together, how it fails, its variations, and the recipes that are instances of it. Its stack diagram (see Diagrams) is the clearest picture of a build: each layer's role adds up to the profile.

Don't repeat the picks or the recipe list in a build page's body: the template draws a Picks list from `picks` (each part linking to its method) before the body, and "Recipes in this build" cards (recipes with the same `build_name`) after it.

**History.** A build is often a historical style, and its picks are the constraints of the kitchen it came from. A 1960s drive-in cooked fast on a flat-top with ingredients it could buy reliably, so its burger has a thin patty, bottled condiments, a soft bun, and shredded iceberg. That's why build pages carry their history (decided 2026-10-10):

- **`origin` and `era`** in front matter (above), for the card, the page header, and the timeline.
- **A `## Where it comes from` section** in the body: the era, the place, and the kind of kitchen, then the constraints and the picks each one explains, as a two-column table (`Constraint`, `Pick it explains`). This is the part that teaches: knowing why a pick exists tells you which ones matter when you change something.
- **Facts are sourced or attributed.** Dates and origin stories come from Bruce or a cited source; where accounts disagree, the page says so, as [[White Spot burgers]] does.

A recipe that's a real, specific instance of a build (White Spot burgers, the McDouble) keeps its own specifics, like the Triple O name and its sauces; the build page has the general history of the style.

The blueprint page shows a **lineage timeline**: builds placed by `era`, with names and origins, so the page shows how the dish changed over time. A blueprint's `_index.md` can list builds nobody has written yet as `planned: ["1985: Pub burger", "2010: Smash burger"]`; they show faint, like unwritten parts. Builds with no `era` are left off the timeline. The clusters noted below are mostly lineages: rich, fresh, and sweet builds tend to follow era and kitchen.

Why not nested blueprints ("burgers → deluxe")? Builds share nearly every part and differ only in their picks; a child blueprint would repeat all the parts. Clusters of builds (rich, fresh, sweet) are builds grouped by profile, not a separate level; add one only if a blueprint ever has more builds than its page can show.

The blueprint page shows a lineage timeline, then builds as cards (name, origin, profile, recipe count, compact diagram) and a table comparing their picks part by part (`mockups/methods-pages.html`).

The same shape fits other blueprints:

| Blueprint | Option example | Builds |
|---|---|---|
| Pizza | crust: thin / NY / pan | margherita, white, Detroit |
| Tacos | tortilla: corn / flour; protein: grilled / braised | al pastor, fish, carnitas |
| Lasagne | sauce: ragù / béchamel / both | Bolognese, veg, white |
| Sandwiches | bread: soft / crusty / toasted | club, BLT, deli |

## Concept pages

A **concept page** is a named idea with a short definition, an icon, a chip on cards, a full essay, and a list of what belongs to it. There are three kinds:

| Kind | Example | Membership |
|---|---|---|
| Principle | Win the fridge | Tag |
| Status | Test kitchen | `draft: true` |
| Method | Methods, and each blueprint | Folder (methods), taxonomy (blueprints) |

Today principle and status are built separately (`principle/term.html` and `principle-chip.html`; `development/*`). They should share:

- the header with its kind suffix
- the definition callout and the "Read the full essay" link
- the icon, chip, and popover
- the "Reference & further reading" list

What stays per kind is how membership is decided and the body layout: a flat recipe grid for a principle, a draft list for status, parts and builds for a blueprint.

The method chip is the fan-out icon (`assets/icons/methods/fan-out.svg`) in the accent colour, decided 2026-10-10 (`mockups/STYLE.md` Method chip, `mockups/methods-icon.html`).

The shared templates are Fugu work (`themes/fugu`), handed to the Fugu agent. This repo supplies the `_index.md` files, icons, and config. Until then the methods list is the `method` tag page (`/tags/method/`, described by `content/tags/method/_index.md`) and each blueprint is a plain term page (`/blueprint/burgers/`); the blueprint's definition and part order are written but not shown yet.

## Ontology

| Entity | Role |
|---|---|
| Recipe | One dish with fixed quantities |
| Story | An essay that gives the reason for a method |
| Method | A general pattern (technique, ratio, or part of a blueprint) |
| Blueprint | A dish type made of parts |
| Part | A slot every dish of the type fills; covered by method pages |
| Option | A choice within a part; a row in the part's method |
| Build | A named combination of picks with a profile; its own page |
| Concept | A named idea with an icon and a list: principle, status, or method |
| Glossary term | A definition only |

| Relation | Carried by |
|---|---|
| Recipe **uses** method | Wiki link in the recipe; optional `method:` field (open) |
| Method **is part of** blueprint | `blueprint` taxonomy + `part` |
| Build **belongs to** blueprint | `blueprint` taxonomy + `build_name` on the build page |
| Build **picks** an option per part | `picks` on the build page |
| Recipe **is an instance of** build | `build_name` on the recipe, matching the build page's `build_name` |
| Method **builds on** technique method | Wiki link |
| Story **motivates** method or blueprint | `blueprint` taxonomy on the story; wiki link |
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
caption: Drive-in deluxe build, top to bottom
```

- One layer per line: `icon | label | role`. Roles use the vocabulary the chicken burger essay established (cold crunch, sharp, fat, salt), so the diagram says why each layer is there.
- `repeat:` covers repeated layers (lasagne).
- It reuses the formula icon set (`assets/icons/formula/`), with the same unknown-icon warning and the same Obsidian fallback (plain text).
- Layering needs new icons: bun halves, lettuce, onion, tomato, pickle, cheese slice, sauce, patty, pasta sheet, ragù, béchamel, bread slice, and so on.
- A later `pairing` block (a texture-by-flavour grid) could cover flavour combinations. `stack` comes first.
- The look gets mocked and settled in `mockups/STYLE.md` and `style.html` before it's built. Proposed 2026-10-10 (`mockups/exploded-builds.html`): an **exploded view**, each layer drawn as the thing from a three-quarter angle, pulled apart vertically, with leader lines to its label and role on the right (decided); compact without labels on build cards; no assembled view for now. Drawn in the formula icons' style (one ink line, `--accent-soft` on bodies and sides, `--surface` on tops, detail as strokes), so it follows dark mode like the icons. Layers come from their own kit in Fugu (`themes/fugu/assets/icons/layers/`, beside `formula/`), drawn by the ` ```stack ` render hook (handed to the Fugu agent 2026-10-10). Accepted as v1 (STYLE.md "Exploded build diagram"); the drawings get a refinement pass from reference examples later (PLAN.md, Methods phase 6).

Shapes to cover first: sandwich construction, burger construction, lasagne layering. On a blueprint, each build gets its own stack.

## Candidates already on the site

| Method | Kind | Source |
|---|---|---|
| Reverse cooking | Technique | `content/reference/reverse-cooking-reverse-sear-and-water-frying.md`, already a method; moves |
| Food ratios | Ratio | `content/reference/food-ratios-for-creating-your-own-recipes.md` (draft), already a method; moves |
| Stock | Technique + ratio | Why ingredients matter in stock, plus the four stock recipes |
| Foil packets | Technique | Camp cooking |
| Burgers | Blueprint, 3 builds to start | The quest for the perfect burger, The impossible quest for the perfect chicken burger, White Spot burgers, the burger sauce recipes |

## Open questions

- Should recipe frontmatter have a `method:` field, or are wiki links enough to connect a recipe to its methods?
- Should `picks` values link to the option rows (an anchor per option), or stay plain text?
- Do methods use `formula` blocks for their ratios, the way recipes do? (Likely yes; nothing stops it.)
