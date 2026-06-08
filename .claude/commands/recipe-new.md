# /recipe-new

Create a new recipe stub in content/recipes/.

Usage: /recipe-new "Recipe Title"

1. Derive the slug from the title (kebab-case).
2. Create content/recipes/{slug}.md using the archetype in archetypes/recipes.md.
3. Set the title field to the provided title.
4. Remind the user that the vault (development-notes/recipes/) is the authoring source — add the recipe there too once it's developed.
