# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Code and docs review: approve as recommended #todo

From the 2026-11-08 review (`docs/PLAN.md` has what's already fixed and what's left). One box each: tick to approve the recommendation, or write the change after it.

Accessibility and look (each changes how the site looks a little):

- [ ] **Faint text contrast.** `--ink-faint` (#828377) is 3.4–3.8:1 against the backgrounds; small text needs 4.5:1. It's on card stat labels, the footer headings and build line, menu counts, glossary counts, the scale ticks. Darkening it enough (#6C6D63 light, #929386 dark) lands it almost on `--ink-muted` (#6A6B61), so the two tiers merge. **Recommended:** small text moves to `--ink-muted`; `--ink-faint` stays for borders, icons and large text.
- [ ] **Ingredient checkbox outline.** The unticked box is drawn in `--border-strong`, 1.5:1 on the page; controls need 3:1, and it nearly vanishes in bright kitchen light. **Recommended:** draw it in `--ink-faint` (3.6:1).
- [ ] **Focus rings.** Cards, chips, Parts rows and the search results turn the browser's focus outline off and show a faint tint or underline instead, so a keyboard user can lose their place. **Recommended:** a 2px `--accent-strong` outline, 2px out, on `:focus-visible` for all of them (mouse clicks don't show it).
- [ ] **Theme toggle name.** Screen readers hear "Dark mode switcher" while the button reads "Light" or "Dark". **Recommended:** name it "Dark mode" with `aria-pressed` on or off, so it says its state.
- [ ] **Photo viewer colours.** The viewer is dark in both themes on purpose, with five hand-picked colours; its hover gold (#D3A569) is in no palette. **Recommended:** use the dark theme's own tokens (ink #E2E4D8, accent #BF9D72) so it matches the dark site.

Docs and tools:

- [ ] **Retire `/migrate` for good.** Delete `tools/migrate.py`, `.claude/commands/migrate.md`, the ~50 lines in `DESIGN.md` about them, and the mentions in CLAUDE.md. Git keeps them; one history line stays in `ARCHITECTURE.md`.
- [ ] **Cut CLAUDE.md** from 101 lines to about 40: what the site is, a table of where each thing is documented, who owns what (Fugu, hugo-warped), what to read first (the recipe index, STYLE.md, recipe-writing), the commands, commits, language. The restated recipe format, Test kitchen, pinned and principle details go (Fugu's docs and DESIGN.md have them), and the essay types move to `FORMAT.md` §Essays.
- [ ] **Shrink DESIGN.md's tool and command sections.** The CLI sections become "run it with `--help`" (the one fact `--help` lacks, which fields `frontmatter.py check` requires, goes to fugu-agent for its help text). The ~125 lines on slash commands become a one-line index; the command files are the source.
- [ ] **Drop `tools/publish.sh deploy`.** It ships whatever `public/` holds if HEAD hasn't moved, but a `hugo --quiet` (which CLAUDE.md tells agents to run for the recipe index) rewrites `public/` as a local build without moving HEAD. It also ships without counting the build, and `make deploy` means something else (a full publish). A full publish rebuilds clean anyway.
- [ ] **Centre or center.** `FORMAT.md` says Canadian "centre" and "litre"; the blog-writing skill says "center, meter, liter". **Recommended:** keep "centre" and "litre" here (a cookbook measures in litres), and note in `FORMAT.md` that this site differs from the blog.
- [ ] **README's goals.** They read as the early pitch (PDF output "possibly using a separate tool", a "done for…" status note). **Recommended:** two or three sentences on what the site is now; PDF output moves to PLAN.md Later if you still want it.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].
