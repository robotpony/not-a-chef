# Recipe Format Specification

Status: **Draft, v0.1.0**

This is the normative counterpart to `FORMAT.md`. `FORMAT.md` stays the
human-readable guide (what a recipe should look like); this document is
what a validator checks a recipe file against, and what `recipe.js` and
Hugo build-time layouts are allowed to assume is true about any file in
`content/recipes/`. Where the two disagree, this document wins — treat the
disagreement as a bug in `FORMAT.md`, not a license to ignore this spec.

Requirement language (MUST / SHOULD / MAY) follows RFC 2119.

## 1. Scope and architecture

This spec covers three layers, and every feature below is placed in
exactly one of them:

1. **Source** — human-authored Markdown + YAML frontmatter in
   `content/recipes/*.md`. Obsidian-compatible, no CMS, git is the only
   history mechanism. This is the only layer a person edits directly.
2. **Build-time enrichment** — data Hugo computes from the source (plus
   optional hand-maintained files under `data/`) at `hugo build` time and
   writes out as static JSON, the same way `layouts/recipes/list.json.json`
   already produces `public/recipes/index.json` today. No server, no
   database, no live API calls.
3. **Client-time interactivity** — `recipe.js`, reading the rendered page
   and the build-time JSON, adding things a static page can't do on its
   own (live servings scaling, a shopping list assembled from multiple
   recipes, etc). Every client-time feature MUST degrade safely: with JS
   off or failing, the page stays fully readable and printable.

Nothing in this spec introduces a fourth layer (a live backend, accounts,
or shared server-side state). That was considered for saved recipes /
personal notes / ratings / reader-side change-tracking and explicitly
deferred — see §10.

## 2. Frontmatter schema (normative)

Supersedes the informal table in `FORMAT.md` §Frontmatter.

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | MUST | string | Unique across the collection. Sentence case: first word and proper nouns capitalized, nothing else. |
| `tags` | MUST | string[] | Plain strings, no `#` prefix. |
| `source` | SHOULD | string | `original`, `family`, a URL, or a book title. |
| `author` | MAY | string | Only when different from the collection author. |
| `aka` | MAY | string | Alternative names, comma-separated. |
| `date` | MUST | string | ISO 8601 (YYYY-MM-DD). The day the page was added. Required on every page type (recipes, essays, reference, Food Log, About). Last-modified comes from git, not front matter (`enableGitInfo`); don't hand-maintain a `lastmod`. |
| `servings` | SHOULD | string or number | How many people it feeds. Feeds `recipeYield` in the build-time schema.org output (§7.8). |
| `portions` | MAY | string | What the batch makes, when that isn't a head count: "2–3 sheet pans", "~1.5 L", "8 buns". Approximate values use `~` (§2 note below the table). |
| `prep_time` | MAY | string | |
| `cook_time` | MAY | string | |
| `total_time` | MAY | string | |
| `cuisine` | MAY | string | |
| `draft` | MUST | boolean | Hugo publish gate. |
| `cost_note` | MAY | string | Free-text author commentary on cost ("expensive because of saffron"). Not a number — the computed estimate lives in build-time data, §6. |

Approximate front-matter values MUST use a leading `~` rather than "about", "approx.", or "roughly": `~500 ml`, `~2 hr`, `~3 medium pizzas`. Keep the space between number and unit. A range (`4–6`, `20–30 min`) needs no `~`.

The schema stays open: unknown fields MUST be preserved and MUST NOT
cause a validation error. This spec only adds normative status to fields
that already existed informally; it does not close the schema.

No `related` field is defined. Related-recipe suggestions are computed at
build time from `tags` + `cuisine` (§7.4) using Hugo's native related-
content feature. Revisit a manual override field only if automatic
suggestions prove weak in practice.

## 3. Ingredient line grammar (normative)

Extends `FORMAT.md`'s ingredient line format. This grammar is the single
shared contract every ingredient-driven feature depends on — portion
scaling, measure conversion, quantity+unit styling, shopping-list
extraction, pantry matching, and substitutions all parse ingredient lines
the same way. There is exactly one grammar; there must not be a second,
slightly-different one growing inside `recipe.js`.

```
[quantity] [unit] ingredient name [, preparation note] [(optional)]
```

- `quantity` and `unit` follow `FORMAT.md`'s existing rules (whole
  numbers, fractions, ranges, decimals, descriptive amounts; metric
  preferred).
- `ingredient name` is free text up to the first comma or the optional
  marker.
- `preparation note` — free text after a comma, as today.
- **Optional marker** — a line MAY end with the literal parenthetical
  `(optional)` (case-insensitive), after any preparation note. This is
  the one new machine-detectable token in the grammar:

  ```
  - 1 jalapeño, halved (optional)
  ```

  A validator or `recipe.js` parser MUST treat a trailing `(optional)`
  as the optional-ingredient marker, not as a preparation note.

Because two independent implementations will read this grammar (the
Python validator in `tools/`, and `recipe.js` in the browser), the
validator SHOULD emit its parsed output as a JSON fixture that a
`recipe.js` test suite can assert against, rather than each side
maintaining hand-written test cases that can silently drift apart.

## 4. Ingredient sub-groupings

`FORMAT.md`'s multi-component pattern (`## ComponentName` pairing an
ingredient list with its own method prose) has no answer for grouping
ingredients *within* one component's list — "Dry ingredients" vs. "Wet
ingredients" inside a single-method recipe, for example. This is new:

```markdown
## Ingredients

#### Dry
- 300g flour
- 10g baking powder

#### Wet
- 2 eggs
- 240ml buttermilk
```

`####` (h4) is reserved specifically for this: a non-structural label
inside an ingredients list. It carries no method implication — unlike
`##`, it MUST NOT be followed by prose method text before the next real
heading. A validator MUST reject a `####` block that isn't immediately
followed by list items, and MUST reject one that appears outside an
Ingredients block.

## 5. New optional body sections

Additions to `FORMAT.md`'s optional-sections list (To serve, Variations,
Notes).

### `## Equipment`

Plain bullet list, freeform text. Not cross-referenced against anything;
this is descriptive, not structural. `## Special equipment` and `## Hardware`
are accepted aliases for the same section.

```markdown
## Equipment

- 6-quart Dutch oven
- Instant-read thermometer
```

Feeds the equipment-list feature directly (§7.13) and the build-time
schema.org output's `tool` field (§7.8).

### `## Substitutions`

Structured, one entry per swappable ingredient:

```markdown
## Substitutions

- Butternut squash → sweet potato or pumpkin, same prep
- Fish sauce → soy sauce, for a vegetarian version
```

Grammar: `- <ingredient> → <alternative(s)>[, <note>]`. The `→` (U+2192)
is a required delimiter; a validator MUST flag a Substitutions list item
that's missing one.

This is the answer to "Hugo or the browser": the same section renders as
plain static substitution notes with no JS at all (tier 2), and `recipe.js`
MAY additionally parse it into an interactive ingredient-swap control
(tier 3) — one authored data source, two renderers. A validator SHOULD
(not MUST) warn when a substitution's left-hand ingredient text doesn't
match any line in `## Ingredients`, since the match is best-effort text
comparison, not a guaranteed link.

## 6. Global data files

Hand-maintained, versioned in git under `data/`, same directory Hugo
already reserves for this purpose. These are shared lookup tables, not
per-recipe content, so they don't belong in frontmatter.

### `data/ingredient_prices.yaml`

Ingredient name → approximate unit price. Drives build-time cost
estimates (§7.9): Hugo joins each recipe's parsed ingredient list
against this file and writes an estimated total + per-serving cost into
the recipe index JSON. Recipe.js MAY recompute live when the reader
changes servings or swaps a substitution, on top of the static baseline.

Price data goes stale by nature. The file MUST carry an `updated:` date
at its own top level, and the feature is scoped as "roughly which
recipes are cheap or expensive," not an accurate grocery total — don't
build anything downstream that assumes more precision than that.

### `data/departments.yaml`

Canonical grocery department list, ordered outside-in (produce, deli,
etc. → center-aisle → frozen, matching how you actually walk a store),
plus an ingredient name → department mapping. Drives shopping-list
ordering (§7.7) and doubles as the canonical ingredient vocabulary for
the pantry/fridge-matching tool (§7.10) — one lookup table, two features.

### Canonicalization is the load-bearing risk

Both files above key on the same canonical ingredient name that §3's
grammar parses out of `"450g butternut squash, peeled and diced"` →
`butternut squash`. Getting many-to-one matching right (squash vs.
butternut squash vs. butternut, singular vs. plural, brand names) is the
fragile part of this whole spec. Prototype the canonicalization step
against a real slice of `content/recipes/` before committing to a
mapping-file shape — don't design §6 further in the abstract.

## 7. Feature-to-layer mapping

The 13 requested features, sorted into §1's three layers, with what each
one depends on.

| # | Feature | Layer | Depends on |
|---|---|---|---|
| 1a | Portion scaling | client | §3 grammar |
| 1b | Measure conversion | client | §3 grammar + a unit-conversion factor table (small, separate concern — scope when `recipe.js` is actually built) |
| 1c | Nutrition data | **deferred** | future feature, no data model yet |
| 1d | Quantity+unit auto-wrap (for styling) | build | Hugo render hook wraps `<span>`s at build time; simpler done once at build than repeatedly in JS |
| 1e | Optional ingredients | build + client | §3 `(optional)` marker; static styling by default, client toggle to hide/show |
| 2 | Print view | client | none — CSS + JS toggle only |
| 3 | Substitutions | build + client | §5 Substitutions section |
| 4 | Related recipes | build | Hugo related-content on `tags`/`cuisine`, §2 |
| 5 | Saved recipes / personal notes / track changes | **deferred** | see §10 |
| 6 | Cook mode | client | none — UI-only (larger text, keep-awake if available) |
| 7 | Shopping list | client, reads build output | §6 `departments.yaml` + parsed ingredients across the reader's selected recipes |
| 8 | Auto-SEO structured schema | build | Hugo partial emitting schema.org `Recipe` JSON-LD from frontmatter + `## Equipment`; not part of `recipe.js` at all |
| 9 | Costing / budget mode | build (baseline) + client (live recompute) | §6 `ingredient_prices.yaml` |
| 10 | Win-the-fridge / pantry tool | client, reads build output | §6 `departments.yaml` as ingredient vocabulary + a build-time parsed-ingredient index (extends `list.json.json`) |
| 11 | Ratings | **deferred** | bundled with #5, see §10 |
| 12 | Total time / breakdown / yield | build | already exists (`prep_time`/`cook_time`/`total_time`/`servings`); just needs consistent authoring |
| 13 | Equipment list | build | §5 `## Equipment` section |

## 8. Validator implications

Feeds the `/lint` extension already scoped in `PLAN.md` Phase 9:

- Required frontmatter present and correctly typed (§2).
- Ingredient line parse success rate (§3) — report any line that fails
  to parse cleanly; every feature in §7 depends on this parsing working,
  so a silent parse failure is worth surfacing even before a specific
  feature needs it.
- `## Substitutions` lines contain the `→` delimiter (§5).
- `## Equipment`, when present, is a flat bullet list — no nesting.
- `####` ingredient-group labels (§4) appear only directly inside an
  Ingredients block and are immediately followed by list items.

## 9. Versioning

This draft is `0.1.0`. Bump minor for additive, backward-compatible
changes (a new optional section or field — existing recipes that don't
use it remain valid). Bump major only when a previously-valid recipe
could fail validation under the new rule.

## 10. Explicitly deferred

- **Saved recipes, personal notes, ratings, reader-side change-tracking.**
  Considered and deferred rather than designed around a guess. The
  blocker: any of these that need to be shared across family members or
  devices require a backend, which breaks the "no CMS, static site"
  decision already on record in `ARCHITECTURE.md`. A local-only
  (`localStorage`) version was the fallback option but was deferred
  entirely rather than shipped as a lesser version. Revisit once the
  rest of `recipe.js` exists and it's clear the itch is still there.
  Author-side change tracking already exists today, for free: git
  history on `content/recipes/`.
- **Nutrition data.** No data model yet; likely reuses whatever
  canonicalization work §6 ends up needing, once it exists.
- **Unit-conversion factor table.** Needed for 1b but intentionally not
  designed here — small enough to scope when `recipe.js` gets built.
