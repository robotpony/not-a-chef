# Methods

Draft spec. Defines what a method is, how it differs from a recipe or an essay, and what one should contain. Placement, layout, and frontmatter are still open (see the end).

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
   - Burgers: making the patty, cooking it, assembling it, prepping ahead
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

## What isn't a method

- **A story essay.** It gives the reason for a method (the two burger essays, Camp cooking). It should link to the method, but it doesn't replace it.
- **A recipe.** It's a single dish with fixed quantities.
- **A glossary entry.** It defines a term but doesn't teach you to do anything.
- **An ingredient-choice essay with only a little process in it.** Why ingredients matter in stock is close, but it would need the process and ratios pulled forward to become one.

## How the pieces connect

A story essay explains why the method matters, the method generalizes it, and recipes are worked examples of it. In the other direction, a recipe can name the method it's built on, and a dish family method links to the technique methods it uses.

## Candidates already on the site

| Method | Kind | Source |
|---|---|---|
| Reverse cooking | Technique | `content/reference/reverse-cooking-reverse-sear-and-water-frying.md`, already a method |
| Food ratios | Ratio | `content/reference/food-ratios-for-creating-your-own-recipes.md` (draft), already a method |
| Stock | Technique + ratio | Why ingredients matter in stock, plus the four stock recipes |
| Foil packets | Technique | Camp cooking |
| Burgers | Dish family | The quest for the perfect burger, The impossible quest for the perfect chicken burger, White Spot burgers, the burger sauce recipes |

## Open questions

- Is a method a new section (`content/methods/`), a subtype of reference pages, or a tag?
- Is a dish family one page with a section per part, or a hub page with child pages?
- Where does a part shared by several families live, like patty cooking used by both beef and chicken burgers?
- Do methods use `formula` blocks for their ratios, the way recipes do?
- Should recipe frontmatter have a `method:` field so the links between recipes and methods are explicit?
