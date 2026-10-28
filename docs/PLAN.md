# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Domain move

*Started 2026-10-18.* The site moves from `bruce-loves-to-cook.warpedvisions.org` to `https://bruce-loves-to-cook.ca`. Live and published 2026-10-18 (`deploy-2026-10-18`): DNS, certificate, `www` and old-domain 301s, new `baseURL`.

- [x] Bruce: keep the old domain's certificate renewing (current one ends 2026-12-23), or HTTPS visitors to old links hit a warning before the redirect.
- [x] Bruce: add the site to Google Search Console as a Domain property for `bruce-loves-to-cook.ca` (verified by a DNS TXT record; it covers `www` and `http` too), then submit `https://bruce-loves-to-cook.ca/sitemap.xml`. After the publish, so the sitemap carries the new domain. The old domain was never added, so there's no change of address to file.
- [ ] Fugu's `exampleSite/content/about.md` links the old domain: fugu-agent's change.
- [ ] Posts on warpedvisions.org that link the cookbook: the warped agent's change.

## Diagrams

Diagrams are fences, specced in hugo-warped (`~/projects/sites/hugo-warped/fences/`, the hugo-warped agent; its open work is in its `PLAN.md`). Fugu reads every fence through hugo-warped's parse partials (module pinned at 4045b3f, taken here by submodule with the module replacement in `config/_default/hugo.toml`), and `/lint` runs its validator. The shared-spec project (2026-10-26 to 10-27) is in git: `git log -- docs/PLAN.md`.

- [ ] Granola bars formula, once a second recipe needs a nut icon.
- [ ] Food ratios tables, once that method leaves the test kitchen.
- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.
- [ ] `timeline` and `tabs` in the cookbook: fugu-agent ports w42's hooks when a page needs one (`.tline-*` classes don't collide with our `.tl-*` lineage).

## Drinks

Drinks got their own section on 2026-10-27 (`content/drinks/`, Fugu 356fad8). Diagrams picked from `mockups/drink-diagrams.html`: A and C, not B.

- [x] Glass thumbnails on drink cards (Fugu efb6a23, 56×72), drawn from `glass`, `fill`, `ice`, `garnish` (`docs/FORMAT.md` "Drinks"; colours `STYLE.md` §7). With fugu-agent. All eight drinks have the fields.
- [x] Formula icons for drinks (Fugu 45029e3) and the Knotty Irishman's 4 : 2 : 1 : 8.
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
- [ ] Stale facts, line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md. Then `/mx:content-check`.
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21 to bring it forward; not built yet (no `static/mockups/`).
