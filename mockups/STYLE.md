# Bruce loves to cook: style standards

A style guide for "Bruce loves to cook", our family cookbook.

## Messaging

Name and tagline, standardized 2026-09-22 (replaces "Your dad is not a chef",
2026-09-18):

- **Name**: "Bruce loves to cook"
- **Tagline**: "our family cookbook" (replaces "an Alderson family cookbook", 2026-09-22)
- **Combined line** (site description, About page description, anywhere the two read as one sentence): "Bruce loves to cook, our family cookbook."
- **Footer blurb**: starts with the tagline, not the combined line, since the brand name sits directly above it: "Our family cookbook. Recipes, essays, and reference notes from a home kitchen."
- **Copyright line**: "Copyright © Bruce Alderson" (no year), matching `LICENSE`.
- **Nav logo and footer brand name**: the full name, "Bruce loves to cook." (sentence case, trailing period). There is no short form; layouts adapt to the full name. Wherever the name is set as a wordmark (nav logo, mobile drawer, footer brand, homepage h1), "loves" is `--accent-strong` via `.brand-loves`; plain-text uses (titles, meta) stay uncoloured.
- **"Alderson"**: keep to a minimum. The copyright line is its only regular use.

Canonical copy lives in `content/about.md`; that page is the source of truth.
Everywhere else (site title, homepage hero, footer blurb, README) restates the
name and tagline above rather than inventing new phrasing.

### Voice

First person, the same voice as the essays. Modest about credentials ("I am
not a chef") and open about loving to cook. Reader-facing copy says what a
thing is for, never how the site is built: no references to indexes, tags,
templates, or PLAN.md in anything a visitor reads.

### Core message

Not a chef, but decades of restaurant work, food TV, and cookbooks turned into
a real love of cooking. These are the foods we eat, from 1950s kitchens to
today, with the ratios, timings, and fixes that make them work.

Three threads carry it, in this order:

1. **Love**: the name and the About page.
2. **Method**: the homepage lede, reference pages, and planning essays.
3. **Heritage**: the food memories band on the homepage and the essays.

The homepage hero lede is the method promise: "{count} recipes we actually
cook, with the ratios, timings, and fixes that make them work."

## Color tokens

CSS custom properties, defined on `:root`. Every token has a dark-mode pair
(`@media (prefers-color-scheme: dark)` + a `[data-theme="dark"]` override for
a manual toggle).

### Neutrals

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F3F3EC` | `#1B1C16` | page background |
| `--surface` | `#FBFBF6` | `#212219` | cards, panels, inputs |
| `--surface-2` | `#EAEBDF` | `#17180F` | hover fills, nested surfaces |
| `--ink` | `#23241E` | `#ECEEE2` | primary text |
| `--ink-muted` | `#63645A` | `#A9AB99` | secondary text, meta, ledes |
| `--ink-faint` | `#93948A` | `#75766A` | tertiary text, placeholders, counts |
| `--border` | `#DCDCCE` | `#383A2C` | default dividers/borders |
| `--border-strong` | `#C7C8B4` | `#4A4C3A` | interactive element borders (inputs, pills, buttons) |

### 1 · Primary — orange→red (`--accent` / `--accent-strong`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--accent` | `#A67330` | `#D3A569` | interactive borders/hovers, active nav, checked ingredient |
| `--accent-strong` | `#7C361D` | `#E4AD95` | text emphasis — ratios, links, stat numbers, "view all" |
| `--accent-soft` | `#F6EADA` | `#37261B` | fill for hovered/selected rows |
| `--focus` | `#A67330` | `#D3A569` | focus ring (same as `--accent`) |

Means "interactive, or teaches you something." Leads the hierarchy — this is
the one color allowed real prominence.

### 2 · Secondary — yellow (`--highlight`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--highlight` | `#997F29` | `#DDCC88` | cuisine chip text |
| `--highlight-soft` | `#F6F1D5` | `#342D19` | cuisine chip fill |

Cuisine only. Never used for anything else, so it never competes with the
accent for attention. The chip links to its cuisine's term page
(`/cuisine/<name>/`), but hover stays yellow: an inset `--highlight` ring,
never the accent.

### 3 · Utility, reserved — blue (`--flag`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--flag` | `#3D638F` | `#97B8D8` | draft/unreviewed banners and badges |
| `--flag-soft` | `#E1EAF4` | `#1D2835` | fill for the above |

Means "unreviewed," not "error." Blue reads as cool/pending against the
accent's warm/active — deliberately not red. **One role only**: the draft
state. Don't reach for it elsewhere.

### 4 · Principle, reserved — green (`--principle`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--principle` | `#247B50` | `#8ED7B4` | chip hover ring, definition-callout border |
| `--principle-strong` | `#1D6743` | `#A7E2C4` | chip text, "principle" kind label, callout label |
| `--principle-soft` | `#DBF5E8` | `#1B3428` | chip fill |

`warped-green` (`#68d6a1`, hue 151°) was previously reserved and untokenized,
with an open question about a vegetarian/vegan role. Claimed 2026-09-27
(`mockups/win-the-fridge.html`) for **principle** instead — the win-the-fridge
tag only, not a general mechanism. If a veg/vegan marker is wanted later it
has to compete for space inside this same 5-hue family; there's no 6th hue.

### Where the palette comes from

All five hues share one saturation/lightness
formula (57%/62%) at different rotations — red 14°, orange 34°, yellow 54°,
green 151°, blue 210° — taken directly from warpedvisions.org's shipped CSS
(`warped.css`'s flourish-bar hues). This site reorders the hierarchy to lead
with orange→red instead of the blog's blue-led order; it does not invent new
hues. **Never introduce a hue outside this five-color family** (no teal, sage,
mustard, plum, ember, etc. — those were an earlier, discarded palette).

## Type system

Three faces. No face does more than one job.

| Role | Face | Weights | Notes |
|---|---|---|---|
| Headings & UI | **Libre Franklin** | 400–700 | nav, labels, stat labels, section headers, buttons |
| Body & lists | **Lora** | 400–600 (+ italics) | prose — recipe method text, essay copy, descriptions. Shared with warpedvisions.org. |
| Quantities & data | **IBM Plex Mono** | 400–600 | every quantity, time, ratio, and count — `font-variant-numeric: tabular-nums`, always |

The mono face is load-bearing, not decorative: numbers align visually while
scanning an ingredient list mid-cook. Don't substitute another monospace
family (no Fira Code, Menlo, JetBrains Mono, etc.) — `IBM Plex Mono` is the
one already loaded and used everywhere else.

Google Fonts import line (put this at the top of any new mockup's `<style>`):

```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
```

### Line-height

Always set line-height as a **unitless multiplier** (`line-height: 1.5`), never a
fixed length (`28px`, `1.75rem`). A unitless value is inherited as a number
and recalculated against each descendant's own font-size; a fixed length is
inherited as-is regardless of size, so any small text that doesn't set its
own line-height ends up disproportionately loose (13px text at a 28px line
height reads nothing like 16px text at that same 28px — one is book-normal,
the other looks like double-spacing). This is exactly the bug that hit the
real site's footer: `body{ line-height:1.6 }` here in the mockups was never
carried into the Hugo build, so anything that fell back to Tailwind's fixed
`leading-7` (28px) — the footer's brand paragraph, its Browse/Index links —
read at a completely different rhythm than the rest of the page.

- **Base**: `1.5`, on `body`/`html` (16px root — 24px lines) — this is where
  everything not otherwise specified inherits from, **and** the value
  `.prose` (recipe/essay body copy, and by inheritance its list items)
  overrides Tailwind Typography's own `1.75` default down to, so body text,
  list items, and card text all read at the same rhythm. Tuned down from
  `1.6` on 2026-09-18 — see "Prose vertical rhythm" below.
- **Headings**: tighter, `1.05`–`1.3` depending on size — large display type
  needs less line-height, not the body ratio. Not yet true for every
  heading level in the actual build (`h3`/`h4` still carry Tailwind
  Typography's own `1.6`/`1.5`) — noted, not fixed, since it wasn't part
  of the reported problem.
- **Small UI captions** (card notes, stat labels, footer copy): `1.5`–`1.6`.
- **List items**: should read like consecutive lines of the surrounding
  prose, not get extra rhythm of their own — don't let a list item's own
  margin plus its wrapped-paragraph's margin (a markdown "loose list" wraps
  each item's text in a `<p>`) stack on top of each other. If a component
  ever looks like it has "too much space" between short repeated lines
  (list items, nav links, footer columns), check for exactly this
  double-accounting before reaching for a layout fix.
- **Never eyeball one element in isolation** — check that its line-height
  ratio (line-height ÷ font-size) matches the role it's playing (body copy
  vs. heading vs. caption), not just that it "looks fine" at its own size.

### Prose vertical rhythm — decisions, 2026-09-18

A recipe page (`gyro-dogs`, then `pressure-cooker-japanese-curry`) was
measured directly in the browser (computed styles + actual rendered gaps,
not just reading the CSS) across two passes: an initial audit, then a
follow-up with a screenshot pinpointing two specific problems and a
concrete instruction (line-height to `1.5`, heading top-margin cut by at
least 50%). Both passes' findings, and what actually got changed:

**Fixed — horizontal misalignment.** The annotated screenshot showed the
recipe title sitting left of the nav wordmark, not under it. Measured
cause: `.site-nav-inner` (and every other section — `.hero`,
`.home-section`, `.site-footer-inner`) carries its own 20px side padding
on top of `<main>`'s 1100px column; the single-page template
(`#single_header` + its content) never got the matching padding, so its
content sat flush against `<main>`'s bare edge — 20px left of where every
other section's content actually starts. This had already been flagged as
"a known, minor gap" in a comment (now removed) when `<main>`'s own
centering was fixed; it turned out not to be minor. Fixed by giving
`#single_header` and its sibling content `section` the same 20px padding
(`assets/css/custom.css`, the `#single_header, #single_header + section`
rule). Verified: nav wordmark and article `h1` both now measure `left: 90`.

**Fixed — the first heading on every page carried an unwanted top
margin.** Tailwind Typography's `.prose` ships a rule zeroing margin on
`.prose`'s own first/last child, so the block right after an opening
heading doesn't carry redundant space. It never fired here: `.prose` is on
the outer flex `<section>`, three wrapper divs above the actual heading,
so the rule's selector never matched — the opening `## Mechanic` heading
rendered with its full `margin-top: 48px` intact. Fixed by re-targeting
the same rule at `.article-content`, which actually is the heading's
direct parent (`.article-content > :first-child` / `:last-child`).
Verified: the first heading's `margin-top` now computes to `0px`; the gap
from the tags row to it is governed by the header's own spacing, not the
heading's.

**Fixed — heading top:bottom margin ratio set to `1.5:1`.** Confirmed by
measurement that the original gap was real, not a misreading: `h2`'s
`margin-top: 2em` is relative to its *own* 24px font-size (48px rendered,
3em of the 16px base); `h3`'s `1.6em` of its own 20px renders as 32px.
Tailwind's default is tuned for long-form prose where headings are rare;
this format's multi-component recipes (`## ComponentName` per component,
see `FORMAT.md`) put an `h2` or `h3` every few lines, so a gap that reads
as normal in an essay repeats constantly here. First pass cut top-margins
a flat 50% (`h2` and `h3` both landed at a 1:1 top:bottom ratio); a live
check of the rendered result called for slightly more space above than
below, specifically **1.5× the heading's own (untouched) bottom margin**,
not a flat cut — `h2`: `2em → 1.5em` (bottom stays `1em`, so 36px:24px),
`h3`: `1.6em → 0.9em` (bottom stays `0.6em`, so 18px:12px), `h4`:
`0.75em`, unchanged — it already landed on `1.5:1` in the first pass by
coincidence. `assets/css/custom.css`'s `.prose h2/h3/h4` rules. Verified
in-browser: `marginTop / marginBottom` computes to exactly `1.5` for both
`h2` and `h3`.

**Fixed — body, list, and card line-height tuned to `1.5`.**
`body { line-height }` (the base every card and non-prose element
inherits) moved from `1.6` to `1.5`. `.prose` (recipe/essay body copy —
`<li>` has no line-height of its own, so this tightens list items too,
without a separate rule) moved from Tailwind Typography's default `1.75`
to `1.5`. Headings keep their own per-level values, on purpose — a
different rhythm than body text (see "Line-height" above; `h3`/`h4` still
carry Tailwind's own `1.6`/`1.5` there, unrelated to this and not yet
reconciled). Verified: both `<p>` and `<li>` compute `line-height: 24px`
(`1.5 × 16px`) in the built page.

**Confirmed not a bug — paragraph-to-paragraph and list-item *margins*
were never stacking.** Measured `P → P` gap: 20px (`1.25em` of the 16px
base), exactly `max(20, 20)`, not `20 + 20`. Measured `li → li` gap: 4px,
exactly `max(4, 4)` — the existing `.prose li { margin: 0.25em }` override
was already working as intended. The perceived list-item looseness was
line-height (previous section), not margin.

Measured, `pressure-cooker-japanese-curry` / `gyro-dogs`, desktop viewport,
before → after (after = final `1.5:1` pass, not the intermediate flat-50%
cut):

| Transition | Before | After |
|---|---|---|
| tags row → first `h2` (`.article-content`'s real first child, `margin-top: 0` regardless of the ratio above) | 48px | 24px |
| `p → h2` (non-first), `margin-top`:`margin-bottom` ratio | 48px:24px (2:1) | 36px:24px (1.5:1) |
| `h3` `margin-top`:`margin-bottom` ratio | 32px:12px (2.67:1) | 18px:12px (1.5:1) |
| `li` line-height | 28px | 24px |
| `p` line-height | 28px | 24px |
| nav wordmark vs. article `h1`, left edge | 90px vs. 70px | 90px vs. 90px |

Not touched, kept for a later pass: `h3`/`h4` line-height (still Tailwind's
own `1.6`/`1.5`, not the site's `1.5` body value — same number for `h4` by
coincidence, not by design); whether list-heavy recipe/essay/reference
*listing* pages (not single pages) have the same 20px gutter gap
`#single_header` just got fixed for.

**Fixed — heading bottom-margins cut 25%, widening the top:bottom ratio to
`2:1`.** The `1.5:1` pass above only ever addressed the gap *above* a
heading; the principle behind it — a heading should read as bound to the
content it introduces, not floating between two sections — argues for
shrinking the gap *below* it too, not just growing the gap above. Cut each
level's own (previously untouched) Tailwind bottom-margin by 25%: `h2`
`1em → 0.75em`, `h3` `0.6em → 0.45em`, `h4` `0.5em → 0.375em`. Top margins
are unchanged, so the top:bottom ratio moves from `1.5:1` to `2:1` at every
level (`h2`: 36px:18px, `h3`: 18px:9px, `h4`: 12px:6px). Applies to all
single-page prose (`.prose h2/h3/h4` in `assets/css/custom.css`) — recipes,
essays, and reference alike, since none of them have a section-scoping hook
yet to diverge from each other.

**Fixed — horizontal rules, 2026-09-25.** Tailwind Typography gives `hr`
`3em` above and below, and the next heading's own top margin stacked on
that. Now `1em` each side, the element after the rule has its top margin
zeroed, and the rule is at 60% opacity (`.prose hr` in
`assets/css/custom.css`).

**Fixed — heading bottom-margins cut again, 2026-09-27.** Seen at real
scale on an essay page (`win-the-fridge`), the 2:1 top:bottom ratio from
2026-09-18 still read as too much air under a heading before its body
text. This pass only touches the *bottom* side again (nothing was reported
above a heading): another third off each level's 2026-09-18 bottom margin
— `h2` `0.75em → 0.5em`, `h3` `0.45em → 0.3em`, `h4` `0.375em → 0.25em` —
moving top:bottom from 2:1 to 3:1. Paired with an explicit line-height cut
(`h2` `1.2`, `h3` `1.25`, `h4` `1.3`, within the "Headings: tighter,
1.05–1.3" target from the Line-height section above, and the piece of that
target this file had flagged as "not yet true for every heading level"):
Tailwind Typography's own heading line-height (`h2` `1.333`, `h3`/`h4`
`~1.5`–`1.6`) left whitespace under the glyphs before the margin even
started, so the two together read as a bigger gap than the margin value
alone suggested. `.prose h2/h3/h4` in `assets/css/custom.css`. Verified:
`win-the-fridge`'s first `h2` now measures `marginBottom: 12px` (was 18px)
with the same 0px gap-below-equals-margin relationship confirmed
throughout this document's earlier passes.

**Fixed — tags row spacing, 2026-09-27.** The recipe/essay/reference
header's taxonomies row (cuisine chip, principle chip, tags —
`article-meta/basic.html`) put a `mt-[0.5rem] me-2` on every child to
space both columns and wrapped rows. Two problems: that top margin landed
on the row's first line too (there's almost always only one), adding dead
space between the title and the tags that had nothing to do with
row-wrapping (measured gap: 12.6px, of which only ~4.6px was the title's
own spacing); and per-child margins are more fragile than a single `gap`
for guaranteeing every space in the row reads as the same size. Replaced
with one `gap: 8px` on the row itself (`.tags-row` in
`assets/css/custom.css`, matching the recipe card's own `.rcard-top { gap:
4px }` pattern) — same 8px spacing between chips/tags as before, but never
before the first or after the last. Verified: title-to-tags gap now 4.6px;
every chip-to-chip and chip-to-tag gap measures exactly 8px.

**Fixed — sidebar Mechanic/To serve heading-to-body gap, 2026-09-27.** The
recipe sidebar's compact Mechanic section (`.recipe-sidebar-section
.mechanic`, see Components below) measured a 16.4px gap under its "MECHANIC"
label versus 6px under "To serve"'s, even though both headings share the
same `.recipe-sidebar-section h2` rule (`margin-bottom: 6px`). Cause:
Markdown wraps Mechanic's body as `<div class="mechanic"><p>...</p></div>`,
so the `.recipe-sidebar-section > p` margin-reset next to it never matched
(it targets a direct-child `p`, not `> div > p`) — the inner paragraph fell
back to Tailwind Typography's own margin. "To serve" has no such wrapper
div, so it was already correct. Zeroed the inner paragraph's margin
directly (`.recipe-sidebar-section .mechanic p` in `assets/css/custom.css`).
Verified: both sections now measure a 6px heading-to-body gap.

## Components

Defined and demonstrated at real scale in `style.html` §3 (and originally in
`archived/style-guide.html` §4, exercised in `archived/recipe-spec-sheet.html`).
Reuse these — don't invent new visual devices for things this list already
covers. This is the **curated, ratified** subset — see `COMPONENTS.md` (and
its full mock, `components.html`) for the complete inventory, including
everything discarded or superseded getting to this list.

- **Ingredient check** — custom flat checkbox (no native chrome, no emoji), 19px target
- **Ingredient sub-head** (`.subhead`) — groups a long ingredient list into named sections (e.g. "Based on 1 kg ground meat")
- **Ingredient sub-note** (`.ing.sub`) — a non-checkable tip nested under an ingredient, indented, no checkbox
- **Mechanic callout** — `--accent`-left-bordered box, for the ratio/technique explanation
- **Procedure — prose** — plain paragraphs; **the default** treatment, used for most recipes
- **Numbered procedure step** — mono numeral in a small accent-soft square; the exception, reserved for genuinely order-dependent steps
- **Notes list** (`.notes-list`) — em-dash bullets (via `::before`), not a native list marker
- **Notes sub-section** (`.notes-sub`) — a labeled sub-block nested one level inside Notes, for a note that needs its own heading
- **Variation block** (`.variation`) — heading + prose, one block per variation, stacked
- **Wikilink** (`.wikilink`) — internal cross-reference: body-colour, body-weight text (`--accent-strong` on hover, 2026-09-25), trailing →. Underline (shared with extlink, 2026-09-25, after warpedvisions.org): solid 2px, `--accent` mixed to 35%, full `--accent` on hover
- **External link** (`.extlink`) — outside reference: ink text + trailing ↗, same underline as wikilink; only the arrow (→ vs ↗) tells them apart
- **Cuisine chip** — filled `--highlight-soft` / `--highlight` text, one per recipe, always yellow regardless of which cuisine — deliberately never color-coded by cuisine (see Decisions below). Links to `/cuisine/<name>/` (as of 2026-09-24); shown on recipe cards and at the start of the tag row on recipe pages. On cards the title link stretches over the whole card (`.rcard-link::after`) and the chip sits above it, since the card can't be one `<a>` with a link inside
- **Tag** — neutral outline (`--border-strong`), never colored
- **Principle chip** (`.principle-chip`, 2026-09-27, `mockups/win-the-fridge.html`) — same shape as the cuisine chip but filled `--principle-soft` / `--principle-strong` text, sentence case not uppercase. One tag only: win-the-fridge. Links to `/tags/win-the-fridge/`. Leads the tag row after cuisine, before plain tags (`partials/principle-chip.html`, used by `recipe-card.html` and `article-meta/basic.html`). Abbreviates to "WTF" on the recipe card (`title` attr carries the full name) so it fits the card's existing 2-slot top row without a layout change; spells out "Win the fridge" everywhere else
- **Glossary link** (`.glossary-link` / `.glossary-pop`, 2026-09-27, `mockups/win-the-fridge.html`) — a second inline-reference style alongside the wikilink, for terms rather than pages: dotted underline (vs. wikilink's solid one), no trailing arrow, hover/focus reveals a short definition and a link through. Emitted by the same render hook (`render-link.html`) a `[[Term]]` already goes through: a title match against a reference essay (`content/essays/reference-essays/`) gets this treatment instead of the plain wikilink one (reference essays are the "gets its own page" tier of the glossary); no page match falls back to a heading match in `content/reference/glossary.md` (the "doesn't get its own page" tier) before giving up as a `.broken-link`. Popovers fire on every mention, not just the first
- **Definition callout** (`.definition-callout`) — `--principle`-left-bordered box, the win-the-fridge tag page's opener; same shape as the Mechanic callout but green and holding the tag's own `_index.md` body content instead of a ratio
- **Reference list** (`.ref-list` / `.ref-row`) — label + link rows, used for the win-the-fridge tag page's "Reference & further reading" section (anything on the tag that isn't a recipe)
- **Filter pill** — pill-shaped (14px radius), neutral outline, `--accent-soft` fill when active — listing-page filters, distinct from the chip's "fact about the recipe"
- **Draft state** (banner or badge) — `--flag` blue, never red
- **Recipe card** (`.rcard`), v2 as of 2026-09-23 (`recipe-card-v2.html`): one-line taxonomy row (two slots, cuisine takes one when present and the win-the-fridge principle chip takes another when present, a tag repeating the cuisine is skipped, then `+N`; never wraps, chips/tags at `.62rem`), title, intro (the recipe's first paragraph before any `##`, or frontmatter `summary`/`description`; Lora `.84rem`, clamped to 3 lines), and a compact stat line pinned to the card bottom (Prep/Cook/Serves inline; faint Franklin labels, values bold IBM Plex Mono in `--accent-strong`; times shortened to `15m`/`2-3h` and parentheticals dropped on the card only, full value in the title attribute). The Mechanic/Variations flags row was removed. Same card on the homepage "Recently added" row, the recipes list page (`themes/fugu/layouts/recipes/list.html`), and single-term pages like `/cuisine/x/` and `/tags/x/` (`themes/fugu/layouts/_default/term.html`). The essays list (`themes/fugu/layouts/essays/list.html`, 2026-09-24) uses the same card: the top row is the essay's format from its folder ("food memories") and the stat line is reading time ("Read 3m"). The reference list (`themes/fugu/layouts/reference/list.html`, 2026-09-24) does the same: the "reference" tag every guide carries is skipped, and the stat line is reading time. The Food Log list (`themes/fugu/layouts/the-food-log/list.html`) does the same, one card per month: title from the filename ("September 2026"), Days/Read in the stat line, and the same intro fallback as every other card (frontmatter `summary`, else the file's first paragraph before its first heading) in the middle — not the month's day headings, which read like a table of contents rather than a summary (changed 2026-09-29, `mockups/food-log-homepage.html`; a month with no written paragraph yet just gets a shorter card, same as a recipe without one). `/food-log-summary` writes that paragraph. As of 2026-09-29 the homepage's "Food memories" and "Technique & reflections" bands also use this card (previously `.comp-card`; see that entry below) — all four homepage bands now share one card component
- **Listing page header** (`.ltitle` / `.listing-count`) — title + a count line ("83 recipes · showing 18"), distinct from the hero used for page openers
- **Section caveat** (`.section-caveat`, formerly `.nav-caveat`) — a one-line honesty note for admitting a section is thin; not limited to nav panels, use it above any under-built section
- **Nav item with mega-menu** — caret only on items with a real dropdown (Recipes, Reference); other sections stay plain links until they have enough content to categorize
- **Browse list row** (`.mega-col a` / `.browse-list a`) — label + right-aligned mono count, used for all taxonomy browsing (by course, by cuisine, reference guides — see Decisions below)
- **Search box** — real `<input>`, lives inline in the homepage hero, not a header icon button
- **Theme toggle** (`.theme-toggle`) — labeled pill, cycles system → light → dark; lives in the **site footer**, matching `footer.showAppearanceSwitcher` in Hugo config
- **Site footer** (`.site-footer`) — brand blurb, link columns (Browse / Index), theme toggle, meta line
- **Stat rail** (`.stat-rail`) — the one component for "numbers at a glance," used in the recipe header (serves/prep/cook/total); removed from the homepage hero 2026-09-22, where the "tonight" tag pills now sit beside search
- **Reading sidebar** (`.reading-sidebar`), as of 2026-09-24 (`reading-sidebar.html`): the right column on essay, reference, Food Log, and About pages (`themes/fugu/layouts/partials/reading-sidebar.html`). Search on top on every page, then a Date/Updated rail in the recipe meta rail's style (`partials/sidebar/date-rows.html`, shared with the recipe sidebar; added 2026-09-25). Below that, only modules for the page you're on: a relocated `## Notes` section (above "On this page" since 2026-09-25; the other relocated sections sit below it), "On this page" (desktop only; sections with a subsection-count toggle that opens a hairline rail of subsections, collapsed on pages with more than 12 headings, variant C in the mockup, 2026-09-25; top-level entries sized up and bolded, `.84rem`/500 → `.88rem`/600, 2026-09-27 — at the original weight they read too close to the subsection links below), recipes the page links to, sibling essays, Food Log days and months, or the About page's numbers and optional `start_here` list. "Cook tonight" tag pills with an "All N recipes →" link used to close every page; removed 2026-09-25 to match the recipe sidebar. It has no section-wide lists (essay formats and the full reference list were cut for length), isn't sticky, and has an 18.6rem content column. The top lines up with the body, not the title, and on mobile it sits below the article, open
- **Photos** (`.sidebar-photos`, `.photo-strip`, `.photo-marker`, `.photo-viewer`), as of 2026-09-28 (`sidebar-images.html`): markdown images leave the body and become a Photos module in the recipe and reading sidebars, right under the meta/Date rows. One photo shows full width at 4:3 with its alt text as a caption; 2 or 4 sit in two columns; other counts in three columns of square crops, with the sixth tile showing `+N` past six. Below 1024px the module is replaced by a strip of 64px thumbnails under the title (112×84 for a single photo), since the sidebar is below the article or collapsed there. A "Photo N" marker button stays where each image was written. Any of them opens the viewer: a native `<dialog>` on a dark backdrop in both themes, the whole photo uncropped, the alt text (or markdown title) as caption, "From <heading>" (h2 · h3 for nested headings) with a jump back to the marker, an `N / M` counter, prev/next, arrow keys, swipe, Esc. Built by `themes/fugu/layouts/_default/_markup/render-image.html` (thumbnail at 480px wide, display copy capped at 1600px; `static/images` is mounted into assets for this) and `initPhotos` in `themes/fugu/assets/js/automagic-sidebar.js`. Without JS and in print, images stay inline
- **Scaling callout** (`.ing-config-panel`, 2026-10-07, `mockups/scale-callout.html`): the gear beside a recipe's first Ingredients heading opens a 256px callout with a `^` pointer whose tip sits under the gear's centre. Scale: a Franklin label with the mono `--accent-strong` value beside it (`1.5×`), a restyled range (accent-filled track to an 18px ringed thumb), mono step labels 1–5 (current step in `--accent-strong`), and an italic Lora yield line ("Serves 4–6 · 9 patties") when servings or portions can scale. A rule, then Units as a segmented control: one row, 5px corners (a setting, not a filter), active segment `--accent-soft`. Escape closes it. **Popovers share this look**: `--surface`, `--border-strong`, 8px radius, soft shadow, and a 7px pointer on the side facing what opened it; the glossary popover has it too, except at card width, where it spans the card and drops the pointer
- **Formula diagram** (`.formula`, 2026-10-06, `mockups/formula-diagrams.html`): a recipe's ratio drawn as one row of icons joined by `+`, `:` or `→`, with a Franklin label, a mono `--accent-strong` quantity, and an optional italic list of swaps (one per line) under each icon; an optional `=` result slot in `--ink-muted`. Operators are `--accent` and each one wraps together with the slot it introduces. The row, its bar and caption are centred in their column, and the card strip is centred in its card (2026-10-07). Ratios lead with the number in large mono, with an optional proportion bar. Icons: `assets/icons/formula/*.svg`, a 48-unit grid with 2-unit round strokes in `currentColor`, one `--accent-soft` fill on the object's body and `--surface` on lids, inlined so dark mode follows the tokens; icons are simple, not hand-wobbly. Labels are one word everywhere. Full size (48px icons, 96px slots) in the body column, compact (34px, 50px slots, five fit) in `.recipe-sidebar-section`. Written as a ```` ```formula ```` block (`FORMAT.md`), drawn by `themes/fugu/layouts/_default/_markup/render-codeblock-formula.html` + `partials/formula-slot.html`. On cards, a 24px strip (`.rcard-formula`, `partials/formula-strip.html`, built 2026-10-07) shows icons and operators only, plus a ratio's numbers; the intro clamps to 2 lines on those cards so heights match, and each slot's label, quantity and swaps are in a native title tooltip
- **Format/component gallery card** (`.comp-card`) — style-guide's own documentation device. Briefly reused for real content (the homepage's food memories and "Technique & reflections" bands); both moved onto `.rcard` on 2026-09-29 once its type scale (title/note font sizes, padding) turned out to have drifted from `.rcard`'s — rather than keep reconciling two card components for the same "teaser" job, `.comp-card` went back to being gallery-only. Padding and font sizes were brought in line with `.rcard` anyway (`14px 16px 12px`, `1.02rem` label, `.84rem` note, clamped to 3 lines) so the two still read as one family wherever `.comp-card` does appear

### Decisions (2026-09-17, resolving `COMPONENTS.md`'s open list)

- **Recipe card**: the canonical `.rcard` wins over the alternate tabbed/dated card. The alternate colored its left edge per cuisine, which contradicts the cuisine chip's own rule (always the same yellow, never color-coded by cuisine) — keeping one card design also keeps that rule intact.
- **Cuisine browsing**: `.browse-list` (label + mono count) is the only taxonomy-browse pattern. The competing `.cuisine-chip` (dot + count) reused the per-recipe chip's class name for an unrelated component — retired, and the name `.cuisine-chip` now means only the per-recipe filled chip.
- **Archive stats**: the plain `.stat-rail` wins over the rotated-card-stack ledger. It already does the job in two different contexts (recipe header, homepage hero) without a bespoke visual device — the ledger would have been a one-off.
- **Search & theme toggle placement**: homepage's answer wins — real search input in the hero, labeled theme-toggle pill in the footer. Both the header icon-button pair and the toolbar-only placement are retired.
- **Page-level "this is thin" note**: the inline caveat wins over a full-width banner — smaller, scoped to the section it's actually about, doesn't interrupt every page load. Renamed `.section-caveat` since it's used beyond nav (e.g. above a single-entry Food Log section).
- **Essay/reference teasers**: the card grid (`.rcard`, as of 2026-09-29 — see that entry above) and `.browse-list` (reference guides) both win over their label/description-row alternates — one less layout to maintain, and both were already real, working components before the alternates existed.
- **Wordmark**: plain text, no per-letter color accent.
- **Footer shape**: homepage's `.site-footer` (brand blurb + link columns + theme toggle) wins over the earlier simpler footer — it's the only one built Hugo-config-aware (`footer.showAppearanceSwitcher`).

## Favicon

Settled 2026-09-24 (fourth pass; the pixel-grid pans and fried eggs in
`icons.html` were the first, a cast-iron pan on an `--accent-soft` tile the
second, an enamel pan on a `--surface-2` burner tile the third). Source and
variants: `favicon-heart-pan.html`, variant 08 ("Enamel, no tile, filled").
Cast iron looked good large but turned into a dark blob at 16px; the burner
tile that replaced it worked on both light and dark tabs but cost the mark
margin. Dropping the tile and scaling the pan + heart into the freed space
reads bolder at 16px than either — the cream floor and red rim carry enough
contrast on their own, no tile needed.

A heart in a top-down enamelled skillet, no background. The handle points to
the top-left at 45°. It has to stay diagonal-but-thin and paired with a round
pan floor; a thick diagonal handle heading bottom-right reads as a
magnifying glass (search icon) at 16px.

| Part | Value | Note |
|---|---|---|
| Pan rim | `#D58167` | the palette's red at the shared 57%/62% formula (`hsl(14 57% 62%)`); rim 2 units, thick enough to hold at 16px |
| Pan floor | `#FBFBF6` (`--surface`) | |
| Heart, handle | `#7C361D` (`--accent-strong`) | handle 4.5 units |

No background tile: the mark fills the full 32×32 canvas, pan radius 13
centred at (17.5, 17.5), handle cap out to roughly 1.5 units of the
top-left corner. `favicon.svg` is transparent everywhere it's used as a tab
icon or nav mark, so it sits directly on whatever chrome or page background
is behind it — verified against both light and dark browser tab strips.

Every value is an existing token or the palette's own red; the favicon adds
no new colours.

The same `favicon.svg` is the logo mark: 26px, 8px gap, in front of the
wordmark in the nav and the mobile drawer head (`.site-logo-icon`). The
footer and homepage h1 stay text-only.

`apple-touch-icon.png` and the two `android-chrome-*.png` files are the one
exception: home-screen icon slots expect an opaque square, so those three
are rendered on a `#EAEBDF` (`--surface-2`) square background (no `rx` —
iOS/Android mask their own corners) instead of transparent. `favicon.ico`
and the 16/32 PNGs stay transparent, matching `favicon.svg`.

Files, all in `static/`: `favicon.svg` (source of truth, transparent),
`favicon.ico` (16/32/48, transparent), `favicon-16x16.png`,
`favicon-32x32.png` (transparent), `apple-touch-icon.png` (180),
`android-chrome-192x192.png`, `android-chrome-512x512.png` (opaque
`--surface-2` background), `site.webmanifest`. Wired in by
`layouts/partials/favicons.html`, which Blowfish's `head.html` picks up in
place of its defaults. To change the icon, edit `favicon.svg` and re-render
the PNGs and ICO from it. Render with headless Chrome
(`--headless --screenshot`, `--default-background-color=00000000` for the
transparent sizes) at each target pixel size directly rather than
downscaling one large render — ImageMagick's own SVG renderer draws the
stroked handle as a hairline, and downscaling loses the per-size hinting a
direct render gets at 16px.

## Spacing & radius

Not a formal 4/8px scale yet — this is descriptive of what's accumulated
across mockup rounds, not a system to copy blindly (see style guide §6, open
question). Roughly:

- **Radius**: 3px (tags, stat steps) · 4–5px (checkbox, buttons, chip base) · 6px (cards) · 8px (mega-menu panel) · 14px (filter pill, full pill shape)
- **Gaps**: 6–10px (chip rows, stat pairs) · 16–22px (card padding, grid gaps) · 26–32px (column gaps, section spacing)
- **Page bottom**: 40px from the last thing on any page to the footer, at every width. Set once on `<main>` (`padding-bottom`), not by whichever block comes last; blocks that end a page carry no bottom space of their own (2026-10-07, `mockups/page-bottom-spacing.html`)
- **Breakpoint**: 680px is the only one in use so far (nav → drawer, grids → 1 column)

## Where this lives

- `style.html` — full visual mock of this document, at real scale (read this first, always)
- `COMPONENTS.md` / `components.html` — the full component inventory (markdown spec + full visual mock), including everything not yet promoted into this document
- `archived/` — the mockup rounds this was distilled from (`style-guide.html`, `recipe-spec-sheet.html`, `homepage.html`, `landing-page-alt.html`) — reference only, not the working copies
