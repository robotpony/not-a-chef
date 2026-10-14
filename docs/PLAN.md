# Plan

Future work only. Finished items are cut, not ticked: what was done, and when, is in git history (`git log -- docs/PLAN.md`). The phased build plan was squashed after release (2026-09-25, `e6346f4`), and this file again on 2026-10-14. Each item says what it is, why, and roughly how, so it can be picked up cold.

## Future

### Site

- [ ] **Build number in the footer.** Show which publish a page came from, e.g. "Build 42" in small mono text in the footer, so a stale cache or a missed deploy is obvious at a glance. Keep the count in a committed data file (`data/build.toml`, `number = 41`). `tools/publish.sh` increments it before building on the `all` path only, not `build`, `check`, `dry-run`, or `deploy` (which ships an existing `public/`), and commits the bump after a successful deploy so the count survives across machines. The footer (`layouts/partials/footer.html`, site side) reads `site.Data.build.number`; consider adding the short commit hash in a `title` or beside it. Dev builds (`preview.sh`) show the current number, or "dev", but never increment.

### Methods

Spec: `docs/METHODS.md`. Template work is Fugu's, handed to fugu-agent; this list is the site side plus the handoffs.

**First methods**

- [ ] Burgers blueprint parts (`content/methods/burgers/parts/`: patties, seasoning, cooking, assembly, sauces). Published, TODOs cleared, review pass in `d7620e2`. Close once Bruce signs off.
- [ ] Burger builds (eleven, in `content/methods/burgers/builds/`). Published and filled out, review pass in `d7620e2`. Close once Bruce signs off.
- [ ] One-pan pasta blueprint (`content/methods/one-pan-pasta/`). Parts published (`94ec9c9`, `22944d2`); the two builds (American bolognese, cherry tomato and garlic) are still test kitchen stubs.
- [ ] Stock method, from Why ingredients matter in stock and the four stock recipes.
- [ ] Foil packets method, from Camp cooking.
- [ ] Flags on the lineage timeline: context markers that aren't food (Burger King opens, a world's fair), styled apart from builds so they read as backdrop. Decide where they live (the blueprint's body, or `flags` frontmatter if they need to sort by year), mock them in `mockups/methods-pages.html`, then hand the template change to fugu-agent.

**Blueprint pages**

- [ ] Mock the blueprint and build pages if they change visibly (picks now in the body; cards show era and description instead of origin and profile).
- [ ] Check the methods list and blueprint pages at phone width, and light mode (checked so far headless at 1280px, dark).
- [ ] Later, reconsider: a table comparing builds part by part on the blueprint page. It needs picks as data, so it would mean parsing a strict `## Picks` list (`- **Part:** pick`) from each build's body.
- [ ] Whether reference essays (Win the fridge, Test kitchen) belong in the essays list, or with Reference.

**Stack diagrams and the layer kit**

- [ ] More diagrams: sandwich construction and lasagne layering, once there's a blueprint or recipe to put them on. Burgers are done.
- [ ] Drop "v1" from the layer kit in STYLE.md once Bruce calls the redraw settled (Fugu's kit already matches round 4 in `mockups/exploded-builds.html`). Art direction for any further redraws: line art, `--accent-soft` fill plus kit colours, texture as strokes; references are described in this file's history (2026-10-11).
- [ ] Spreads and food colours (decided 2026-10-14, `mockups/spreads-and-colour.html`, STYLE.md §6). Fugu has the kit as `93d0b6d` (unpushed), with `cheese-american.svg` handed over separately. Left: bump the submodule, check a build page light and dark, then hand the stack-block edits to the content agent:
    - a spread right under `bun-top` or right above `bun-base` folds into it (`bun-top + mayo`): Whopper, Bruce burger, drive-in deluxe, pub, Teen, Mozza, Big Boy, smash; every pair gets a label, or its key shows in the aria-label;
    - American or processed cheese moves from `cheese` to `cheese-american`: Big Boy, smash, McDouble, fast-food double.

### Plant-based tag

A concept tag for plant-based food: green, leaf icon. Green is the principle hue and there's no sixth (`mockups/STYLE.md`), so it likely shares the principle tokens and is told apart by the leaf; STYLE.md would then say green means "a value this recipe holds," not Win the fridge alone. Sketched in `mockups/methods-icon.html` §5.

- [ ] Decide principle-green or another treatment; mock the chip and tag page.
- [ ] `content/tags/plant-based/_index.md`, the leaf icon, and tagging the recipes.

### Formula diagrams

Content-side only; the card strip, `/lint` check, and icon kit are in `themes/fugu/PLAN.md`.

- [ ] Diagram more Mechanics. 97 recipes have a `## Mechanic`; the ones that state a ratio are candidates. Only draw a ratio the text already states (`FORMAT.md` §Formula diagrams).
- [ ] Ratio (`:`) and sequence (`→`) diagrams are built but unused on a real page; check them against real content the first time one is written.
- [ ] Retest a formula inside Mechanic (compact, sidebar) on the live site.
- [ ] Veg patties' duplicate swaps: the Mechanic bullets and the diagram's swap lines both list them. Trim the bullets to quantities and notes, or drop the fourth field from the block.

### Site polish

- [ ] Tags on recipe headers: neutral outline per STYLE.md ("Tag — never colored"), with a hover like `a.cuisine-chip:hover`. They come from Blowfish's `partials/badge.html` inside Fugu's `article-meta/basic.html`, so emit `<a class="tag">` there (Fugu) and style `a.tag` in `custom.css`; that should also let the header row share the card row's chip box (the badges are 20px beside 22.8px chips).
- [ ] Tag cleanup: drop tags that repeat the cuisine; merge near-duplicates (Bread/Breads, Dressing/Dressings).
- [ ] Rename the American cuisine (55 recipes, mostly everyday North American cooking, not uniquely American). Candidates: "New world", "Fusion", or splitting into regional cuisines where a recipe really has one (Tex-Mex and PNW exist). Decide alongside Canadian (31) and world (11), retag with `frontmatter.py set`, replace `content/cuisine/american/_index.md` (keep a `short`), and check the cuisine term pages and footer links.
- [ ] Check Fuse.js search relevance against real titles, tags, and ingredient text.
- [ ] Phone-while-cooking check: large touch targets, no accidental nav taps.
- [ ] Check the homepage against real content, and the footer's Tags/Cuisines links end to end.
- [ ] Cross-link essays and reference pages to related recipes where it makes sense.
- [ ] Subscribe in a real reader (e.g. NetNewsWire) and check how posts render; look at the footer's Subscribe column in Chrome at desktop and phone widths, light and dark.
- [ ] Check that Hugo's related content (`partials/related.html`, keyed on tags and cuisine) gives reasonable suggestions before considering a manual `related:` field.

### Test kitchen

Drafts publish as **Test kitchen** pages (docs/DESIGN.md "Test kitchen (drafts)").

- [ ] Live with it and adjust: whether "Test kitchen" reads oddly on a reference page, and whether the card mark is too loud on the Test kitchen page itself (all draft cards).
- [ ] Card top row on phones: at 390px homepage cards are 165px and rows clip at the card edge (Lazy tomato soup by 45px, veg patties by 20px; Chicken Milanese at 340px). Options: make `.rcard` a container and hide `+N` (then the principle chip) where they don't fit; one card per row on phones; or more `short` cuisine names. Decide with a look at a real phone.
- [ ] Add `working_on` lines to the current drafts where there's something specific being tried.

### Recipe format and validator

- [ ] Once Fugu's validator exists, run it against all published recipes as a baseline; file each discrepancy as a spec bug or a content bug.

Two data files sketched for Fugu's build-time enrichment, kept here until those land:

- `data/ingredient_prices.yaml`: ingredient → rough unit price, joined at build time into an estimated total and per-serving cost. Prices go stale, so it carries a top-level `updated:` date, and the feature only claims "roughly which recipes are cheap or expensive".
- `data/departments.yaml`: grocery departments in store-walking order, plus ingredient → department. Orders the shopping list and doubles as the ingredient vocabulary for the pantry (win-the-fridge) tool.
- Both key on the canonical ingredient name parsed from a line (`"450g butternut squash, peeled and diced"` → `butternut squash`). Many-to-one matching (squash vs. butternut, plurals, brands) is the fragile part; prototype it against real recipes first.

### Fugu theme

Theme work is tracked in **`themes/fugu/PLAN.md`**; this is only the Not a Chef side.

- [ ] After each Fugu change lands, bump the submodule (`git -C themes/fugu pull`, commit `themes/fugu`) and check the site still renders the same.
- [ ] When Fugu gets its own CSS (Fugu PLAN.md §5), cut `assets/css/custom.css` down to the Not a Chef look only, and check every page against the current build.
- [ ] When Fugu renames params (Fugu PLAN.md §2), update `config/_default/params.toml` in the same step.
- [ ] When Fugu's docs exist (Fugu PLAN.md §7), decide whether `FORMAT.md` stays here as house style on top of them or is replaced by links.

### Editing workflow

- [ ] Build an Obsidian plugin to coordinate edits between Obsidian and Claude Code. #todo Friction it would fix (2026-10-12): Obsidian resolves `[[Title]]` by filename, so title links are unresolved there and clicking one creates an empty note; Obsidian and Claude edit the same files at once and half-done edits get swept into commits; Obsidian rewrites flow-list frontmatter to block lists on save. Start by deciding what it owns: title-based link resolution, a "being edited" marker Claude can read, or both.

### Behind the scenes

- [ ] *Deferred.* Publish `mockups/` as a subfolder of the site to show the design work. Decide what's in it (current mocks only, not `archived/`?), how it's linked (footer, About), and whether it's kept out of search and the sitemap. The mocks are standalone HTML, so copy them as static files.

### Code review

A careful review of both sides of the Fugu split, before the doc review. One area per pass: run `/code-review high` scoped to it, check every finding against the code, and record each as fixed, won't fix (with why), or moved to `themes/fugu/PLAN.md`. Template or CSS fixes get `python3 themes/fugu/tests/check.py --compare`, then Chrome at desktop and phone widths, light and dark.

- [ ] **Fugu templates.** The Blowfish overrides (Fugu PLAN.md §6) and Fugu's own partials and render hooks: empty sections, a site without cuisine, pages with no date, drafts in every card list.
- [ ] **Fugu JS.** `ingredients.js`, `automagic-sidebar.js`, `search.js`: pages still read and print with JS off, keyboard and screen-reader behaviour, listeners that leak or run twice.
- [ ] **Tools.** Fugu's `frontmatter.py`, `drafts.py`, `compare-builds.py`, `add-image.sh`; here `tools/preview.sh`, `publish.sh`, `deploy.sh`, and the Makefile. Error handling, a fresh clone with the submodule uninitialised, anything that could ship a bad `public/`.
- [ ] **Site layouts.** `layouts/` (homepage, header, footer, favicons, fonts, 404): what Fugu now does better, and anything that shadows a Fugu file by accident.
- [ ] **CSS.** `assets/css/custom.css`: rules for classes nothing emits (grep the built `public/`), duplicates, colours outside the tokens. Overlaps Fugu PLAN.md §5; decide which rules move before cutting.
- [ ] **Accessibility and markup.** Popovers and their ARIA, focus order, landmarks, heading levels, alt text in `render-image.html`.
- [ ] Known suspects first: the test kitchen mark's SVG inlined twice per draft card; recipe-page tags on Blowfish's badge (Site polish); popovers are hover/focus only, so check tapping on a phone.

### Doc review

After the code review, and before Fugu PLAN.md §7 (Fugu's own docs), since this decides what moves there.

- [ ] **Inventory.** Here: `README.md`, `CLAUDE.md`, `ARCHITECTURE.md`, `DESIGN.md`, `FORMAT.md`, `LIBRARIES.md`, `PLAN.md`, `REVIEW.md`, and `mockups/README.md`, `STYLE.md`, `COMPONENTS.md`. In Fugu: `README.md`, `CLAUDE.md`, `PLAN.md`, `CHANGELOG.md`. For each: keep, move or link (it's about Fugu), merge, or delete (git has it).
- [ ] **Stale facts.** Check every path, command, and claim against the code. First pass done 2026-10-14 (README, ARCHITECTURE.md, DESIGN.md, `mockups/README.md`); still to check line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md.
- [ ] **Overlap.** The tools' CLIs, documented in both `DESIGN.md` and Fugu's `--help`.
- [ ] **Voice and rules.** Run `/mx:content-check` over the docs.
- [ ] **CLAUDE.md last.** Cut both CLAUDE.md files down to what an agent needs to start work, pointing at the docs instead of repeating them.
