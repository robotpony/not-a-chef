# /lint

Validate recipe files against docs/FORMAT.md rules.

Check all .md files in content/recipes/ (and content/essays/ if a path is specified). For each file, verify:

1. Required frontmatter fields are present: title, tags, date
2. tags is a list of plain strings (no # prefix)
3. date is ISO 8601 format (YYYY-MM-DD)
4. File has at least one ingredients section (unordered list under a heading) and one method section
5. Any ```` ```formula ```` block (~/projects/sites/hugo-warped/fences/formula.md) uses icon keys that exist in `assets/icons/formula/`, one operator throughout (`+`, `:` or `→`, plus an optional closing `=`), and no more than five slots. Each row has a label; the first row that's drawn has no operator (if the first row is skipped as bad, the next valid row's operator is the stray one); an `=` row comes last; `caption:` and `bar:` come after every row, once each; an icon cell holds at most two keys, and a swaps cell at most three swaps
6. Every page in `content/methods/` has `method` in its `tags` (the folder's `_index.md` cascade only covers a page with no `tags` at all; a page's own `tags` replaces it). In a blueprint folder (`content/methods/<slug>/` with an `_index.md`): every page in `parts/` has a numeric `weight`; every page in `builds/` has a `## Picks` section whose bullets (`- **Part:** pick`) each start with the name of a part, matched loosely against the parts' titles. No page anywhere sets the retired `blueprint`, `part`, `build_name`, `profile`, `origin`, or `picks` fields. Run this check whenever `content/methods/` exists, even without a path. (docs/METHODS.md)
7. Any ```` ```stack ```` block (~/projects/sites/hugo-warped/fences/stack.md) has a label on every layer, at most three cells a row, `caption:` (once) and `repeat:` lines after every layer, and each `repeat:` count a whole number of 2 or more. Any ```` ```flow ```` block (fences/flow.md there) has a label on every step, at most one `|` a line, no arrow on a row's first step, at most three rows of about five steps, and `caption:` last. Check these blocks in every folder under `content/`, even without a path.

Report files with issues, grouped by severity. Files that pass cleanly should be summarized as a count, not listed individually.
