# Plan

Open work only: things that can start now. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Ideas and work waiting on a trigger go under Later, without checkboxes, and move up when they're ready to start. Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Site

Nothing open. The 2026-11-08 code and docs review is done on the site side; its theme items wait on fugu-agent, under Later.

## Later

Not started, and not committed to. Each moves up when its trigger happens or Bruce picks it.

Ideas:

- Passive time (chill, rest, rise, marinate) as its own frontmatter field beside prep and cook. Needs `FORMAT.md`, Fugu's meta row, and the index.
- Make-ahead and storage: an optional `## Make ahead` section in `FORMAT.md`, or a convention inside Notes.
- "Previously" on Food Log months: the same month in earlier years.
- "Surprise me": a random recipe, from the recipe index.
- PDF output of the cookbook, from the Hugo build or a separate tool (from README's old goals, 2026-11-08).

When a page needs it (fences are specced in hugo-warped, `themes/hugo-warped/fences/`):

- Granola bars formula, once a second recipe needs a nut icon.
- Food ratios tables, once that method leaves the test kitchen.
- Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.
- `timeline` and `tabs`: fugu-agent ports w42's hooks.

When Fugu lands it (`themes/fugu/PLAN.md`; the first five are from the 2026-11-08 review, so bump and check each):

- The heading anchor link is invisible on keyboard focus and is named "Anchor" (`render-heading.html`). The ingredient controls are injected inside the Ingredients `<h2>` (`ingredients.js`).
- Search: no live result count or "no matches", and the close button has no name or type (`search.js`).
- Skipped heading levels: the blueprint page (h1 then h3), principle term pages, and the Food Log list.
- Breadcrumbs aren't a `<nav>` and have no `aria-current`. The recipe sidebar isn't an `<aside>`. Scaling and unit changes aren't announced. A glossary link inside an ingredient label takes the tap instead of the checkbox.
- Docs: `add-image.sh --help` names the wrong path. `frontmatter.md`'s principle example uses the old essays path. `frontmatter.py check --help` should list the required fields per section, so `DESIGN.md` can drop its copy.
- The validator: run it over all recipes and file each discrepancy as a spec or content bug.
- Its default CSS (§5): cut `custom.css` down to the Not a Chef look.
