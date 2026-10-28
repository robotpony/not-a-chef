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

## Chicken sandwich blueprint #todo

New blueprint at [Chicken sandwiches](/methods/chicken-sandwiches/), from your four builds. A few things I filled in:

- [x] [[Chicken sandwich sauces]]: the spicy maple mustard ratio, "About 2:2:1 mayo, mustard, maple syrup, with ground hot chilies to taste." My guess; give me yours.
- [x] [[The ATL special]]: what kind of slaw (creamy or vinegar), and what bun? It says "on a toasted bun" with no mayo, since the drizzle carries it.
- [x] [[The classic chicken burger]]: `era: 1979`, from BK's Specialty Sandwich launch (Wikipedia). Deluxe is a variation, not its own build; split it out?
- [x] [[Crispy, mall-style chicken sandwich]]: you said 1889; I set `era: 1989`, from the essay's high-school timing. Right?
- [x] [[The BCS]] `## Iterations`: I filled in 1991 from the essay (BK patty, Whopper style) and 2015 from the Pan-fried chicken burger's "The Bruce" variation (homemade patty, mustard instead of ketchup, extra pickles and onion). Right?

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].
