# /glossary-link

Link glossary terms on their first prose mention, one term at a time, reviewed in chat. This is the chat version of `make glossary-link`: the same proposals, shown as one table per term, so Bruce answers once per term instead of once per mention.

Usage: /glossary-link [term | next | status]

- No argument, or `next`: the term with the most unlinked mentions.
- A term (title or an `also:` form, any case): that term.
- `status`: the counts only (step 2), with nothing proposed.

The spec is hugo-warped's `glossary/README.md` ("Marks" and "link"). Entries are the files in `content/reference/glossary/`; an entry with an empty body is a stub and is never proposed.

1. Get the current proposals, fresh each time, since Bruce may be running `make glossary-link` in a terminal at the same time:

   ```
   make -s glossary-check JSON=1 2>/dev/null
   ```

   Add `ENTRY="Deglaze"` to limit it to one term (title or `also:` form, any case). Each item is `{path, line, term, words, move, from}`: `path` under `content/`, `line` the source line, `words` the exact text to mark. `move: true` means the page already has one mark for the term, on line `from`, and the rules now put it on `line` instead: on a recipe, the main column (Ingredients, Method, components) comes before the sidebar sections, and an entry with `kind: ingredient` may sit in an ingredient list. The tool has already left out headings, links, code, fences, frontmatter, stubs, concept terms in ingredient lists, and the pairs in `tools/glossary-skip.txt`.

2. Count proposals per term. With `status`, print a short table (term, count), the total, and the next term, then stop.

3. For the chosen term, show one numbered table, each row on one line:

   ```
   Deglaze · 33 pages

    1  methods/pan-sauces.md:20          …Pour off the fat, then [[Deglaze|deglaze]] with wine…
    2  recipes/beef-stroganoff.md:41     …add the brandy and [[Deglaze|deglaze]], scraping up…
   ```

   For a move, add `from <line>` after the path, and show the old line's context too, dim, on the row above, so Bruce sees where the mark leaves. The context is the source line with the mark in place, trimmed to about eight words each side of it, cut at word boundaries with `…`. Read each line from the file (`sed -n '<line>p'`). Then say what each answer does and wait: don't edit anything until Bruce replies.

   - `all`: link every row (a move row is moved).
   - `all but 3 7`: link the rest; 3 and 7 are skipped for now (offered again next time).
   - `never 3 7` (with `all` or alone): 3 and 7 go in the skip file and are never offered again. For a move row this means keep the mark where it is.
   - `only 1 2 5`: link just those.
   - `skip`: nothing now; move on.

   Flag any row that looks wrong before asking: the word used in another sense ("fond memories"), a bold step label (`**Deglaze.**`), a quote, or a title. Suggest `never` for it; Bruce decides.

4. Apply the answer with the tool, not by hand: write the term's items from step 1, each with `"answer"` set to `yes`, `never` or `skip`, or for a move row `move` or `keep` (keep the item's `from`), to a JSON file in the scratchpad, then

   ```
   make -s glossary-apply ANSWERS=<that file>
   ```

   It writes each mark (`[[Title]]`, or `[[Title|words]]`, pipe escaped in tables) and adds each never pair to `tools/glossary-skip.txt`, exactly as `make glossary-link` would. A move turns the old mark back into its plain words and marks the new line. It prints one line per item (`linked`, `moved`, `never`, `kept`, `skipped`, or `stale, not changed` when Bruce's terminal run got there first, or the line moved), then a total.

5. Re-run step 1 and confirm the term's linked rows are gone. Report what changed: linked, never, skipped, and anything that didn't apply. Then commit the content files and the skip file, and only those (`git add` each path, never `-a`): "Links <Term> on its first mention in N pages" (or "Moves <Term>'s link to the main text in N pages"). Bruce's own uncommitted edits stay his.

6. Offer the next term by name and count: "Next: Brine, 32 pages. Go on?" A yes repeats from step 1 for it.

Don't run `make glossary-link` from here: it's interactive and waits for keys.
