# Review

Everything waiting on Bruce, in one place. Tick a box to approve it, or write "no" (or a change) after the item. Claude picks up the answers from here and clears what's done. `docs/PLAN.md` is the work list; this file is only the questions.

Local links need the dev server (`/preview`). Each open section's heading carries `#todo` for Bruce's todo tool; a section is removed once it's answered.

## Deferred by Bruce

Not questions for now, kept so they aren't lost: the drafts (`make drafts`). The cornmeal-breaded chicken patty research is now a test kitchen recipe, [[Cornmeal fried chicken]].

## Glossary: definitions to write #todo

Stub files are in `content/reference/glossary/`, one per term, with `title`, `also:` (other forms the tools match) and `date`, and no body yet. Write the definition as the body: the first sentence is the hover, the rest shows on the glossary page. Edit `also:` if a form is wrong or missing, and delete a file to drop the term. An empty stub stays off the site and out of `make glossary-check` (hugo-warped 4d260ae). Once a term has a definition, `make glossary-link` proposes its links one at a time.

Picked from `make glossary-candidates` (641 words) as cooking concepts, techniques and food science:

- [ ] [[Al dente]] · [[Aromatics]] · [[Autolyse]] · [[Blanch]] · [[Braise]] · [[Brine]]
- [ ] [[Crowding the pan]] · [[Deglaze]] · [[Doneness]] · [[Dredge]] · [[Emulsify]] · [[Fond]]
- [ ] [[Hydration]] · [[Maillard reaction]] · [[Mise en place]] · [[Panade]] · [[Proofing]] · [[Roux]]
- [ ] [[Sear]] · [[Slurry]] · [[Soffritto]] · [[Tadka]] · [[Umami]] · [[Velveting]]

Specialty ingredients that came up, not stubbed. Tick any you want, and I'll add stubs: dashi, kombu, bonito, mirin, shoyu, miso, gochujang, togarashi, furikake, tare, ghee, panko, garam masala, kecap manis, diastatic malt, transglutaminase, citric acid, tamarind, passata, inamona, limu, ogo, tobiko, masago.

- [ ] Add stubs for: 
