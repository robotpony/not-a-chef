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

## Drinks section #todo

Drinks now have their own section, `content/drinks/` (`/drinks/`, in the nav). [[Knotty Irishman]] is the first page there. The seven older drinks are still in recipes and are all live at `/recipes/<slug>/` on bruce-loves-to-cook.ca: chai, lemon-lime iced tea, prosecco sangria, Bruce's cold-brewed iced tea, Bruce's iced tea, homemade Baileys Irish cream, essence of cola.

- [ ] Move the seven into `content/drinks/`. Their URLs change to `/drinks/<slug>/`.
- [ ] Add `aliases:` redirects from the old `/recipes/<slug>/` URLs (all seven are published).
- [ ] Check the Knotty Irishman amounts: 2 shots Baileys, 1 whiskey, ½ shot Frangelico, 120 ml coffee, 60 ml cream, with a shot as 30 ml (1 oz).

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].
