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

- [ ] **Scaling menu as a callout.** The ingredient options popover (gear button on each ingredients heading) is an oddly shaped box: a wide slider row, then three unit buttons that wrap onto two lines ("Imperial" alone on the second). Redraw it as a comic-style callout with a small `^` pointer up to the gear, and replace the unit buttons with a drop list (As written / Metric / Imperial), which also fixes the wrap. Markup is built in Fugu's `assets/js/ingredients.js` (config menu, ~line 734), so the drop list is a Fugu change (coordinate with whoever's working there); the look is `custom.css` (`.ing-scale-*` and the menu rules around it). Mock in light and dark, at desktop and phone widths, including keyboard focus and the open/closed states.
- [ ] **Space above the footer on reading pages.** About (and other pages with the reading sidebar) run straight into the footer: on About, the last row of photo markers sits on the footer's top border. Recipes don't, because the share/related block follows the body. Give every page a standard gap above the footer, from the spacing scale in STYLE.md, rather than fixing About alone. Likely `custom.css`: at desktop width `.reading-sidebar-wrap` drops its `margin-bottom` (`custom.css:1306`) and the article column has none. Mocked 2026-10-07 in `mockups/page-bottom-spacing.html`: every page type measures 38–42px today except About on desktop (0px), and the 40px is borrowed from each page's last block (`.article-pagination`, `.home-section`, the listing spacer). Open: page-level rule (option A) or an About-only patch (B).

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
- [ ] Tags on recipe headers and related cards: neutral outline per `mockups/STYLE.md` ("Tag — never colored"). They still render with an accent border (seen on veg patties, 2026-10-06).
- [ ] Tag cleanup: drop tags that repeat the cuisine; merge near-duplicates (Bread/Breads, Dressing/Dressings).
- [ ] Check Fuse.js search relevance against real titles, tags, and ingredient text.
- [ ] Phone-while-cooking check: large touch targets, no accidental nav taps.
- [ ] Check the homepage against real content, and the footer's Tags/Cuisines links end to end.
- [ ] Cross-link essays and reference pages to related recipes where it makes sense.
- [ ] Check that Hugo's related content (`partials/related.html`, keyed on tags and cuisine) gives reasonable suggestions before considering a manual `related:` field.

**Recipe format and validator** (`SPEC.md`; the validator itself is in Fugu's plan)
- [ ] Once Fugu's validator exists, run it against all published recipes as a baseline; file each discrepancy as a spec bug or a content bug.

### Docs

- [ ] `FORMAT-ESSAYS.md` says essays are outlined in a vault at `writing/essays/` and migrated by hand. Confirm whether that's still true now that this repo is the vault, and update it.
