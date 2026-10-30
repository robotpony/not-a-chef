# /glossary-new

Add glossary entries, each with a first-draft definition for Bruce to review.

Usage: /glossary-new "Term" ["Another term" …]

The spec is hugo-warped's `glossary/README.md`. Entries are one file each in `content/reference/glossary/`; the glossary page, the hover on each linked word, and `index.json` all come from them.

For each term:

1. **Check it's new.** Read the `title` and `also:` of every file in `content/reference/glossary/`, and the reference essays in `content/reference/essays/`. Compare the lowercase forms. If the term or one of its forms is taken, say which entry has it and skip it. Two entries can't share a word.
2. **Title.** Sentence case, as everywhere on the site: first word and proper nouns only (`Maillard reaction`, `Kewpie mayonnaise`). Keep a cuisine's own spelling and marks (`Pa'akai`, `ʻalaea`). The file name is the title in kebab case, apostrophes dropped (`paakai.md`).
3. **Forms.** `also:` lists the other forms the tools should match: plurals and verb forms in use (`braised`, `braising`), a common English name (`bonito flakes` for Katsuobushi), or the other spelling (`tarka`). Find them with `grep -rhiow` over `content/`. Leave out a form that's mostly used in another sense ("tempering" means chocolate and eggs too). Never use `aliases:`, which Hugo turns into redirects.
4. **Read how the cookbook uses it.** `grep -rhiw` over `content/` for the term and its forms. Where a recipe or method already explains it, match that: its facts, its stand-ins, its numbers. If a page on the site is about the term (a recipe titled for it), end the definition with `See [[That page]].`
5. **Write the definition** as the file's body, under frontmatter of `title`, `also` (if any) and `date` (today):
   - The first sentence is the hover and the start of `index.json`'s `def`: it has to stand alone, say what the thing is, and stay under about 200 characters.
   - One or two more sentences at most: what it does in cooking, what it tastes like, how it's sold, or the stand-in a home cook can find.
   - Canadian English, metric with imperial where a quantity matters, plain and practical. The voice is the recipes': instructional, no stories (`~/.claude/skills/recipe-writing/SKILL.md`).
   - Facts you can check. If unsure of one, leave it out rather than guess, and say so in the review note.
6. **Build** with `hugo --quiet -d <scratchpad>/build`. Fix any glossary warning it prints for the new file (duplicate-key, aliases-not-also).

Then:

- Add the new entries to `docs/REVIEW.md` under `## Glossary: new drafts #todo` (create the section if it isn't there; add to it if it is), as one tickable line of `[[Term]]` links per batch, with a note on anything left out or uncertain.
- Commit the new files and `docs/REVIEW.md`: "Drafts glossary entries for X, Y and Z."
- Tell Bruce how many first mentions each new term has (from `make glossary-check`), and that `/glossary-link <term>` links them once the draft is approved.

A drafted entry shows on the glossary page from the next build, so it goes live with the next publish. Remind Bruce of that when there are drafts still unticked in `docs/REVIEW.md`.
