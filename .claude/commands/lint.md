# /lint

Validate recipe files against docs/FORMAT.md rules.

Check all .md files in content/recipes/ (and content/essays/ if a path is specified). For each file, verify:

1. Required frontmatter fields are present: title, tags, date
2. tags is a list of plain strings (no # prefix)
3. date is ISO 8601 format (YYYY-MM-DD)
4. File has at least one ingredients section (unordered list under a heading) and one method section
5. Any ```` ```formula ```` block (docs/FORMAT.md §Formula diagrams) uses icon keys that exist in `assets/icons/formula/`, one operator throughout (`+`, `:` or `→`, plus an optional closing `=`), and no more than five slots

Report files with issues, grouped by severity. Files that pass cleanly should be summarized as a count, not listed individually.
