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

## Poke blueprint #todo

Drafted from the October food log's poke notes, in the test kitchen: [Poke](/methods/poke/), with four parts (the fish, the seasoning, onions/seaweed/crunch, how it's served) and four builds. History is from Wikipedia. Gaps I filled or left open:

- [ ] Your poke: what do you make at home (or want to), and what did you eat in Hawaii this month that should shape it? If there's a house version, it could be its own build, like the BCS.
- [ ] Fish: where do you buy it here, and is it frozen? The fish part says to freeze salmon first and suggests frozen-at-sea tuna. Right for how you shop?
- [ ] Shoyu marinade amounts: your notes give ¼ cup soy, 2 tbsp sesame oil, 1 tbsp rice vinegar, ¾ cup green onion, 1 tsp ginger. For how much fish (450 g / 1 lb?), and how long does it sit before serving? I wrote "toss just before, or up to an hour ahead".
- [ ] Limu and inamona at home: I suggested seaweed salad mix for limu and toasted salted macadamias for inamona. Do you use something else, or skip them?
- [ ] Builds: I merged "Traditional Hawaiian" and "Limu ahi poke" into one, [[Hawaiian limu poke]], and made he'e (octopus), wasabi, and garlic shoyu variations instead of builds. Agree?
- [ ] Timeline: shoyu ahi is `era: 1970` (Laudan, via Wikipedia) and the mainland bowl `era: 2012`. Limu poke is pre-contact and spicy ahi has no date in Wikipedia, so both are off the timeline. Leave them off, or pick years (e.g. 1778 for Cook's onions on the limu poke)?
- [ ] Spicy ahi: is the mayo folded through the fish (island style, as drafted) or drizzled over a bowl?
- [ ] Bowl rice: sushi rice (seasoned) or plain short-grain? The bowl draft allows either.
- [ ] Formula diagrams for the 2:1 shoyu, 3:1 spicy mayo, and 1:1:1 bowl ratios? They'd need soy, oil, mayo, and fish icons in Fugu's kit.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].
