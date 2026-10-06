# /image-add

Add one or more photos to a recipe, essay, or food log page.

Usage: /image-add <image path(s)> <post title or file>

The post can be named by title ("Lazy tomato soup"), slug, or path. Photo conventions live in FORMAT.md §Photos.

1. **Find the post.** Match by `title` in frontmatter, then by filename, under `content/`. If more than one post matches, or none, ask. Don't guess.
2. **Pick the section folder** from the post's location:
   - `content/recipes/` → `static/images/recipes/`
   - `content/essays/` (any subfolder) → `static/images/essays/`
   - `content/the-food-log/` → `static/images/food-log/`
   - Anything else (e.g. `content/reference/`): ask which folder to use.
3. **Look at each image** (Read it) so the name and alt text describe what's actually in it.
4. **Name the file**, kebab-case:
   - Recipes and essays: the post's slug for the first photo (`lazy-tomato-soup.jpg`); `<slug>-<what-it-shows>.jpg` for any others (`lazy-tomato-soup-simmering.jpg`).
   - Food log: `<year>-<what-it-shows>.jpg` (`2025-stock-cooling-pan-in-pan.jpg`), year from the month page.
   - Extension: `.jpg` for photos (HEIC, JPEG, WebP), `.png` only for PNG sources.
   - If the name is taken in the folder, pick a more specific one; never overwrite.
5. **Process and copy** each image with `themes/fugu/tools/add-image.sh <source> <destination>`. It bakes EXIF rotation into the pixels, strips all metadata (GPS included), caps the long edge at 2000 px, and refuses to overwrite. Report its output. If it fails, stop and show the error.
6. **Check rotation.** Read the processed file and confirm it's upright. If it looks sideways (the camera's orientation tag was wrong), say so and offer to rotate it with `magick <file> -rotate 90 <file>` (or -90/180).
7. **Choose placement.** Where the photo goes matters: on the site it becomes a sidebar thumbnail with a "Photo N" marker left in the text, and in print it stays inline. Use the obvious spot when there is one:
   - Recipe with one hero shot of the finished dish: after the intro/backstory blockquote, before the first `##` section (see `candied-cranberries-sugared-cranberries.md`), unless the post already puts photos at the end.
   - A photo of a specific step, or a food log photo about one entry: next to the paragraph it illustrates.
   If the placement isn't clear (several candidate paragraphs, a multi-component recipe, a photo that could illustrate more than one entry), ask, showing the candidate spots.
8. **Link it** with standard markdown on its own line, blank lines around it:
   `![<alt text>](/images/<section>/<name>.jpg)`
   The alt text is the caption: describe what's in the photo, specific and plain (see the food log examples). Canadian spelling, no em-dashes. Start from the post's title for a hero shot of the finished dish.
9. **Show the result**: file(s) written with size and dimensions, and the diff to the post. Don't commit.
