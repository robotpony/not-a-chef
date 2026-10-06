# /recipe-new

Create a new recipe stub in content/recipes/.

Usage: /recipe-new "Recipe title"

1. Derive the slug from the title (kebab-case).
2. Create content/recipes/{slug}.md using the archetype in archetypes/recipes.md.
3. Set the title field to the provided title, in sentence case (first word and proper nouns only; see FORMAT.md §Typography). Fix the case if the user typed headline case.
4. This repo is the Obsidian vault and the source of truth, so the stub is developed directly here. There's no separate vault to sync.
