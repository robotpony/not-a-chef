# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].

## Approve as recommended #todo

One box each: tick to approve the recommendation as described, or write the change after it. The mocks need `python3 mockups/serve.py` running, then http://localhost:8765/mockups/ and the file name.

- [ ] **Glossary bold labels:** ask hugo-warped to skip bold text at the start of a list item ("**Doneness.**"), so labels stop being offered as links and the term's next plain mention gets the link instead.
- [ ] **Recipe mechanic** (`recipe-mechanic.html`): the Mechanic moves above Ingredients as a callout, with its formula inside. The rest of the sidebar gets quieter (muted, smaller text), and on phones search moves to the end of Recipe notes. On Chai, the sidebar's overhang drops from 265px to 33px.
- [ ] **Food Log months** (`food-log-sidebar.html`): months grouped under year labels with "undated" dropped. Older years fold to one row ("2024 · 4 months"), except the newest year and the page's own. Seasons keep their full names. On October 2026's page, 39 rows become 16.
- [ ] **Even cards** (`even-cards.html`): the formula row sits just above the stats rule, and a card with no times still draws its rule. Burger stacks all sit on the rule, so their bottoms line up across a row (now up to 77px apart).
- [ ] **Glossary drafts:** nine entries, read and approved. Each links its recipe page where one exists: [[Tare]] ([[Chashu pork]]) · [[Gari]] · [[Chashu]] · [[Kecap manis]]. Common, defined anyway: [[Hoisin]] · [[Kimchi]] · [[Tahini]] · [[Sriracha]].
