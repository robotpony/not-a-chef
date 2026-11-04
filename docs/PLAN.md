# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Domain move

*Live 2026-10-18* (`deploy-2026-10-18`): `https://bruce-loves-to-cook.ca`, with `www` and old-domain 301s. Search Console and the old domain's certificate renewal are set up, and warpedvisions.org's posts link the new domain.

- [ ] Fugu's `exampleSite/content/about.md` links the old domain: fugu-agent's change.

## Diagrams

Diagrams are fences, specced in hugo-warped (`~/projects/sites/hugo-warped/fences/`, the hugo-warped agent; its open work is in its `PLAN.md`). Fugu reads every fence through hugo-warped's parse partials (taken here by submodule, with the module replacement in `config/_default/hugo.toml`), and `/lint` runs its validator. The shared-spec project (2026-10-26 to 10-27) is in git: `git log -- docs/PLAN.md`.

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

## Deploy tooling

Sites keep their own copies of the deploy script (`~/.claude/rules/site-ports.md`, decided 2026-11-04). The reference is brucealderson.ca's `tools/deploy.sh`, once it has survived a real deploy.

- [ ] Build from a clean worktree of HEAD: `publish.sh deploy` can ship a `public/` that doesn't match HEAD. Take the lock, `rsync --checksum`, and the live check from the reference too.
- [ ] Check for a dirty tree before building, not at the deploy step, and fix `warn_dirty`, which says uncommitted content will be published when `deploy.sh` refuses it.
- [ ] Add `check` and `dry-run` to the Makefile, the shared target names.
- [ ] Add `favicon.gif` to the rsync excludes if a dry run shows it in the web root. Not checked against the server.

## Concepts

A glossary of the cookbook's concepts, with a quiet hover on the words in the text. Mock: `mockups/glossary.html`; decided 2026-10-30. Built 2026-10-30: hugo-warped holds the spec (`glossary/README.md`), partials and tools (4d260ae); Fugu draws the popover, the A to Z page with search, and `index.json` (de1505e); this repo has the entries in `content/reference/glossary/` (`list: local` cascade), the styles in `custom.css`, the footer link, `make glossary-candidates|link|check`, and `/lint` step 7. Empty entries are stubs, left off the site until written.

- [ ] Answer the last offered link: `make glossary-link` has one move left (Aromatics in the October Food Log, line 78 to line 34). Nine entry drafts wait in `docs/REVIEW.md`.
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

Under way. The softer colour scheme (2026-11-01) and the palette stripe and homepage mark (2026-11-02) are built and recorded in `mockups/STYLE.md`; the two blue labels question is in `docs/REVIEW.md`. Fugu's own `fugu.css` still draws filled chips for other sites; the site overrides them, so changing that is optional. Next changes are mocked before they're built and recorded in `STYLE.md` and `style.html` when they land. Template and CSS that belongs to the theme goes to fugu-agent.

- [ ] Finish the visual pass by hand. Walked 2026-11-03 in headless Chrome (17 page types at 1280 and 390 px, light and dark; no page scrolls sideways). Not seen: hover states, the Recipes menu, the phone drawer, glossary popovers, and the opened Recipe notes.

Fixes from the pass:

- [ ] Vault tags show in headings ("Mexican feast #todo"). Hide trailing tags at render and keep them in the source, since the todo tool reads them: with fugu-agent, then bump Fugu. `#todo` on list items stays visible (`FORMAT.md`).
- [ ] Chip wording: builds show Burgers twice ("Burgers · Build", then "Burgers"), essays show "Food-Memory" where cards say "food memories", and page chips are title case where cards are lowercase.
- [ ] Lineage repeats each close year ('57 on the left, 1957 on the right).
- [ ] A wiki link's arrow can wrap alone onto the next line (build sidebar, "In-N-Out burger spread →"). Keep it with the last word.
- [ ] Main column bottoms have three right edges: text at 752px, essay Related at 836px, recipe Related and prev/next at 871px.
- [ ] Glossary: the search placeholder clips on phones, definitions are about 18px against 16px body text, and the right third is empty on desktop.
- [ ] Content: em-dashes in the Win the fridge intro and the June 2026 summary.

To mock, from the pass:

- [ ] Recipe mechanic: the site promises ratios, but the Mechanic is small grey italic, third in the sidebar, and collapsed on phones. Mock it above Ingredients, with the rest of the sidebar lighter (Chai's sidebar runs about 260px past its method, leaving the left column empty).
- [ ] Phone photos: a 112px thumbnail sits alone at the left, above Recipe notes. Decide this with the line of images, below.
- [ ] Food Log sidebar: 40 month rows, about half reading "undated" in mono. Drop the word, and group or collapse older years.
- [ ] Uneven cards: a formula row on some cards and not others on the homepage and recipe list, a gap above short stacks on blueprint cards, and about 110px of blank under the homepage's Muesli card.
- [ ] Phone flow diagrams wrap with an arrow leading the second row (Pan sauces).
- [ ] A thin line of images leading the page, under the header: Bruce's idea, to be worked out (which pages, where the images come from, height, how it sits with the sidebar photos).
- [ ] Fold in the visual candidates above (lighter recipe header, bold step lead phrases) where they fit v2.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21 to bring it forward; not built yet (no `static/mockups/`).
