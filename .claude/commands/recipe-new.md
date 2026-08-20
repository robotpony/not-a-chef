# /recipe-new

Create a new recipe stub in content/recipes/.

Usage: /recipe-new "Recipe Title"

1. Derive the slug from the title (kebab-case).
2. Create content/recipes/{slug}.md using the archetype in archetypes/recipes.md.
3. Set the title field to the provided title.
4. This repo is the source of truth, so the stub can be developed directly here. If the recipe started as a draft in the vault (`~/writing/me/recipes/`), mention that `/migrate` is available to pull in later changes made there.
