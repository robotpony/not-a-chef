# Plan

The phased build plan was squashed after release (2026-09-25, `e6346f4`); its history is in git. This file now tracks future work only. Each item says what it is, why, and roughly how, so it can be picked up cold.

## Future

### Formula diagram follow-ups

Content-side only. The formula strip on cards, the `/lint` formula check, and growing the icon kit moved to `themes/fugu/PLAN.md` (Features).

- [ ] Diagram more Mechanics. 97 recipes have a `## Mechanic`; the ones that state a ratio are candidates. Only draw a ratio the text already states (`FORMAT.md` §Formula diagrams).
- [ ] Ratio (`:`) and sequence (`→`) diagrams are built but unused on a real page; check them against real content the first time one is written.

### Formula diagram: retest and open decisions

Built and checked 2026-10-06 in Chrome, dark mode, desktop width only. Still to do:

- [x] Retest veg patties in light mode. *Done 2026-10-07: checked in Chrome, light and dark.*
- [x] Retest on a phone-width viewport: the diagram is now in the intro (full size, body column) and should wrap with each operator staying attached to its slot. *Done 2026-10-07 at 300px and 400px: it wraps with operators attached. The card strip was clipping at both ends on phones (cards two across, ~136px of room), so its icons shrink to 18px below 480px.*
- [ ] Retest a formula inside Mechanic (compact, sidebar) on the live site, since veg patties no longer has one there.
- [ ] Decide about the duplicate swaps on veg patties: the Mechanic bullets list the swaps for each slot, and the diagram's swap lines repeat them. Either trim the bullets to quantities and notes, or drop the fourth field from the block.

### Design changes (mock first)

Queued 2026-10-07. Each needs a mockup in `mockups/` (checked against `mockups/STYLE.md`) before it's built, and STYLE.md updated when it lands.

- [x] **Scaling menu as a callout.** The ingredient options popover (gear button on each ingredients heading) is an oddly shaped box: a wide slider row, then three unit buttons that wrap onto two lines ("Imperial" alone on the second). Redraw it as a comic-style callout with a small `^` pointer up to the gear, and replace the unit buttons with a drop list (As written / Metric / Imperial), which also fixes the wrap. Markup is built in Fugu's `assets/js/ingredients.js` (config menu, ~line 734), so the drop list is a Fugu change (coordinate with whoever's working there); the look is `custom.css` (`.ing-scale-*` and the menu rules around it). Mock in light and dark, at desktop and phone widths, including keyboard focus and the open/closed states. Mocked 2026-10-07 in `mockups/scale-callout.html`. *Done 2026-10-07: segmented control (not the drop list), yield line, step labels, and the pointer on glossary popovers too. Fugu `ingredients.js` / `automagic-sidebar.js` / `single.html` for the markup and yield scaling; `custom.css` for the look.*
- [x] **Space above the footer on reading pages.** About (and other pages with the reading sidebar) run straight into the footer: on About, the last row of photo markers sits on the footer's top border. Recipes don't, because the share/related block follows the body. Give every page a standard gap above the footer, from the spacing scale in STYLE.md, rather than fixing About alone. Likely `custom.css`: at desktop width `.reading-sidebar-wrap` drops its `margin-bottom` (`custom.css:1306`) and the article column has none. Mocked 2026-10-07 in `mockups/page-bottom-spacing.html`: every page type measures 38–42px today except About on desktop (0px), and the 40px is borrowed from each page's last block (`.article-pagination`, `.home-section`, the listing spacer). *Done 2026-10-07: option A, 40px. `main` owns the gap; `.article-pagination`, the last `.home-section`, `.list-pagination-spacer`, the term grid's `mb-8`, and the reading sidebar (when nothing follows it) lost their bottom space, and the 404 kept its 80px. Every page type measures 40px at 1280px and 390px.*

- [x] **Space around the formula diagram.** It was spaced like a paragraph (20px), with nothing extra before the next heading (36px). *Done 2026-10-07: spaced as a figure, like a table, at 28px, and 48px to a heading after it. `custom.css` `.formula`; adjust if needed.*

### Fugu theme

The cookbook templates, render hooks, JS, icons, archetypes, and content tools moved into the Fugu theme (`themes/fugu`, https://github.com/robotpony/hugo-theme-fugu) on 2026-10-06; see ARCHITECTURE.md for the three layers. Theme work (making it generic, its own design, docs, example site, release) and the template and JS features below it are tracked in **`themes/fugu/PLAN.md`**. This list is only what has to happen on the Not a Chef side.

- [ ] Test `/publish` (`tools/publish.sh`, then `dry-run` first) now that the site builds with two stacked themes. Not yet run since the split was merged (2026-10-06). The build output was identical locally, and the publish scripts don't reference theme paths, but nothing has been deployed from the new layout. On any machine other than this one, run `git submodule update --init` first so `themes/fugu` is populated.
- [ ] After each Fugu change lands, bump the submodule here (`git -C themes/fugu pull`, then commit `themes/fugu`) and check the site still renders the same.
- [ ] When Fugu gets its own CSS (Fugu PLAN.md §5), cut `assets/css/custom.css` down to the Not a Chef look only, and check every page against the current build.
- [ ] When Fugu renames params (Fugu PLAN.md §2), update `config/_default/params.toml` in the same step.
- [ ] When Fugu's docs exist (Fugu PLAN.md §7), decide whether `FORMAT.md`, `FORMAT-ESSAYS.md`, and `SPEC.md` stay here as house style on top of Fugu's docs or are replaced by links.
- [x] Possibly move `layouts/404.html` back here from Fugu: its text is a Not a Chef joke. *Done in `2951dca`.*

### Carried over from the old plan

Unfinished items from the squashed Phases 7–9 (`git show e6346f4^:PLAN.md`). The template, JS, and tooling items moved to `themes/fugu/PLAN.md` on 2026-10-07 (formula strip, validator, build-time enrichment, cooking-time features, listing filters); what's left here is content and site checks. Items the code shows are done were dropped: the `.rcard` listings, heading-free card summaries, wiki-link styling and resolution, table scrolling, scaling and unit conversion, deploy, draft tooling (`drafts.py`, `frontmatter.py set`), and clean meta descriptions (`page-description.html`). Some of what's left may be partly done; check before starting.

**Site polish**
- [ ] Tags on recipe headers and related cards: neutral outline per `mockups/STYLE.md` ("Tag — never colored"). They still render with an accent border (seen on veg patties, 2026-10-06). They also have no hover state, though they're links and the cuisine chip beside them has one (an inset ring, `custom.css` `a.cuisine-chip:hover`); noted 2026-10-07. The header tags come from Blowfish's `partials/badge.html` (Tailwind `border-primary-400` classes) inside a bare `<a class="relative">` in Fugu's `article-meta/basic.html`, so the fix is to emit `<a class="tag">` there (a Fugu change) and give `a.tag` a hover in `custom.css`.
- [ ] Tag cleanup: drop tags that repeat the cuisine; merge near-duplicates (Bread/Breads, Dressing/Dressings).
- [ ] Check Fuse.js search relevance against real titles, tags, and ingredient text.
- [ ] Phone-while-cooking check: large touch targets, no accidental nav taps.
- [ ] Check the homepage against real content, and the footer's Tags/Cuisines links end to end.
- [ ] Cross-link essays and reference pages to related recipes where it makes sense.
- [ ] Check that Hugo's related content (`partials/related.html`, keyed on tags and cuisine) gives reasonable suggestions before considering a manual `related:` field.

**Recipe format and validator** (`SPEC.md`; the validator itself is in Fugu's plan)
- [ ] Once Fugu's validator exists, run it against all published recipes as a baseline; file each discrepancy as a spec bug or a content bug.

### Test kitchen (recipes in development)

Drafts are published as **Test kitchen** pages: a strip above the title, a mark on the card, and an optional `working_on` line; `content/essays/reference-essays/test-kitchen.md` explains the idea and lists them all. Mocked in `mockups/in-development.html`; built 2026-10-07 in Fugu (`partials/development/`, `[params.fugu.development]`) and here (`params.toml` `[fugu.development]`, `custom.css` `.dev-*`).

- [x] Drafts go live: `buildDrafts = true`. *Decided 2026-10-07. `publish.sh` needed no change: its guard only checks for dev-server output.*
- [x] Banner shape: the strip (option A), above the title, with a dotted line between the stock sentence and the `working_on` note. *Decided 2026-10-07: the colour and size pull it out of the flow of the content, so it reads as special.*
- [x] Where the banner sentence lives: config. *Decided 2026-10-07.*
- [x] Essays and reference pages get the same strip for now; test it and see how it feels. *Decided 2026-10-07.*
- [x] Wording: Test kitchen / keeper, after how restaurants develop a dish before it goes on the menu, and how we want to teach people to cook. Fugu's default stays In development / canon. *Decided 2026-10-07.*
- [x] Build the strip, the `working_on` note, and the card mark with its popover. *Done 2026-10-07.*
- [ ] Live with it for a while, on essays and reference pages too, and adjust. Things to watch: whether the card mark on every draft card is too loud (the Test kitchen page itself is all draft cards), whether "Test kitchen" reads oddly on a reference page, and whether the card popover works on a phone (it's CSS-only, like the glossary popover, so it relies on tap-to-hover).
- [ ] Add `working_on` lines to the current drafts where there's something specific being tried.

### Behind the scenes

- [ ] *Deferred (noted 2026-10-07).* Publish `mockups/` as a special subfolder of the site, to show some of the behind-the-scenes design work. Needs a decision on what's in it (all mocks, or only current ones, not `archived/`), how it's linked (footer, About), and how it's kept out of search and the sitemap or not. The mocks are standalone HTML with their own fonts and tokens, so they'd be copied as static files rather than rendered by Hugo.

### Code review

Queued 2026-10-07. A careful review of the code on both sides of the split, now that Fugu is its own theme. Do it before the doc review below, since fixes change what the docs should say. One area per pass, so each one gets real attention: run `/code-review high` scoped to the area, check every finding against the code before acting, and record each as fixed, won't fix (with why), or moved to `themes/fugu/PLAN.md`. Any template or CSS fix gets the usual checks: `python3 themes/fugu/tests/check.py --compare`, then Chrome at desktop and phone widths, light and dark.

- [ ] **Fugu templates.** The 14 Blowfish overrides (Fugu PLAN.md §6 lists them) and Fugu's own partials and render hooks. Look for logic that's wrong at the edges: empty sections, a site without cuisine, pages with no date, a draft in every list that shows cards.
- [ ] **Fugu JS.** `ingredients.js` (scaling, unit conversion, check-off), `automagic-sidebar.js` (section moves, photo viewer), `search.js`. Check that pages still read and print with JS off, keyboard and screen-reader behaviour, and listeners that leak or run twice.
- [ ] **Tools.** Fugu's `frontmatter.py`, `drafts.py`, `compare-builds.py`, `add-image.sh`, and this repo's `tools/preview.sh`, `publish.sh`, `deploy.sh`, and the Makefile. Error handling, what happens on a fresh clone (submodule not initialised), and anything that could ship a bad `public/`.
- [ ] **Site layouts.** This repo's `layouts/` (homepage, header, footer, favicons, fonts, 404): what Fugu now does better, and anything that shadows a Fugu file by accident.
- [ ] **CSS.** `assets/css/custom.css` is one large file that styles every class Fugu emits. Find rules for classes nothing emits any more (grep the built `public/` for each selector), duplicated rules, and colours outside the tokens. This overlaps Fugu PLAN.md §5 (Fugu's own CSS); decide which rules move before cutting.
- [ ] **Accessibility and markup.** Popovers (glossary, principle chip, test kitchen card mark) and their ARIA, focus order, landmark use, heading levels in templates, alt text handling in `render-image.html`.
- [ ] Known suspects to check first: the test kitchen card mark's 8px hover bridge (`.dev-mark::after`) sits over the card link and may eat clicks; the mark's SVG is inlined twice per draft card; recipe-page tags still use Blowfish's badge (see Site polish above).

### Doc review

Queued 2026-10-07. Now that Fugu has been split out, the docs in this repo describe three things at once: the theme, this site's house style, and history. Sort each one out. Do it after the code review, and before Fugu PLAN.md §7 (Fugu's own docs), since this decides what moves there.

- [ ] **Inventory.** Here: `README.md`, `CLAUDE.md`, `ARCHITECTURE.md`, `DESIGN.md`, `SPEC.md`, `FORMAT.md`, `FORMAT-ESSAYS.md`, `LIBRARIES.md`, `PLAN.md`, `REVIEW.md`, and `mockups/README.md`, `STYLE.md`, `COMPONENTS.md`. In Fugu: `README.md`, `CLAUDE.md`, `PLAN.md`, `CHANGELOG.md`. For each, decide: keep (this site's own), move or link (it's really about Fugu), merge (two docs saying the same thing), or delete (history git already has).
- [ ] **Stale facts.** Check every path, command, and claim against the code. Known suspects: `README.md`'s tech plan says the tools are in `tools/` (most moved to Fugu); `DESIGN.md` says the preview runs `hugo server -D` (drafts are now on in config); `SPEC.md` calls itself a draft and gives `draft` a MUST; `CLAUDE.md` says only `win-the-fridge` is a principle tag and names `term.html` paths that may have moved.
- [ ] **Overlap.** `FORMAT.md`, `SPEC.md`, and `DESIGN.md` each describe the frontmatter; pick one to own it and have the others link. Same for the tools' CLIs (`DESIGN.md` vs Fugu's `--help`).
- [ ] **Voice and rules.** Run `/mx:content-check` over the docs for the writing rules (Canadian spelling, em-dash restraint, no filler).
- [ ] **CLAUDE.md last.** Once the rest is settled, cut both CLAUDE.md files down to what an agent needs to start work, pointing at the docs instead of repeating them.
- [ ] `FORMAT-ESSAYS.md` says essays are outlined in a vault at `writing/essays/` and migrated by hand. Confirm whether that's still true now that this repo is the vault, and update it.
