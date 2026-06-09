# Not a chef (a cookbook for my family)

This is a cookbook project, to collect up recipes from my personal sources, a combination of markdown files in an Obsidian vault and a drive of Google docs.

Sources:

- local cache of google doc recipes: "development-notes/gdrive/Alderson Family Recipes"
- local cache of obsidian recipes: `development-notes/recipes`

## Project goals

1. Organized and clear source for personal recipes (as a simple Hugo site)
2. Capture simple essays about food, and reference pages (posts + pages, same Hugo site)
3. Become the source of truth for these recipes (depricating the other sources, or manually moving items that others add).
4. Be compatible with PDF generation (based on the Hugo docs, possibly using a separate or custom tool)
5. Be compatible with Obsidian (which will be the main editor)
6. Be compatible with Claude (the main LLM, using claude code stand-alone beside Obsidian)


## Tech plan

- Hugo to provide the static website for recipes, food log, and reference pages
- Obsidian for local editing
- Other tools TBD

Hugo + Obsidian suggest Markdown + clear YAML front-matter.

Style guide should be pulled + updated from the Obsidian source.
