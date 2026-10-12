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
   - Burgers: patty construction, patty seasoning, cooking, assembly, sauces; builds such as drive-in deluxe, fast-food double, and grilled onion
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

**The folder decides.** Methods live in `content/methods/`, their own top-level section (a nav item beside Recipes and Essays, since 2026-10-11; until then they sat in `content/essays/methods/`). A page in that folder, at any depth, is a method; a page outside it isn't, whatever its tags say. Fugu finds them through `methodSection = "methods"` in `config/_default/params.toml`. The section's page, `/methods/`, is the methods list: its `_index.md` holds the title, description, and the definition (the body), and cascades the `method` tag onto the pages under it (targeted at `/methods/**`, so the list page itself isn't tagged and doesn't show up on the tag page). A page's own `tags` replaces the cascaded value rather than adding to it, and nearly every method sets `tags`, so each lists `method` itself; the cascade is the backstop and `/lint` checks the rest. The `method` tag's own page (`/tags/method/`) is a plain tag list.

Method-like pages in `content/reference/` move into the folder, with `aliases:` for their old URLs:

- `reverse-cooking-reverse-sear-and-water-frying.md`
- `food-ratios-for-creating-your-own-recipes.md`

## Content first: folders, headings, and a little metadata

Methods follow the rest of the site (decided 2026-10-11): **content lives in the body, headings give it structure, and frontmatter holds only true metadata** (title, tags, date, description, draft, and the two blueprint fields below). Relationships are folders or wiki links, not frontmatter fields.

A folder is a forced tag with two extra effects:

| | Folder (Hugo section) | Tag |
|---|---|---|
| How many per page | Exactly one | Any number |
| Optional | No, every page has one | Yes |
| Sets the URL | Yes | No |
| Picks the template | Yes | No (term pages only) |

So whatever a page can only be one of (a method, a blueprint's part, a build) is a folder. Until 2026-10-11 blueprints were a taxonomy, because water frying belongs to burgers and to ground meat. In practice what's shared between blueprints is the techniques, and those are standalone methods that parts link to; the parts themselves belong to one blueprint. So a blueprint is a folder.

## Inside a blueprint: parts, options, and builds

```
content/methods/burgers/
  _index.md               the blueprint: /methods/burgers/
  parts/patties.md        a part: /methods/burgers/parts/patties/
  parts/seasoning.md ...
  builds/drive-in-deluxe.md   a build: /methods/burgers/builds/drive-in-deluxe/
  builds/big-boy.md ...
```

```
Blueprint (burgers)
 ├── Parts      patties, seasoning, cooking, assembly, sauces      (parts/)
 │    └── Options   thick / thin / paper thin           (a table in the part's page)
 └── Builds     grilled onion, Big Boy, drive-in deluxe, ...       (builds/)
      └── Recipes   White Spot burgers is a drive-in deluxe, with quantities
```

**The blueprint** is the folder's `_index.md`: its title, description, and definition (the body). It may end with `## Further reading`, wiki links to the stories and reference pages behind it. Its parts and builds are found from the folders, not listed.

**Parts** are the slots every dish of this type fills, one page each in `parts/`. A part's name is its title (`Burger patties`). They're ordered by `weight` (1, 2, 3...).

**Options** are the choices within one part: a burger patty is thick, thin, or paper thin. An option isn't a page. It's a row in its part's page, under `## Options`, saying when to pick it and what it changes elsewhere, because options have knock-on effects: a thick patty needs a reverse sear or the grill, a thin one goes on the griddle, a paper-thin one gets smashed on a very hot surface.

```markdown
## Options

| Option | Pick it when | Changes |
|---|---|---|
| Thick (170 g+) | You want a pink centre and a grill | Cooking: reverse sear or grill |
| Thin (115–140 g) | Most of the time | Cooking: griddle, flip once |
| Paper thin (smashed) | You want lacy, crisp edges | Cooking: smash on a very hot griddle |
```

**Builds** are named combinations: one pick per part that lands on a recognizable profile. The fast-food double is salty, sweet, and rich with little crunch; the drive-in deluxe is cold crunch and sharp against a salty patty. Each build is its own page in `builds/`, a method rather than a recipe, since it's a general pattern, not a dish with quantities. Its name is its title (`Drive-in deluxe burger`).

A build page's body, in order:

1. **An opening paragraph:** why these picks go together.
2. **`## Picks`:** the profile in one line, then one bullet per part in the parts' order, `- **Part:** pick`, then its ` ```stack ` diagram (see Diagrams), which is the clearest picture of a build.
3. **`## Where it comes from`:** the era, the place, and the kind of kitchen, then the constraints and the picks each one explains, as a two-column table (`Constraint`, `Pick it explains`).
4. **`## Why these picks`, `## How it fails`, `## Variations`.**
5. **`## Recipes`:** wiki links to the recipes that are this build.

```markdown
---
title: Drive-in deluxe burger
date: 2026-10-10
tags: [method, burgers]
era: 1960
description: "The drive-in deluxe burger: a thin, griddled patty under cold lettuce, tomato, two kinds of onion, and sour pickles."
---

Deluxe means lettuce and tomato. ...

## Picks

Cold crunch and sharp against a salty patty.

- **Patty construction:** One thin patty, 140 g, not mixed
- **Patty seasoning:** Salt and pepper after cooking
...
```

The only blueprint metadata:

| Field | On | Meaning |
|---|---|---|
| `weight` | part | Its place in the blueprint's part order |
| `era` | build | A year (`1960`) that places the build on the blueprint's lineage timeline. Builds with no `era` are left off it. |

**Recipes** carry no blueprint fields. A method lists its recipes in `## Recipes`: a part lists the recipes that show it (and the component recipes that make it, like a sauce or a bun), a build lists the recipes that are instances of it. Recipes keep the blueprint's plain tag (`burgers`).

**History.** A build is often a historical style, and its picks are the constraints of the kitchen it came from. A 1960s drive-in cooked fast on a flat-top with ingredients it could buy reliably, so its burger has a thin patty, bottled condiments, a soft bun, and shredded iceberg. That's what `## Where it comes from` teaches: knowing why a pick exists tells you which ones matter when you change something. Facts are sourced or attributed; dates and origin stories come from Bruce or a cited source, and where accounts disagree the page says so, as [[White Spot burgers]] does. A recipe that's a real, specific instance of a build (White Spot burgers, the McDouble) keeps its own specifics, like the Triple O name and its sauces; the build page has the general history of the style.

The blueprint page shows a **lineage timeline**: builds placed by `era`, so the page shows how the dish changed over time. A build nobody has written yet is a test kitchen stub: a build page with its title, `era`, `draft: true`, a `working_on` line, and the section headings, so the timeline has one source.

Why not nested blueprints ("burgers → deluxe")? Builds share nearly every part and differ only in their picks; a child blueprint would repeat all the parts. Clusters of builds (rich, fresh, sweet) are builds grouped by profile, not a separate level; add one only if a blueprint ever has more builds than its page can show.

The blueprint page shows the definition, the parts in order (each with its options), the lineage timeline, and the builds as cards (`mockups/methods-pages.html`). A table comparing builds part by part is set aside for now (PLAN.md, Methods phase 8): it would need the picks as data, parsed from each build's `## Picks` list.

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
| Method | Methods, and each blueprint | Folder |

Today principle and status are built separately (`principle/term.html` and `principle-chip.html`; `development/*`). They should share:

- the header with its kind suffix
- the definition callout and the "Read the full essay" link
- the icon, chip, and popover
- the "Reference & further reading" list

What stays per kind is how membership is decided and the body layout: a flat recipe grid for a principle, a draft list for status, parts and builds for a blueprint.

The method chip is the fan-out icon (`assets/icons/methods/fan-out.svg`) in the accent colour, decided 2026-10-10 (`mockups/STYLE.md` Method chip, `mockups/methods-icon.html`).

The shared templates are Fugu work (`themes/fugu`), handed to the Fugu agent. This repo supplies the `_index.md` files, icons, and config. The methods list is `/methods/` (`content/methods/_index.md`) and each blueprint is its folder's page (`/methods/burgers/`, `content/methods/burgers/_index.md`).

## Ontology

| Entity | Role |
|---|---|
| Recipe | One dish with fixed quantities |
| Story | An essay that gives the reason for a method |
| Method | A general pattern (technique, ratio, or part of a blueprint) |
| Blueprint | A dish type made of parts |
| Part | A slot every dish of the type fills; a page in the blueprint's `parts/` |
| Option | A choice within a part; a row in the part's method |
| Build | A named combination of picks with a profile; a page in the blueprint's `builds/` |
| Concept | A named idea with an icon and a list: principle, status, or method |
| Glossary term | A definition only |

| Relation | Carried by |
|---|---|
| Recipe **uses** method | Wiki link in the recipe; optional `method:` field (open) |
| Part **is part of** blueprint | Folder: `<blueprint>/parts/` |
| Build **belongs to** blueprint | Folder: `<blueprint>/builds/` |
| Build **picks** an option per part | `## Picks` in the build's body |
| Recipe **is an instance of** build | Wiki link in the build's `## Recipes` |
| Method **builds on** technique method | Wiki link |
| Story **motivates** method or blueprint | Wiki link (the blueprint's `## Further reading`) |
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
| Burgers | Blueprint, 7 builds (3 drafted, 4 stubs) | The quest for the perfect burger, The impossible quest for the perfect chicken burger, White Spot burgers, the burger sauce recipes |

## Open questions

- Should recipe frontmatter have a `method:` field, or are wiki links enough to connect a recipe to its methods?
- Should picks link to the option rows (an anchor per option), or stay plain text?
- Do methods use `formula` blocks for their ratios, the way recipes do? (Likely yes; nothing stops it.)
