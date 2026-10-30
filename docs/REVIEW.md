# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].

## Concepts glossary: approach #todo

Each item is a recommendation: tick it to agree, or write the change after it. Settled answers move to `docs/PLAN.md` › Concepts.

- [ ] **Source:** one file per concept in `content/reference/glossary/` (`title`, `also:` for other forms like *emulsify*, body is the definition; first sentence is the hover text). The glossary page lists them all. Not `aliases:`, which Hugo turns into redirects. Alternative: keep one `glossary.md` with a `## Term` per entry.
- [ ] **Marking (pick one):** (a) a source tool, `glossary.py link`, writes the first prose mention of each term as a wiki link (`[[Fond|fond]]`), shown as a diff before it writes; Hugo's link hook does the rest at build, with no marking script. Or (b) the source stays untouched and a small script marks words in the browser from a per-page term list Hugo builds. Recommended: (a).
- [ ] **Candidates:** `glossary.py candidates` lists words worth defining (used on 2+ pages, not yet in the glossary, and rare in everyday English or already italicised), and adds them to this file for you to pick from.
- [ ] **Marking:** first mention per page only, in prose (paragraphs and method lists), never in headings, links, ingredient lists, code or fences. A page can opt out with `glossary: false`.
- [ ] **One look:** the hand-written `[[Term]]` glossary links and the auto-marked words share one subtle style and popover, so readers learn one thing.
- [ ] **Home:** templates in hugo-warped (so w42 can use them), the marking script in warped.js. Fugu just switches it on.
