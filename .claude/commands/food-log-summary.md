# /food-log-summary

Write or refresh the opening summary paragraph of a Food Log month, so its
homepage/listing card shows a real summary instead of a heading dump.

Usage: /food-log-summary [month file, e.g. 2026-September]

1. Find the target file: `content/the-food-log/{month}.md`. If no month is
   given, use whichever file in `content/the-food-log/` was modified most
   recently.
2. Read the whole file. The frontmatter is followed by the body: an
   optional intro paragraph, then a series of `## <Day>` entries (and
   sometimes sub-headings within a day — heading depth in this log is
   inconsistent, work from what's actually there).
3. Write a short paragraph (1–3 sentences) summarizing what the month
   actually contains so far: dishes tested and how they went, techniques
   worked on, recurring threads, anything notable in a backlog/ideas
   section. Don't just restate the day headings — say what happened.
   Plain, direct, a little dry; not the food-essay voice (see CLAUDE.md
   "Food essay types") — this is a working log, not a reflection piece.
   Canadian English, minimal em-dashes.
4. Insert this paragraph as the very first thing in the body, immediately
   after the frontmatter's closing `---` and before the first `## `
   heading. If a paragraph is already there (from a previous run),
   replace it — don't stack multiple summary paragraphs.
5. Leave the frontmatter and every dated entry untouched. This command
   only ever touches that one opening paragraph.

This paragraph is what `recipe-card.html` picks up as the card's intro
text (same fallback every recipe/essay/reference card uses: frontmatter
`summary`, else the first paragraph before the file's first heading) — so
this is also what shows on the Food Log list page and the homepage's
"From the food log" band. Run it whenever a month's card feels stale, not
automatically on every log edit.
