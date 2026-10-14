# Plan

The phased build plan was squashed after release (2026-09-25, `e6346f4`); its history is in git. This file now tracks future work only. Each item says what it is, why, and roughly how, so it can be picked up cold.

## Future

### Methods

Spec: `docs/METHODS.md` (decided 2026-10-10). Template work is Fugu's, handed to the Fugu agent; this list is the site side plus the handoffs.

**Phase 1: content and structure**

- [x] Cascade the `method` tag onto `content/essays/methods/`. *Done 2026-10-10: from `content/essays/_index.md` by path, not an `_index.md` in the folder, which would make it a section and drop its pages from the essays list.*
- [x] Move reverse cooking and food ratios from `content/reference/` into it, with `aliases:` for the old URLs. *Done 2026-10-10; the `reference` tag became `method`.*
- [x] Add the `blueprint` taxonomy to the site config, and `content/blueprint/burgers/_index.md` with its definition and part order. *Done 2026-10-10, plus `content/tags/method/_index.md` so `/tags/method/` lists methods until phase 2.*
- [x] Add `blueprint` to the two burger essays and the burger recipes. *Done 2026-10-10: 10 recipes, both essays, and Burger night costing.*
- [x] `/lint`: flag a page in `methods/` whose own `tags` drop `method`, or whose `part` isn't one of its blueprint's `parts`. *Done 2026-10-10 (`.claude/commands/lint.md` rule 6).*

**Phase 2: concept pages (Fugu handoff)**

Mocked 2026-10-10 in `mockups/methods-pages.html`; the template work is queued in `themes/fugu/PLAN.md` Features, "Concept pages: principle, status, method" (and "Extra taxonomies in the page header's tags row"). Built by the Fugu agent 2026-10-10 (Fugu `944dec2`, pushed; settings in `[params.fugu.methods]`).

- [x] Pick the methods icon. *Done 2026-10-10: fan-out, accent colour (`mockups/methods-icon.html`, STYLE.md Method chip, `assets/icons/methods/fan-out.svg`).*
- [x] Mock the methods and blueprint pages against `mockups/STYLE.md` first. *Done 2026-10-10: methods page, blueprint page, method page header and part navigation, cards, and what the three concept kinds share.*
- [x] Add builds and options to the model and the mock. *Done 2026-10-10: builds are their own method pages (`build_name`, `profile` as free text, `picks`), options are an `## Options` table in a part's method; docs/METHODS.md "Inside a blueprint".*
- [x] Settle the mock's open choices (its §7). *Done 2026-10-10: all eight as proposed (alternatives kept in the mock); recorded in STYLE.md (Definition callout, Blueprint chip, Methods and blueprint pages) and `style.html`.*
- [x] Fugu: shared concept partials with a `kind`; principle and test kitchen render the same after. *Done 2026-10-10, `944dec2`.*
- [x] Fugu: the method chip, the methods list, the blueprint page (builds, picks compared, parts with options, recipes by build), the build page, the blueprint chip, part and build navigation, and `blueprint`/`part`/`build_name` in `index.json`. *Done 2026-10-10, `944dec2`. Build pages render Picks and "Recipes in this build" from front matter, so build bodies don't repeat them.*
- [x] When the blueprint chip lands, remove the stopgap rule in `custom.css` (`.tags-row > a[href*="/blueprint/"]`). *Done 2026-10-10, `41ec5ee`.*
- [x] Bump the `themes/fugu` submodule. *Done 2026-10-10, `353cfc3`.*
- [x] Check every page type in Chrome, light and dark, desktop and phone: the methods list, the burgers blueprint, a build page, a part's method, and that Win the fridge and Test kitchen look unchanged. *Done 2026-10-11 in headless Chrome (the extension wasn't connected), at 1280px and 390px, light and dark: all render as mocked. On phones the lineage becomes a list and the Builds compared table scrolls sideways. One nit, not new: a wiki link right before a closing bracket leaves a space, "(see Burger seasoning → )." (Fugu's render hook).*

**Phase 3: first methods**

- [ ] Burgers blueprint: write the parts (patty construction with thick/thin/paper thin options, seasoning, cooking, assembly, sauces), pulling from the two burger essays without gutting them. *Drafted 2026-10-10 as test kitchen pages (`content/methods/burgers/`: `patties`, `seasoning`, `cooking`, `assembly`, `sauces`), with TODO comments where the sources ran out. Waiting on review.* *2026-10-14: all five are published (no longer drafts), with no TODOs left; review pass in `d7620e2`. Close once Bruce signs off.*
- [ ] Burger builds: drive-in deluxe, fast-food double, grilled onion, one page each; set `build_name` on the recipes that are instances (White Spot burgers → drive-in deluxe). *Drafted 2026-10-10; White Spot set. Fast-food double and grilled onion are thin on sources (TODOs). 2026-10-11: eras set (grilled onion 1922, fast-food double 1990); the McDouble recipe moved to its own McDouble build; Big Boy, Pub, McDouble, and Smash are stubs.* *2026-10-14: eleven builds, all published and filled out (Big Boy, Bruce burger, drive-in deluxe, fast-food double, grilled onion, McDouble, Mozza, Pub, Smash, Teen, Whopper); review pass in `d7620e2`. The Big Boy, double smash, and Whopper recipes were dropped as covered by their builds (`c9a0d7c`). Close once Bruce signs off.*
- [ ] One-pan pasta blueprint. *Drafted 2026-10-12 as test kitchen pages (`content/methods/one-pan-pasta/`): four parts and two builds (American bolognese, cherry tomato and garlic), with TODOs for water amounts, the fresh-sauce pan, and a source for the technique.* *2026-10-14: the parts are published and their TODOs cleared (`94ec9c9`, review pass `22944d2`); the two builds are still test kitchen stubs ("picks from a description of how I make it").*
- [x] Builds only on the blueprint page (decided 2026-10-12, `mockups/methods-list-and-blueprint.html`): the methods list shows a blueprint's builds as name pills in its block, and the blueprint page swaps its long parts list for the compact block. *Done 2026-10-12: Fugu `e6dee79`, site CSS `b015b8c` (plus build cards two across on desktop). Checked headless at 1280px; phone width still unchecked.*
- [ ] Stock method, from Why ingredients matter in stock and the four stock recipes.
- [ ] Foil packets method, from Camp cooking.

- [x] History on builds (decided 2026-10-10): `origin` and `era` front matter, a `## Where it comes from` section with a constraint / pick table, and a lineage timeline on the blueprint page (`mockups/methods-pages.html`). The drive-in deluxe has its history; the other two builds have TODOs.
- [x] Fugu: show `origin` on build cards and pages, and the lineage timeline (builds by `era`, plus the blueprint's `planned` builds, faint). *Done 2026-10-10, Fugu `80921b6` + `df28246` here. Builds are now ordered by `era` everywhere they're listed, undated last. `origin`/`era` stay out of `recipes/index.json`, since it lists only recipes.*
- [x] Rename the builds by lineage. *Done 2026-10-10: Drive-in deluxe (White Spot burgers) and Fast-food double (McDouble; bacon is now a variation).*
- [x] Grilled onion: decide which onion burger it is. *Decided 2026-10-10: both, as variations: grilled alongside (or as a jam) and smashed in, which is a shortcut that soaks up the griddle juices. Name stays.*
- [x] Planned builds on the timeline. *Done 2026-10-10: Pub burger, Smash burger, and the McDouble (a fast-food double variant, with rehydrated dried onion), in `content/blueprint/burgers/_index.md`. Years are approximate until sourced.*
- [ ] Flags on the lineage timeline: context markers that aren't food (Burger King opens, a world's fair), styled apart from builds so they read as backdrop, not entries. Decide where they live (likely the blueprint's body, per Phase 8, or `flags` frontmatter if they need to sort by year), mock them in `mockups/methods-pages.html`, then hand the template change to fugu-agent.

**Phase 4: stack diagrams**

- [x] Mock the ` ```stack ` block in `mockups/` and settle it in `mockups/STYLE.md` and `style.html`. *Done 2026-10-10: exploded view in the formula icons' style, labels on the right, no assembled view (`mockups/exploded-builds.html`, STYLE.md "Exploded build diagram"). Accepted as v1; refinement is phase 6.*
- [x] Fugu: the layer kit (`themes/fugu/assets/icons/layers/`, beside the formula icons): the 20 layers in `mockups/exploded-builds.html` §2, as SVG files at a common width with their own heights, in the formula icons' style. *Done 2026-10-11, Fugu `e513c2f` (v1 drawings), exported by `mockups/export-layers.mjs`; round 4 re-exported in Fugu `8a05f4d`. `onion-minced` (for the fast-food double) is Fugu `594c7a9`. Pushed and bumped here 2026-10-11 (`7b1d6a7`).*
- [x] Fugu: `render-codeblock-stack.html` (labels on the right, `caption:`, `repeat:` as a `× n` bracket, the unknown-key warning) and a compact card partial, `partials/stack-strip.html`. *Done 2026-10-11, Fugu `e513c2f`; `.stack` styles in `custom.css` (`b48985b`).* *Queued in Fugu PLAN.md Features, "Stack diagrams (exploded builds)" (`84b1d50`, 2026-10-10), after the concept pages; the mockup's JS is the reference implementation.*
- [x] `docs/FORMAT.md`: document the ` ```stack ` block once Fugu settles the `repeat:` syntax. *Done 2026-10-11, "Stack diagrams" under Essays.*
- [ ] First diagrams: burger construction, sandwich construction, lasagne layering. *Burgers done 2026-10-11: a `stack` block on each of the three builds, following its picks (the fast-food double in McDouble order). Checked 2026-10-11 against Fugu `594c7a9` (unpushed) at 1280px and 390px, light and dark, on the build pages and the blueprint cards; long labels shortened to fit. Sandwich and lasagne wait for a blueprint or recipe to put them on.*

**Phase 5: documentation**

- [x] `docs/ARCHITECTURE.md`: a "Content model" section with the ontology and a diagram. *Done 2026-10-10.*
- [x] `README.md`: a short reader-facing version. *Done 2026-10-10.*
- [x] `docs/FORMAT.md` (essays merged into it): the method format and the `blueprint`/`part` fields; `CLAUDE.md`: methods under "Food essay types". *Done 2026-10-10.*

**Phase 6: refine the layer drawings (later)**

The v1 drawings are about 80% there: good enough to ship, but some layers don't yet look like what they are. Getting them right matters for readers, since the diagram is how a build is understood at a glance.

- [x] Bruce provides reference examples (photos, illustrations, or sketches) for the layers that read least well. *Done 2026-10-11, shared in a Fugu session (the images themselves weren't kept; described below).*

Art direction (Bruce, 2026-10-11): still no colour, line art. v1 is close but lacks texture and detail; aim for moderate detail, not realistic, but enough that each ingredient reads as what it is. Texture as strokes, not fills or shading.

- Best match: a patent-drawing burger (FIG. 1, numbered leaders). Sesame seeds as small open ovals over the whole bun dome; tomato slices with rim and seed-chamber detail; lettuce as one ruffled sheet with long vein hatching; onion as concentric rings; pickles as small crinkle-edged discs with a seed ring; cheese as a square slab with fine parallel hatching and visible edge thickness; patty with a smooth top and a craggy, stippled side edge; the base bun's cut face stippled, with sauce as a double-line ribbon.
- An engraving-style burger, labels on the right: seeds plus a couple of crack lines on the top bun, two overlapping tomato slices, draped cheese with a soft fold, grill marks and a rough edge on the patty, sauce as separate blobs, shading by hatching only.
- A colouring-book drawing, the lower bound of detail that still reads: clean outlines, seed dots, lettuce frill peeking from under the bun, Swiss cheese with holes, a crumbly bumpy patty edge.
- Colour references (blueprint, chalkboard, the "UP Burger" poster, a German infographic), for shape and composition only. The common moves: two overlapping tomato slices, onion as two loose rings, cheese draping over the patty's edge, lettuce wider than the bun, grill lines on the patty.

Across the kit: loose overlapping pieces instead of single perfect discs, real edge thickness on slices, cheese that drapes.

- [x] Decide whether v1's `--accent-soft` body fill stays, or the drawings go ink line on `--surface` only, with texture as strokes. *Decided 2026-10-11: the fill stays, since it matches the formula diagrams; "no colour" means no full colour. Texture goes on top as strokes. Fugu builds the kit from v1 now and swaps the drawings in when the redraw settles.*
- [ ] Redraw those layers from the examples in `mockups/exploded-builds.html`, staying in the formula icons' style (one ink line, two fills, detail as strokes), and check them at card size and full size, light and dark. *Drawn 2026-10-11 as round 4, every layer in the kit, plus Bruce's sauce direction (ketchup and mustard as swirls sized 2/3 and 1/3, mayo and burger sauce as spreads). Checked as exported SVGs, light and dark. Bruce's review (2026-10-11): "vastly improved"; second pass layered the ketchup and mustard swirls (mustard on top, in the bun's fill), made the pickles crinkle-cut chips ("nice"), and on a third pass widened the ketchup to the patty and laid the bacon as three strips across the patty's ellipse. Fourth pass: patties are griddled by default (no marks), and `patty-thin-grilled` / `patty-thick-grilled` add grill marks at real spacing; the export list has the two new keys. Fifth pass, from Bruce's engraving of a grilled patty: the marks are narrow ragged char lines, not hatched bands.*
- [ ] Update the layer kit SVGs (Fugu's `assets/icons/layers/`) and the STYLE.md entry; drop "v1" when it's settled. *Once round 4 is accepted: export with `node mockups/export-layers.mjs mockups/exploded-builds.html <scratch folder>`, hand the changed SVGs to fugu-agent to commit in Fugu, then bump the submodule. As of 2026-10-12 Fugu's kit matches round 4 byte for byte (re-exported, only the four changed files differed), so what's left is Bruce's call to drop "v1".*
- [x] Shredded lettuce, and leader dots clear of the drawings. *Done 2026-10-12: a `lettuce-shredded` layer for builds that say shredded (drive-in deluxe, Big Boy); the leaf lettuce, mayo, and burger sauce report their real reach; Fugu `0ba662b` puts the dots 10 units out and closes labelled layers to a 10-unit gap (`5d0fd28` has the layers). Checked headless at 1280px.*
- [x] Redraw `lettuce-shredded`: at card size the shreds read as tiny bananas, not lettuce. *Queued 2026-10-14. Mocked over four rounds in `mockups/shredded-lettuce.html` from Bruce's photos and two drawn references; Bruce picked G (no mound, dense curling strands, a low pile). It's now `lettuce-shredded` in `mockups/exploded-builds.html` (the exporter learned a `hair` stroke, 0.9). Fugu `0fc97df` has the SVG (55.8 tall, `data-edge` 77.2, up from 73.5); the submodule is bumped (`1eb6d39`). Done 2026-10-14: Bruce checked it on the site.*

- [ ] Spreads and food colours. *Decided 2026-10-14 over three rounds in `mockups/spreads-and-colour.html` (from Bruce's mayo-on-toast photo): swoop knife marks; option C, a spread drawn on the bun (`bun-base + mayo` on the base's cut face, `bun-top + mayo` with the top bun opened toward the viewer at the base's angle), and the same for burger sauce; Fuller food colours (`--kit-*`, STYLE.md §6), with tomato flesh the deeper red and its seed segments the paler, and shredded lettuce as solid green inside a 0.6 ink line; torn iceberg without its pad. Ported into `exploded-builds.html` and `export-layers.mjs` (colours baked into the SVGs per layer, with `--fugu-kit-*` fallbacks), tokens in `custom.css`, STYLE.md, and `style.html`. Handed to fugu-agent: the 10 changed and 4 new SVGs, the fallbacks in fugu.css, and `a + b` in the stack syntax (file `a+b.svg`). Then: bump the submodule, check a build page light and dark, and hand the stack-block edits to the content agent (a spread right under `bun-top` or right above `bun-base` folds into it: Whopper, Bruce burger, drive-in deluxe, pub, Teen, Mozza, Big Boy, smash; every pair gets a label, or its key shows in the aria-label; and American or processed cheese moves from `cheese` to `cheese-american`, the slice in yellow, added 2026-10-14: Big Boy, smash, McDouble, fast-food double). Fugu has the kit as `93d0b6d` (unpushed); `cheese-american.svg` handed over separately.*

**Phase 7: reorganize essays (queued 2026-10-11)**

The essays list now skews heavily to methods: 10 of the first 12 cards on `/essays/` are methods (the burger blueprint's parts and builds), so the essays themselves (memories, reflections, technique, planning) sink to the bottom and onto page 2. Methods read as a reference shelf, not essays, and they'll keep growing as blueprints are added.

- [x] Decide the shape. *Done 2026-10-11: methods are a top-level nav item (Recipes · Methods · Essays), pointing at the existing methods map (`/tags/method/`; the `/methods/` and `/essays/methods/` aliases added then were taken out the same day). `content/essays/methods/_index.md` makes the folder a subsection, so its pages leave the essays list (25 cards to 15) with no Fugu change and no URL changes; it also carries the `method` cascade now. The homepage "Technique & reflections" band skips methods too.*
- [x] Mocked 2026-10-11 in `mockups/methods-top-level.html`; decided the same day: move the folder, `/methods/` as the methods page, homepage option C, "Food Log" in the nav. No redirects for `/essays/methods/...` (never published); the two `/reference/...` redirects on food ratios and reverse cooking stay.
- [x] Homepage option C and the nav. *Done 2026-10-11: band 02 Methods, band 03 Essays as two lists, "Food Log" in the nav, and tighter nav links from 681 to 820px. Checked with headless Chrome at 1200, 830, 690 and 390px.*
- [x] Fugu: methods as their own section (Fugu `1269958`, 2026-10-11): `method/is.html` and `method/all.html` find methods in a methods section, `/methods/` gets the methods list layout, the method chip and blueprint pages link there, and method pages keep the essay page treatment.
- [x] Then the move (2026-10-11): `content/essays/methods/` to `content/methods/`, its `_index.md` takes the description and body from `content/tags/method/_index.md` plus the cascade, the nav links to `/methods/`, `/lint` rule 6 path, CLAUDE.md, METHODS.md, FORMAT.md, ARCHITECTURE.md. `content/tags/method/_index.md` is a plain tag page now. Not pushed until Fugu `9ecb686` (with `1269958`) is pushed.
- [ ] While in there: whether reference essays (Win the fridge, Test kitchen) belong in the essays list either, or with Reference.

**Phase 8: blueprints as folders, content in the body (decided 2026-10-11)**

Frontmatter had started carrying content and relationships (`picks`, `profile`, `origin`, `part`, `build_name`, `blueprint`, `parts:`, `planned:`), against how the rest of the site works: content in the body, headings for structure, frontmatter for true metadata. Decided with Bruce:

- A blueprint is a folder under methods, its `_index.md` the blueprint page: `content/methods/burgers/` at `/methods/burgers/`, with `parts/` and `builds/` subfolders. The folder decides blueprint, part, and build. The `blueprint` taxonomy and `/blueprint/` go away.
- The only blueprint metadata left: `era` on builds, `weight` on parts for their order.
- `profile` becomes `description`; `origin` folds into `## Where it comes from`; picks become a `## Picks` list in the build's body.
- Recipes don't carry `blueprint`, `part`, or `build_name`; method pages list their recipes by hand in `## Recipes` (the part pages already do). Recipes keep the `burgers` tag.
- No Builds compared table for now (see below).
- "Not burgers" is gone as a part (removed 2026-10-11); other meats stay in the patties page's `## Other meats`.

- [x] Decide what replaces `planned:` on the blueprint. *Done 2026-10-11: test kitchen stubs with an `era` (Pub, Smash, McDouble build pages); `planned:` removed. The McDouble recipe moved from the fast-food double build to its own McDouble build.*
- [x] Update METHODS.md and FORMAT.md to the new model. *Done 2026-10-11 on the `blueprint-folders` branch, with ARCHITECTURE.md, CLAUDE.md, and `/lint` rule 6.*
- [ ] Mock the blueprint and build pages if they change visibly (picks now in the body; cards show era and description instead of origin and profile).
- [x] Fugu (handoff to fugu-agent). *Done 2026-10-11, Fugu `68b51d0` and `9902981` (local, not pushed). `index.json` didn't get blueprint fields (it lists only recipes) and `compare-builds.py` stays (it's Fugu's site-diff tool); both queued in Fugu's PLAN.md.* The site side is on the `blueprint-folders` branch; build against it. A blueprint is now a nested section, `content/methods/<slug>/_index.md`, with parts in `parts/` and builds in `builds/` (plain folders, no `_index.md`); the `blueprint` taxonomy is gone from config. Today `/methods/burgers/` renders with the methods list layout, and build pages render as plain methods.
  - `blueprint/info.html`: take the blueprint's section page, not a term. Parts are its pages under `parts/` by `weight` (a part's name is its title), builds its pages under `builds/` (by `era`, then undated). Options as now. Drop `recipes`, `groups`, `loose`, `byPart`, `others`: recipes are listed by hand in each method's `## Recipes`.
  - `methods/list.html`: the top-level `/methods/` stays the methods list; a nested section is a blueprint page: its body (definition, `## Further reading`), parts with options, the lineage timeline, build cards (title, era, description, compact stack). No Builds compared table, no recipes-by-build or recipes-by-part blocks. `method/list.html` finds blueprints as the methods section's child sections.
  - Build page: no `build-head` (profile, origin), `build-picks`, or `build-recipes` from frontmatter; `## Picks` and `## Recipes` are body markdown. The stack render hook draws every block inline (drop its `build_name`/`picks` skip). Lineage: drop `planned`; label each build with its title and era.
  - Blueprint chip and part/build navigation: the blueprint is the page's section (`.CurrentSection` under the methods section); part or build from `.File.Dir`.
  - `index.json`: drop `blueprint`, `part`, `build_name`; add `blueprint` (the folder's slug) and `role` (`part` or `build`) from the folder, and `era`. Retire `compare-builds.py` with the table.
  - Check the other readers of the old fields: `single.html`, `term.html`, `article-meta/basic.html`, `article-pagination.html`, `development/mark.html`, `short-time.html`.
- [x] Site side, after Fugu: *Done 2026-10-11 (`ad041be`, `6cf55c5`), merged to main. Checked in headless Chrome, dark, 1280px; phone widths and light mode still unchecked.* the homepage's Methods band (`layouts/index.html`) reads blueprints from the taxonomy and `.Params.build_name`; switch it to Fugu's new helper and build titles. Drop the blueprint rules in `custom.css` that no longer match anything. Bump the submodule, check every page type in Chrome, merge `blueprint-folders`.
- [x] Move the files to `burgers/parts/` and `burgers/builds/`, move `content/blueprint/burgers/_index.md` to `content/methods/burgers/_index.md`, strip the relationship fields from methods and recipes, and add `## Recipes` lists to the builds. No redirects (never deployed). *Done 2026-10-11 on `blueprint-folders`: picks, profile, and origin moved into the body; stubs have the full section skeleton; recipes that lost `blueprint` got the `burgers` tag; the cascade skips blueprint pages (`kind: page`).*
- [ ] Later, reconsider: a table comparing builds part by part on the blueprint page. It needs picks as data, so it would mean parsing a strict `## Picks` list (`- **Part:** pick`) from each build's body.

### Plant-based tag

A concept tag for plant-based food: green, leaf icon. Green is the principle hue and there's no sixth (`mockups/STYLE.md`), so it likely shares the principle tokens and is told apart by the leaf; STYLE.md would then say green means "a value this recipe holds," not Win the fridge alone. Sketched in `mockups/methods-icon.html` §5. Builds on the shared concept partials (Methods, phase 2).

- [ ] Decide principle-green or another treatment; mock the chip and tag page.
- [ ] `content/tags/plant-based/_index.md`, the leaf icon, and tagging the recipes.

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

### Blueprint leads

- [x] Lead paragraphs over a blueprint's builds and parts, from a headless `lead.md` in its `builds/` or `parts/` folder. *Asked of fugu-agent 2026-10-12. `content/methods/burgers/builds/lead.md` (the "burgers I know and love" caveat) is written and builds as headless, so nothing showed until Fugu read it. Done 2026-10-12: Fugu `22e8cbc` (blueprint/lead.html), `.bp-builds-lead` spacing in `custom.css`, `lead.md` in `docs/METHODS.md`. Checked at 1280px; the 390px check didn't run (Chrome wouldn't resize).*

- [x] Switch blueprint leads from `lead.md` to Hugo's standard `_index.md` (headless) in `parts/` and `builds/`. *Asked of fugu-agent 2026-10-12 (Bruce's call: the standard name over a Fugu-only one). When it lands: move `content/methods/burgers/builds/lead.md` to `builds/_index.md`, bump, check the burgers page, a build, and a part; update the `lead.md` paragraph in `docs/METHODS.md`. Done 2026-10-12: Fugu `a2cdb37`; the burgers page, a build, and a part checked (lead, counts, feed, nothing leaked).*

### Editing workflow

- [ ] Build an Obsidian plugin to coordinate edits between Obsidian and Claude Code. #todo *Noted 2026-10-12, from one session's friction:*
    - *Obsidian resolves `[[Title]]` by filename, not title, so every title link (`[[White Spot burger]]` → `white-spot-burger.md`) is unresolved there, and clicking one creates an empty note in the vault root.*
    - *Obsidian and Claude edit the same files at once. Neither knows which files the other has open or half-edited, so in-progress edits get swept into Claude's commits.*
    - *Obsidian rewrites frontmatter on save (flow lists like `tags: [method, burgers]` become block lists), which makes diffs noisy.*
    - *Start by deciding what the plugin owns: title-based link resolution, a "being edited" marker Claude can read, or both.*

### Fugu theme

The cookbook templates, render hooks, JS, icons, archetypes, and content tools moved into the Fugu theme (`themes/fugu`, https://github.com/robotpony/hugo-theme-fugu) on 2026-10-06; see ARCHITECTURE.md for the three layers. Theme work (making it generic, its own design, docs, example site, release) and the template and JS features below it are tracked in **`themes/fugu/PLAN.md`**. This list is only what has to happen on the Not a Chef side.

- [x] Test `/publish` (`tools/publish.sh`, then `dry-run` first) now that the site builds with two stacked themes. On any machine other than this one, run `git submodule update --init` first so `themes/fugu` is populated. *Done 2026-10-09: published from the two-theme layout with Fugu at the 2026-10-08 bump (`3091808`).*
- [ ] After each Fugu change lands, bump the submodule here (`git -C themes/fugu pull`, then commit `themes/fugu`) and check the site still renders the same.
- [ ] When Fugu gets its own CSS (Fugu PLAN.md §5), cut `assets/css/custom.css` down to the Not a Chef look only, and check every page against the current build.
- [ ] When Fugu renames params (Fugu PLAN.md §2), update `config/_default/params.toml` in the same step.
- [ ] When Fugu's docs exist (Fugu PLAN.md §7), decide whether `FORMAT.md` stays here as house style on top of Fugu's docs or are replaced by links.
- [x] Possibly move `layouts/404.html` back here from Fugu: its text is a Not a Chef joke. *Done in `2951dca`.*

### Carried over from the old plan

Unfinished items from the squashed Phases 7–9 (`git show e6346f4^:PLAN.md`). The template, JS, and tooling items moved to `themes/fugu/PLAN.md` on 2026-10-07 (formula strip, validator, build-time enrichment, cooking-time features, listing filters); what's left here is content and site checks. Items the code shows are done were dropped: the `.rcard` listings, heading-free card summaries, wiki-link styling and resolution, table scrolling, scaling and unit conversion, deploy, draft tooling (`drafts.py`, `frontmatter.py set`), and clean meta descriptions (`page-description.html`). Some of what's left may be partly done; check before starting.

**Site polish**
- [ ] Tags on recipe headers and related cards: neutral outline per `mockups/STYLE.md` ("Tag — never colored"). They still render with an accent border (seen on veg patties, 2026-10-06). They also have no hover state, though they're links and the cuisine chip beside them has one (an inset ring, `custom.css` `a.cuisine-chip:hover`); noted 2026-10-07. The header tags come from Blowfish's `partials/badge.html` (Tailwind `border-primary-400` classes) inside a bare `<a class="relative">` in Fugu's `article-meta/basic.html`, so the fix is to emit `<a class="tag">` there (a Fugu change) and give `a.tag` a hover in `custom.css`. Same row, measured 2026-10-07: those badges are 20px tall with 12px text beside the 22.8px cuisine and principle chips (baselines within half a pixel); emitting `.tag` should also let the header row share the card row's one chip box (`custom.css`, "Card top row").
- [ ] Tag cleanup: drop tags that repeat the cuisine; merge near-duplicates (Bread/Breads, Dressing/Dressings).
- [ ] Rename the American cuisine. *Noted 2026-10-08.* It's the largest cuisine (55 recipes, plus 1 Italian American), and most of it is everyday North American cooking we make in Canada: dips, dressings, burgers, buns, baking. "American" (and its card short form "USA", `content/cuisine/american/_index.md`) names a country we don't live in and is too specific for food that isn't uniquely American or Canadian. Candidates: "New world", "Fusion", or splitting it into more specific regional cuisines where a recipe really has one (Tex-Mex and PNW already exist; Southern or similar would be new). Decide alongside the existing Canadian (31) and world (11) buckets, since some recipes may belong in those instead. Then retag with `frontmatter.py set`, move or replace the `_index.md` (keep a `short` if the new name crowds the card row), and check the cuisine term pages and footer links still resolve.
- [ ] Check Fuse.js search relevance against real titles, tags, and ingredient text.
- [ ] Phone-while-cooking check: large touch targets, no accidental nav taps.
- [ ] Check the homepage against real content, and the footer's Tags/Cuisines links end to end.
- [ ] Cross-link essays and reference pages to related recipes where it makes sense.
- [x] Test the RSS feeds. *Done 2026-10-09.* Feeds: the site (`/index.xml`), recipes, essays, reference, the food log, and one per tag and cuisine. Recipes had none (`outputs: [HTML, JSON]`); it now outputs RSS. The site feed carried every page (288 items, 456 KB), so `[services.rss] limit = 50` caps every feed at the newest 50. Feeds were only discoverable through `<link rel="alternate">` in the head; the footer now has a Subscribe column (everything, recipes, essays, the food log). Items are summaries; links are absolute.
- [x] Keep drafts out of the feeds. With `buildDrafts = true`, Test kitchen pages go out to subscribers as if finished. Needs an RSS template that filters `Draft`, which is Fugu's; handed to fugu-agent 2026-10-09, along with having single pages point to their section's feed. *Done 2026-10-09: Fugu `ace1dad` filters drafts from every feed and links each page to its section's feed; checked in a local build.*
- [ ] Subscribe in a real reader (e.g. NetNewsWire) and check how posts render, and look at the new footer column in Chrome at desktop and phone widths, light and dark (Chrome extension wasn't connected 2026-10-09).
- [ ] Check that Hugo's related content (`partials/related.html`, keyed on tags and cuisine) gives reasonable suggestions before considering a manual `related:` field.

**Recipe format and validator** (`FORMAT.md` §Validation; the validator itself is in Fugu's plan)
- [ ] Once Fugu's validator exists, run it against all published recipes as a baseline; file each discrepancy as a spec bug or a content bug.

The old `SPEC.md` (merged into `FORMAT.md` 2026-10-10; full text in git) also sketched two data files for Fugu's build-time enrichment items, kept here until those land:

- `data/ingredient_prices.yaml`: ingredient → rough unit price, joined at build time into an estimated total and per-serving cost in the recipe index. Prices go stale, so the file carries a top-level `updated:` date, and the feature only claims "roughly which recipes are cheap or expensive".
- `data/departments.yaml`: grocery departments ordered the way you walk a store (produce and deli, centre aisles, frozen), plus ingredient → department. Orders the shopping list and doubles as the ingredient vocabulary for the pantry (win-the-fridge) tool.
- Both key on the canonical ingredient name parsed from a line (`"450g butternut squash, peeled and diced"` → `butternut squash`). Many-to-one matching (squash vs. butternut, plurals, brands) is the fragile part; prototype it against real recipes before settling either file's shape.

### Test kitchen (recipes in development)

Drafts are published as **Test kitchen** pages: a strip above the title, a mark on the card, and an optional `working_on` line; `content/essays/reference-essays/test-kitchen.md` explains the idea and lists them all. Mocked in `mockups/in-development.html`; built 2026-10-07 in Fugu (`partials/development/`, `[params.fugu.development]`) and here (`params.toml` `[fugu.development]`, `custom.css` `.dev-*`).

- [x] Drafts go live: `buildDrafts = true`. *Decided 2026-10-07. `publish.sh` needed no change: its guard only checks for dev-server output.*
- [x] Banner shape: the strip (option A), above the title, with a dotted line between the stock sentence and the `working_on` note. *Decided 2026-10-07: the colour and size pull it out of the flow of the content, so it reads as special.*
- [x] Where the banner sentence lives: config. *Decided 2026-10-07.*
- [x] Essays and reference pages get the same strip for now; test it and see how it feels. *Decided 2026-10-07.*
- [x] Wording: Test kitchen / keeper, after how restaurants develop a dish before it goes on the menu, and how we want to teach people to cook. Fugu's default stays In development / canon. *Decided 2026-10-07.*
- [x] Build the strip, the `working_on` note, and the card mark with its popover. *Done 2026-10-07.*
- [ ] Live with it for a while, on essays and reference pages too, and adjust. Things to watch: whether the card mark on every draft card is too loud (the Test kitchen page itself is all draft cards), whether "Test kitchen" reads oddly on a reference page, and whether the card popover works on a phone (it's CSS-only, like the glossary popover, so it relies on tap-to-hover).
- [x] Card top row overflowing on desktop. *Done 2026-10-07: the card chip says "Testing" (`short`), American shows as "USA" on cards (`content/cuisine/american/_index.md` `short`), and homepage rows go 4 → 2 columns at 1024px instead of 820px, so cards never drop below ~232px on desktop. Swept the homepage from 1232 to 500px and the listing, tag, cuisine, related and test kitchen grids at desktop widths: nothing overflows.*
- [ ] Card top row on phones. At 390px homepage cards are 165px (two across), and rows still clip at the card edge, drafts and not: Lazy tomato soup (CANADIAN, WTF, +5) by 45px, veg patties by 20px; at 340px Chicken Milanese too. Predates the test kitchen chip. Options: make `.rcard` a container and hide `+N` (then the principle chip) below the width where they fit; or one card per row on phones; or `short` names for more cuisines. Decide with a look at a real phone.
- [ ] Add `working_on` lines to the current drafts where there's something specific being tried.
- [x] **No popovers on cards** (decided 2026-10-11). *Done 2026-10-11: Fugu `8e0176e`, site CSS and docs in `5287b12`, submodule bumped.* Hovering across a card grid kept popping up the principle, method, and test kitchen popovers, which distracts from reading; each chip already links to a page that explains it. Fugu (handed to the Fugu agent): cards emit the bare chip, with the test kitchen chip a link to its explainer instead of a button. Here, after the submodule bump: drop the card-only popover CSS in `custom.css` (`.pop-card`, the `.rcard-top` clip-path lift and its `z-index: 2`, `.rcard-top > .pop-host`, the dev chip's `cursor: help`), and the card popover rows in docs/DESIGN.md (`hover`, and `working_on` "in the card's popover"). Prose glossary links and the chips in a page's tags row keep theirs for now (decided 2026-10-11); revisit if they start to feel like interruptions too.

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
- [ ] Known suspects to check first: the test kitchen mark's SVG is inlined twice per draft card; recipe-page tags still use Blowfish's badge (see Site polish above); popovers are hover/focus only, so check tapping on a phone.

### Doc review

Queued 2026-10-07. Now that Fugu has been split out, the docs in this repo describe three things at once: the theme, this site's house style, and history. Sort each one out. Do it after the code review, and before Fugu PLAN.md §7 (Fugu's own docs), since this decides what moves there.

- [ ] **Inventory.** Here: `README.md`, `CLAUDE.md`, `ARCHITECTURE.md`, `DESIGN.md`, `FORMAT.md`, `LIBRARIES.md`, `PLAN.md`, `REVIEW.md`, and `mockups/README.md`, `STYLE.md`, `COMPONENTS.md`. In Fugu: `README.md`, `CLAUDE.md`, `PLAN.md`, `CHANGELOG.md`. For each, decide: keep (this site's own), move or link (it's really about Fugu), merge (two docs saying the same thing), or delete (history git already has).
- [ ] **Stale facts.** Check every path, command, and claim against the code. *First pass 2026-10-14: README's tools line (Fugu vs `tools/`); ARCHITECTURE.md's tools list, section count, diagram, render hooks, and a dead PLAN.md section link; DESIGN.md's sections (Methods added), render hook path and the stack hook, `/lint` and the tools' section lists (methods); three mocks missing from `mockups/README.md`. Checked and still true: `preview.sh` does run `hugo server -D`; `win-the-fridge` is still the only principle tag and `term.html` is where CLAUDE.md says. Not yet checked line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md.*
- [ ] **Overlap.** `FORMAT.md` now owns the frontmatter (SPEC.md and FORMAT-ESSAYS.md merged into it, 2026-10-10). *`DESIGN.md` "Hugo frontmatter additions" cut to a link 2026-10-14.* Still to do: the tools' CLIs (`DESIGN.md` vs Fugu's `--help`).
- [ ] **Voice and rules.** Run `/mx:content-check` over the docs for the writing rules (Canadian spelling, em-dash restraint, no filler).
- [ ] **CLAUDE.md last.** Once the rest is settled, cut both CLAUDE.md files down to what an agent needs to start work, pointing at the docs instead of repeating them.
- [x] `FORMAT-ESSAYS.md` described a retired vault-outline workflow. *Done 2026-10-10: merged into `FORMAT.md`, which says essays are drafted in place.*
