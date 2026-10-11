# /recipe-new

Create a new recipe stub in content/recipes/.

Usage: /recipe-new "Recipe title"

1. Derive the slug from the title (kebab-case).
2. Create content/recipes/{slug}.md using the archetype in themes/fugu/archetypes/recipes.md.
3. Set the title field to the provided title, in sentence case (first word and proper nouns only; see docs/FORMAT.md §Typography). Fix the case if the user typed headline case.
4. The archetype lists every frontmatter field docs/FORMAT.md defines, most of them empty. Fill in any the user gave (tags, cuisine, servings, times, source); `tags` is required, so ask for at least one if none were given. Leave the rest empty rather than deleting them, so they're there to fill in later in Obsidian.
5. A new recipe starts in the **Test kitchen**: `draft: true` publishes it with a banner saying it's still being tested (docs/DESIGN.md "Test kitchen (drafts)"). If the user said what they're trying or unsure about, put it in `working_on` as one short line; it shows under the banner. Only set `draft: false` (or remove it) if the user says the recipe is already a keeper.
6. This repo is the Obsidian vault and the source of truth, so the stub is developed directly here. There's no separate vault to sync.
