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
  pages (`docs/METHODS.md`, PLAN.md Methods phase 2): the methods list at
  `/tags/method/`, a blueprint's page with its parts in order, a method
  page's chips and part navigation, method cards, and what principle,
  status, and method share. Builds added 2026-10-10: build cards and a
  picks comparison on the blueprint page, options as pills, a build page,
  and recipes grouped by build. Queued for Fugu; its §7 choices are open.

- **`in-development.html`**: proposal (2026-10-07) to make `draft: true`
  mean "published, still changing" instead of hidden. A flag-blue callout
  on the page (stock sentence from config, optional per-recipe
  `working_on` note, link to an explainer page), a labelled mark on cards
  with a hover/tap popover, Fugu's "In development / Canon" wording, and
  four kitchen-flavoured options for Not a Chef, switchable live. Strip chosen 2026-10-07 (with a dotted line above the
  note), banner sentence in config, essays included. Not built.

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
  Food Log, and About pages (2026-09-24). Not built yet. Also published as
  an artifact: https://claude.ai/artifact/Ga6iBFYqvHfFt1yki672pg

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
  and `content/essays/reference-essays/win-the-fridge.md`; `STYLE.md`'s
  Principle chip, Glossary link, Definition callout, and Reference list
  entries describe it.

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
