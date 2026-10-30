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

*Idea (2026-10-29).* A page, or a set of pages, explaining the cookbook's concepts (ratios, carryover, fond, winning the fridge), plus a script that finds those keywords in body text and gives them a hover. Today only an explicit `[[Term]]` gets a popover (render-link → `concept/pop.html`, `popover.js`, from the glossary or a reference essay); the script would cover plain mentions with no link.

- [ ] Decide the home: grow `content/reference/glossary.md` and the reference essays, or a `concepts/` set with one page per concept.
- [ ] Keyword hover: Hugo emits the term list (title, aliases, one-line definition, URL) as JSON; the script marks the first mention per page, skips headings, links, code and fences, and reuses the existing popover look.
- [ ] Other sites could use it (w42), so it may belong in warped.js (`~/projects/sites/warped.js`) rather than Fugu. Its agent isn't running: take it there as a proposal (`docs/proposals/`) when it is.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21 to bring it forward; not built yet (no `static/mockups/`).
