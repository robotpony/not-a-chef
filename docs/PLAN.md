# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Domain move

*Started 2026-10-18.* The site moves from `bruce-loves-to-cook.warpedvisions.org` to `https://bruce-loves-to-cook.ca`. Live and published 2026-10-18 (`deploy-2026-10-18`): DNS, certificate, `www` and old-domain 301s, new `baseURL`.

- [ ] Bruce: keep the old domain's certificate renewing (current one ends 2026-12-23), or HTTPS visitors to old links hit a warning before the redirect.
- [ ] Bruce: add the site to Google Search Console as a Domain property for `bruce-loves-to-cook.ca` (verified by a DNS TXT record; it covers `www` and `http` too), then submit `https://bruce-loves-to-cook.ca/sitemap.xml`. After the publish, so the sitemap carries the new domain. The old domain was never added, so there's no change of address to file.
- [ ] Fugu's `exampleSite/content/about.md` links the old domain: fugu-agent's change.
- [ ] Posts on warpedvisions.org that link the cookbook: the warped agent's change.

## Diagrams

Formula diagrams (`FORMAT.md` §Formula diagrams) for Mechanics that already state a ratio.

- [ ] Granola bars, once a second recipe needs a nut icon.
- [ ] Food ratios tables, once that method leaves the test kitchen.
- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.

## Shared post tools with warpedvisions

*Started 2026-10-22.* Two Markdown tools from the w42 theme (warpedvisions.org), shared so a block works the same on both sites. The w42 theme agent owns the spec and reference hook; fugu-agent ports them into Fugu (no shared files).

- [ ] ```` ```timeline ```` fence: waiting on the w42 spec path. Cookbook needs sent 2026-10-22: labels via `RenderString` so wiki links work, decade ticks, narrow-screen list, namespaced classes (our lineage owns `.timeline` / `.tl-*`), room for decade and range entries later. Then hand to fugu-agent.
- [ ] Tabs: wait for the fenced microformat, not the `{{< tabs >}}` shortcode (noise in Obsidian). First use: a recipe's method beside its variation, like pan-fry and oven on Cornmeal fried chicken.

## Fugu follow-through

- [ ] For fugu-agent, from the `layouts/` review (no session was running to send them to):
  - `tests/check.py` fails every fixture: Blowfish declares Hugo 0.163–0.166 and this machine runs 0.168, and `--panicOnWarning` turns that compatibility warning into a build failure.
  - `head.html` lines 167 and 200: `not .Site.Params.disableImageZoom | default true` pipes the `not` into `default`, so `disableImageZoom = true` can never turn zoom off.
  - The site header's script (`layouts/partials/header/basic.html`) closes Fugu's `details.ing-config` popup on outside clicks; that belongs with `ingredients.js`. Once Fugu does it, drop the selector here.
- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug.
- [ ] When Fugu gets its own CSS (Fugu §5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Review

*Deferred (2026-10-14).* Code, then docs, then Fugu's docs (§7). Code goes one area per pass with `/code-review high`, each finding fixed, won't fix (why), or moved to Fugu's plan; template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [x] Site `layouts/`: what Fugu now does better, accidental shadowing. Done 2026-10-18: fixed the footer's zoom error, term links, the Food Log guard, and the 404 path; won't fix hand-typed section names (this site's sections are fixed) or caching the header (the build takes under a second); two questions in `REVIEW.md`, Fugu items queued under Fugu follow-through.
- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] `tools/*.sh` and the Makefile, from a fresh clone with the submodule uninitialised.
- [ ] Accessibility on the built site: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.
- [ ] Docs inventory: keep, move to Fugu, merge, or delete. Tool CLIs in both `DESIGN.md` and Fugu's `--help` are the known overlap.
- [ ] Stale facts, line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md. Then `/mx:content-check`.
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Deferred

- [x] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). #focus
