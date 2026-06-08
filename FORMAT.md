# Recipe Format

Standard Markdown with YAML frontmatter. Files use the `.md` extension. Recipes should read naturally as plain text, render in Obsidian and Hugo, and be parseable by automated tools.

## Frontmatter

Required fields: `title`, `tags`. Everything else is optional but encouraged.

```yaml
---
title: Dal Tadka
tags: [soups, indian, weeknight, vegetarian]
source: original
date: 2026-05-02
servings: 4
prep_time: 10 min
cook_time: 25 min
total_time: 35 min
cuisine: Indian
---
```

| Field | Type | Notes |
|---|---|---|
| `title` | string | Recipe name. Must be unique in the collection. |
| `tags` | string[] | Plain strings, no `#` prefix. Category and descriptive tags. |
| `source` | string | `original`, `family`, a URL, or a book title. |
| `author` | string | Only when different from the collection author. |
| `date` | string | ISO 8601 (YYYY-MM-DD). Date added or last modified. |
| `servings` | string or number | Descriptive strings are fine: "4–6", "1 loaf", "scales to bird size". |
| `prep_time` | string | Parenthetical notes are fine: "20 min (plus 24–48 hr cold ferment)". |
| `cook_time` | string | Active cooking time. |
| `total_time` | string | Total elapsed time if different from prep + cook. |
| `cuisine` | string | Region or cuisine (e.g., "Indian", "Italian"). |

The schema is open. Unknown fields are preserved and ignored by tools. Don't add `difficulty`, `diet`, or `license` unless there's a reason.

## Mechanic section

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

## Simple recipes

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

Add tea and simmer 5 minutes. Add milk. Bring to a boil — the moment it foams and
rises, remove from heat and stir back down. Repeat three times.

Strain and serve.
```

Method is prose, not an ordered list. One action per sentence. Sensory cues first, time second: "until golden, about 3 minutes" not "cook 3 minutes."

Ingredients can have tab-indented sub-items for notes:

```markdown
- 1 cup red lentils (masoor dal), rinsed until water runs clear
    - add split peas for more texture (+10 min cook time)
```

## Multi-component recipes

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

## Optional sections

**To serve** — one line or a few words. What it goes with.

```markdown
## To serve

Warm basmati rice, plain raita, lime pickle.
```

**Variations** — only for meaningfully different methods or outcomes. Prose, one paragraph per variation. Include the source link when adapted.

```markdown
## Variations

### Coconut cream dal
Use yellow split peas instead of masoor ...
```

**Notes** — tips, substitutions, storage, test results. Bullet list.

```markdown
## Notes

- Masoor (red lentils) needs no soaking. Toor dal benefits from 30 minutes.
- Leftovers thicken considerably. Loosen with water when reheating.
```

**Tables** — use for timing or ratio reference when there are multiple variables.

```markdown
## Timing

| Bird | Low phase | High phase |
|---|---|---|
| Large turkey (5–7 kg) | 50 min | 45 min |
| 2 whole chickens | 30 min | 20 min |
```

## Cross-references

Use wiki links to reference other recipes as ingredients or related reading:

```markdown
- 1 cup [[Pizzeria Pizza Sauce]]
- 1 batch [[Basic Pie Crust]], blind-baked
```

Wiki links resolve by matching `title` in frontmatter. They work natively in Obsidian and require a render hook in Hugo.

## File naming

Kebab-case. One recipe per file. Match the title: `dal-tadka.md` for "Dal Tadka".

## Ingredient line format

```
[quantity] [unit] ingredient name [, preparation note]
```

- Quantities: whole numbers, fractions (`1/2`, `½`), mixed numbers (`1 1/2`), decimals (`.5`), ranges (`2–3`), descriptive (`a pinch of`)
- Units: standard cooking units in full or abbreviated form. Metric preferred with imperial in parentheses where helpful.
- Noise word "of" between unit and name is fine: "½ teaspoon of salt"
- Preparation notes after a comma: "3 apples, peeled and sliced"

## Language

Canadian English. British spellings (colour, favour, behaviour, flavour, grey) with American -ize endings (realize, organize, optimize). Metric units with optional imperial in parentheses: "180°C (350°F)", "250 ml (1 cup)".

Imperative, present tense in method steps: "Add the lentils" not "You should add the lentils." No passive voice.

## Why these choices

**Plain text ingredients, not structured syntax.** A recipe should look natural in any text editor. The cost is a more complex parser, but ingredient grammar is well-bounded and handles the vast majority of real recipes.

**Freeform heading names.** Real recipes use wildly different heading names. "Ingredients", "What you need", and "For the sauce" are all valid if they precede an ingredient list. Requiring specific heading names forces authors to restructure their recipes.

**Wiki links for cross-references.** Obsidian compatibility. Wiki links use the recipe title as the reference, so they survive file renames and reorganization. Standard Markdown links require knowing file paths.

**Open frontmatter schema.** Different recipes need different metadata. Rejecting unknown fields frustrates authors. Validate known fields; preserve and ignore the rest.

**Tags as plain strings.** Tags match Obsidian's native tag convention without the `#` prefix required in YAML values. Consistent with how tags appear everywhere else in the vault.
