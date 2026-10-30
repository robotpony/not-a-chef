# /lint

Validate recipe files against docs/FORMAT.md rules.

Check all .md files in content/recipes/ (and content/essays/ if a path is specified). For each file, verify:

1. Required frontmatter fields are present: title, tags, date
2. tags is a list of plain strings (no # prefix)
3. date is ISO 8601 format (YYYY-MM-DD)
4. File has at least one ingredients section (unordered list under a heading) and one method section
5. Any ```` ```formula ````, ```` ```stack ```` or ```` ```flow ```` block (specs in ~/projects/sites/hugo-warped/fences/): run hugo-warped's validator over `content/` and `docs/`, with Fugu's icon keys so unknown keys are caught, and report each `WARN` line as an issue in its file. Run this check even without a path.

   ```
   python3 ~/projects/sites/hugo-warped/tools/check-fences.py content docs --keys formula=themes/fugu/assets/icons/formula --keys stack=themes/fugu/assets/icons/layers
   ```

   It prints `WARN  <type> [<code>]: "<line>" in "<file>:<line>:1"` and exits 0 (`--strict` exits 1 on any warning). It is the source of truth for these fences; don't re-check their rules by hand.
6. Every page in `content/methods/` has `method` in its `tags` (the folder's `_index.md` cascade only covers a page with no `tags` at all; a page's own `tags` replaces it). In a blueprint folder (`content/methods/<slug>/` with an `_index.md`): every page in `parts/` has a numeric `weight`; every page in `builds/` has a `## Picks` section whose bullets (`- **Part:** pick`) each start with the name of a part, matched loosely against the parts' titles. No page anywhere sets the retired `blueprint`, `part`, `build_name`, `profile`, `origin`, or `picks` fields. Run this check whenever `content/methods/` exists, even without a path. (docs/METHODS.md)

7. Glossary marks (hugo-warped glossary/README.md): list each term's first prose mention on a page that isn't a wiki link yet, and report each as a suggestion (not an error) in its file. It writes nothing; `make glossary-link` is how Bruce applies them, one at a time. Run this check even without a path.

   ```
   make glossary-check
   ```

   It prints `path:line  Term  "words"`. Pairs in `tools/glossary-skip.txt` (`path | Term`) are never reported.

Report files with issues, grouped by severity. Files that pass cleanly should be summarized as a count, not listed individually.
