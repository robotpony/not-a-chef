# CLAUDE.md

A family cookbook: a Hugo site, the Fugu theme over Blowfish, at https://bruce-loves-to-cook.ca. This repo is the source of truth and is also the Obsidian vault, so content is written and edited here directly. Sections in `content/`: `recipes`, `drinks`, `essays`, `methods`, `reference`, `the-food-log`.

## Where things are documented

| What | Where |
|---|---|
| Recipe and page format | Fugu's `themes/fugu/docs/recipe-format.md` and `frontmatter.md`, then `docs/FORMAT.md` (this site's house style, essay types and voice, language) |
| Methods and blueprints | `docs/METHODS.md` |
| How the pieces fit | `docs/ARCHITECTURE.md` |
| Templates, render hooks, Test kitchen, commands | `docs/DESIGN.md` |
| Visual design | `mockups/STYLE.md` (ratified), `mockups/COMPONENTS.md` (every component tried) |
| Fence and glossary specs | `themes/hugo-warped/` (pinned submodule) |
| Work to do, questions for Bruce | `docs/PLAN.md`, `docs/REVIEW.md` |
| Tools | each tool's `--help` (`tools/publish.sh help`) |

## Who owns what

- Templates, render hooks, JS, icons, archetypes and the content tools are Fugu's (`themes/fugu/`, a submodule). Theme changes go to fugu-agent; this repo bumps the submodule.
- Fence and glossary spec changes go to the hugo-warped agent.
- This repo owns the Not a Chef look and branding: `assets/css/custom.css`, the homepage, header, footer, favicons and fonts.

## Before you start

- Questions about the collection (gaps, overlap, metadata): read `public/recipes/index.json` first. `hugo --quiet` refreshes it.
- Visual or layout work: read `mockups/STYLE.md` (or `style.html`) first, and check `COMPONENTS.md` before building a component. Update both when a decision lands.
- Writing or editing a recipe: load the `recipe-writing` skill. Essays: `docs/FORMAT.md` §Essays.
- Wiki links (`[[Title]]`) resolve by frontmatter title, not filename.

## Commands

In `.claude/commands/`: `/recipe-new`, `/lint`, `/preview`, `/publish`, `/image-add`, `/food-log-summary`, `/glossary-link`, `/glossary-new`, `/glossary-candidates`. `make drafts` lists the Test kitchen (`draft: true` pages, published with a banner).

## Commits

Don't add Claude as a co-author or a "Generated with Claude Code" line. A PreToolUse hook (`.claude/hooks/check-commit-message.sh`) refuses a commit whose message does.

## Language

Canadian English with a few US spellings, metric with optional imperial, few em-dashes: `docs/FORMAT.md` §Language has the rules.
