# Plan

Open work only. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Deploy tooling

Sites keep their own copies of the deploy script (`~/.claude/rules/site-ports.md`, decided 2026-11-04). The reference is brucealderson.ca's `tools/deploy.sh`, once it has survived a real deploy.

- [ ] Build from a clean worktree of HEAD: `publish.sh deploy` can ship a `public/` that doesn't match HEAD. Take the lock, `rsync --checksum`, and the live check from the reference too.
- [ ] Check for a dirty tree before building, not at the deploy step, and fix `warn_dirty`, which says uncommitted content will be published when `deploy.sh` refuses it.
- [ ] Add `check` and `dry-run` to the Makefile, the shared target names.

## Glossary

Spec, partials, and tools in hugo-warped; popover and A to Z page in Fugu; entries in `content/reference/glossary/`. Empty entries are stubs, left off the site until written. Nine entry drafts wait in `docs/REVIEW.md`.

- [ ] Answer `make glossary-check`'s four offers (`/glossary-link`): Aromatics in the October Food Log (move line 78 to 34), Braise in the cottage pie casserole build, Doneness in the casseroles' starch and top-and-bake parts.
- [ ] Bold step labels (Pan sauces' "**Deglaze.**") are offered as links; answer "never" per page, or ask hugo-warped to skip bold text at the start of a list item.

## For fugu-agent

Not yet in `themes/fugu/PLAN.md`; hand these over, then bump Fugu here and check the site renders the same.

- [ ] Chip wording: builds show Burgers twice ("Burgers · Build", then "Burgers"), essays show "Food-Memory" where cards say "food memories", and page chips are title case where cards are lowercase.
- [ ] Lineage repeats each close year ('57 on the left, 1957 on the right).
- [ ] A wiki link's arrow can wrap alone onto the next line (build sidebar, "In-N-Out burger spread →"). Keep it with the last word.
- [ ] Glossary search placeholder ("Search the glossary: a word, or what it does") clips on phones: about 294px of text in a 258px field at 390px. Shorten it or make it a param.
- [ ] `exampleSite/content/about.md` links the old domain (`bruce-loves-to-cook.warpedvisions.org`).
- [ ] Keep-screen-awake switch beside the scaling gear (Wake Lock API; RecipeTin and Serious Eats both have it). Fugu's plan has cook mode with Wake Lock; this is the small version.
- [ ] When Fugu's validator lands, run it over all recipes; file each discrepancy as a spec or content bug. When Fugu gets its own CSS (§5), cut `custom.css` to the Not a Chef look; when it renames params (§2), update `params.toml`; when its docs exist (§7), decide if `FORMAT.md` stays as house style.

## Design v2

Under way; decisions are recorded in `mockups/STYLE.md` and `style.html` when they land. Next changes are mocked before they're built. The two blue labels question is in `docs/REVIEW.md`.

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

- [ ] Bold lead phrase on each method step ("**Brown the beef.** …"), so prose scans mid-cook. A recipe-writing convention, not a template; some recipes do it already.
- [ ] Passive time (chill, rest, rise, marinate) as its own frontmatter field beside prep and cook. Needs `FORMAT.md`, Fugu's meta row, and the index.
- [ ] Make-ahead and storage: an optional `## Make ahead` section in `FORMAT.md`, or a convention inside Notes.
- [ ] "Previously" on Food Log months: the same month in earlier years.
- [ ] "Surprise me": a random recipe, from the recipe index.

## Diagrams

Fences are specced in hugo-warped (`~/projects/sites/hugo-warped/fences/`); its open work is in its `PLAN.md`.

- [ ] Formula ratios for sangria and lemon-lime iced tea's weight batch.
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
