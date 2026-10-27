# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Domain move

*Started 2026-10-18.* The site moves from `bruce-loves-to-cook.warpedvisions.org` to `https://bruce-loves-to-cook.ca`. Live and published 2026-10-18 (`deploy-2026-10-18`): DNS, certificate, `www` and old-domain 301s, new `baseURL`.

- [x] Bruce: keep the old domain's certificate renewing (current one ends 2026-12-23), or HTTPS visitors to old links hit a warning before the redirect.
- [ ] Bruce: add the site to Google Search Console as a Domain property for `bruce-loves-to-cook.ca` (verified by a DNS TXT record; it covers `www` and `http` too), then submit `https://bruce-loves-to-cook.ca/sitemap.xml`. After the publish, so the sitemap carries the new domain. The old domain was never added, so there's no change of address to file.
- [ ] Fugu's `exampleSite/content/about.md` links the old domain: fugu-agent's change.
- [ ] Posts on warpedvisions.org that link the cookbook: the warped agent's change.

## Diagrams

Formula diagrams (`~/projects/sites/hugo-warped/fences/formula.md`) for Mechanics that already state a ratio.

- [ ] Granola bars, once a second recipe needs a nut icon.
- [ ] Food ratios tables, once that method leaves the test kitchen.
- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.

## Standard diagram fences

*Started 2026-10-26.* One diagramming technique that other sites (warpedvisions.org, Scorekeep) can use: a clear spec and tools. Spec ownership moved from the w42 theme to this repo, then to hugo-warped (`~/projects/sites/hugo-warped`, the hugo-warped agent) on 2026-10-26. Coordinate with warped-agent (timeline, flow, tabs) and the Scorekeep content agent (`table`, `reminders`, and its placeholder fences). The spec is `~/projects/sites/hugo-warped/fences/README.md`. Its open items (fixtures, the validator, the Hugo module, charts) are tracked in hugo-warped's `PLAN.md`; only this site's items stay below.

### Impact by site

*Checked 2026-10-26.* Nothing has changed on any site yet: the spec is docs only. A full build of this site gives the same 562 pages and no new warnings. Each line below is approved (2026-10-26) and waits on its project's agent. None of them changes how a block that's valid and live today renders.

- **bruce-loves-to-cook.ca** (this repo, Fugu; 37 `formula` and 11 `stack` blocks; fugu-agent):
  - The formula hook warns on a row with more than four cells. No live block has one, so no warnings.
  - A block with no valid lines shows its source instead of nothing. No live block is affected.
  - Hooks drop `←` notes. No live block has one.
  - New: ports of `timeline`, `flow` and `tabs`, used only when a page needs one.
  - Docs: Fugu's `docs/recipe-format.md` and `docs/features.md` point at `~/projects/sites/hugo-warped/fences/`.
- **warpedvisions.org** (w42 theme; 1 `timeline`, 1 `flow`, 1 page with 2 `{{< tabs >}}` blocks; w42 theme agent, then warped-agent):
  - `timeline` and `flow` show their source when no line is valid. Today they draw nothing.
  - Both drop `←` notes. None are live, and a timeline label is no longer "the whole rest of the line".
  - A `tabs` hook replaces the shortcode, with identical HTML. The manifesto's two blocks are published, so they're migrated and checked against the live page before the shortcode is removed.
  - Unchanged: the `formula` shown as source in the manifesto, and the `qgraph` sketches. Both are ordinary code blocks.
  - Docs: `themes/w42/docs/timeline.md` and `flow.md` become pointers here.
- **Scorekeep app and microsite** (11 rules files; Scorekeep content agent and SCOREKEEP). The biggest change:
  - The `@` placeholders become fences: 12 `@diagram`, 5 `@example`, 9 `@sheet`, 8 `@house-rules`, 8 `@table`.
  - `@bullets` becomes plain bullets in `@if` branches; `@aliases` and `@goal` go.
  - The Swift `RulesDocument` parser is rewritten to the shared grammar, and `RulesDocumentTests` gates it.
  - The microsite gets new hooks: `table`, `reminders` and the placeholders.
  - Table names may shorten, `golf-card-values` to `card-values`, so the cheat sheet's lookups change with them.
  - Docs: its rules README stops saying w42 owns the specs.
- **space-command.ca, brucealderson.ca, robotpony.ca, w31, w32, warped-next**: unaffected. They hold only ordinary code blocks (spacecommand.ca has about 140: bash, json, sql), and the spec never warns about those. That rule was tightened today for exactly this case.

- [x] Gather each site's fences and needs from warped-agent and Scorekeep, alongside our `formula` and `stack` (2026-10-26).
- [x] Draft the shared spec: kinds (diagram, data, placeholder), line grammar, cells and tokens, attributes (`name` unique per file, `draw`, `class`), bad lines, fallback, project extensions, extending a type (`docs/fences/README.md`).
- [x] Bruce approved the spec, 2026-10-26, including `tab:` panel lines.
- [x] Tabs fence drafted with warped-agent (`docs/fences/tabs.md`, 2026-10-26); a fence, not a callout, since clear source text in Obsidian is enough.
- [x] Tabs in w42: the hook is in the w42 theme 0.6.0 (1051f16), and both manifesto blocks are migrated, with HTML identical to the live page apart from ids (`tabs-fence-N`). The shortcode's removal is next (w42 theme agent).
- [x] ```` ```flow ```` in the cookbook (2026-10-26): Fugu 5f21797 (hook by fugu-agent), styled in `custom.css` and `mockups/STYLE.md`/`style.html`. Checked in Chrome in the 300px sidebar and at phone width. Its first use, Cornmeal fried chicken's pan vs oven rows, went with the oven variation (Bruce, 2026-10-26: ovens bake, they don't fry).
- [ ] ```` ```timeline ```` in the cookbook: fugu-agent ports w42's hook when a page needs one (`.tline-*` classes don't collide with our `.tl-*` lineage).
- [ ] Tabs in the cookbook: fugu-agent ports the hook when a page needs one.
- [x] w42: a block with no valid lines shows its source instead of nothing (theme 0.6.0).
- [ ] `←` notes: each project's hooks drop them. w42 (0.6.0) and Fugu are done; Scorekeep is still to do, and so is the validator.
- [ ] Tools: a validator any site can run on its Markdown, replacing the build-time `warnf` checks and `/lint` item 5 as the source of truth, plus reference hooks to port.
- [x] Every type's page in `docs/fences/` (Bruce, 2026-10-26): `timeline.md` and `flow.md` copied from w42, `formula.md` and `stack.md` moved out of `FORMAT.md`.
- [ ] w42 replaces `themes/w42/docs/timeline.md` and `flow.md` with pointers to the spec's final home (waiting on the home decision).
- [x] Scorekeep's pages: `table.md`, `reminders.md`, `placeholders.md` (drafted by the Scorekeep content agent, 2026-10-26).
- [ ] Fugu's `docs/recipe-format.md` and `docs/features.md` point at `formula.md` and `stack.md` (fugu-agent).
- [x] Home decided (Bruce, 2026-10-26): `~/projects/sites/hugo-warped`, owned by the hugo-warped agent, with scope wider than fences (the shared Markdown dialect and the Hugo plumbing that reads it). Handed off with branch `fences-export` (docs/fences history).
- [x] Moved to `~/projects/sites/hugo-warped/fences/` (hugo-warped fe70da0, all 10 commits kept); `docs/fences/` is now a pointer, and CLAUDE.md, FORMAT.md, DESIGN.md and `/lint` point there. hugo-warped told warped-agent and the Scorekeep content agent.

## Drinks

Drinks got their own section on 2026-10-27 (`content/drinks/`, Fugu 356fad8). Diagrams picked from `mockups/drink-diagrams.html`: A and C, not B.

- [x] Glass thumbnails on drink cards (Fugu efb6a23, 56×72), drawn from `glass`, `fill`, `ice`, `garnish` (`docs/FORMAT.md` "Drinks"; colours `STYLE.md` §7). With fugu-agent. All eight drinks have the fields.
- [x] Formula icons for drinks (Fugu 45029e3) and the Knotty Irishman's 4 : 2 : 1 : 8.
- [ ] Formula ratios for sangria and lemon-lime iced tea's weight batch.
- [ ] Homepage: a drinks band, or drinks inside the recipes band.

## Fugu follow-through

- [ ] For fugu-agent, from the `layouts/` review (no session was running to send them to):
  - `tests/check.py` fails every fixture: Blowfish declares Hugo 0.163–0.166 and this machine runs 0.168, and `--panicOnWarning` turns that compatibility warning into a build failure.
  - `head.html` lines 167 and 200: `not .Site.Params.disableImageZoom | default true` pipes the `not` into `default`, so `disableImageZoom = true` can never turn zoom off.
  - The site header's script (`layouts/partials/header/basic.html`) closes Fugu's `details.ing-config` popup on outside clicks; that belongs with `ingredients.js`. Once Fugu does it, drop the selector here.
- [ ] For fugu-agent (2026-10-27, no session running): add the formula icons `breast`, `pounder`, `knife`, and `bun` from `mockups/formula-icons-3/` to Fugu's `assets/icons/formula/` (approved in `mockups/formula-icons-3.html`). They sit in this repo's `assets/icons/formula/` until then, for Cornmeal fried chicken's patties diagram; delete those copies after the submodule bump.
- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug.
- [ ] When Fugu gets its own CSS (Fugu §5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Review

*Deferred (2026-10-14).* Code, then docs, then Fugu's docs (§7). Code goes one area per pass with `/code-review high`, each finding fixed, won't fix (why), or moved to Fugu's plan; template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] `tools/*.sh` and the Makefile, from a fresh clone with the submodule uninitialised.
- [ ] Accessibility on the built site: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.
- [ ] Docs inventory: keep, move to Fugu, merge, or delete. Tool CLIs in both `DESIGN.md` and Fugu's `--help` are the known overlap.
- [ ] Stale facts, line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md. Then `/mx:content-check`.
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21 to bring it forward; not built yet (no `static/mockups/`).
