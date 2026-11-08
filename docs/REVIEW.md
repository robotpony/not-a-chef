# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Code and docs review #todo

From the 2026-11-08 review (`docs/PLAN.md` has what's already fixed and what's left). Answer by number: a letter, yes or no, or a change.

1. Faint text: `--ink-faint` is 3.4–3.8:1 on the page, under the 4.5:1 small text needs (card stat labels, footer headings, menu and glossary counts, scale ticks). Darkening it enough makes it almost `--ink-muted`. Move small text to `--ink-muted` and keep faint for borders, icons and large text (A), or darken `--ink-faint` itself to #6C6D63 light, #929386 dark (B)? I recommend A.
2. Should the unticked ingredient checkbox be outlined in `--ink-faint` (3.6:1) instead of `--border-strong` (1.5:1, nearly invisible in bright light)? I recommend yes.
3. Should cards, chips, Parts rows and search results get a 2px `--accent-strong` focus ring on keyboard focus (never on a mouse click), in place of today's faint tint or underline? I recommend yes.
4. Screen readers call the theme toggle "Dark mode switcher" while it reads "Light" or "Dark". Should it be named "Dark mode" and say whether it's on (`aria-pressed`)? I recommend yes.
5. Should the photo viewer use the dark theme's own colours (ink #E2E4D8, accent #BF9D72) in place of its five hand-picked ones, including a hover gold that's in no palette? I recommend yes.
6. Should `/migrate` go for good: `tools/migrate.py`, `.claude/commands/migrate.md`, about 50 lines of DESIGN.md and the CLAUDE.md mentions (git keeps them, one history line stays in ARCHITECTURE.md)? I recommend yes.
7. Should CLAUDE.md be cut from 101 lines to about 40? It would keep what the site is, where each thing is documented, who owns what, what to read first, the commands, commits and language. The essay types would move to FORMAT.md, and the rest would become pointers. I recommend yes.
8. Should DESIGN.md's tool sections become "run it with `--help`", and its ~125 lines on slash commands a one-line index pointing at the command files? I recommend yes.
9. `tools/publish.sh deploy` ships whatever `public/` holds as long as HEAD hasn't moved, even after a local `hugo --quiet`. It also doesn't count the build, and `make deploy` means a full publish. Drop it (A), or keep it with a check that `public/` is still the clean build (B)? I recommend A.
10. FORMAT.md says "centre" and "litre"; the blog-writing skill says "center" and "liter". Keep centre and litre here and note that the site differs from the blog (A), or follow the skill (B)? I recommend A.
11. Should README's goals become two or three sentences on what the site is now, with PDF output moved to PLAN.md Later? I recommend yes.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].
