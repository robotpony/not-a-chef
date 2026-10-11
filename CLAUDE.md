# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A family cookbook built as a Hugo static site (Blowfish theme), edited in Obsidian. Three content types: recipes, food essays, and reference pages (technique guides, glossaries, appendices).

See docs/ARCHITECTURE.md for the data flow and component overview. See docs/PLAN.md for future work (the phased build plan was squashed after release; its history is in git). See `mockups/STYLE.md` (or `mockups/style.html`) for the settled visual design system — read it before any visual/layout work; see "Visual design" below.
## Content formats

See `docs/FORMAT.md` for the recipe specification and `docs/FORMAT-ESSAYS.md` for the essay specification.

## Recipe format

See `docs/FORMAT.md` for the full specification. Key points:

- YAML frontmatter with `title` (required, sentence case: first word and proper nouns only) and `tags` (required, plain strings — no `#` prefix)
- Optional `## Mechanic` section explaining the key ratio or technique
- Simple recipes: `## Ingredients` (unordered list) + `## Method` (prose)
- Multi-component recipes: one `## ComponentName` heading per component, each containing its ingredients list and prose method
- Optional sections: `## To serve`, `## Variations`, `## Notes`
- Cross-references use wiki links: `[[Pizza sauce]]`, `[[Basic pie crust]]`
- Optional ```` ```formula ```` block draws a stated ratio as a row of icons (`docs/FORMAT.md` §Formula diagrams); it illustrates the sentence, never replaces it
- Canadian English; metric units with optional imperial in parentheses

## Content sources

This repo is the source of truth for recipes. The family archive (Google Drive export, ~170 files) was fully migrated in and its source folder deleted; recipes that surface from it now get pulled in by hand as needed, not through a migration tool.

This repo (`/Users/mx/writing/not-a-chef`) is now the Obsidian vault itself — recipes are drafted and edited here directly, not in a separate staging vault. The earlier two-vault workflow (drafting at `~/writing/me/recipes/`, migrated across with `/migrate`) is retired; that path no longer holds recipe content.

## Recipe index

`public/recipes/index.json` — a machine-readable index of all published recipes, generated automatically by `hugo`. Read this file first when answering questions about the recipe collection (coverage gaps, overlap, missing metadata, quality). It contains per-recipe: title, slug, date, tags, cuisine, servings, source, prep/cook time, word count, and whether Mechanic/Variations/Notes sections and a `formula` diagram block are present.

The index is current after any `hugo` build. If `public/` is stale, run `hugo --quiet` to regenerate.

## Tools

- `themes/fugu/tools/frontmatter.py` — check, get, set, and unset frontmatter across content (stdlib only)
- `themes/fugu/tools/drafts.py` — list everything marked `draft: true` (`make drafts`)
- `themes/fugu/tools/add-image.sh` — process a photo for the site (used by `/image-add`)
- `tools/preview.sh`, `tools/publish.sh`, `tools/deploy.sh` — dev server, build + check, rsync deploy
- `tools/migrate.py` — retired with the two-vault workflow (see Content sources); kept for history, not part of any current flow

See docs/DESIGN.md for the CLI interfaces.

## Claude Code commands

Project slash commands are in `.claude/commands/`. See docs/DESIGN.md for descriptions.

- `/recipe-new` — create a new recipe stub
- `/lint` — validate recipe frontmatter
- `/preview` — start Hugo dev server
- `/publish` — build and deploy
- `/food-log-summary` — write or refresh a Food Log month's opening summary paragraph (the card intro on the listing page and homepage)
- `/image-add` — add photos to a recipe, essay, or Food Log page
- `/migrate` — retired; ran `tools/migrate.py` for the old two-vault workflow

## Commits

Don't add Claude as a co-author or a "Generated with Claude Code" line. A PreToolUse hook (`.claude/hooks/check-commit-message.sh`, the same one Fugu has) refuses a commit whose message does.

## Hugo site

Two stacked themes, both git submodules: `theme = ["fugu", "blowfish"]`. Fugu (`themes/fugu/`, [hugo-theme-fugu](https://github.com/robotpony/hugo-theme-fugu)) is the reusable cookbook theme: templates, render hooks, JS, icons, archetypes, and the content tools. This repo keeps the Not a Chef design and branding (`custom.css`, colour scheme, homepage, header, footer, favicons, fonts). Changes to templates are commits in the Fugu submodule. Wiki links require a render hook in `themes/fugu/layouts/_default/_markup/render-link.html`. See docs/DESIGN.md for layout and taxonomy decisions.

## Test kitchen (drafts)

`draft: true` publishes a page as **Test kitchen**: a banner under the title and a mark on its card, plus an optional one-line `working_on` frontmatter note. The banner's words live in `config/_default/params.toml` `[fugu.development]`. docs/DESIGN.md "Test kitchen (drafts)" maps each key to where it shows and says how to turn it off.

## Pinned pages and tag reference pages

- `pinned: true` in frontmatter (recipes, essays, or reference pages alike) floats a page to the top of its section's list, its term pages (tags/cuisine), and search results. Rare by design, not a general-purpose sort override. See docs/DESIGN.md and docs/SPEC.md.
- A tag can carry its own `content/tags/<slug>/_index.md` with a `description`, and, when marked `principle: true`, `themes/fugu/layouts/_default/term.html` swaps the plain description for a definition callout (the `_index.md` body) plus a "Reference & further reading" list of anything else on the tag that isn't a recipe. Only `win-the-fridge` uses this today (`content/tags/win-the-fridge/_index.md`); every other tag term page renders as before.

## Visual design

`mockups/STYLE.md` (full visual mock: `mockups/style.html`) is the settled design system for the site — color tokens, type system, the ratified component list, and spacing, derived from warpedvisions.org's accent palette (same five hues, re-ordered to lead with orange/red) and set in Libre Franklin (headings/UI), Lora (body), and IBM Plex Mono (quantities/data). `mockups/COMPONENTS.md` (full visual mock: `mockups/components.html`) is the full component inventory from the four original mockup rounds (later single-purpose mockups went straight into STYLE.md and are listed in `mockups/README.md`) — broader than STYLE.md's ratified list, it includes candidates not yet promoted and every place two mockup rounds solved the same problem two different ways (shown side by side in `components.html`); check it before building a new component that might already exist in some form, and before a quality/consolidation pass.

**Read `mockups/STYLE.md` (or `mockups/style.html`) before starting any new visual mockup or layout work for this site.** These are living records, not one-offs — update them (and their `.html` mocks to match) when a decision lands. `mockups/README.md` explains what's in the folder. The four original mockup rounds (`style-guide.html`, `recipe-spec-sheet.html`, `homepage.html`, `landing-page-alt.html`) now live under `mockups/archived/` — reference only, not the working copies; don't build new work against them directly.

## Food essay types

Essays in `content/essays/` include these formats specific to this project:

- **Food memories**: Thematic vignettes from childhood or formative food experiences. Each should anchor a lesson or insight about cooking — not just nostalgia for its own sake.
- **Cooking reflections**: Lessons learned from technique, ingredients, or failure. Engineering-minded; ratio-based thinking and post-mortems welcome.
- **Technique essays**: Deep dives on a single method or principle (brining, emulsification, stock-making). Reference material dressed as prose.
- **Planning essays**: Meal prep philosophy, "winning the fridge" thinking, systems for weeknight cooking.
- **Reference essays** (`content/essays/reference-essays/`): Full definitions for a concept, principle, or brand that deserves prose rather than a one-line glossary entry — e.g. `win-the-fridge.md`. Tag it with the term it defines so its own tag page (if the term has one, see `content/tags/win-the-fridge/_index.md`) can link straight to it as "the full essay". A term that doesn't warrant a whole essay gets a short entry in `content/reference/glossary.md` instead — see `themes/fugu/layouts/_default/_markup/render-link.html` for how `[[Term]]` picks between the two.

Voice for all food essays: engineering precision meets home cook practicality. Personal, honest about mistakes, practical takeaway at the end.

## Language

Recipes: see `~/.claude/skills/recipe-writing/SKILL.md` (also invoked via `/recipe-writing`) for the full recipe writing style guide.

Essays: no dedicated skill for this project's food-essay voice yet — the "Food essay types" section above is the configured guidance. For shared language rules (Canadian spelling, em-dash restraint), recipe-writing's own skill says it "shares language foundations" with `~/.claude/skills/blog-writing/SKILL.md`, so that's the closest reference until a dedicated one exists.
