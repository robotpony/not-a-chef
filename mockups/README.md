# Mockups

Static HTML/markdown design specs for Bruce loves to cook, saved locally so decisions
made in them don't get lost between sessions. Open any `.html` file directly
in a browser — no build step.

## Current — read these

- **`STYLE.md`** — the settled design system as text/tables: color tokens,
  type roles, the ratified component list, spacing. Source of truth for how
  the site should look. Read it (or `style.html`, below) before any new
  visual/layout work.
- **`style.html`** — full visual mock of `STYLE.md` — every token, typeface,
  and ratified component rendered at real scale, not described in a table.
  If this page and `STYLE.md` ever disagree, fix whichever one is wrong;
  neither is allowed to silently drift from the other. Also published as an
  artifact: https://claude.ai/artifact/CHRDGGH91g4Hovd7yVZceP
- **`COMPONENTS.md`** — the full component inventory, broader than
  `STYLE.md`'s ratified subset: every candidate not yet promoted,
  documentation/harness-only chrome, and — most usefully — every place two
  mockup rounds solved the same problem two different ways (recipe cards,
  cuisine browsing, archive stats, footers, theme-toggle placement). Read
  this before a quality/consolidation pass, or before building a new
  component that might already exist in some form.
- **`components.html`** — full visual mock of `COMPONENTS.md`, organized in
  the same order with the same status badges. Competing duplicates are shown
  side by side for direct comparison, not scattered across sections. This is
  the review copy for the "filter for quality" pass. Also published as an
  artifact: https://claude.ai/artifact/MwRnqh7dJJvgWXqFoetU9m

- **`formula-diagrams.html`**: proposal (2026-10-06) for a one-row icon
  diagram of a recipe's ratio (`+`, `:`, `→`), written as a fenced
  `formula` block and drawn by a Hugo render hook from a shared icon kit,
  after Scorekeep's rules-page diagrams. Veg patties is the worked example.
  Built 2026-10-06 (`render-codeblock-formula.html`, `partials/formula-slot.html`,
  `assets/icons/formula/`); `STYLE.md`'s Formula diagram entry describes it.
  The recipe card strip (§5) was built on 2026-10-07 (`partials/formula-strip.html` in Fugu), with a hover tooltip per slot added.

- **`formula-icons-2.html`**: proposal (2026-10-17) for fifteen more
  formula icons (lemon, vinegar, soy, honey, jar, pickle, mustard, lentils,
  oats, fruit, sugar, pepper, herb, strainer, oven), drawn to the first
  kit's rules, shown beside the kit at each size and in diagrams from real
  Mechanics. Approved 2026-10-17; the SVGs in `formula-icons-2/` went
  into Fugu's `assets/icons/formula/` the same day.

- **`formula-icons-3.html`**: proposal (2026-10-27) for three more
  formula icons for a patties section on Cornmeal fried chicken (pound,
  trim, soak, dredge, fry): a meat mallet (or a flat pounder, the
  alternative), a chef's knife, and a sliced bun, shown at each size,
  beside the kit, and in the section's diagram. SVGs in `formula-icons-3/`.
  Pounder chosen 2026-10-27: solid column, teeth underneath. A chicken
  breast (`breast`) added the same day for the Pound step; approved, and
  all four (`pounder`, `knife`, `bun`, `breast`) are in Fugu's kit.

- **`soft-colour.html`**: thinking mock (2026-10-30) for PLAN.md's
  Design v2 "Soften the colour scheme", after the cookbook-site notes.
  Cards and a recipe excerpt three times: A as built, B with the five
  hues pulled toward the neutrals, C with B's tokens plus one accent and
  text-only chips, over cards, a recipe page, and diagrams (a formula, the
  smash burger build, drink glasses, copied from the built site). Light,
  dark, and auto toggle. A mixer below takes each
  softening as a checkbox with a note (including lighter backgrounds and
  softer food colours), beside A, and copies the take to
  the clipboard as requirements text. B's tokens are a first guess and
  untested for contrast.

- **`scale-callout.html`**: proposal (2026-10-07) to redraw the recipe
  scale/units menu as a callout with a `^` pointer to the gear, a restyled
  slider with step labels, and units as a drop list (segmented control
  shown as the alternative). Built 2026-10-07 with the segmented control;
  `STYLE.md`'s Scaling callout entry describes it.

- **`methods-icon.html`**: proposal (2026-10-10) for the methods concept
  mark (`docs/METHODS.md`): five icon candidates at 48/24/16/12px, two
  ways to colour the chip without a sixth hue, the chips on cards, and the
  full set with the later plant-based leaf. Decided 2026-10-10: fan-out in
  the accent colour (`STYLE.md` Method chip).

- **`methods-pages.html`**: proposal (2026-10-10) for the methods concept
  pages (`docs/METHODS.md`, PLAN.md history, Methods phase 2): the methods list at
  `/tags/method/`, a blueprint's page with its parts in order, a method
  page's chips and part navigation, method cards, and what principle,
  status, and method share. Builds added 2026-10-10: build cards and a
  picks comparison on the blueprint page, options as pills, a build page,
  and recipes grouped by build. Built 2026-10-10 in Fugu and reshaped
  since (`STYLE.md` Methods and blueprint pages); the list moved to
  `/methods/` on 2026-10-11.

- **`methods-top-level.html`**: proposal (2026-10-11, PLAN.md history, Methods phase 7) for
  methods as a top-level section: the folder and URL move to
  `content/methods/` (before, now, proposed), the redirect question, the
  six-item nav at desktop, 700px and phone widths (it overflows at 700px),
  and the homepage with a methods band in three arrangements (A: added as
  a band, B: one essay row, C: essays as two side-by-side lists), each with
  its measured height. Decided 2026-10-11: folder move,
  `/methods/` as the methods page, "Food Log" in the nav, homepage C.
  Built the same day: the folder move, the nav, and the homepage
  (`STYLE.md` Homepage bands).

- **`methods-list-builds.html`**: proposal (2026-10-11) for the methods
  list before publish: hover moves off the blueprint block (which isn't a
  link) onto its part rows and name, with a soft fill and a `→`; and the
  builds shown beside the blueprint with their stack drawings, as tiles
  (option A) or a bottom-aligned lineup in one panel (option B,
  recommended in the mock). Decided 2026-10-11: §1 hover and option A,
  since each build is its own page and so gets its own card, and A holds up
  better on a phone. Built the same day (`STYLE.md` Methods and blueprint pages);
  superseded 2026-10-12 by `methods-list-and-blueprint.html`, which moves the
  builds off the list.

- **`blueprint-page-parts.html`**: proposal (2026-10-11) for the
  blueprint page: the builds comparison at equal column widths
  (`table-layout: fixed`), and the parts list's full-width lines answered
  with recipes beside the parts, as a sticky sidebar (option A) or a
  per-part column fed by a new `part` field on recipes (option B,
  recommended). Decided 2026-10-11: §1 and option B; the empty state
  stays, since recipes for the empty parts are coming. Built the same day
  (`STYLE.md` Methods and blueprint pages). The `part` field went
  2026-10-11, when blueprints became folders and recipes stopped carrying
  blueprint fields, and the comparison table is set aside
  (`docs/METHODS.md`).

- **`methods-list-sidebar.html`**: proposal (2026-10-11) for the methods
  list's page balance: the page moves onto the recipe/reading layout (body
  column plus the 20.6rem sidebar, holding search, counts, "On this page",
  and further reading), with switches for the definition (lede, callout,
  or in the sidebar), the builds (a scrolling rail, a wrapping grid, or a
  list), and 3 or 6 builds. §3 keeps the full width for comparison.
  Decided 2026-10-11: sidebar, lede, rail, as recommended (`STYLE.md`
  Methods and blueprint pages). Built 2026-10-11; the builds rail was
  superseded 2026-10-12 (`methods-list-and-blueprint.html`).

- **`methods-list-and-blueprint.html`**: proposal (2026-10-12) to stop the
  methods list and a blueprint's page showing the same build cards. The list
  becomes the map (each blueprint's block: description, compact parts, and its
  builds as a line of name pills, drafts dashed) and the blueprint page the
  shelf (the build cards, only there), with the list's compact parts block in
  place of its long one. One-pan pasta is added as a second blueprint to test
  it. Switches for builds on the list (names, small drawings, count, cards) and
  parts on the blueprint (compact, compact with options, long); combining the
  pages is written up and not proposed. Decided 2026-10-12: names, compact, and
  one-pan pasta added as test kitchen pages. Built the same day (Fugu `e6dee79`,
  with a lead line over the blueprint page's parts in `e8a76b1`), plus build
  cards two across on desktop.

- **`principle-page-sidebar.html`**: proposal (2026-10-11) giving the
  win-the-fridge principle page the methods list's frame: a review of the
  page as built, then a mock switching between as built and the sidebar
  version (definition as intro or callout, cards two or three across).
  Decided 2026-10-11: sidebar, intro, three across, as recommended
  (`STYLE.md` Definition callout). Template half is Fugu's.

- **`patty-sear.html`**: proposal (2026-10-11) for a darker seared top on
  the layer kit's patties, which `--surface` left near-white in light mode.
  Four options side by side in light and dark: current, a `--sear` fill,
  stipple only, and sear plus heavy stipple. The `--sear` tokens are in
  `STYLE.md` §5 and `custom.css`; D won (sear plus four times the speckle, with a lighter light-mode brown); the patty's
  fills changed in `exploded-builds.html` and `export-layers.mjs` re-exported
  the kit for Fugu.

- **`blueprint-lineage-sidebar.html`**: proposal (2026-10-11) for where a
  blueprint's lineage goes now that the page has a sidebar and the track is
  cramped in the body column. Switches between two sidebar forms kept
  horizontal (a dot strip with a row per build under it; angled labels on
  the track), a full-width band under the definition, and today's. Phone
  width keeps the body's vertical list. Round 2 (2026-10-11) adds two vertical forms: a spine to scale, and an
  evenly spaced list. Decided 2026-10-11: vertical to scale, desktop only
  (`STYLE.md` Methods and blueprint pages). Template half is Fugu's.

- **`exploded-builds.html`**: proposal (2026-10-10) for drawing a build as
  an exploded view (layers pulled apart, each drawn as the thing, leader
  lines to labels and roles) instead of flat bars: the layer kit, the three
  burger builds labelled and on cards, patty options, lasagne with a repeat
  bracket, a BLT, and the `stack` source. Round 2 (2026-10-10) redraws it
  in the formula icons' style (one ink line, `--accent-soft` bodies,
  `--surface` tops, theme tokens); the round 1 colour version is a toggle.
  Labels on the right, decided; no assembled view for now. Round 3: a
  detail pass in strokes (striped bacon, crinkle-cut pickles, a mustard
  zigzag, tomato chambers, a crust rim and open crumb on cut bread).
  Accepted 2026-10-10, settled 2026-10-17 (`STYLE.md` Exploded build diagram); a later
  pass refines the drawings from reference examples (PLAN.md history, Methods phase 6).
  2026-10-12: a `lettuce-shredded` layer (a heap of flat ribbons), and the
  leaf lettuce, mayo, and burger sauce report their real reach (`data-edge`)
  so leader dots clear them.
- **`shredded-lettuce.html`**: proposal (2026-10-14) to redraw the
  `lettuce-shredded` layer, which reads as tiny bananas, from Bruce's two
  photos of shredded iceberg. v1 beside three options (A strands on the
  mound, B a mound with strokes, C wider frilly ribbons), at full size, card
  size, and on a bun base, light and dark. Round 2 (same day) replaces A to C,
  which read as flat sticks, with D to F after two drawn references: a lumpy
  mound drawn flat on the page, pale strands following its slopes, arches
  over the top, strays at the base. Round 3 drops the mound (G, H); round 4
  (I, J) lays the strands out like a bird's nest pressed into a patty's
  shape: the bun's footprint, a flat top, an even edge. G won (`STYLE.md`
  Exploded build diagram) and moved into `exploded-builds.html` for export.

- **`in-development.html`**: proposal (2026-10-07) to make `draft: true`
  mean "published, still changing" instead of hidden. A flag-blue callout
  on the page (stock sentence from config, optional per-recipe
  `working_on` note, link to an explainer page), a labelled mark on cards
  with a hover/tap popover, Fugu's "In development / Canon" wording, and
  four kitchen-flavoured options for Not a Chef, switchable live. Strip chosen 2026-10-07 (with a dotted line above the
  note), banner sentence in config, essays included. Built 2026-10-07 as
  the Test kitchen (`STYLE.md` Draft state).

- **`page-bottom-spacing.html`**: proposal (2026-10-07) to make 40px
  from the last content to the footer a page-level rule. Today every page
  borrows it from its last block, and About, which has none, runs into the
  footer. Built 2026-10-07 (option A, 40px); `STYLE.md`'s Spacing entry
  describes it.

- **`recipe-card-v2.html`** — the recipe card redesign (2026-09-23) with
  real recipe data: before/after, homepage row, and recipes list grid.
  Built into `themes/fugu/layouts/partials/recipe-card.html` and
  `themes/fugu/layouts/recipes/list.html`; `STYLE.md`'s Recipe card entry describes it.

- **`reading-sidebar.html`**: proposed sidebar for essay, reference,
  Food Log, and About pages (2026-09-24). Built (`STYLE.md` Reading
  sidebar). Also published as an artifact: https://claude.ai/artifact/Ga6iBFYqvHfFt1yki672pg

- **`sidebar-images.html`**: proposal (2026-09-28) to move recipe, essay,
  and Food Log images out of the body into a sidebar Photos module, with
  thumbnails and a pop-over viewer. Uses web-sized copies of the site's
  real photos in `img/`. Built 2026-09-28 (`render-image.html`,
  `initPhotos` in `automagic-sidebar.js`); `STYLE.md`'s Photos entry
  describes it. Also published as an artifact:
  https://claude.ai/artifact/U1bhBmJqEwpNb8Bhfx7yGf

- **`win-the-fridge.html`** — special treatment for the win-the-fridge tag
  (2026-09-27): the green principle chip, the glossary popover mechanism,
  the `/tags/win-the-fridge/` definition-callout term page, and the new
  reference-essay format. Built into `assets/css/custom.css`,
  `themes/fugu/layouts/partials/principle-chip.html`, `themes/fugu/layouts/partials/recipe-card.html`,
  `themes/fugu/layouts/partials/article-meta/basic.html`, `themes/fugu/layouts/_default/term.html`,
  `themes/fugu/layouts/_default/_markup/render-link.html`, `content/reference/glossary.md`,
  and `content/reference/essays/win-the-fridge.md`; `STYLE.md`'s
  Principle chip, Glossary link, Definition callout, and Reference list
  entries describe it.

- **`spreads-and-colour.html`**: proposal (2026-10-14) for the layer kit:
  knife marks on mayo and burger sauce that read as spread (from a photo of
  mayo on toast), four ways to place a spread on the bun (its own layer, on
  the base's cut face, the top bun opened toward you, bun-wide discs), and
  three soft food colours (green for lettuce and pickles, red for tomato and
  ketchup, yellow for mustard) as kit-only tokens. Reuses
  `exploded-builds.html`'s kit code, copied in. Decided 2026-10-14: the
  "Fuller" colours (`STYLE.md` §6) and spreads drawn on the bun's cut face
  (`bun-base + mayo`, `bun-top + mayo`).

- **`top-bun-open.html`**: the plain `bun-top` redrawn opened toward the
  viewer with bare crumb (2026-10-14), so every build's top bun has one
  shape whether or not anything is spread on it. Built (`STYLE.md`
  Exploded build diagram).

- **`site-phase.html`**: picks for PLAN.md's Site items (2026-10-14): the
  plant-based principle chip's card label (full, "Plants", leaf only), its
  header row and tag page, a tickable list of plant-based recipes, and a
  per-recipe table for splitting the American cuisine, which writes out the
  changes for the content agent. Also shows the built footer build number.
  Decided 2026-10-14: the leaf alone on cards (option C), Bruce's recipe
  ticks, the American split as edited in the table, and (after §6)
  green for plant-based alone, with Win the fridge moved to the flag blue; recorded in
  `STYLE.md` §4 and the Principle chip entry.

- **`icons.html`** and **`favicon-heart-pan.html`**: the favicon rounds
  (2026-09-22 to 09-24). `icons.html` was the first (fried egg colourways,
  then a pan on a tile); the shipped favicon is `favicon-heart-pan.html`
  variant 08, "Enamel, no tile, filled". `STYLE.md`'s favicon section has
  the history.

- **`food-log-homepage.html`**: Food Log cards with real summaries, and two
  new homepage bands (2026-09-29). Built; `STYLE.md`'s Recipe card entry
  describes the Food Log card.

- **`drink-diagrams.html`**: ways to draw a drink (2026-10-27), shown with
  the Knotty Irishman: A, the existing `formula` fence as a ratio; B, a new
  `glass` fence (a section through the glass, bands to scale, as pour bands
  or one band per mix); C, small glasses on the `/drinks/` cards. Decided
  2026-10-27: A on drink pages, C on cards, B dropped; the drink fills are
  `STYLE.md` §7.

- **`glossary.html`**: proposal (2026-10-30) for a concepts glossary: a
  glossary word in prose (three underline weights, A recommended: today's
  `.glossary-link`), its popover as a plain tooltip with no link, the tap
  on a phone, the A–Z glossary page (`<dl>`, other forms, "Used in"), the
  footer link, one Obsidian file per concept, and the `candidates` and
  `link` tools. The open questions are in `docs/REVIEW.md`.

## `archived/` — reference only

The four original mockup rounds `style.html`/`COMPONENTS.md` were built
from and distilled from. Not the working copies — don't build new work
against these directly, and don't expect them to stay in sync with
`STYLE.md`/`COMPONENTS.md` going forward.

- `style-guide.html` — the original settled-system document (has some extra
  historical narrative `style.html` doesn't: the warpedvisions.org
  palette-comparison writeup, earlier rounds' open questions)
- `recipe-spec-sheet.html` — recipe page and site nav mockup (five recipe
  variants: baseline, ratio-based, by-weight, multi-component, draft state).
  Where most of the system's tokens and components were first exercised and
  decided
- `homepage.html` — the homepage mockup, built correctly against the system;
  reuses the nav/card/filter/browse-list components verbatim rather than
  inventing new ones. Real recipe-index data throughout. Also published as
  an artifact: https://claude.ai/artifact/FHyhz91R72xVnt2y1ht2ya
- `landing-page-alt.html` — an earlier, discarded homepage concept, kept as
  an alternate layout exploration. Colors and type were both brought into
  line with the system on 2026-09-17 before this archive move — it's
  consistent, just superseded by `homepage.html` as the homepage direction

## Working notes

- `STYLE.md`/`COMPONENTS.md` are living records — update them (and their
  `.html` mocks to match) whenever a decision from the "filter for quality"
  pass lands, rather than letting the mocks drift ahead of the docs or vice
  versa.
- Before starting any new visual mockup for this project, read `STYLE.md`
  (or `style.html`) first, and check `COMPONENTS.md` for whether the
  component you're about to build already exists in some form.
- All color tokens across every file in this folder (including `archived/`)
  should be byte-identical — verified 2026-09-17 by diffing each file's
  `--token:#hex` declarations. If you add or edit a mockup, re-check that
  before committing.
