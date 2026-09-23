# Component index

**Resolved 2026-09-17**: every open decision below and in the "filter for
quality" section at the end has been made — see `STYLE.md`'s "Decisions"
subsection under Components for the reasoning behind each. This file is kept
as the historical record of the duplicates and candidates that led to those
decisions, not re-scored below; treat any 🔴/🟡 status marker here as
describing the state as of the mockup rounds, not the current ratified system
(that's `STYLE.md`).

A full inventory of every distinct UI component found across the four
original mockup files, as of 2026-09-17. This is deliberately broader than
`STYLE.md`'s "Components" section — that list is the curated, already-ratified
subset; this one includes everything, including near-duplicates, one-offs,
and mockup-only chrome, so nothing found during the mockup rounds gets lost
before a quality pass decides what survives.

See `components.html` for this same inventory as a full visual mock — every
row rendered at real scale, with duplicates shown side by side.

**A file-location note:** the four original mockups this index catalogs
(`style-guide.html`, `recipe-spec-sheet.html`, `homepage.html`,
`landing-page-alt.html`) now live under `archived/` — kept for reference, not
the working copies. Below, they're referred to by their bare names (as they
were when this index was built); assume `archived/` in front of each `.html`
one.

**Status key:**
- ✅ **Canonical** — in `style-guide.html` itself, ratified, described in `STYLE.md` (see the real-scale version in `style.html`)
- 🟡 **Candidate** — built in `homepage.html` (against the system, real component-quality) but not yet folded into the style guide
- 🔵 **Documentation-only** — style-guide.html's own explainer chrome (swatches, type specimens); not meant for the real site
- ⚪ **Harness-only** — recipe-spec-sheet.html's review-mode toolbar (view switcher, frame switcher); explicitly not site UI
- 🔴 **Discarded/duplicate** — from `landing-page-alt.html`; either superseded by a canonical equivalent or a competing variant that needs a decision

---

## Navigation

| Component | Status | Where | Notes |
|---|---|---|---|
| Site nav + mega-menu (`.site-nav`, `.mega-panel`, `.mega-col`) | ✅ | recipe-spec-sheet, homepage | Caret only on items with a real dropdown (Recipes, Reference) |
| Mobile nav drawer (`.mobile-drawer-toggle`, `.drawer-panel`) | ✅ | recipe-spec-sheet, homepage | `<details>`-based, no JS needed to open/close beyond backdrop click |
| Browse list row (`.mega-col a` / `.browse-list a`) | ✅ | recipe-spec-sheet (in nav), homepage (standalone) | Label + right-aligned mono count. Homepage extracted this out of the nav context into `.browse-list` for reuse on the page body — **now the reference form** |
| Quick-filter chip in nav (`.mega-chip`) | ✅ | recipe-spec-sheet, homepage | Pill, no count, used inside the mega-panel's "Quick filters" column |
| "View all" link (`.mega-viewall`) | ✅ | recipe-spec-sheet, homepage | |
| Inline nav caveat (`.nav-caveat`) | 🟡 | recipe-spec-sheet | A one-line honesty note under the nav ("Reference itself only has tags on 5 of 19 files…"). Real, reusable pattern for admitting a section is thin — not yet promoted to the guide |
| Wordmark with accent letter (`.wordmark .name em`) | 🔴 | landing-page-alt | Alternate brand treatment (colors one letter of "Not *a* Chef"). Canonical `.site-logo` is plain text, no letter-accenting. Pick one |
| Icon-only header buttons (`.icon-btn`) | 🔴 | landing-page-alt | Bordered square icon buttons (search, theme) in the header. No equivalent in the canonical nav — canonical's search lives in the page body (`.search-box`) and its theme toggle lives in the **footer**, labeled, not icon-only. Three different "where does search/theme live" answers across the mockups; needs one decision |

## Hero / page-opener

| Component | Status | Where | Notes |
|---|---|---|---|
| Hero (eyebrow + h1 + lede) | ✅ | style-guide (own hero), homepage | `.hero-eyebrow` uppercase/tracked, h1 `text-wrap:balance` |
| Status pill (`.status-pill`) | 🔵 | style-guide | Flag-blue pill with a dot, used once to announce "decided this round." Documentation chrome, but the shape (dot + pill + flag color) is identical to `.draft-banner` — really the same component reused for "this doc's own status" rather than "this recipe's status" |
| Search box (`.search-box` / `.search-row`) | ✅ | recipe-spec-sheet (listing, static display text), homepage (hero, real `<input>`) | Two implementations of the same look: listing page's is non-functional display text, homepage's hero has a real input + label + `/` kbd hint. Homepage's is the more complete reference |
| Stat rail (`.stat-rail` / `.stat`) | ✅ | recipe-spec-sheet (recipe header: serves/prep/cook/total), homepage (hero: recipes/cuisines/tags/reference guides) | Same component, two different content sets — a good sign it generalizes |
| Ledger stat panel (`.ledger`, `.ledger-wrap` rotated-card-stack effect, `.stat-grid`) | 🔴 | landing-page-alt | An alternate to the stat rail above — a 2×2 grid of big mono numbers in a card with a stacked-index-card shadow effect. More visually assertive than the plain stat rail. Competing with the stat rail for the same "archive by the numbers" job — pick one |

## Recipe content

| Component | Status | Where | Notes |
|---|---|---|---|
| Recipe header (`.rhead`, `.rtitle`, taxonomy row) | ✅ | recipe-spec-sheet | |
| Ingredient check (`.ing`, custom checkbox) | ✅ | recipe-spec-sheet, style-guide (mini demo) | 19px target, no native chrome |
| Ingredient sub-head (`.subhead`) | 🟡 | recipe-spec-sheet | Groups a long ingredient list into named sections (e.g. "Based on 1 kg ground meat"). Real, useful, not yet in `STYLE.md`'s list |
| Ingredient sub-note (`.ing.sub`) | 🟡 | recipe-spec-sheet | A non-checkable tip line nested under an ingredient (e.g. "add split peas for more texture"), indented, smaller, no checkbox. Not yet documented |
| Mechanic callout (`.mechanic`, `.ratio`) | ✅ | recipe-spec-sheet, style-guide | |
| Procedure — prose (`.procedure.prose`) | 🟡 | recipe-spec-sheet | The **default** procedure treatment (plain paragraphs) — used in 4 of 5 example recipes. `STYLE.md` currently only documents the numbered-step variant below; this one is actually more common and should be documented as the default, with numbered steps as the exception |
| Procedure — numbered step (`.procedure ol`, CSS counter) | ✅ | recipe-spec-sheet, style-guide (mini demo) | Reserved for order-dependent steps (Pulled Pork's pressure-cooker sequence) |
| "To serve" / "Notes" section shell (`.section`, `.section-label`) | ✅ | recipe-spec-sheet | Generic labeled section wrapper, reused for To serve/Variations/Notes |
| Notes list (`.notes-list`, em-dash bullets) | 🟡 | recipe-spec-sheet | Real, distinct list style (dash bullet via `::before`), not separately named in `STYLE.md` |
| Notes sub-section (`.notes-sub`) | 🟡 | recipe-spec-sheet | A labeled sub-block *within* Notes (Dal Tadka's "Spice levels across the three recipes") — a heading + prose nested one level deeper than a plain note |
| Variation block (`.variation`, h3 + prose) | 🟡 | recipe-spec-sheet | Each variation gets its own heading + paragraphs. Not yet named in `STYLE.md`'s component list despite being a real, repeated pattern (3 variations in Dal Tadka alone) |
| Draft banner (`.draft-banner`) | ✅ | recipe-spec-sheet, style-guide | Block-level, top of a draft recipe |
| Inline draft badge (`.badge-tag`) | ✅ | recipe-spec-sheet, style-guide | Smaller inline variant, used inside a Notes bullet rather than at the top of the page |
| Wikilink (`.wikilink`) | 🟡 | recipe-spec-sheet | Internal cross-reference: dotted underline + trailing `→`. Real, used (Pulled Pork → its spice rub recipe), not in `STYLE.md` |
| External link (`.extlink`) | 🟡 | recipe-spec-sheet | Outside reference: faint underline + trailing `↗`, muted color. Distinct from wikilink, not in `STYLE.md` |
| Two-column ingredients/procedure layout (`.im-grid`) | ✅ | recipe-spec-sheet | The structural grid every recipe component section uses |

## Cards & listings

| Component | Status | Where | Notes |
|---|---|---|---|
| Recipe card (`.rgrid`/`.rcard`/`.rcard-top`/`.rcard-title`/`.rcard-intro`/`.rcard-stats`/`.rcard-stat`) | ✅ | recipe-spec-sheet, homepage, recipe-card-v2 | v2 (2026-09-23): one-line cuisine + tags, intro paragraph, compact accent stat line pinned to the bottom. Replaced the stacked stat pairs and the Mechanic/Variations flags row |
| Recipe card — alternate (`.rcard` w/ colored left tab, `.top-row`/`.label`/`.date`, stats as label+bold pairs) | 🔴 | landing-page-alt | A **structurally different** card for the same job. Left-edge color tab (now recolored to highlight/accent per the 2026-09-17 fix), a date shown (canonical card never shows a date), no cuisine-chip. This is the clearest head-to-head duplicate in the whole set — needs an explicit keep/cut decision, not just a color fix |
| Tag (`.tag`) | ✅ | recipe-spec-sheet, homepage, landing-page-alt | Neutral outline, never colored |
| Tag overflow badge (`.tag-more`) | 🟡 | recipe-spec-sheet, homepage | Dashed-border tag showing "+n" when a card's tag list is truncated. Real and used, not separately called out in `STYLE.md`'s Tag entry |
| Cuisine chip — per-recipe (`.cuisine-chip`, filled highlight) | ✅ | recipe-spec-sheet, homepage, style-guide | One per recipe, always the same yellow regardless of cuisine |
| Cuisine chip — taxonomy browse (`.cuisine-chip`, bordered + dot + count) | 🔴 | landing-page-alt | **Naming collision**: same class name, completely different component — this one is a "browse by cuisine" taxonomy chip (name + count), not a per-recipe tag. Homepage's `.browse-list` solves the same problem without reusing (and overloading) the cuisine-chip name — prefer that, and rename or retire this one |
| Filter pill (`.filter-pill`) | ✅ | recipe-spec-sheet, homepage | Pill-shaped, `aria-pressed` toggle state, no count |
| Filter row w/ grouping (`.filter-row`/`.filter-group`/`.filter-group-label`) | ✅ | recipe-spec-sheet | Listing-page filters grouped by taxonomy (Cuisine / Tags), each group labeled |
| Filter row — flat (`.filter-row`, ungrouped) | 🟡 | homepage | Homepage's "What's for dinner tonight?" section uses the same pills without the group-label wrapper — a legitimate simpler variant for a single flat set, not a conflict, but worth noting both forms exist |
| Filter chip with count (`.chip`/`.chip .count`) | 🔴 | landing-page-alt | Same job as `.filter-pill` but shows a count inline. Neither `STYLE.md` nor the canonical filter-pill supports counts today — this is a reasonable enhancement worth considering for promotion rather than outright discarding |
| Listing page header (`.listing-head`/`.ltitle`/`.listing-count`) | 🟡 | recipe-spec-sheet | Title + "83 recipes · showing 18" count line. Distinct from the `.hero`/`.block-head` patterns used elsewhere for page openers — a listing page's specific header shape, not yet named in `STYLE.md` |

## Essays / Reference teasers

| Component | Status | Where | Notes |
|---|---|---|---|
| Format/component gallery card (`.comp-card`/`.comp-card-label`/`.comp-card-note`, in a `.comp-grid`) | ✅ (promoted) | style-guide (component demos), homepage (essay format cards) | Started as style-guide's own documentation device, then genuinely reused in homepage.html for real content (the four essay formats) — a good example of a documentation-only pattern graduating to real use |
| Essay format list — label/description row (`.fmt-list .row .name`/`.desc`) | 🔴 | landing-page-alt | Competing layout for the same four-format content: a label-left/description-right row instead of homepage's card grid. Same content, two treatments — pick one |
| Reference guide list (`.browse-list a` w/ `.n` type word) | ✅ | homepage | Title + right-aligned type word (guide/reference/technique) |
| Reference guide list — alternate (`.ref-list .row`) | 🔴 | landing-page-alt | Near-identical to the above (title + right-aligned word); minor structural variant, lowest-priority duplicate to resolve |

## Feedback / state

| Component | Status | Where | Notes |
|---|---|---|---|
| Draft state (banner + inline badge) | ✅ | see Recipe content above | |
| Open question card (`.qlist`/`.qitem`/`.qitem-mark`) | 🔵 (candidate if promoted) | style-guide | Flag-blue-left-border callout for "this isn't decided yet" — used in the style guide's own "Open questions" section. A genuinely useful pattern (distinct from the Mechanic callout's accent-left-border) that could be promoted for real site use — e.g. flagging thin/incomplete content sections — but currently only used reflexively, to talk about the guide itself |
| Full-width notice banner (`.notice`) | 🔴 | landing-page-alt | Page-top banner ("Design concept for the Bruce loves to cook landing page…"). Competes with `.nav-caveat` (inline, under the nav) for the same "admit something about this page" job — two treatments, one job |

## Footer

| Component | Status | Where | Notes |
|---|---|---|---|
| Site footer (`.site-footer`, brand blurb, link columns, theme toggle) | 🟡 | homepage | Built new for homepage.html since no real site footer existed before this round — follows the real Hugo config (`footer.showAppearanceSwitcher = true`) by putting the theme toggle here rather than in the header. Not yet folded into `style-guide.html` — should be, it's the only footer built against the system |
| Theme toggle — labeled pill (`.theme-toggle`) | ✅ | style-guide, recipe-spec-sheet (in the review toolbar), homepage (in the real footer) | Cycles system → light → dark, shows current mode as text |
| Theme toggle — icon-only square | 🔴 | landing-page-alt | See Navigation section above — competes with the labeled pill for the same control |
| Simple footer (`footer`, `.foot-brand`, `.foot-links`) | 🔴 | landing-page-alt | An earlier, simpler footer shape (no theme toggle, no `.foot-meta` line). Superseded by homepage's `.site-footer`, which is more complete and Hugo-config-aware |

## Documentation-only chrome (archived/style-guide.html)

Not meant for the real site — these exist only to explain the system to a
human reader of the guide itself.

- Doc top bar with jump links (`.topbar`, `.tb-jump`)
- Two-up comparison card (`.compare`, `.compare-card`, `.swatch-row`) — used once, to compare the cookbook's palette against warpedvisions.org's
- Color swatch grid (`.swatch`, `.swatch-fill`, `.swatch-name`, `.swatch-hex`)
- Type specimen row (`.type-spec`, `.type-role`, `.type-face`, `.type-sample-ui`/`.type-sample-mono`)
- Spacing scale row (`.scale-row`, `.scale-vis`, `.scale-usage`)
- Miniature component demos (`.mini-ing`, `.mini-mechanic`, `.mini-step`, `.mini-draft`, `.mini-card`, `.mini-nav-item`) — small-scale previews of the real components listed above, built specifically for the gallery, not separate components in their own right

## Review-harness-only chrome (archived/recipe-spec-sheet.html)

Explicitly not site UI — this mockup's own review tooling for switching
between its five example recipes and two frame widths.

- Toolbar with brand/segmented controls (`.toolbar`, `.brand`, `.seg`, `.seg-btn`)
- Recipe switcher (`.switcher`, `.recipe-btn`, `.cap`)
- Mobile frame simulator (`.mobile-frame`, `.frame-caption`, `.site-frame` border/shadow treatment)

---

## What this means for the "filter for quality" pass

All resolved 2026-09-17 — decisions and reasoning now live in `STYLE.md`:

1. **Recipe card**: ✅ canonical `.rcard` kept; alternate tabbed/dated card discarded (its per-cuisine tab color broke the "cuisine chip is always yellow" rule).
2. **`.cuisine-chip` naming collision**: ✅ `.browse-list` is the only taxonomy-browse pattern; `.cuisine-chip` now means only the per-recipe filled chip.
3. **Archive stats display**: ✅ plain stat rail kept (proven in two contexts already); ledger panel discarded.
4. **Where search and the theme toggle live**: ✅ homepage's answer won — hero inline search, footer toggle. Header icon buttons and toolbar-only placement discarded.
5. **Page-level "admit something about this page" note**: ✅ inline caveat won, renamed `.section-caveat` (no longer nav-specific). Full-width banner discarded.
6. **Essay-format and reference-guide teasers**: ✅ card grid and `.browse-list` won over their label/description-row alternates.
7. **Promote the unnamed-but-real components**: ✅ ingredient sub-head/sub-note, notes list, notes sub-section, variation block, wikilink/extlink, listing-page header, prose-procedure-as-default, section caveat, site footer, and stat rail are all now in `STYLE.md`'s ratified list and demonstrated in `style.html` §3.
