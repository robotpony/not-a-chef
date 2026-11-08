# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Glossary

Spec, partials, and tools in hugo-warped; popover and A to Z page in Fugu; entries in `content/reference/glossary/`. Every current link offer is answered (2026-11-07); new pages bring new ones (`/glossary-link`).

- [ ] Bold step labels ("**Deglaze.**", "**Doneness.**") are offered as links. Ask hugo-warped to skip bold text at the start of a list item, once Bruce says go (`docs/REVIEW.md`); until then, answer "never" per page.

## Waiting on Fugu

Six visual-pass fixes (chip wording, lineage years, link arrow wrap, glossary placeholder, the example site's old domain, a keep-awake switch) went to fugu-agent on 2026-11-07, in Fugu's `PLAN.md` §10 (4a965e1). It messages here as each lands; then bump Fugu and check the site renders the same.

- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug. When Fugu gets its own CSS (§5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Design v2

Under way; decisions are recorded in `mockups/STYLE.md` and `style.html` when they land. Next changes are mocked before they're built.

- [ ] Finish the visual pass by hand. Headless Chrome covered 17 page types (2026-11-03); not seen: hover states, the Recipes menu, the phone drawer, glossary popovers, and the opened Recipe notes.

To mock:

- [ ] Recipe mechanic: the site promises ratios, but the Mechanic is small grey italic, third in the sidebar, and collapsed on phones. Mock it above Ingredients, with the rest of the sidebar lighter (Chai's sidebar runs about 260px past its method).
- [ ] A thin line of images leading the page, under the header: Bruce's idea, to be worked out (which pages, where the images come from, height, how it sits with the sidebar photos). Decide the phone photos with it (a 112px thumbnail sits alone at the left, above Recipe notes).
- [ ] Food Log sidebar: 40 month rows, about half reading "undated" in mono. Drop the word, and group or collapse older years.
- [ ] Uneven cards: a formula row on some cards and not others on the homepage and recipe list, a gap above short stacks on blueprint cards, and about 110px of blank under the homepage's Muesli card.
- [ ] Phone flow diagrams wrap with an arrow leading the second row (Pan sauces).
- [ ] Lighter recipe header: a hairline under the title and one small-caps meta line (servings · time · source), Smitten Kitchen's treatment, mocked against the current stat row.
- [ ] Homepage: a drinks band, or drinks inside the recipes band.

From the 2026-10-30 look at RecipeTin Eats, Serious Eats, and Smitten Kitchen (full notes in git): photos lead on all three, at the top and large, where ours sit in the sidebar; that's the biggest difference in feel.

## Content and format

- [ ] Bold lead phrase on each method step ("**Brown the beef.** …"), so prose scans mid-cook. A recipe-writing convention, not a template; some recipes do it already. Settle the glossary's bold-label rule first, or each new label gets offered as a link.
- [ ] Passive time (chill, rest, rise, marinate) as its own frontmatter field beside prep and cook. Needs `FORMAT.md`, Fugu's meta row, and the index.
- [ ] Make-ahead and storage: an optional `## Make ahead` section in `FORMAT.md`, or a convention inside Notes.
- [ ] "Previously" on Food Log months: the same month in earlier years.
- [ ] "Surprise me": a random recipe, from the recipe index.

## Diagrams

Fences are specced in hugo-warped (`~/projects/sites/hugo-warped/fences/`); its open work is in its `PLAN.md`.

- [ ] Granola bars formula, once a second recipe needs a nut icon.
- [ ] Food ratios tables, once that method leaves the test kitchen.
- [ ] Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.
- [ ] Stack layer weight: the dense casserole piles are inlined per use (casseroles page about 800 KB of HTML, mince and macaroni 110–176 KB each). If it matters, inline each layer once per page and reuse it with `<use href>` (Fugu `partials/stack/draw.html`), or convert to PNG at publish.
- [ ] `timeline` and `tabs` in the cookbook: fugu-agent ports w42's hooks when a page needs one.

## Review

*Deferred (2026-10-14).* Code, then docs, then Fugu's docs (§7). Code goes one area per pass with `/code-review high`, each finding fixed, won't fix (why), or moved to Fugu's plan; template/CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

- [ ] `custom.css`: dead classes (grep `public/`), duplicates, off-token colours.
- [ ] `tools/*.sh` and the Makefile, from a fresh clone with the submodule uninitialised.
- [ ] Accessibility on the built site: popover ARIA and tap behaviour, focus order, landmarks, headings, alt text.
- [ ] Docs inventory: keep, move to Fugu, merge, or delete. Tool CLIs in both `DESIGN.md` and Fugu's `--help` are the known overlap.
- [ ] `/mx:content-check` over the docs.
- [ ] Last: cut CLAUDE.md to what an agent needs to start.

## Mockups

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce ticked it on 2026-10-21; not built yet.
