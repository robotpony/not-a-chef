# Plan

Open work only: things that can start now. Finished items are cut, not ticked; git history has them (`git log -- docs/PLAN.md`). Ideas and work waiting on a trigger go under Later, without checkboxes, and move up when they're ready to start. Theme work lives in `themes/fugu/PLAN.md` and goes to fugu-agent; after each Fugu change, bump the submodule and check the site renders the same. A single draft's work lives in its `working_on` line (`make drafts`). Questions waiting on Bruce live in `docs/REVIEW.md`.

## Site

Code and docs review, first pass done 2026-11-08. Fixed then: `custom.css` merged its duplicate rules and names its three faces as tokens (`--font-sans`, `--font-serif`, `--font-mono`) instead of 129 literal font stacks. Computed styles are unchanged in light and dark, except the part rows' `→`, which now falls back to the same font as the rest of the site. No dead classes were left; the 13 in Fugu's class inventory had already gone. The tools now stop with a hint when the submodules or `tools/config.toml` are missing. A failed publish puts the build number back even when it stops on an explicit exit. Frontmatter errors print in full, `make glossary-apply` needs `ANSWERS`, and preview fails loudly when port 1313 is taken. The site header is no longer a header inside Blowfish's header, and the footer links are a labelled nav. Stale doc claims are corrected (the glossary folder, what moves to the sidebar, the Hugo version, `/lint`'s scope, the pinned fence checker).

Bruce's answers, applied the same day: small text uses `--ink-muted`, while `--ink-faint` stays for icons, list markers and break glyphs. The ingredient checkboxes have darker outlines, and cards, chips, Parts rows and search results show a focus ring. The theme toggle is named "Dark mode" with `aria-pressed`, and the photo viewer uses the dark theme's colours. `/migrate` is deleted, and CLAUDE.md is cut to a map of where things are. The essay types moved to FORMAT.md, and DESIGN.md's tool and command sections are now an index. `publish.sh deploy` stays, but refuses a `public/` that anything has written to since the clean build. FORMAT.md keeps Canadian centre and litre, and README says what the site is.

- [ ] Docs duplication: one canonical home each, pointers elsewhere. Test kitchen keys (Fugu `configuration.md`), `pinned` and principle tags (Fugu `frontmatter.md`), render hooks (`DESIGN.md`), the client JS list (`ARCHITECTURE.md`), essay types (`FORMAT.md`), and one way of naming hugo-warped (the pinned `themes/hugo-warped/`, edits to its agent).
- [ ] Em-dash and writing sweep over the docs (CLAUDE.md was cut 2026-11-08). Most dashes are "term — description" list separators, so they become colons, as in `FORMAT.md`. The rest are in CLAUDE.md, README, DESIGN, ARCHITECTURE and `mockups/README.md`, plus a few "not X, but Y" lines.
- [ ] Tools, smaller items. Read the glossary heading lists through `hugo config` instead of sed over Fugu's `hugo.toml`, which misses site overrides and breaks on a multi-line array. Stop a dry run listing `deleting version.txt` every time. Have `check` take the publish lock. Check the remote tags before naming a deploy tag. `sed -i ''` in `bump_build` is BSD-only.
- [ ] Content: three photos whose alt text is only the page title (Lazy tomato soup, Autumn glow salad, Candied cranberries) could say what's in the photo.

Sent to fugu-agent 2026-11-08 (theme side of the review; bump and check each when it lands):

- The heading anchor link is invisible on keyboard focus and is named "Anchor" (`render-heading.html`). The ingredient controls are injected inside the Ingredients `<h2>` (`ingredients.js`).
- Search: no live result count or "no matches", and the close button has no name or type (`search.js`).
- Skipped heading levels: the blueprint page (h1 then h3), principle term pages, and the Food Log list.
- Breadcrumbs aren't a `<nav>` and have no `aria-current`. The recipe sidebar isn't an `<aside>`. Scaling and unit changes aren't announced. A glossary link inside an ingredient label takes the tap instead of the checkbox.
- `fugu.css` defaults share the site's checkbox-outline and focus-ring problems. Bruce's answers (2026-11-08): checkbox outline in `--ink-faint`, a 2px `--accent-strong` ring at a 2px offset on `:focus-visible`, small text in `--ink-muted`.
- Docs: `add-image.sh --help` names the wrong path. `frontmatter.md`'s principle example uses the old essays path. `frontmatter.py check --help` should list the required fields per section, so `DESIGN.md` can drop its copy.

## Later

Not started, and not committed to. Each moves up when its trigger happens or Bruce picks it.

Ideas:

- Passive time (chill, rest, rise, marinate) as its own frontmatter field beside prep and cook. Needs `FORMAT.md`, Fugu's meta row, and the index.
- Make-ahead and storage: an optional `## Make ahead` section in `FORMAT.md`, or a convention inside Notes.
- "Previously" on Food Log months: the same month in earlier years.
- "Surprise me": a random recipe, from the recipe index.
- PDF output of the cookbook, from the Hugo build or a separate tool (from README's old goals, 2026-11-08).

When a page needs it (fences are specced in hugo-warped, `~/projects/sites/hugo-warped/fences/`):

- Granola bars formula, once a second recipe needs a nut icon.
- Food ratios tables, once that method leaves the test kitchen.
- Stack diagrams for sandwiches and Vegetarian lasagna, once a build page needs one.
- `timeline` and `tabs`: fugu-agent ports w42's hooks.

When Fugu lands it (`themes/fugu/PLAN.md`):

- The validator: run it over all recipes and file each discrepancy as a spec or content bug.
- Its default CSS (§5): cut `custom.css` down to the Not a Chef look.
