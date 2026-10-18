# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Domain move

*Started 2026-10-18.* The site moves from `bruce-loves-to-cook.warpedvisions.org` to `https://bruce-loves-to-cook.ca`. Bruce is setting up DNS and the certificate; nothing below ships until the new domain serves over HTTPS.

- [ ] Bruce: DNS for `bruce-loves-to-cook.ca` (and `www`) points at the server, the certificate covers both, and the web server's vhost serves `remote_path` for the new name. `www` then redirects to the bare domain through the rule already in `static/.htaccess`; check it once the name resolves.
- [ ] Check `remote_path` in `tools/config.toml` still matches the vhost root if it moved.
- [ ] Set `baseURL` in `config/_default/hugo.toml` to `https://bruce-loves-to-cook.ca/`, build, and grep `public/` for the old host (canonical links, `sitemap.xml`, RSS, `index.json`).
- [ ] Bruce: redirect `https://bruce-loves-to-cook.warpedvisions.org` to the new domain, 301, every path to the same path, so published links and search results carry over. Only once the new domain is live. If the old vhost keeps serving `remote_path`, this can be a second host rule in `static/.htaccess` (Claude can add it); otherwise it goes in the old vhost's config. Keep the old certificate valid, or HTTPS visitors hit a warning before the redirect.
- [ ] `/publish`, then check the new domain in Chrome: home, a recipe, search, an image, the RSS feed.
- [ ] Fugu's `exampleSite/content/about.md` links the old domain: fugu-agent's change.
- [ ] Posts on warpedvisions.org that link the cookbook: the warped agent's change.

## Diagrams

Formula diagrams (`FORMAT.md` §Formula diagrams) for Mechanics that already state a ratio.

- [ ] Granola bars, once a second recipe needs a nut icon.
- [ ] Food ratios tables, once that method leaves the test kitchen.
- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.

## Fugu follow-through

- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug.
- [ ] When Fugu gets its own CSS (Fugu §5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Review

*Deferred (2026-10-14).* Code, then docs, then Fugu's docs (§7). Code goes one area per pass with `/code-review high`, each finding fixed, won't fix (why), or moved to Fugu's plan; template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [ ] Site `layouts/`: what Fugu now does better, accidental shadowing.
- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] `tools/*.sh` and the Makefile, from a fresh clone with the submodule uninitialised.
- [ ] Accessibility on the built site: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.
- [ ] Docs inventory: keep, move to Fugu, merge, or delete. Tool CLIs in both `DESIGN.md` and Fugu's `--help` are the known overlap.
- [ ] Stale facts, line by line: FORMAT.md, METHODS.md beyond the blueprint section, STYLE.md, COMPONENTS.md, LIBRARIES.md. Then `/mx:content-check`.
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Deferred

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search).
