# /glossary-candidates

Find words worth adding to the glossary, pruned to a short list for Bruce to pick from.

Usage: /glossary-candidates [min pages, default 2]

1. Run the raw list:

   ```
   python3 themes/hugo-warped/tools/glossary.py candidates content --glossary reference/glossary --recipes recipes --recipes drinks --not-ingredients "$(sed -n 's/^ *notIngredients *= *\[\(.*\)\]/\1/p' themes/fugu/hugo.toml | tr -d '" ')" --min-pages <N> --json 2>/dev/null
   ```

   Each item is `{word, pages, forms, italics}`. It already leaves out the glossary's terms and their `also:` forms, stubs included, and words among the 25,000 most common in English. It is still mostly noise: measures (tbsp), everyday cooking words (browned, whisk, diced), plurals of common foods, and typos.

2. Prune it, in this order of priority (Bruce, 2026-10-30):
   1. **Ingredients that aren't common, or are specific to a cuisine:** katsuobushi, gochugaru, inamona, asafoetida. Group them by cuisine.
   2. **Techniques and food science** a home cook might not know: velveting, autolyse, panade.
   3. Nothing else. Drop measures, everyday words, plain foods (cauliflower, pecans), dish names that have their own recipe page, brand names, words used in only one sense nobody would look up, and anything already explained in a glossary entry's text.

   Check each keeper with `grep -rhiw` over `content/` that it's used in a cooking sense on at least two pages, and note its forms. A word used both ways (`fond` and "fond memories") is fine: `/glossary-link` asks per page.

3. Write the short list into `docs/REVIEW.md` under `## Glossary: candidates #todo` (replacing that section if it's there), grouped as above, one tickable line per group, each word with its page count:

   ```
   - [ ] Japanese: wakame (2) · nori (2) · shiitake (9)
   ```

   Add one line saying what was dropped and why (in a few words, not a list of every word), and that ticking a group means "draft these". Commit `docs/REVIEW.md`: "Lists glossary candidates for review."

4. When Bruce ticks groups (here or in chat), run `/glossary-new` with those words, and clear the ticked lines from the candidates section.
