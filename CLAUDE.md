# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A family cookbook built as a Hugo static site (Blowfish theme), edited in Obsidian. Three content types: recipes, food essays, and reference pages (technique guides, glossaries, appendices).

See ARCHITECTURE.md for the data flow and component overview. See PLAN.md for the phased implementation plan. See `mockups/STYLE.md` (or `mockups/style.html`) for the settled visual design system — read it before any visual/layout work; see "Visual design" below.
## Content formats

See `FORMAT.md` for the recipe specification and `FORMAT-ESSAYS.md` for the essay specification.

## Recipe format

See `FORMAT.md` for the full specification. Key points:

- YAML frontmatter with `title` (required) and `tags` (required, plain strings — no `#` prefix)
- Optional `## Mechanic` section explaining the key ratio or technique
- Simple recipes: `## Ingredients` (unordered list) + `## Method` (prose)
- Multi-component recipes: one `## ComponentName` heading per component, each containing its ingredients list and prose method
- Optional sections: `## To serve`, `## Variations`, `## Notes`
- Cross-references use wiki links: `[[Pizza Sauce]]`, `[[Basic Pie Crust]]`
- Canadian English; metric units with optional imperial in parentheses

## Content sources

This repo is the source of truth for recipes. The family archive (Google Drive export, ~170 files) was fully migrated in and its source folder deleted; recipes that surface from it now get pulled in by hand as needed, not through a migration tool.

This repo (`/Users/mx/writing/not-a-chef`) is now the Obsidian vault itself — recipes are drafted and edited here directly, not in a separate staging vault. The earlier two-vault workflow (drafting at `~/writing/me/recipes/`, migrated across with `/migrate`) is retired; that path no longer holds recipe content.

## Recipe index

`public/recipes/index.json` — a machine-readable index of all published recipes, generated automatically by `hugo`. Read this file first when answering questions about the recipe collection (coverage gaps, overlap, missing metadata, quality). It contains per-recipe: title, slug, date, tags, cuisine, servings, source, prep/cook time, word count, and whether Mechanic/Variations/Notes sections are present.

The index is current after any `hugo` build. If `public/` is stale, run `hugo --quiet` to regenerate.

## Migration tools

`tools/migrate.py` — migrates personal recipes from the vault to `content/recipes/`. Normalizes frontmatter; does not touch body content.

See DESIGN.md for the full CLI interface.

## Claude Code commands

Project slash commands are in `.claude/commands/`. See DESIGN.md for descriptions. Commands planned:

- `/migrate` — run tools/migrate.py for personal recipes
- `/recipe-new` — create a new recipe stub
- `/lint` — validate recipe frontmatter
- `/preview` — start Hugo dev server
- `/publish` — build and deploy

## Hugo site

Blowfish theme as a git submodule. Wiki links require a render hook in `layouts/_default/_markup/render-link.html`. See DESIGN.md for layout and taxonomy decisions.

## Visual design

`mockups/STYLE.md` (full visual mock: `mockups/style.html`) is the settled design system for the site — color tokens, type system, the ratified component list, and spacing, derived from warpedvisions.org's accent palette (same five hues, re-ordered to lead with orange/red) and set in Libre Franklin (headings/UI), Lora (body), and IBM Plex Mono (quantities/data). `mockups/COMPONENTS.md` (full visual mock: `mockups/components.html`) is the full component inventory across every mockup round ever built — broader than STYLE.md's ratified list, it includes candidates not yet promoted and every place two mockup rounds solved the same problem two different ways (shown side by side in `components.html`); check it before building a new component that might already exist in some form, and before a quality/consolidation pass.

**Read `mockups/STYLE.md` (or `mockups/style.html`) before starting any new visual mockup or layout work for this site.** These are living records, not one-offs — update them (and their `.html` mocks to match) when a decision lands. `mockups/README.md` explains what's in the folder. The four original mockup rounds (`style-guide.html`, `recipe-spec-sheet.html`, `homepage.html`, `landing-page-alt.html`) now live under `mockups/archived/` — reference only, not the working copies; don't build new work against them directly.

## Food essay types

Essays in `content/essays/` include these formats specific to this project:

- **Food memories**: Thematic vignettes from childhood or formative food experiences. Each should anchor a lesson or insight about cooking — not just nostalgia for its own sake.
- **Cooking reflections**: Lessons learned from technique, ingredients, or failure. Engineering-minded; ratio-based thinking and post-mortems welcome.
- **Technique essays**: Deep dives on a single method or principle (brining, emulsification, stock-making). Reference material dressed as prose.
- **Planning essays**: Meal prep philosophy, "winning the fridge" thinking, systems for weeknight cooking.

Voice for all food essays: engineering precision meets home cook practicality. Personal, honest about mistakes, practical takeaway at the end.

## Language

See `~/.claude/rules/recipe-writing-rules.md` for the full recipe writing style guide.
