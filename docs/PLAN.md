# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Domain move

*Live 2026-10-18* (`deploy-2026-10-18`): `https://bruce-loves-to-cook.ca`, with `www` and old-domain 301s. Search Console and the old domain's certificate renewal are set up, and warpedvisions.org's posts link the new domain.

- [ ] Fugu's `exampleSite/content/about.md` links the old domain: fugu-agent's change.

## Diagrams

Diagrams are fences, specced in hugo-warped (`~/projects/sites/hugo-warped/fences/`, the hugo-warped agent; its open work is in its `PLAN.md`). Fugu reads every fence through hugo-warped's parse partials (module pinned at 4045b3f, taken here by submodule with the module replacement in `config/_default/hugo.toml`), and `/lint` runs its validator. The shared-spec project (2026-10-26 to 10-27) is in git: `git log -- docs/PLAN.md`.

- [ ] Granola bars formula, once a second recipe needs a nut icon.
- [ ] Food ratios tables, once that method leaves the test kitchen.
- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.
- [ ] `timeline` and `tabs` in the cookbook: fugu-agent ports w42's hooks when a page needs one (`.tline-*` classes don't collide with our `.tl-*` lineage).

## Drinks

Drinks got their own section on 2026-10-27 (`content/drinks/`, Fugu 356fad8). Diagrams picked from `mockups/drink-diagrams.html`: A and C, not B. Glass thumbnails on cards (Fugu efb6a23) and drink formula icons (Fugu 45029e3) are in.

- [ ] Formula ratios for sangria and lemon-lime iced tea's weight batch.
- [ ] Homepage: a drinks band, or drinks inside the recipes band.

## Fugu follow-through

- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug.
- [ ] When Fugu gets its own CSS (Fugu §5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Review

*Deferred (2026-10-14).* Code, then docs, then Fugu's docs (§7). Code goes one area per pass with `/code-review high`, each finding fixed, won't fix (why), or moved to Fugu's plan; template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] `tools/*.sh` and the Makefile, from a fresh clone with the submodule uninitialised.
- [ ] Accessibility on the built site: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.
- [ ] Docs inventory: keep, move to Fugu, merge, or delete. Tool CLIs in both `DESIGN.md` and Fugu's `--help` are the known overlap.
- [ ] `/mx:content-check` over the docs. (The stale-facts pass over every doc in `docs/`, `mockups/*.md`, README and CLAUDE.md was done 2026-10-28.)
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Concepts

A glossary of the cookbook's concepts, with a quiet hover on the words in the text. Mock: `mockups/glossary.html`; decided 2026-10-30. Built 2026-10-30: hugo-warped holds the spec (`glossary/README.md`), partials and tools (4d260ae); Fugu draws the popover, the A to Z page with search, and `index.json` (de1505e); this repo has the entries in `content/reference/glossary/` (`list: local` cascade), the styles in `custom.css`, the footer link, `make glossary-candidates|link|check`, and `/lint` step 7. Empty entries are stubs, left off the site until written.

- [ ] Link the 63 entries: `make glossary-link` (495 first mentions on 2026-10-30). Drafts by Claude, 54 approved by Bruce 2026-10-30; nine more in `docs/REVIEW.md`.
- [ ] Bold step labels (Pan sauces' "**Deglaze.**") are offered as links; answer "never" per page, or ask hugo-warped to skip bold text at the start of a list item.

## Candidates from other sites

From a look at RecipeTin Eats (goulash), Serious Eats (homepage, cream slaw), and Smitten Kitchen (homepage, skillet pierogi) on 2026-10-30. Candidates, not decisions; ratings, nutrition labels, newsletter capture, and share rows were ruled out. Check-off, scaling, and unit conversion we already have.

- [ ] Keep-screen-awake switch beside the scaling gear (Wake Lock API). RecipeTin and Serious Eats both have it. Fugu's change.
- [ ] Bold lead phrase on each method step ("**Brown the beef.** …"), so prose scans mid-cook. A recipe-writing convention, not a template; some recipes do it already (see Concepts, above).
- [ ] Passive time (chill, rest, rise, marinate) as its own frontmatter field beside prep and cook, as Serious Eats does. Needs `FORMAT.md`, Fugu's meta row, and the index.
- [ ] Make-ahead and storage: an optional `## Make ahead` section in `FORMAT.md`, or a convention inside Notes.
- [ ] "Previously" on Food Log months: the same month in earlier years, as Smitten Kitchen does for posts.
- [ ] "Surprise me": a random recipe, from the recipe index.
- [ ] Lighter recipe header: a hairline under the title and one small-caps meta line (servings · time · source), Smitten Kitchen's treatment, mocked against the current stat row.

Visual notes from the same look:

- **RecipeTin Eats** is loud on purpose. The recipe is a colour-blocked card (navy header band, round hero photo breaking its top edge), so you always know where it starts. Coral pill buttons for jump links, print, and servings; an icon on every meta fact. Ingredient names in roman, prep notes in grey italic. Steps are numbered circles with a bold lead phrase. Ads set the real hierarchy.
- **Serious Eats** is an editorial magazine. The personality is in its heading face (Space Grotesk) over a neutral body (Inter); colour is nearly absent (white, near-black, a teal logo, red list bullets), so photos supply it. Small-caps kickers with a rule between them ("EQUIPMENT | 4 HOURS AGO"), a white card over the homepage hero, one warm cream panel for recipe meta, and wide air between steps.
- **Smitten Kitchen** is the quietest and closest to ours. One face (Franklin Gothic) for everything, hierarchy from size, weight, and colour alone. Lowercase titles in slate blue, small caps for all metadata, dotted and hairline rules where others use boxes, and a grey inset ingredient box as the only filled shape. Big, dark, overhead photos carry the page.
- **Across all three**: photos lead, at the top and large (ours sit in the sidebar, the biggest difference in feel); a bold lead phrase on steps (two of three); one typographic signature with restraint everywhere else; small caps for metadata (two of three).

## Design v2

Next week (from 2026-11-02). A visual pass over the site first, then the v2 changes, mocked before they're built and recorded in `mockups/STYLE.md` and `style.html` when they land. Template and CSS that belongs to the theme goes to fugu-agent.

- [ ] Visual pass: walk the built site in Chrome (homepage, recipe, drink, essay, method, blueprint, Food Log, glossary, tag pages; both widths, light and dark) and list what feels heavy, crowded, or off against the notes above.
- [ ] Soften the colour scheme: lower the contrast and saturation of the accent and chip colours, and keep the five hues (`STYLE.md`, "Where the palette comes from"). Mock against the current tokens side by side.
  Bruce's first take (2026-10-30), from the mixer in `mockups/soft-colour.html`; full mock in `mockups/soft-colour-full.html` (run `mockups/serve.py`), override and draft tokens in `mockups/soft-colour/soft.css`:
  - Tokens: softer neutrals (ink a step lighter, borders nearer the page), lighter backgrounds (page and cards a step lighter; in dark, a step less dark), and all five hues pulled toward the neutrals, in light and dark.
  - Cuisine, test kitchen, principle, and method chips become coloured text, with no fill or outline. Tags keep their outline.
  - Card stat numbers (and the homepage essay reading times) go to ink; the accent stays on links, ratios, formula numbers, and quantities.
  - The test kitchen banner becomes two hairline rules in the draft blue instead of a filled box.
  - Quantities in recipes become accent text with no wash behind them, matching the formula diagrams.
  - The principle callout loses its fill, if one is built (the site has none today).
  - Diagrams stay as built: the food colours (`--kit-*`, `--sear`) don't change. Formula icons, operators, the bun, and the timeline soften with the tokens.
  - Still open: a WCAG contrast check on the softer tokens (the yellow and `--ink-faint` are most at risk); text-chip hover (the mock underlines); Blowfish's ramp (`css/schemes/not-a-chef.css`) for header and prose colours; then `STYLE.md`, `style.html`, and the Fugu handoff for anything in its CSS.
- [ ] A thin line of images leading the page, under the header: Bruce's idea, to be worked out (which pages, where the images come from, height, how it sits with the sidebar photos).
- [ ] Fold in the visual candidates above (lighter recipe header, bold step lead phrases) where they fit v2.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21 to bring it forward; not built yet (no `static/mockups/`).
