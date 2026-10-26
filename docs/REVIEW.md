# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Layouts review #todo

From the `layouts/` pass in `docs/PLAN.md` §Review.

- [ ] Add Methods and The food log to the footer's Browse column (`layouts/partials/footer.html`), after Recipes, so it matches the header nav. Today it lists Recipes, Essays, and Reference only.
- [ ] Capitalise cuisine names in the Recipes menu and on `/cuisine/` ("Canadian", not "canadian"), as each cuisine's own page already titles itself. Tags stay lowercase: their page titles come out as "Make-Ahead", which is worse.

## Preview script #todo

From the job-search-tools session, which copied this preview pattern.

- [ ] Only stop a Hugo server on :1313 if it was started from this repo. `tools/preview.sh` kills any `hugo` holding the port today, which would include another site's preview. The guard checks the process's working directory first: `cwd=$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')`, and kills only when it matches the repo root. Other sessions' servers were holding :1316 and :1317 today, so ports are shared.

## Fence spec draft #todo

From `docs/PLAN.md` "Standard diagram fences". The draft is `docs/fences/README.md`, built from warped-agent's and Scorekeep content's answers today.

- [ ] Approve the draft as the shared grammar for Not a Chef, w42 and Scorekeep. Notable calls: three kinds (diagram, data, placeholder); a placeholder fence's body is one plain description line, never empty; `{name="…"}` is unique per file; a separate `draw="…"` picks a placeholder's drawing; unknown attributes are ignored silently; a block with no valid lines shows its source instead of nothing (w42 changes to match).
- [ ] Spec home: `docs/fences/` in this repo, not in Fugu. The draft assumes this, since Scorekeep doesn't use Fugu.
- [ ] Move the shared type pages here too (w42's `timeline.md` and `flow.md`, and `FORMAT.md`'s formula and stack sections), so every type's page sits in `docs/fences/`. The alternative is leaving them where they are and linking to them from the table.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].
