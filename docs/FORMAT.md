# Content format

Every page on the site is standard Markdown with YAML frontmatter, in a `.md` file under `content/`. Pages should read naturally as plain text, render in Obsidian and Hugo, and be parseable by tools.

This is the one format doc for all content: what every page shares, then what recipes and essays add, then what a validator checks. Requirement language (MUST / SHOULD / MAY) follows RFC 2119 and is used only where a tool or template depends on the rule; everything else is house style.

Format version **0.2.0** (0.2.0 added the formula block). Bump minor for an additive change (a new optional field or section; existing pages stay valid), major only when a previously valid page could fail validation.

## All pages

Recipes (`content/recipes/`), essays (`content/essays/`), reference pages (`content/reference/`), Food Log months (`content/the-food-log/`), and About.

### Shared frontmatter

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | MUST | string | Sentence case (see Typography). A recipe title MUST be unique in the collection: wiki links resolve by it. |
| `date` | MUST | string | ISO 8601 (YYYY-MM-DD), the day the page was added. Food Log months use the first of the month; season files use the month the log sorts them by. |
| `tags` | MUST on recipes, MAY elsewhere | string[] | Plain strings, no `#` prefix. |
| `description` | MAY | string | 1–2 sentences for SEO and listing cards. Mostly essays and reference pages; recipe cards use the opening text. |
| `draft` | MAY | boolean | `true` publishes the page in the **Test kitchen**: live, with a banner under the title and a mark on its card saying it's still changing. Remove it when the page is a keeper. See DESIGN.md "Test kitchen (drafts)" and `content/essays/reference-essays/test-kitchen.md`. |
| `working_on` | MAY | string | For drafts: one line on what's being tried next ("Getting them to hold without the egg"), shown under the banner and in the card's popover. |
| `pinned` | MAY | boolean | Floats the page to the top of its section's list, its term pages, and search. Rare by design, not a general sort override. See DESIGN.md. |
| `source` | MAY | string | `original`, `family`, a URL, or a book title. SHOULD on recipes. |
| `blueprint` | MAY | string[] | Blueprints (dish types made of parts) the page belongs to (`[burgers]`), a taxonomy like `cuisine`: the blueprint's page at `/blueprint/<slug>/` collects its methods, recipes, and stories. Its own `content/blueprint/<slug>/_index.md` holds its definition and the order of its parts. See docs/METHODS.md. |
| `part` | MAY | string | On a method page in a blueprint: which part it covers (`Patty construction`), one of the blueprint's `parts`. |
| `build_name` | MAY | string | On a build page (a method in a blueprint): the build's name (`Deluxe griddle`), unique within the blueprint. On a recipe: the build it's an instance of, the same name. |
| `profile` | MAY | string | On a build page: one line of free text on what it tastes and feels like (`Cold crunch and sharp against a salty patty`). |
| `picks` | MAY | string[] | On a build page: one `"Part: pick"` string per part, in the blueprint's part order (`"Patty construction: thin, 140 g"`). |

Don't hand-maintain `lastmod`. Last-modified comes from git (`enableGitInfo`): both sidebars show **Date**, plus **Updated** from the file's last commit when that falls on a different day.

Approximate values MUST use a leading `~`, not "about", "approx." or "roughly": `portions: ~500 ml`, `cook_time: ~2 hr`. Keep the space between number and unit. A range (`4–6`, `20–30 min`) needs no `~`.

The schema is open. Unknown fields MUST be preserved and MUST NOT fail validation; tools ignore them. Don't add `difficulty`, `diet`, or `license` without a reason.

### File naming

Kebab-case, one page per file, matching the title: `dal-tadka.md` for "Dal tadka". Replace special characters with a plain equivalent or drop them. No date prefix: `date` is the record.

ALL-CAPS files under `content/` (`IDEAS.md`, `TODO.md`) are working notes. Hugo ignores them (`ignoreFiles` in `config/_default/hugo.toml`), so they never publish.

### Cross-references

Use wiki links to point at other pages, as an ingredient or as related reading:

```markdown
- 1 cup [[Pizzeria pizza sauce]]
- 1 batch [[Basic pie crust]], blind-baked
```

Wiki links resolve by matching `title`. They work natively in Obsidian; in Hugo a render hook resolves them (`themes/fugu/layouts/_default/_markup/render-link.html`), and a `[[Term]]` with no page of its own links to its glossary entry.

### Photos

Put photos in `static/images/<section>/` (`recipes`, `essays`, `food-log`) and embed them with standard Markdown where they belong in the text (`/image-add` does both):

```markdown
![Lazy tomato soup](/images/recipes/lazy-tomato-soup.jpg)
```

The alt text doubles as the caption, so describe what's in the photo. On the site, photos move out of the text into the sidebar as thumbnails that open a viewer, with a small "Photo N" marker left in their place. In Obsidian, and in print, they stay inline.

### Language

Canadian English. British spellings (colour, favour, behaviour, flavour, grey) with American -ize endings (realize, organize, optimize), and Canadian centre and litre. Preferred spellings: chili (plural chilies; "chile" only in proper names), yogurt, Sichuan, aluminum, green onion. Metric units with optional imperial in parentheses: "180°C (350°F)", "250 ml (1 cup)".

### Typography

Titles and headings use sentence case: capitalize the first word and proper nouns only (places, people, nationalities, brands). "Red Thai curry", "Chef John’s hamburger buns", "Instant Pot chicken thigh curry"; not "Red Thai Curry". Dish names borrowed from other languages are not proper nouns: "Dal tadka", "Salsa verde", "Pad kra pao moo saap".

Avoid em-dashes.

## Recipes

Instructional voice, not storytelling; the full style guide is the `recipe-writing` skill (`~/.claude/skills/recipe-writing/SKILL.md`).

### Recipe frontmatter

Required: `title`, `tags`, `date`. Everything else is optional but encouraged.

```yaml
---
title: Dal tadka
tags: [soups, indian, weeknight, vegetarian]
source: original
date: 2026-05-02
servings: 4
prep_time: 10 min
cook_time: 25 min
total_time: 35 min
cuisine: Indian
draft: true                          # in the Test kitchen; remove when it's a keeper
working_on: Less cumin, more tadka   # optional, shown under the banner
---
```

On top of the shared fields:

| Field | Required | Type | Notes |
|---|---|---|---|
| `servings` | SHOULD | string or number | People it feeds: "4", "4–6", "12+ (people)". Feeds `recipeYield` in schema.org output. |
| `portions` | MAY | string | What the batch makes, when that isn't people: "2 pans", "1 loaf", "~500 ml". |
| `prep_time` | MAY | string | Parenthetical notes are fine: "20 min (plus 24–48 hr cold ferment)". |
| `cook_time` | MAY | string | Active cooking time. |
| `total_time` | MAY | string | Total elapsed time, if different from prep + cook. |
| `cuisine` | MAY | string | Region or cuisine ("Indian", "Italian"). |
| `author` | MAY | string | Only when different from the collection author. |
| `aka` | MAY | string | Alternative names, comma-separated. |
| `cost_note` | MAY | string | Free-text note on cost ("expensive because of saffron"). Not a number; a computed estimate would be build-time data. |

There's no `related` field. Related recipes are computed at build time from `tags` and `cuisine` (Hugo related content); add a manual override only if those suggestions prove weak.

### Mechanic

Optional. One paragraph explaining the ratio, technique, or principle that drives the dish. Use **bold** for the key ratio or technique.

Use it when:
- A ratio determines the outcome (lentils to water, hydration percentage)
- A technique is non-obvious and changes the result (boil-over vs. steep-and-strain, autolyse)
- A key substitution has real consequences

Skip it when the recipe is just "combine and cook."

```markdown
## Mechanic

The **vital wheat gluten** supplements bread flour to push gluten content higher,
producing a chewier crumb and stronger structure. Low yeast (0.1%) and a long cold
ferment develop flavour.
```

### Simple recipes

For single-component recipes, use `## Ingredients` and `## Method`.

```markdown
## Ingredients

- 500–750ml water
- 3–4 whole cloves
- 3–4 cardamom pods, lightly crushed
- 2 tsp loose-leaf black tea
- 2 tsp sugar
- 120ml whole milk or 60ml cream

## Method

Combine water, cloves, and cardamom. Bring to a boil. Simmer 2–3 minutes.

Add tea and simmer 5 minutes. Add milk. Bring to a boil. The moment it foams and
rises, remove from heat and stir back down. Repeat three times.

Strain and serve.
```

Method is prose, not an ordered list. One action per sentence, imperative and present tense: "Add the lentils", not "You should add the lentils". No passive voice. Sensory cues first, time second: "until golden, about 3 minutes", not "cook 3 minutes".

Ingredients can have tab-indented sub-items for notes:

```markdown
- 1 cup red lentils (masoor dal), rinsed until water runs clear
    - add split peas for more texture (+10 min cook time)
```

### Multi-component recipes

When a recipe has distinct components (dal + tadka, dough + filling), give each component its own `## Heading` containing both its ingredients and its method prose. No `###` subheadings needed.

```markdown
## Dal

- 1 cup red lentils, rinsed
- 5 cups water
- 2 tomatoes, chopped
- 1½ tsp turmeric

Combine everything in a pot. Bring to a rolling boil, then simmer 20 minutes.
Stir and lightly mash.

## Tadka

- 2 tbsp ghee
- 1 small red onion, sliced
- 4–5 garlic cloves, sliced thin
- 1 tsp cumin seeds

Melt ghee over medium-high. Add cumin seeds. When they sizzle, add onion and garlic.
Fry until golden, about 3–4 minutes. Pour over the dal.
```

### Ingredient groups

To group ingredients within one list (dry vs. wet, in a recipe that doesn't otherwise split into components), put a `####` label directly above each run of list items:

```markdown
## Ingredients

#### Dry
- 300g flour
- 10g baking powder

#### Wet
- 2 eggs
- 240ml buttermilk
```

`####` is reserved for this. It's a label, not a component: it MUST appear only inside an ingredients block, MUST be followed directly by list items, and carries no method of its own.

### Ingredient lines

```
[quantity] [unit] ingredient name [, preparation note] [(optional)]
```

- **Quantity**: whole numbers, fractions (`1/2`, `½`), mixed numbers (`1 1/2`), decimals (`.5`), ranges (`2–3`), or descriptive (`a pinch of`).
- **Unit**: standard cooking units, full or abbreviated. Metric preferred, imperial in parentheses where helpful. A noise "of" between unit and name is fine: "½ teaspoon of salt".
- **Ingredient name**: free text up to the first comma or the optional marker.
- **Preparation note**: free text after a comma: "3 apples, peeled and sliced".
- **Optional marker**: a line MAY end with the literal `(optional)` (any case), after any preparation note: "1 jalapeño, halved (optional)". A parser MUST read a trailing `(optional)` as the marker, not as part of the note.

This is the one grammar every ingredient feature parses: scaling, unit conversion, quantity styling, and anything later (shopping lists, pantry matching, substitutions). There MUST NOT be a second, slightly different grammar growing in the JS. When a validator exists, it SHOULD emit its parsed output as a JSON fixture the JS tests assert against, so the two parsers can't drift apart.

### Optional sections

**To serve**: one line or a few words. What it goes with.

```markdown
## To serve

Warm basmati rice, plain raita, lime pickle.
```

**Variations**: only for meaningfully different methods or outcomes. Prose, one `###` per variation. Include the source link when adapted.

```markdown
## Variations

### Coconut cream dal
Use yellow split peas instead of masoor ...
```

**Notes**: tips, storage, test results. Bullet list.

```markdown
## Notes

- Masoor (red lentils) needs no soaking. Toor dal benefits from 30 minutes.
- Leftovers thicken considerably. Loosen with water when reheating.
```

**Equipment**: a flat bullet list (no nesting) of anything beyond standard kitchen kit. `## Special equipment` and the legacy `## Hardware` are the same section. On the site it moves into the recipe sidebar, above Notes.

```markdown
## Equipment

- 6-quart Dutch oven
- Instant-read thermometer
```

**Substitutions**: one swap per line, `- <ingredient> → <alternative(s)>[, <note>]`. The arrow (`→`, U+2192) is a required delimiter; it's what lets a swap be handled by code instead of buried in prose. The left side should match a line in the ingredients, though that's a best-effort text match.

```markdown
## Substitutions

- Butternut squash → sweet potato or pumpkin, same prep
- Fish sauce → soy sauce, for a vegetarian version
```

**Tables**: for timing or ratio reference when there are several variables.

```markdown
## Timing

| Bird | Low phase | High phase |
|---|---|---|
| Large turkey (5–7 kg) | 50 min | 45 min |
| 2 whole chickens | 30 min | 20 min |
```

### Formula diagrams

A ratio stated in the text can also be drawn: a `formula` fenced block, one slot per line, `icon | label | quantity | swaps`, with the operator at the start of every line after the first.

````markdown
```formula
can          | Beans   | 1 can         | black, pinto, chickpea
+ bowl       | Starch  | 1 cup         | rice, mash, quinoa
+ crumbs egg | Binder  | ½ cup + 1 egg | or gluten + oats
= patty      | Patties | 6
```
````

- One operator per block: `+` (parts that go together), `:` (a ratio; the quantity is the ratio number), or `→` (the shape of a method; a quantity that isn't a number prints as an italic note). `->` is accepted for `→`. An optional last `=` line names the result.
- Icons are keys from `assets/icons/formula/`, one or two per slot. An unknown key renders a placeholder and warns. Labels are one short word. Swaps are optional, up to three, comma-separated. Keep it to five slots.
- Optional trailing lines: `caption: <text>`, and `bar: yes` for a ratio's proportion bar.
- The diagram illustrates the sentence; it MUST NOT replace it. Only draw a ratio the text already states.

It renders at build time (`render-codeblock-formula.html`) as a row of icons, compact in the recipe sidebar where Mechanic sits. In Obsidian it reads as plain text.

## Essays

Essays live in `content/essays/<type>/` and are finished prose, not outlines or notes. Draft them in place, with `draft: true` while they're still changing. The types (one folder each) and the voice are described in CLAUDE.md "Food essay types"; for shared language rules see the `blog-writing` skill.

Frontmatter is the shared set. `title` and `date` are required; `tags` and `description` are encouraged. Essays don't use the recipe fields (`servings`, `cuisine`, times).

```yaml
---
title: Win the fridge
date: 2026-09-27
tags: [win-the-fridge]
description: "Win the fridge is the practice of using every scrap of food before it goes to waste."
---
```

No required sections. A typical shape, varying by type:

1. Opening: a specific observation, scenario, or image that grounds the piece
2. Body: the argument, narrative, or exploration; one idea per section
3. Close: a landing point; actionable, reflective, or a restatement of the opening with new weight

Use `##` headings only when sections are long enough that a reader needs navigation. Short pieces (under 1000 words) rarely need them.

A reference essay (`content/essays/reference-essays/`) defines one concept and is tagged with that term, so the term's tag page can link to it. A term that doesn't need a whole essay gets a glossary entry in `content/reference/glossary.md` instead.

A part's method lists its choices under `## Options`, as a table with `Option`, `Pick it when`, and `Changes` columns; options aren't pages. A build is a method page with `build_name`, `profile`, and `picks` (docs/METHODS.md, Inside a blueprint). Its body doesn't repeat the picks or list its recipes; the template renders both from front matter.

A method (`content/essays/methods/`) explains how a kind of food or a cooking process works in general: the principle first, then the variables, the stages, why each one is there, how it fails, and the recipes that use it. The folder decides what's a method. Each page MUST carry the `method` tag: the essays `_index.md` cascades it to a method page with no `tags`, but a page that sets its own `tags` replaces the cascade, so list `method` there. What counts as a method, and how methods relate to blueprints, recipes, and stories, is in docs/METHODS.md.

```yaml
---
title: Reverse cooking
date: 2026-09-24
tags: [method, technique, temperature]
blueprint: [burgers]
part: Cooking
---
```

## Reference pages and the Food Log

Shared frontmatter only, no required sections. Reference pages are technique guides, research notes, and appendices, written as reference rather than narrative. Food Log months need only `title` and `date`; the opening paragraph is the month's card summary (`/food-log-summary`).

## Validation

What a checker can rely on. `/lint` checks the first group today, and the build warns on formula blocks; the rest waits on Fugu's validator (`themes/fugu/PLAN.md`, "Recipe format and validator").

**Checked now**
- Required frontmatter present: `title`, `date` on every page; `tags` on recipes.
- `date` is YYYY-MM-DD; `draft` is a boolean if present; `tags` is a list of plain strings, no `#`.
- A recipe has at least one ingredients list and one method.
- Formula blocks use known icon keys, one operator, and at most five slots.
- Every page in `content/essays/methods/` carries the `method` tag; a `part` names one of its blueprint's `parts`; a recipe's `build_name` matches a build page's `build_name` in the same blueprint.

**For the validator**
- Frontmatter types match the tables above.
- Ingredient-line parse rate: report every line that doesn't parse cleanly. Every ingredient feature depends on it, so a silent failure is worth surfacing before any one feature needs it.
- `## Substitutions` lines contain the `→` delimiter.
- `## Equipment` is a flat list.
- `####` labels appear only inside an ingredients block and are followed directly by list items.

Essays, reference pages, and the Food Log have no structural body checks.

## Why these choices

**Plain text ingredients, not structured syntax.** A recipe should look natural in any text editor. The cost is a more complex parser, but ingredient grammar is well-bounded and handles the vast majority of real recipes.

**Freeform heading names.** Real recipes use wildly different heading names. "Ingredients", "What you need", and "For the sauce" are all valid if they precede an ingredient list. Requiring specific heading names forces authors to restructure their recipes.

**Wiki links for cross-references.** Obsidian compatibility. Wiki links use the title as the reference, so they survive file renames and reorganization. Standard Markdown links require knowing file paths.

**Open frontmatter schema.** Different pages need different metadata. Rejecting unknown fields frustrates authors. Validate known fields; preserve and ignore the rest.

**Tags as plain strings.** Tags match Obsidian's native tag convention without the `#` prefix required in YAML values. Consistent with how tags appear everywhere else in the vault.
