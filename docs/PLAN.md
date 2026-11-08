# Plan

Open work only: things that can start now. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Ideas and work waiting on a trigger go under Later, without checkboxes, and move up when they're ready to start. Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Design v2

Each change is mocked before it's built, and recorded in `mockups/STYLE.md` and `style.html` when it lands.

- [ ] Lighter recipe header: a hairline under the title and one small-caps meta line (servings · time · source), Smitten Kitchen's treatment, mocked against the current stat row.
- [ ] Homepage: a drinks band, or drinks inside the recipes band.
- [ ] A thin line of images leading the page, under the header: Bruce's idea, to be worked out with him (which pages, where the images come from, height, how it sits with the sidebar photos). Decide the phone photos with it (a 112px thumbnail sits alone at the left, above Recipe notes). From the 2026-10-30 look at RecipeTin Eats, Serious Eats, and Smitten Kitchen: photos lead on all three, at the top and large, where ours sit in the sidebar; that's the biggest difference in feel.

## Site

- [ ] Publish `mockups/` as a static subfolder (which mocks, how linked, kept out of search). Bruce approved it on 2026-10-21.
- [ ] Stack layer weight: the dense casserole piles are inlined per use (casseroles page about 800 KB of HTML, mince and macaroni 110–176 KB each). Inline each layer once per page and reuse it with `<use href>` (Fugu `partials/stack/draw.html`, so fugu-agent), or convert to PNG at publish.
- [ ] Decide whether `docs/FORMAT.md` (435 lines) stays as house style now that Fugu documents the format itself (`themes/fugu/docs/recipe-format.md` and `frontmatter.md`, 550 lines): keep only what's Not a Chef's own (voice, tags, the `family` and `blueprint` rules) and point to Fugu's docs for the rest, or keep it whole.
- [ ] Code and docs review (deferred 2026-10-14): `custom.css` (dead classes, duplicates, off-token colours; Fugu's `docs/design/class-inventory.md` already lists 13 dead classes), `tools/*.sh` and the Makefile from a fresh clone, accessibility on the built site (popover ARIA, focus order, landmarks, headings, alt text), a docs inventory (`DESIGN.md` and Fugu's `--help` overlap on tool CLIs), `/mx:content-check` over the docs, and last, CLAUDE.md cut to what an agent needs to start. One area per pass with `/code-review high`; template and CSS fixes get `python3 themes/fugu/tests/check.py --compare` plus Chrome at both widths, light and dark.

## Later

Not started, and not committed to. Each moves up when its trigger happens or Bruce picks it.

Ideas:

- Passive time (chill, rest, rise, marinate) as its own frontmatter field beside prep and cook. Needs `FORMAT.md`, Fugu's meta row, and the index.
- Make-ahead and storage: an optional `## Make ahead` section in `FORMAT.md`, or a convention inside Notes.
- "Previously" on Food Log months: the same month in earlier years.
- "Surprise me": a random recipe, from the recipe index.

When a page needs it (fences are specced in hugo-warped, `~/projects/sites/hugo-warped/fences/`):

- Granola bars formula, once a second recipe needs a nut icon.
- Food ratios tables, once that method leaves the test kitchen.
- Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.
- `timeline` and `tabs`: fugu-agent ports w42's hooks.

When Fugu lands it (`themes/fugu/PLAN.md`):

- The validator: run it over all recipes and file each discrepancy as a spec or content bug.
- Its default CSS (§5): cut `custom.css` down to the Not a Chef look.
