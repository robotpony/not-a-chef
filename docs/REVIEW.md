# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].

## Concepts glossary: approach #todo

Recommended answers are ticked-ready; tick to agree, or write the change after the item. Approach in `docs/PLAN.md` › Concepts once settled.

- [ ] **Source:** one file per concept in `content/reference/glossary/` (`title`, `also:` for other forms like *emulsify*, body is the definition; first sentence is the hover text). The glossary page lists them all. Not `aliases:`, which Hugo turns into redirects. Alternative: keep one `glossary.md` with a `## Term` per entry.
- [ ] **Build/script split:** Hugo builds the glossary page, `glossary.json`, and per page a small inline list of only the terms that page uses. A small script marks the words. Hugo can't safely wrap words inside rendered HTML (it would hit links, headings and attributes), and a post-build pass wouldn't run under `/preview`.
- [ ] **Marking:** first mention per page only, in prose (paragraphs and method lists), never in headings, links, ingredient lists, code or fences. A page can opt out with `glossary: false`.
- [ ] **One look:** the hand-written `[[Term]]` glossary links and the auto-marked words share one subtle style and popover, so readers learn one thing.
- [ ] **Home:** templates in hugo-warped (so w42 can use them), the marking script in warped.js. Fugu just switches it on.
