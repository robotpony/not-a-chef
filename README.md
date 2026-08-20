# Not a chef (a cookbook for my family)

This is a cookbook project, collecting recipes from my personal sources: originally a combination of markdown files in an Obsidian vault and a drive of Google docs.

This repo is now the source of truth for recipes. The Google Docs archive was fully migrated in and its local copy deleted; new recipes are drafted in the Obsidian vault (`~/writing/me/recipes`) and pulled in with `/migrate`.

## Project goals

1. Organized and clear source for personal recipes (as a simple Hugo site)
2. Capture simple essays about food, and reference pages (posts + pages, same Hugo site)
3. Be the source of truth for these recipes (done for the Google Docs archive; other family additions get moved in by hand as they turn up).
4. Be compatible with PDF generation (based on the Hugo docs, possibly using a separate or custom tool)
5. Be compatible with Obsidian (which will be the main editor)
6. Be compatible with Claude (the main LLM, using claude code stand-alone beside Obsidian)


## Tech plan

- Hugo to provide the static website for recipes, food log, and reference pages
- Obsidian for local editing
- Other tools TBD

Hugo + Obsidian suggest Markdown + clear YAML front-matter.

Style guide should be pulled + updated from the Obsidian source.

## License

Content (recipes, essays, reference pages) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — share and adapt with attribution, same license. The source code (Hugo templates, migration tools) is MIT. See [LICENSE](LICENSE) for full terms.
