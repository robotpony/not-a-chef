# Content format

Every page on the site is standard Markdown with YAML frontmatter, in a `.md` file under `content/`. Pages should read naturally as plain text, render in Obsidian and Hugo, and be parseable by tools.

**The format itself is Fugu's**, documented in the theme:

- [`themes/fugu/docs/recipe-format.md`](../themes/fugu/docs/recipe-format.md): a recipe's body. Ingredients and method, ingredient lines, `####` groups, multi-component recipes, the optional sections, `{.article}`, percentage tables, wiki links, photos, and the `formula`, `stack` and `flow` diagrams.
- [`themes/fugu/docs/frontmatter.md`](../themes/fugu/docs/frontmatter.md): every field. Recipes, drinks (`glass`, `fill`, `ice`, `garnish`), `draft` and `working_on`, `pinned`, taxonomy terms and principle tags, methods and blueprints (`weight`, `era`, `lineage`, history tables, lineage dates), and the recipe index.
- The fence grammars are hugo-warped's, in `~/projects/sites/hugo-warped/fences/`.

This page is Not a Chef's house style on top of that: what this site does that Fugu leaves open. Requirement language (MUST / SHOULD / MAY) follows RFC 2119, used only where a tool or template depends on the rule.

## All pages

Recipes (`content/recipes/`), drinks (`content/drinks/`), essays (`content/essays/`), methods (`content/methods/`), reference pages (`content/reference/`), Food Log months (`content/the-food-log/`), and About.

### Frontmatter

- `title`, `date` on every page; `tags` on recipes and drinks. Tags are plain strings, no `#`.
- A recipe title MUST be unique: wiki links resolve by it, and with a duplicate, Obsidian and Hugo can pick different pages.
- `source` SHOULD be set on recipes: `original`, `family`, a URL, or a book title. A private person is credited by role (`source: a sushi chef`), never by name.
- Approximate values use a leading `~`, not "about", "approx." or "roughly": `portions: ~500 ml`, `cook_time: ~2 hr`. A range (`4–6`, `20–30 min`) needs no `~`.
- Don't hand-maintain `lastmod`: last-modified comes from git (`enableGitInfo`).
- `aliases` only for a published URL that moved, and only after asking.
- There's no `related` field: related recipes come from `tags` and `cuisine`.
- The schema is open: unknown fields are kept and ignored. Don't add `difficulty`, `diet`, or `license` without a reason.

### Tags

- `family` means the recipe is historically from our family: heritage, not a dish grouping.
- A dish type with parts is a blueprint (`content/methods/<type>/`), never a tag like "family" or "group".
- `drinks` on every drink, `method` on every method page (see Methods).

### Files

Kebab-case, one page per file, matching the title: `dal-tadka.md` for "Dal tadka". No date prefix: `date` is the record.

ALL-CAPS files under `content/` (`IDEAS.md`, `TODO.md`) are working notes. Hugo ignores them (`ignoreFiles` in `config/_default/hugo.toml`), so they never publish.

### To-dos and comments

A to-do inside a page is a visible list item ending in `#todo` (`- Which sauces? #todo`), never an HTML comment. Obsidian's tag pane collects them, and they render on the page, so an editor has to deal with them rather than skip past. A to-do inside a table cell goes in a list right after the table.

HTML comments are only for what stays in the source but off the site, each starting with a label: private links (`<!-- Private worksheet (to import): … -->`) and personal detail held back for now (`<!-- Held back: … -->`), kept until Bruce decides to publish or cut it.

A comment is off the site, not secret. The minified build (`/publish`, `make dry-run`) strips comments, but a local `make build` or `/preview` keeps them in the page source, and the repo is public on GitHub, so the source and its history are readable by anyone. Anything that must stay private, such as a private person's name, stays out of the file altogether.

### Wiki links in Obsidian

Filenames are kebab-case, so Obsidian can't match a `[[Title]]` on its own: the warped-command plugin's "Resolve wiki links by page title" setting (Settings → Posts, on by default in a Hugo vault) does it, with the same rule as Fugu. Obsidian's link autocomplete inserts filenames, so type `[[Title]]` by hand. A `[[Term]]` with no page of its own links to its glossary entry, on the site only.

### Photos

Photos go in `static/images/<section>/` (`recipes`, `essays`, `food-log`), embedded where they belong in the text (`/image-add` does both):

```markdown
![Lazy tomato soup](/images/recipes/lazy-tomato-soup.jpg)
```

Describe what's in the photo: with no title, the alt text is the caption.

### Language

Canadian English, with a few US spellings. British spellings (colour, favour, behaviour, flavour, grey) with American -ize endings (realize, organize, optimize), and Canadian centre, litre and metre. This differs from the blog-writing skill, which uses center and liter; on this site the Canadian spelling wins. Preferred spellings: chili (plural chilies; "chile" only in proper names), yogurt, Sichuan, aluminum, green onion. Metric units with optional imperial in parentheses: "180°C (350°F)", "250 ml (1 cup)".

### Typography

Titles and headings use sentence case: capitalize the first word and proper nouns only (places, people, nationalities, brands). "Red Thai curry", "Chef John’s hamburger buns", "Instant Pot chicken thigh curry"; not "Red Thai Curry". Dish names borrowed from other languages are not proper nouns: "Dal tadka", "Salsa verde", "Pad kra pao moo saap".

Avoid em-dashes.

## Recipes

Instructional voice, not storytelling; the full style guide is the `recipe-writing` skill (`~/.claude/skills/recipe-writing/SKILL.md`), including the bold lead phrase on each method step.

- **Mechanic**: one paragraph, when a ratio or a non-obvious technique drives the result. Bold the key ratio. It opens the recipe as a callout above Ingredients (`recipeSidebar` leaves it out).
- **Method** is prose, not an ordered list.
- **Substitutions**: one swap per line, `- <ingredient> → <alternative(s)>[, <note>]`. The arrow (`→`) is a required delimiter, so a swap can be handled by code; the left side should match an ingredient line.
- **Equipment** is a flat list (no nesting). `## Special equipment` and the legacy `## Hardware` are the same section.

### Formula diagrams

A ratio stated in the Mechanic can also be drawn with a `formula` block. It illustrates the sentence and MUST NOT replace it. Grammar: Fugu's recipe-format.md, and hugo-warped's `fences/formula.md`.

## Drinks

Drinks are recipes in `content/drinks/` (Fugu's `drinkSection`), with the `drinks` tag. They're listed in the recipe index. The card glass fields are in Fugu's frontmatter.md; the fill colours are in `mockups/STYLE.md` §7.

## Essays

Essays live in `content/essays/<type>/` and are finished prose, not outlines or notes. Draft them in place, with `draft: true` while they're still changing. For shared language rules see the `blog-writing` skill (this file's Language section wins where they differ).

The types, one folder each:

- **Food memories**: thematic vignettes from childhood or formative food experiences. Each anchors a lesson or insight about cooking; nostalgia alone isn't enough. No names or places: the food is the subject.
- **Cooking reflections**: lessons from technique, ingredients, or failure. Engineering-minded; ratio-based thinking and post-mortems welcome.
- **Technique essays**: a deep dive on one method or principle (brining, emulsification, stock-making). Reference material written as prose.
- **Planning essays**: meal prep, "winning the fridge" thinking, systems for weeknight cooking.

A story that motivates a method isn't a method; it links to one (see Methods below).

The voice for all of them: engineering precision meets home-cook practicality. Personal, honest about mistakes, with a practical takeaway at the end.

Frontmatter is the shared set. `title` and `date` are required; `tags` and `description` are encouraged. Essays don't use the recipe fields (`servings`, `cuisine`, times).

No required sections. A typical shape, varying by type:

1. Opening: a specific observation, scenario, or image that grounds the piece
2. Body: the argument, narrative, or exploration; one idea per section
3. Close: a landing point; actionable, reflective, or a restatement of the opening with new weight

Use `##` headings only when sections are long enough that a reader needs navigation. Short pieces (under 1000 words) rarely need them.

A reference essay (`content/reference/essays/`) defines one concept and is tagged with that term, so the term's tag page can link to it. A term that doesn't need a whole essay gets a glossary entry in `content/reference/glossary/` instead.

## Methods

A method (`content/methods/`) explains how a kind of food or a cooking process works in general: the principle first, then the variables, the stages, why each one is there, how it fails, and the recipes that use it. What counts as a method, and how methods relate to blueprints, recipes, and stories, is in docs/METHODS.md.

Each page MUST carry the `method` tag. The folder's `_index.md` cascades it to a page with no `tags`, but a page that sets its own `tags` replaces the cascade, so list `method` there. Recipes carry no blueprint fields; each method lists its recipes under `## Recipes`.

Blueprint fields (`weight`, `era`, `lineage`), history tables and lineage dates are in Fugu's frontmatter.md. On top of that, a part's choices are rows in its `## Options` table (`Option`, `Pick it when`, `Changes`), not pages, and a build's body goes in this order:

1. An opening paragraph: why these picks go together.
2. `## Picks`: the profile in one line, then `- **Part:** pick` per part, in the parts' order, then its `stack` block, whose layers MUST follow the picks. Each bullet MUST start with a part's title.
3. `## Where it comes from` (optional): its era and kitchen, then a `Constraint` / `Pick it explains` table.
4. `## Why these picks`, `## How it fails`, `## Variations`.
5. `## Recipes` (optional): wiki links to the recipes that are this build.

## Reference pages and the Food Log

Shared frontmatter only, no required sections. Reference pages are technique guides, research notes, and appendices, written as reference rather than narrative. Food Log months need only `title` and `date` (the first of the month; a season file uses the month the log sorts it by). The opening paragraph is the month's card summary (`/food-log-summary`). Obsidian's Daily Notes creates new months from `tools/obsidian/food-log-month.md`, set as its template in `.obsidian/daily-notes.json`.

## Validation

`/lint` and `frontmatter.py check` cover these today, and the build warns on fence blocks:

- Required frontmatter present: `title`, `date` on every page; `tags` on recipes and drinks.
- `date` is YYYY-MM-DD; `draft` is a boolean if present; `tags` is a list of plain strings, no `#`.
- A recipe has at least one ingredients list and one method.
- Fence blocks (`formula`, `stack`, `flow`) pass hugo-warped's checker (`tools/check-fences.py`).
- Every page in `content/methods/` carries the `method` tag; every part in a blueprint's `parts/` has a `weight`; a build in `builds/` has a `## Picks` section whose bullets each start with a part's name.

Fugu's validator (`themes/fugu/PLAN.md`), when it lands, adds frontmatter types, the ingredient-line parse rate, the `→` in Substitutions, a flat Equipment list, and `####` placement.
