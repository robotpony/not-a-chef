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

Descriptive, not interactive — **cuisine only**. Never used for anything
else, so it never competes with the accent for attention.

### 3 · Utility, reserved — blue (`--flag`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--flag` | `#3D638F` | `#97B8D8` | draft/unreviewed banners and badges |
| `--flag-soft` | `#E1EAF4` | `#1D2835` | fill for the above |

Means "unreviewed," not "error." Blue reads as cool/pending against the
accent's warm/active — deliberately not red. **One role only**: the draft
state. Don't reach for it elsewhere.

### Green — reserved, unused

`warped-green` (`#68d6a1`) is documented in the style guide as part of the
five-hue family the palette derives from, but it is **not tokenized** and has
no role in the UI yet. Open question (see style guide §6): give it a
vegetarian/vegan indicator, or leave it out entirely. Don't invent a use for
it in a new mockup without settling this first.

### Where the palette comes from

All five hues (including the unused green) share one saturation/lightness
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
- **Wikilink** (`.wikilink`) — internal cross-reference: dotted underline + trailing →
- **External link** (`.extlink`) — outside reference: muted underline + trailing ↗, distinct from wikilink
- **Cuisine chip** — filled `--highlight-soft` / `--highlight` text, one per recipe, always yellow regardless of which cuisine — deliberately never color-coded by cuisine (see Decisions below)
- **Tag** — neutral outline (`--border-strong`), never colored
- **Filter pill** — pill-shaped (14px radius), neutral outline, `--accent-soft` fill when active — listing-page filters, distinct from the chip's "fact about the recipe"
- **Draft state** (banner or badge) — `--flag` blue, never red
- **Recipe card** (`.rcard`), v2 as of 2026-09-23 (`recipe-card-v2.html`): one-line taxonomy row (two slots, cuisine takes one when present, a tag repeating the cuisine is skipped, then `+N`; never wraps, chips/tags at `.62rem`), title, intro (the recipe's first paragraph before any `##`, or frontmatter `summary`/`description`; Lora `.84rem`, clamped to 3 lines), and a compact stat line pinned to the card bottom (Prep/Cook/Serves inline; faint Franklin labels, values bold IBM Plex Mono in `--accent-strong`; times shortened to `15m`/`2-3h` and parentheticals dropped on the card only, full value in the title attribute). The Mechanic/Variations flags row was removed. Same card on the homepage "Recently added" row and the recipes list page (`layouts/recipes/list.html`)
- **Listing page header** (`.ltitle` / `.listing-count`) — title + a count line ("83 recipes · showing 18"), distinct from the hero used for page openers
- **Section caveat** (`.section-caveat`, formerly `.nav-caveat`) — a one-line honesty note for admitting a section is thin; not limited to nav panels, use it above any under-built section
- **Nav item with mega-menu** — caret only on items with a real dropdown (Recipes, Reference); other sections stay plain links until they have enough content to categorize
- **Browse list row** (`.mega-col a` / `.browse-list a`) — label + right-aligned mono count, used for all taxonomy browsing (by course, by cuisine, reference guides — see Decisions below)
- **Search box** — real `<input>`, lives inline in the homepage hero, not a header icon button
- **Theme toggle** (`.theme-toggle`) — labeled pill, cycles system → light → dark; lives in the **site footer**, matching `footer.showAppearanceSwitcher` in Hugo config
- **Site footer** (`.site-footer`) — brand blurb, link columns (Browse / Index), theme toggle, meta line
- **Stat rail** (`.stat-rail`) — the one component for "numbers at a glance," used in the recipe header (serves/prep/cook/total); removed from the homepage hero 2026-09-22, where the "tonight" tag pills now sit beside search
- **Format/component gallery card** (`.comp-card`) — also reused for real content: the food memories band on the homepage

### Decisions (2026-09-17, resolving `COMPONENTS.md`'s open list)

- **Recipe card**: the canonical `.rcard` wins over the alternate tabbed/dated card. The alternate colored its left edge per cuisine, which contradicts the cuisine chip's own rule (always the same yellow, never color-coded by cuisine) — keeping one card design also keeps that rule intact.
- **Cuisine browsing**: `.browse-list` (label + mono count) is the only taxonomy-browse pattern. The competing `.cuisine-chip` (dot + count) reused the per-recipe chip's class name for an unrelated component — retired, and the name `.cuisine-chip` now means only the per-recipe filled chip.
- **Archive stats**: the plain `.stat-rail` wins over the rotated-card-stack ledger. It already does the job in two different contexts (recipe header, homepage hero) without a bespoke visual device — the ledger would have been a one-off.
- **Search & theme toggle placement**: homepage's answer wins — real search input in the hero, labeled theme-toggle pill in the footer. Both the header icon-button pair and the toolbar-only placement are retired.
- **Page-level "this is thin" note**: the inline caveat wins over a full-width banner — smaller, scoped to the section it's actually about, doesn't interrupt every page load. Renamed `.section-caveat` since it's used beyond nav (e.g. above a single-entry Food Log section).
- **Essay/reference teasers**: the card grid (`.comp-card`, already reused for the essay formats and food memories) and `.browse-list` (reference guides) both win over their label/description-row alternates — one less layout to maintain, and both were already real, working components before the alternates existed.
- **Wordmark**: plain text, no per-letter color accent.
- **Footer shape**: homepage's `.site-footer` (brand blurb + link columns + theme toggle) wins over the earlier simpler footer — it's the only one built Hugo-config-aware (`footer.showAppearanceSwitcher`).

## Favicon

Settled 2026-09-23 (third pass; the pixel-grid pans and fried eggs in
`icons.html` were the first, a cast-iron pan on an `--accent-soft` tile the
second). Source and variants: `favicon-heart-pan.html`, variant 07. Cast iron
looked good large but turned into a dark blob at 16px; the lighter enamel pan
with a dark heart holds up better small.

A heart in a top-down enamelled skillet, sitting on a rounded tile (the
burner). The handle points to the top-left at 45°. It has to stay
diagonal-but-thin and paired with a round pan floor; a thick diagonal handle
heading bottom-right reads as a magnifying glass (search icon) at 16px.

| Part | Value | Note |
|---|---|---|
| Tile (burner) | `#EAEBDF` (`--surface-2`) | one step darker than the pan floor so the tile edge shows on white tabs; `rx` 7 on a 32 grid, square for `apple-touch-icon.png` (iOS masks its own corners) |
| Pan rim | `#D58167` | the palette's red at the shared 57%/62% formula (`hsl(14 57% 62%)`); rim 2.25 units, thick enough to hold at 16px |
| Pan floor | `#FBFBF6` (`--surface`) | |
| Heart, handle | `#7C361D` (`--accent-strong`) | handle 3.5 units |

Every value is an existing token or the palette's own red; the favicon adds
no new colours.

The tile makes one icon work on light and dark browser chrome, so there is
no dark-mode variant.

The same `favicon.svg` is the logo mark: 26px, 8px gap, in front of the
wordmark in the nav and the mobile drawer head (`.site-logo-icon`). The
footer and homepage h1 stay text-only.

Files, all in `static/`: `favicon.svg` (source of truth), `favicon.ico`
(16/32/48), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`
(180), `android-chrome-192x192.png`, `android-chrome-512x512.png`,
`site.webmanifest`. Wired in by `layouts/partials/favicons.html`, which
Blowfish's `head.html` picks up in place of its defaults. To change the icon,
edit `favicon.svg` and re-render the PNGs and ICO from it.

## Spacing & radius

Not a formal 4/8px scale yet — this is descriptive of what's accumulated
across mockup rounds, not a system to copy blindly (see style guide §6, open
question). Roughly:

- **Radius**: 3px (tags, stat steps) · 4–5px (checkbox, buttons, chip base) · 6px (cards) · 8px (mega-menu panel) · 14px (filter pill, full pill shape)
- **Gaps**: 6–10px (chip rows, stat pairs) · 16–22px (card padding, grid gaps) · 26–32px (column gaps, section spacing)
- **Breakpoint**: 680px is the only one in use so far (nav → drawer, grids → 1 column)

## Where this lives

- `style.html` — full visual mock of this document, at real scale (read this first, always)
- `COMPONENTS.md` / `components.html` — the full component inventory (markdown spec + full visual mock), including everything not yet promoted into this document
- `archived/` — the mockup rounds this was distilled from (`style-guide.html`, `recipe-spec-sheet.html`, `homepage.html`, `landing-page-alt.html`) — reference only, not the working copies
