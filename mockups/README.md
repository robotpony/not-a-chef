# Mockups

Static HTML/markdown design specs for Not a Chef, saved locally so decisions
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
