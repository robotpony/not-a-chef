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

A glossary of the cookbook's concepts, with a quiet hover on the words in the text. Mock: `mockups/glossary.html`; decided 2026-10-30. Homes (Bruce, 2026-10-30): the spec, both `glossary.py` tools, the parse partials and `index.json` go to hugo-warped (briefed 2026-10-30); the popover, list template, search box and CSS defaults to fugu-agent once hugo-warped reports the partial interface; content, `custom.css` and the footer here. Done here: the footer link and the lighter `.glossary-link`.

- [ ] Source: one file per concept in `content/reference/glossary/` (`title`, `also:` for other forms, the body is the definition, and its first sentence is the hover). Entries build into the list only, with no page each. Done 2026-10-30: `glossary.md` is now `glossary/_index.md` with the cascade, and Kewpie has its own file. **Don't publish until Fugu's list template lands**: until then the glossary page shows only its intro. The `## Kewpie mayonnaise` copy in `_index.md` keeps today's render-link lookup working; cut it once Fugu uses hugo-warped's `resolve.html`.
- [ ] Glossary page: A to Z under Reference, one `<dl>` per letter under a letter heading, each `<dt id>` holding a `<dfn>`, other forms, and "Used in" from the pages linking to it (a count past a handful). Reference essays (Win the fridge) are listed too, linking their essay. A search box at the top filters as you type over the term, its forms, and the definition; it shows only with JavaScript, and without it the page is the full list. Also `index.json` (term, also, def, url).
- [ ] Marking in the text: a plain wiki link, `[[Deglaze|deglaze]]`, on the first prose mention per page, never in headings, links, ingredient lists, code or fences. The look is today's `.glossary-link` a little lighter (dotted 1.5px, `--ink-faint` at 65%, full `--ink` on hover). The popover is a `role="tooltip"` with the term and first sentence, no link, tied by `aria-describedby`; on a phone a tap goes to the entry. Hand-written and tool-written links look the same.
- [ ] Tools are in hugo-warped (a1aef30, submodule at 6d6fc2f): `python3 themes/hugo-warped/tools/glossary.py candidates|link content --glossary reference/glossary --skip tools/glossary-skip.txt`. Still to do here: Make targets, `/lint` running `link --check`, and filing candidates into `docs/REVIEW.md`. As designed: `glossary.py candidates`: words on 2+ pages, not in the glossary, rare in everyday English or already in italics; adds them to `docs/REVIEW.md`. `glossary.py link`: proposes each link as a diff and asks (yes, never on this page, skip); a "never" goes in `tools/glossary-skip.txt`. `/lint` reports unlinked first mentions; nothing writes on its own.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21 to bring it forward; not built yet (no `static/mockups/`).
