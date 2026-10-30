# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].

## Concepts glossary: where it lives #todo

The rest is decided (2026-10-30, `docs/PLAN.md` › Concepts). With the marking done by wiki links at build, there's no browser marking script, so warped.js has little left to hold.

- [ ] **Home: hugo-warped** (Bruce asked 2026-10-30; recommended). It already holds the shared dialect, stdlib Python tools run on any project's Markdown (`check-fences.py`), and optional Hugo partials, with no CSS. So hugo-warped gets: a glossary spec (the entry file format, `also:`, the wiki-link form `[[Term|text]]`, and fixtures), both `glossary.py` tools, the glossary partials (entry lookup, list page data, `index.json`), and a lint check. Each theme keeps the look: Fugu holds the CSS, popover, search box, and the popover edge fix. Open point inside it: w42 doesn't use wiki links today, so the spec would add them to the shared dialect. Handed to the hugo-warped agent as a proposal once this is ticked.
