# Not a Chef — style standards

A style guide for "Your dad is not a chef".

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
(`warped.css`'s flourish-bar hues). Not a Chef reorders the hierarchy to lead
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

Always set line-height as a **unitless multiplier** (`line-height: 1.6`), never a
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

- **Base**: `1.6`, on `body`/`html` (16px root) — this is where everything
  not otherwise specified inherits from.
- **Headings**: tighter, `1.05`–`1.3` depending on size — large display type
  needs less line-height, not the body ratio.
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
- **Recipe card** (`.rcard`) — title, taxonomy row (cuisine chip + tags), a stat row (prep/cook/serves in mono), optional flags row (Mechanic/Variations, shown only when the recipe actually has that section)
- **Listing page header** (`.ltitle` / `.listing-count`) — title + a count line ("83 recipes · showing 18"), distinct from the hero used for page openers
- **Section caveat** (`.section-caveat`, formerly `.nav-caveat`) — a one-line honesty note for admitting a section is thin; not limited to nav panels, use it above any under-built section
- **Nav item with mega-menu** — caret only on items with a real dropdown (Recipes, Reference); other sections stay plain links until they have enough content to categorize
- **Browse list row** (`.mega-col a` / `.browse-list a`) — label + right-aligned mono count, used for all taxonomy browsing (by course, by cuisine, reference guides — see Decisions below)
- **Search box** — real `<input>`, lives inline in the homepage hero, not a header icon button
- **Theme toggle** (`.theme-toggle`) — labeled pill, cycles system → light → dark; lives in the **site footer**, matching `footer.showAppearanceSwitcher` in Hugo config
- **Site footer** (`.site-footer`) — brand blurb, link columns (Browse / Index), theme toggle, meta line
- **Stat rail** (`.stat-rail`) — the one component for "numbers at a glance," used both in a recipe header (serves/prep/cook/total) and the homepage hero (recipes/cuisines/tags/guides)
- **Format/component gallery card** (`.comp-card`) — also reused for real content: the four essay-format teasers on the homepage

### Decisions (2026-09-17, resolving `COMPONENTS.md`'s open list)

- **Recipe card**: the canonical `.rcard` wins over the alternate tabbed/dated card. The alternate colored its left edge per cuisine, which contradicts the cuisine chip's own rule (always the same yellow, never color-coded by cuisine) — keeping one card design also keeps that rule intact.
- **Cuisine browsing**: `.browse-list` (label + mono count) is the only taxonomy-browse pattern. The competing `.cuisine-chip` (dot + count) reused the per-recipe chip's class name for an unrelated component — retired, and the name `.cuisine-chip` now means only the per-recipe filled chip.
- **Archive stats**: the plain `.stat-rail` wins over the rotated-card-stack ledger. It already does the job in two different contexts (recipe header, homepage hero) without a bespoke visual device — the ledger would have been a one-off.
- **Search & theme toggle placement**: homepage's answer wins — real search input in the hero, labeled theme-toggle pill in the footer. Both the header icon-button pair and the toolbar-only placement are retired.
- **Page-level "this is thin" note**: the inline caveat wins over a full-width banner — smaller, scoped to the section it's actually about, doesn't interrupt every page load. Renamed `.section-caveat` since it's used beyond nav (e.g. above a single-entry Food Log section).
- **Essay/reference teasers**: the card grid (`.comp-card`, already reused for the four essay formats) and `.browse-list` (reference guides) both win over their label/description-row alternates — one less layout to maintain, and both were already real, working components before the alternates existed.
- **Wordmark**: plain text, no per-letter color accent.
- **Footer shape**: homepage's `.site-footer` (brand blurb + link columns + theme toggle) wins over the earlier simpler footer — it's the only one built Hugo-config-aware (`footer.showAppearanceSwitcher`).

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
