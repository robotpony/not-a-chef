# Content review pass

Tracks a page-by-page review of everything under `content/`.

- **Resume:** pick up at the first `- [ ]` item.
- **Reference:** food-safety notes below are framed against `content/reference/food-safety-time-and-temperature.md` (draft, added 2026-09-24): safety is temperature × time, so a lower temperature is fine when the centre really holds it.
- **Rerun with new parameters:** add a `## Pass 2` section with its criteria, copy the checklist (or regenerate it with `find content -name '*.md' | sort`), and reset the boxes. Keep Pass 1 notes for reference.
- **Fixing:** when an issue is fixed, strike it through (`~~...~~`) or delete the bullet; when a page has no bullets left, drop the `!`.

## Status

Pass 1 complete: 253 of 253 pages reviewed on 2026-09-24 (9 clean, 244 with notes). Existing content was not edited; one new draft page was added (`reference/food-safety-time-and-temperature.md`).

## Fix first

These can hurt someone or publish something wrong. Details are under each page.

**Food safety**

Safety is temperature *and* time. The instant numbers (74°C poultry, 71°C ground meat) kill almost immediately; lower temperatures pasteurize just as well if the centre holds them long enough, and keep the meat juicier. 63°C held 5 minutes is enough for beef, pork, and lamb. Poultry needs longer at the same temperature (USDA: 9–13 minutes at 63°C, about 5–6 minutes at 65°C). The new draft `reference/food-safety-time-and-temperature.md` has the full tables. So the problem in the recipes below isn't a low temperature. It's a low temperature with no real hold, usually on thin pieces that cool within a minute of leaving the pan.

1. ~~`recipes/turkey-burgers.md`: ground turkey to 63–65°C, then a 5–10 minute rest. Thin patties won't stay at temperature through the rest. Hold them at 65°C for 6 minutes (in a low oven) or cook them to 74°C.~~ Fixed: cook to 70°C; the climb in the pan counts toward the hold (see the new "The climb counts" section of the safety page).
2. ~~Thin poultry pulled low with a rest instead of a hold: `pan-fried-chicken-burger` (70°C, fine if it holds ~15 sec; the carry-over claim is the only issue), `fajita-chicken-bowl` (62°C → needs ~14 min), `mayo-marinade` chicken (63°C), `simple-rice-bowls` chicken (60°C → needs ~30 min). `roast-poultry` breasts at 63°C are borderline (bone-in pieces do hold through a 10-minute rest, but 63°C needs 9–11 min); pull at 65°C for margin.~~ Fixed: thin chicken to 68°C, the burger stays at 70°C, roast breasts to 65°C with the rest as the hold.
3. ~~`reference/temperature-and-doneness-cheat-sheet.md`: "fall apart" targets are too low (shoulder/chuck at 80°C), and one flat 3-minute hold is right for red meat but short for poultry below 65°C. Link it to the new safety page.~~ Fixed; fall-apart numbers synced on the safety page too.
4. ~~Storage that's too long or too warm: fresh salsas kept "a few weeks" (`ginas-tomato-salsa`, `salsa-verde`); counter cold-brew tea for 12 h; cream-cheese-frosted `paska-buns` kept unrefrigerated 3 days; `the-anything-casserole` reheated to only 65°C.~~ Fixed.
5. ~~Raw egg without a note: `caesar-dressing`, `white-spot-burgers` mayo.~~ Fixed.

**Broken or unfinished pages that are published (`draft: false`)**
- ~~Template placeholder text as the intro: `greek-islands-creamy-greek-dressing`, `south-american-red-salsa`.~~ Fixed.
- ~~Truncated or no method: `kormaqorma` (ingredients only), `no-knead-pizza-dough` (stops mid-sentence), `jerk-chicken` (step 2 is "Re"), `bulgogi-beef` ("Cook like taco beef"), `vegan-burger-savoury-chew-gluten`, `english-muffins`.~~ Fixed (methods drafted 2026-09-24; review against how you actually cook them).
- ~~Missing a core ingredient or step: `bruces-thai-redgreen-curry` (no coconut milk; paste never added), `grandma-fergusons-buns` (yeast never added), `omas-kipfels` (yeast never added), `bienenstich` (milk and topping ingredients never added), `butter-tarts` and `coconut-jam-tarts` (pastry has no water), `prosecco-sangria` (no Prosecco), `vodka-cream-sauce` (cream never added), `rocky-road-brownies` (chocolate never melted; chips unused; no bake time).~~ Fixed.
- ~~`essays/edgar-wright-style-cookery.md` has no frontmatter at all.~~ Fixed.
- ~~Flattened tables (unreadable): `reference/food-ratios-for-creating-your-own-recipes.md`, `reference/temperature-and-doneness-cheat-sheet.md` (both drafts).~~ Fixed.

**Wrong numbers likely to ruin a dish**
~~`fresh-egg-pasta` (4% salt), `baked-oatmeal` (8×8 cm pan), `meat-sauce-aka-american-bolognese` (100 ml = 1 tbsp), `lazy-pizza-dough-2022` (percentages ≠ grams), `pizza-dough` (10% vital wheat gluten), `butternut-squash-curry` (750 g spinach), `yam-and-sage-pasta-filling` (60 g = 2 cups), `stuffed-mushroom-caps` (units swapped), `beef-stroganoff` (a cup of vinegar), `triple-layered-double-pumpkin-cheesecake` (1000 ml cream cheese), `chef-johns-hamburger-buns` (40°C ≠ 101°F).~~ Fixed 2026-09-24.

**Privacy and sharing**
- ~~`welsh-cakes` names your street. `white-rock-cheesecake` says "do not share outside of our family" (it's a draft), but `carrot-cake` from the same restaurant is published with "stays in the family".~~ Fixed: street removed; carrot cake's family-only line removed.
- ~~About 25 links to private Google Docs/Sheets, listed per page. Most can become wiki links now that the recipes live here.~~ Fixed: wiki links where the recipe exists, unlinked otherwise; private spreadsheets moved to HTML comments to import later.

## Open questions (collected)

Questions are inline as `Q:` under each page. Collection-wide questions that need one decision each:
1. ~~Normalize the ~110 legacy-format recipes (numbered `Directions:`) to FORMAT.md prose, or accept both?~~ Decided 2026-09-24: convert to FORMAT.md as each page is touched.
2. ~~centre/litre vs center/liter?~~ Decided 2026-09-24: centre and litre. FORMAT.md and the recipe writing rules updated; the 9 "center/centered/liter" uses in content converted.
3. ~~Family backstory blockquotes: keep, or move to essays?~~ Decided 2026-09-24: keep them in recipes. They're hidden on the site by default (`hideFamilyHistory` in `assets/js/ingredients.js`); a special build will show them later.
4. ~~Consolidate overlapping recipes?~~ Decided 2026-09-24. Pizza doughs, Thai curries, Greek marinades, and beef base: keep all (the doughs show the recipe's evolution). Jerk, hoagie rolls, slaw dressings, ramen pork, and smash burgers: merged (old URLs redirect via `aliases`). Gyros: the sheet-pan page now builds on `[[Gyro base]]`. Breakfast sausage: merged. Groups as reviewed:

    | Group | Pages | How they differ |
    |---|---|---|
    | Pizza dough | `pizza-dough`, `pizza-dough-2021-edition`, `pizza-dough-2022-edition`, `lazy-pizza-dough-2022`, `no-knead-pizza-dough` | Cold-ferment 70% dough, two dated editions, a same-day 70% dough with focaccia, and a volume-measured no-knead |
    | Thai red curry | `bruces-thai-redgreen-curry`, `red-thai-curry`, `simpler-thai-red-curry` | Family red/green method, a fuller red curry, and a shortcut red curry |
    | Jerk | `jerk-chicken`, `jerk-marinade`, `reference/jerk-marinade-adapted-from-serious-eats` (draft) | Different marinades; the reference page is "notes for a recipe update" |
    | Breakfast sausage | `breakfast-sausage`, `breakfast-style-sausage` | Same thing, different percentages (salt 2.0% vs 1.6%, milk powder 4% vs 2%, water 10% vs 7.5%) |
    | Gyros | `gyro-base`, `sheet-pan-fast-food-style-gyros` (`gyro-dogs` uses the base) | Same meats and spices, different method |
    | Hoagie rolls | `hoagie-rolls`, `hoagie-style-french-rolls` | Same method, 4 vs 8 rolls |
    | Asian slaw dressing | `asian-slaw-dressing`, `vaguely-asian-slaw-dressing` | Near-identical (90 g oil, ~45–50 g rice vinegar, 30 g Dijon, sesame, soy, maple) |
    | Greek marinade | `greek-marinade`, `greek-lemon-and-herb-marinade` | Quick vs herb-heavy |
    | Ramen pork | `chashu-pork`, `basic-ramen-tare` | Same braise; its liquid becomes the tare; different ratios |
    | Smashed burgers | `mcburgers`, `mcdouble` | Same technique and seasoning idea |
    | Beef base | `beef-base`, `meat-sauce-aka-american-bolognese` | Not duplicates: the sauce is built on the base. Already linked; probably keep both |

5. ~~Pages with work-in-progress notes but `draft: false`: publish as-is, or flip to draft?~~ Decided 2026-09-24: publish them all as-is. Current list:
    - `recipes/base-curry-gravy.md`: TODO (L22)
    - `recipes/butter-chicken.md`: TODO, sugar amount (L43)
    - `recipes/cottage-pie.md`: "[draft] need testing" (L63)
    - `recipes/english-muffins.md`: "still tuning" (L13)
    - `recipes/farmer-soup.md`: "work in progress" (L11)
    - `recipes/homemade-baileys-irish-cream.md`: "[draft] Untested" (L48)
    - `recipes/instant-pot-chicken-thigh-curry.md`: "needs testing" (L14)
    - `recipes/marinated-pressed-tofu.md`: "[draft]" (L48)
    - `recipes/pulled-pork.md`: "[draft] Untested", `servings: TBD` (L47)
    - `recipes/sheet-pan-fast-food-style-gyros.md`: vinegar "still being tested"
    - `recipes/triple-layered-double-pumpkin-cheesecake.md`: "Not sure where this recipe came from" (L9)
    - `recipes/vindaloo-wing-sauce.md`: "[draft] needs testing" (L45)
    - `recipes/vodka-cream-sauce.md`: "no idea if it's any good" (L11)
6. ~~One spelling each.~~ Decided and applied 2026-09-24 (39 files; FORMAT.md updated). Chosen spellings:
    - **chili** (38 uses) / chilis (15) / chilies (6) / chilli (21) / chillies (8) / chile (3) / chiles (2) → **chili**, plural **chilies**, for the dish, the pepper, and the powder. Keep "chile" only inside a proper name (e.g. chile de árbol) and brand names as sold (Heinz Chili Sauce).
    - **yogurt** (12) / yoghurt (7) → **yogurt**, the usual Canadian spelling.
    - **Szechuan** (10) / Sichuan (0) → **Sichuan**, the current standard romanization, except in a restaurant or product name.
    - **aluminum** (2) / aluminium (3) → **aluminum**, the Canadian usage.
    - **green onion** (18) / scallion (16) / spring onion (2) → **green onion**, the Canadian grocery term.

## Follow-up tasks

- [ ] Import the pan-fried chicken burger experiment log (private Google Sheet, linked in an HTML comment in `recipes/pan-fried-chicken-burger.md`) into the book, probably as a Notes table or a companion page.
- [ ] Move non-people `servings` values to the new `portions` field (added 2026-09-25; shown as "Makes"). About 20 recipes say things like "makes ~750 ml", "8 buns", or "enough for about 1 kg wings"; keep a people count in `servings` where one makes sense.
- [ ] Remove stale "needs testing" / "[draft]" / "work in progress" notes: every recipe has been tested (the author, 2026-09-25); the text just wasn't updated. Remaining ones from open question 5 include `base-curry-gravy`, `butter-chicken`, `english-muffins`, `farmer-soup`, `pulled-pork`, `sheet-pan-fast-food-style-gyros`, `vindaloo-wing-sauce`, `vodka-cream-sauce`.
- [ ] Import the other private Google Sheets and Docs now kept in HTML comments (`grep -rn 'to import' content`): the food ratios worksheet, scaling sheets in baked mac & cheese, breakfast sausage, pizza dough 2022, the poultry rub mix sheet, and T's broccoli salad's alternative dressing.

## Pass 1 (2026-09-24)

**Criteria**
1. Spelling and grammar (Canadian English: colour/flavour, -ize)
2. Style guide: `FORMAT.md` / `SPEC.md` for recipes, `FORMAT-ESSAYS.md` + blog rules for essays, `~/.claude/rules/recipe-writing-rules.md` (sentence-case titles and headings, no em-dashes, imperative method, sensory cue before time, metric with imperial in parentheses, no backstory in recipe files)
3. Incorrect or incoherent explanations or instructions (missing ingredients, steps that reference things not listed, wrong temps/ratios, contradictions)

**Conventions**
- `[x]` reviewed, no issues. `[x] !` reviewed, issues logged below the item. `[ ]` not yet reviewed.
- Issues are logged, not fixed. `Q:` marks a question for the author.
- Baseline: working tree as of 2026-09-24 (includes uncommitted prep/cook-time edits).

**Collection-wide findings** (patterns logged once here instead of per page)

- **Two recipe formats.** 112 recipes follow FORMAT.md (`## Ingredients` / `## Method`, prose steps). About 110 are still in the legacy import format: `## Ingredients:` / `## Directions:` headings with trailing colons, and numbered steps (113 files use numbered steps). FORMAT.md says method is prose. This is one normalization job, not 110 separate notes, so per-page entries below don't repeat it. Q: normalize in a separate pass, or accept numbered steps for family/legacy recipes?
- **Temperatures and units.** Many legacy recipes write "175C/350F", "220C/450F", or "350F" with no degree sign. The style is "180°C (350°F)". Also common: "500ml" with no space, and cups-only quantities with no metric. Only flagged per page when a value is wrong or missing, not just formatted differently.
- **Ranges.** Hyphen ranges ("2-3 minutes") are everywhere in legacy recipes; the new-format recipes use en-dashes ("2–3"). Mechanical fix; not repeated per page.
- **centre/litre vs center/liter.** The rules say American -er ("center", "liter"), but the collection uses "centre" 6× and "litre" 6× (and "liter" 0×). Canadian usage is centre/litre. Q: update the rule to centre/litre, or change the files?
- **Em-dashes.** 11 files still have em-dashes (60 in edgar-wright-style-cookery.md alone). Listed per page.
- **Wiki links.** The render hook matches titles case- and punctuation-insensitively, so case-only mismatches resolve. One link is actually broken: `[[Bruce's spice rub]]` in mauikalua-pulled-pork.md (probably meant "Bruce's poultry and pork spice rub"). About 20 links use Title Case text (`[[Onion Bhaji]]`, `[[Base Curry Gravy]]`), which displays in title case on the site; worth a sweep with the sentence-case rule.
- **Private Google Docs/Sheets links.** Several reference pages link to private Google Docs or Sheets, or to Docs-only anchors (`#id.…`, `#ftnt1`, `#cmnt1`). Listed per page.
- **Flattened tables from the Google Docs import.** food-ratios and temperature-and-doneness lost their tables (one cell per paragraph). Probably the same importer bug; check any other draft that came from Docs.
- **Missing `date`.** 129 of 223 recipes have no `date` field (optional per FORMAT.md, so not an error). Noting it in case the index/sorting relies on it.

## Checklist

### Site pages

- [x] `about.md` (fixed 2026-09-24: description; parallelism; L10 reworded)

### Essays

- [x] `essays/_index.md`
- [x] ! `essays/cooking-reflections/tips-and-tricks-for-cooking-on-the-road.md` (fixed 2026-09-24: Q labels → `##` headings; "very little will stick"; reverse method explained and linked to the new reverse-cooking reference page)
    - Draft, unfinished: the third question has no answer, and "Salad dressing or water can help." is a placeholder answer.
- [x] ! `essays/edgar-wright-style-cookery.md` → moved to `reference/food-video-filming-techniques.md` (fixed 2026-09-24: frontmatter added, H1 dropped; sentence-case headings; em-dashes removed; spellings; time-lapse speeds; burnt → dark onions; hyphens)
    - L259: "The Cornetto freeze-frame endings" Q: I can't place freeze-frame endings in the Cornetto films; is this a specific scene, or should the reference go?
    - L273: "Baby Driver's opening isn't the beginning of the story ... starts in medias res" Q: Baby Driver opens with a heist and runs mostly linear. Shaun of the Dead or Hot Fuzz may be a better fit, or drop the film reference.
- [x] ! `essays/food-memories/.ideas.md`
    - Author scratch file with no frontmatter (dotfile, so Hugo skips it). Not reviewed as content. Q: move out of `content/` so it can't leak into a build?
- [x] `essays/food-memories/camp-cooking.md` (fixed 2026-09-24: possessives, hyphens, -ize, run-on split, hot dogs, cereal brand names, colon, L22 tense and wording; units and ending kept as-is by choice)
- [x] `essays/food-memories/garbage-plates.md` (fixed 2026-09-24: brand-name; "draining them"; aluminum via the spelling pass)
- [x] `essays/food-memories/slick-spaghetti-with-a-hint-of-oregano.md` (fixed 2026-09-24: puréed, homeopathic, "into the hot pot", paper-wrapped packages, "was added", leaner beef line, space-age; units and ending kept as-is by choice)
- [x] `essays/food-memories/the-dutch-deli.md` (fixed 2026-09-24: hyphens, backyard, "backing onto", Swiss, delis sentence, typos; "mudblood" as intended; "a Dutch deli")
- [x] `essays/food-memories/the-smells-of-india.md` (fixed 2026-09-24: grandparents', two-bedroom, comma splice, flatbread, "Even then"; "southern" removed)
- [x] ! `essays/planning-essays/meal-planning-bruces-take.md` (fixed 2026-09-24: heading, units, duplicate word, list case, spatchcocked, colon, "at a time"; "braise" defined as cook in liquid, then brown)
    - Draft (marked "Rambly + In progress"); ends mid-list at "Roast the veg".
- [x] ! `essays/technique-essays/how-to-find-great-recipes.md` (fixed 2026-09-24: all grammar and wording notes applied)
    - Draft; ends in a "Notes:" stub.
- [x] ! `essays/technique-essays/why-ingredients-matter-in-soup-stock.md` (fixed 2026-09-24: comma and hyphen, glucosinolate link, "With care", heading colon, bitter, "is those", fennel bulb, kombu clause; carrot tops/greens merged into one row; acid explanation added)
    - Draft; ends mid-section.

### Reference

- [x] `reference/_index.md`
- [x] `reference/reverse-cooking-reverse-sear-and-water-frying.md` (new draft 2026-09-24: reverse sear and water frying, linked from the cooking-on-the-road essay)
- [x] `reference/base-recipes-for-weeknight-cooking.md` (fixed 2026-09-24: wording, headings, hyphens, spellings, five-spice, wiki-link case; "reverse sear" → water-fry with a link; opinion folded into "To me")
- [x] `reference/burger-night-2022.md` (fixed 2026-09-24: column labels; pickles $0.02; bacon $20.50/kg ($1.03); potato $0.35; menu rows recomputed)
- [x] ! `reference/chili-costing-2022.md` (fixed 2026-09-24: reductions total recomputed to ~$117.45 ($3.09/portion) from stated estimates: ~$3 dry beans, 1.5 h pressure-cooker kitchen time; butchering left out)
    - L14–29: "Qty" has no units (1 what of beef?). Add package size or weight if you have it.
- [x] `reference/flour-protein-content.md` (fixed 2026-09-24: column converted to grams of vital wheat gluten (÷ 0.75); "typical" qualifier; em-dash; 00 note kept, no source needed)
- [x] ! `reference/food-ratios-for-creating-your-own-recipes.md` (fixed 2026-09-24: four tables rebuilt with the % column as the source of truth and ratio/example recomputed from it; mg → g; brine range made consistent (2.5–7.5%); velvet line; dry-brine 10 g; typos)
    - Q: the dry brine seasonings row disagreed three ways (ratio 0.5 = 50%, % column ~5%, example 24 g = 10%). Kept ~5% (12 g); a rub is often closer to 50%. Which is right?
    - Q: the wet brine sugar note said "up to 50% of the salt" while the table said 0–5% of the water; now "from none up to about the weight of the salt". Confirm.
    - Draft with a TODO section; fine to stay `draft: true`.
- [x] `reference/greek-dressing-research.md` (fixed 2026-09-24: typos, heading colons, duplicate title line; stays a draft, framed as a survey that led to the Greek Islands' dressing recipe; sample inconsistencies kept as found)
- [x] ! `reference/growing-sprouts.md` (fixed 2026-09-24: duplicate title line, comma splice, garbled siphon step, labels → `###` headings, syphon → siphon)
    - Unfinished: L22 trails off ("Key is to hydrate the …"); "Harvesting" has no content.
- [x] `reference/jaydas-birthday-dinner-menu.md` (removed 2026-09-24)
- [x] `reference/jerk-marinade-adapted-from-serious-eats.md` (merged into recipes/jerk-chicken.md as a variation 2026-09-24; draft removed)
- [x] `reference/nicola-2018-food-planning.md` (fixed 2026-09-24: pierogies and marinara added to the grocery list; Miss Vickie's, M&M's; remaining questions dropped)
- [x] `reference/sodium-citrate-ratios.md` (fixed 2026-09-24: rewritten in own words and condensed to one ratio table plus a short method, attributed to the Reddit thread)
- [x] `reference/soft-sandwich-bun-research.md` (fixed 2026-09-24: egg counted once; metric in grams with both kosher salt brands; kneading step; crust tip moved to the bake; em-dash; egg wash; wiki-link case)
- [x] `reference/temperature-and-doneness-cheat-sheet.md` (fixed 2026-09-24: table rebuilt; fall-apart raised to 90–95°C shoulder/chuck, 80–85°C dark meat; per-meat holds and thin-piece pulls; one rest rule; footnotes folded into notes; links the safety page)
- [x] `reference/thanksgiving-2021.md` (fixed 2026-09-24: Brussels, jalapeños, Better Than Bouillon, heading levels, day labels as `####`, week before / Sunday before reordered)
- [x] `reference/the-aldersons-epic-12-days-of-pizza.md` (fixed 2026-09-24: "Aldersons’", Toad, shepherd's, stray comma, dangling heading removed, "that time when", Pepperidge Farm; "cheesus" is the intended pun)

### Food log

- [x] `the-food-log/2026-September.md` (fixed 2026-09-24: no frontmatter is by design (title comes from the filename); the three `#todo` items link to their finished recipes; The Woks of Life; goulash typos, garlic step, named spices, Worcestershire added with the stock; merged into goulash.md as a variation)

### Recipes

- [x] `recipes/_index.md`
- [x] `recipes/adobo-seasoning-mix.md` (fixed 2026-09-24: meatball note reworded; "for grilling")
- [x] ! `recipes/al-pastor-marinade-pantry-hack.md` (fixed 2026-09-24: converted to FORMAT.md; backstory moved to the intro and the Mechanic rewritten around toasted powders bloomed in stock; tinned pineapple added as the topping that roasts on the pork, then gets diced; typos; units)
    - L55: "It should taste sweet" with no sweetener in the marinade unless you add the roasted peppers. Q: is sugar or pineapple juice meant to be in the marinade, or should "sweet" go? Left as written.
- [x] ! `recipes/almond-chocolate-cake.md` (fixed 2026-09-24: 23 cm (9 in); 190°C (375°F) conventional; unit spacing)
    - Q: cocoa % for "dark chocolate"? It changes sweetness a lot with 200 g brown sugar.
    - `cuisine: world` kept: it's the most common non-regional value (9 recipes).
- [x] ! `recipes/apple-berry-almond-scones.md` (fixed 2026-09-24: converted to FORMAT.md; lower case; "to dust"; blackberries; egg-wash egg added; 2.5 cm (1 in); 200°C (400°F); "until golden")
    - Q: how many scones does it make? No `servings` yet.
- [x] ! `recipes/arroz-rojo-mexican-red-rice.md` (fixed 2026-09-24: converted to FORMAT.md; intro; garnish as a `####` label; serrano; long-grain)
    - Q: the cilantro was listed but never used; I added it to the tomato blend. Right, or is it a garnish?
- [x] `recipes/asian-slaw-dressing.md` (merged 2026-09-24: MSG, ginger, seasoned vinegar from the vaguely-Asian version)
- [x] `recipes/autumn-glow-salad-with-lemon-dressing.md` (fixed 2026-09-24: converted to FORMAT.md as dressing + salad components; typos; apple, cranberries, and seeds tossed in; salt, pepper, and grain liquid listed; herbs vs. dried spices; 220°C (425°F); `source` is the Pinch of Yum URL; History blockquote kept, moved under the intro; photo note dropped)
- [x] ! `recipes/avocado-salad-dressing.md` (fixed 2026-09-24: overblending note; salt and pepper split; optional marker; unit spacing)
    - Q: 4 g salt plus pepper to taste: is that the split you meant?
    - Q: yield. The ingredients total ~195 g, but `servings` says ~135 ml. Which is right?
    - `tested: "1"` is the only use of that field; kept (open schema).
- [x] ! `recipes/baguettes.md` (fixed 2026-09-24: `technique` tag; Mechanic is now 75% hydration + narrow shape + steam; credits moved to Notes; Hollywood; en-dash ranges; sensory cue before time)
    - Q: `rest_time: 5–24 hr` implies an optional cold retard, but the method never mentions one and says 5–6 hours start to finish. Is there an overnight fridge option to add?
    - Q: "let rest 15 minutes" then "Proof for about an hour": does the hour include the 15 minutes, and is it covered? Left as written.
- [x] ! `recipes/baked-mac-cheese.md` (fixed 2026-09-24: converted to FORMAT.md as crust / noodles / sauce / assembly; one flow (noodles into the sauce pot, then layered in the dish); roux/béchamel/mornay explained in a Mechanic; variations moved after the method; typos; units)
    - Q: MSG was listed twice ("MSG 1.5%" and "10 g MSG (optional)"). Kept 10 g (~0.5% of the batch); 1.5% would be ~30 g. Right?
    - Q: 40 g sodium citrate is high for ~700–900 g cheese (2–3% of the cheese weight, 15–25 g, is typical). Tested?
- [x] ! `recipes/baked-oatmeal.md` (fixed 2026-09-24: 20 or 23 cm square dish)
    - `source: adapted`: adapted from what? Add the source or use `original`.
- [x] ! `recipes/base-curry-gravy.md` (fixed 2026-09-24: `vegan`/`dairy-free` tags dropped, coconut cream noted as the vegan swap; TODO replaced with a `[[Ginger/garlic paste]]` link (it already has the cilantro and green chili); `####` labels; restaurant-style; wiki-link case)
    - Q: dropped the vegan tags rather than making coconut cream the default. Prefer the other way?
- [x] `recipes/basic-beans-and-lentils.md` (fixed 2026-09-24: em-dash; "does little for gassiness"; `cook_time: 5 min–2 hr`; stovetop; kidney-bean warning moved into the method; `cuisine: world`)
- [x] ! `recipes/basic-chicken-ramen-stock.md` (fixed 2026-09-24: converted to FORMAT.md; dashi steeps in the strained stock; typos; heading colons; `cook_time: 3–4 hr` to cover pressure, steep, and reduce)
    - Q: roughly how much bonito (e.g. 20 g)? Listed without an amount and marked optional.
- [x] `recipes/basic-ramen-tare.md` (merged into chashu-pork.md 2026-09-24; redirects)
- [x] ! `recipes/beef-base.md` (fixed 2026-09-24: converted to FORMAT.md; add-ins as `####` labels; braise and pressure methods moved to Variations; Mechanic added from the intro and notes; MSG (Accent); typos; parens; 6 L (6 qt); "fastest if you use it wet"; Equipment)
    - Q: the pressure step said "20–30 minutes" then "as long as 30 minutes". Now "at the long end the beef turns very soft". Did you mean a longer time (45?) there?
- [x] ! `recipes/beef-stew.md` (fixed 2026-09-24: smoked paprika listed (optional); flavour enhancers go in with the stock; typos; cremini; alongside; classic-style)
    - Q: the enhancers now go in with the stock. Right?
    - Q: 30 min at high pressure for 4 cm chuck cubes is on the short side (35–45 min is typical for spoon-tender). Tested?
- [x] `recipes/beef-stock.md` (fixed 2026-09-24: converted to FORMAT.md; tomato paste brushed on the bones halfway through the roast to brown in their fat; "side cut" kept, shallot and garlic roasted with the veg; neck; fond; left over; vegetable oil; cooling note; Equipment)
- [x] `recipes/beef-stroganoff.md` (fixed 2026-09-24: vinegar 1–2 tbsp; fancy tenderloin path spelled out; stock and butter per version; converted to FORMAT.md; "Authentic (1950s style)" kept: true to the common 1950s version, not the Russian original)
- [x] `recipes/beetroot-and-chickpea-hummus.md` (fixed 2026-09-24: roasting oil covered by the olive oil line; unit spacing)
- [x] `recipes/beetroot-dip.md` (fixed 2026-09-24: chickpeas "drained"; unit spacing)
- [x] `recipes/bienenstich.md` (fixed 2026-09-24: milk into batter; topping completed; filling named; typos; converted to FORMAT.md; blockquote kept per open question 3)
- [x] `recipes/boerenkool-stamppot-aka-green-potatoes-aka-boerenkool-met-worst.md` (fixed 2026-09-24: converted to FORMAT.md; bay in the cooking water, ¼ tsp nutmeg in the mash; rookworst throughout and marked optional; oil and cooking-water salt listed; trailing space; aka case; farmer's; caulipots as a variation; 6–8 L (6–8 qt); `aka: brittacole` kept, a family nickname anglicized from boerenkool)
- [x] `recipes/braised-red-cabbage.md` (fixed 2026-09-24: split word rejoined; sausage; German; metric first; 80 ml / 60 ml)
- [x] `recipes/breakfast-sausage.md` (merged 2026-09-24: breakfast-style-sausage.md's formula and method as the main recipe, the sage-forward mix as a variation; toasting fixed; 68°C; typos)
- [x] `recipes/breakfast-style-sausage.md` (merged into breakfast-sausage.md 2026-09-24; redirects)
- [x] `recipes/bruces-burger-sauce.md` (fixed 2026-09-24: ½ glyph; trailing spaces)
- [x] `recipes/bruces-cold-brewed-iced-tea.md` (fixed 2026-09-24: converted to FORMAT.md; fridge steep only; title hyphenated)
- [x] `recipes/bruces-iced-tea.md` (fixed 2026-09-24: converted to FORMAT.md; intro rewritten; salt goes in with the sugar; farmers' market; peach note to Notes)
- [x] `recipes/bruces-poultry-and-pork-spice-rub.md` (Google links fixed 2026-09-24; yield corrected to ~775 g, the sum of the ingredients; smoky notes credited to Tellicherry pepper; unit spacing)
- [x] `recipes/bruces-quick-fried-black-beans.md` (fixed 2026-09-24: converted to FORMAT.md; cumin 1–2 tsp, bloomed with the garlic and chilies; 540 ml (19 oz) can; ranges; tag `sides`)
- [x] `recipes/bruces-thai-redgreen-curry.md` (fixed 2026-09-24: coconut milk added; method rewritten in order; makrut; typos; converted to FORMAT.md; mirepoix note reworded: Thai curries sweat down the paste instead, so the mirepoix is optional)
- [x] `recipes/bulgogi-beef.md` (fixed 2026-09-24: sliced and ground methods drafted; MSG ½ tsp; converted to FORMAT.md)
- [x] `recipes/butter-chicken.md` (fixed 2026-09-24: temper off the heat, then warm gently without boiling; naan unlinked; takeout; wiki links (gravy, ginger/garlic paste); `#### To finish`; garam masala; sugar to taste with the almond powder, TODO removed)
- [x] `recipes/butter-tarts.md` (fixed 2026-09-24: ice water in pastry; baking powder kept; case and units; converted to FORMAT.md; ¼ cup maple syrup in the filling, with a Mechanic line)
- [x] `recipes/butternut-squash-curry.md` (fixed 2026-09-24: 140 g spinach per the source; soy sauce default; pan-browned; units)
- [x] `recipes/butternut-squash-soup.md` (fixed 2026-09-24: vegetable stock; vegan note skips the crème fraîche)
- [x] `recipes/caesar-dressing.md` (fixed 2026-09-24: raw egg note; `vegetarian` tag dropped; oil ½–¾ cup)
- [x] `recipes/canadian-chili.md` (fixed 2026-09-24: converted to FORMAT.md; shiitakes soaked and cooked with the mushrooms; corn, tomatoes, and roasted garlic go in with the beans; cilantro at the end; beef/TVP listed once as optional; Mechanic added on the mushroom layers; American South; toasted cinnamon stick; spice paste variation as prose; "ground beast" kept, glossed as any ground meat; shiitake water goes in with the stock unless gritty; `cook_time: 60–90 min`, ~25 with a [[Beef base]] shortcut)
- [x] `recipes/candied-cranberries-sugared-cranberries.md` (fixed 2026-09-24: converted to FORMAT.md; `source` is Our Best Bites; potluck story moved into a family blockquote (trimmed); promotional line trimmed; 340 g (12 oz); case; roller derby; sugar amounts estimated and confirmed)
- [x] `recipes/candied-pecans.md` (fixed 2026-09-24: converted to FORMAT.md; case; 110°C (225°F); "before dinner")
- [x] `recipes/carrot-cake.md` (fixed 2026-09-24: "stays in the family" removed; serve at room temperature; refrigerate once iced; typos; ½ tsp lemon zest in the icing, per the author: a hint of lemon, light vanilla; icing quantity assumed enough, author to recheck)
- [x] `recipes/chai.md` (fixed 2026-09-24: fall; allspice variation keeps the cardamom; `###` variations; unit spacing)
- [x] `recipes/char-siu-marinade.md` (fixed 2026-09-24: leftover marinade boiled before glazing; glaze reduced while the meat roasts (Mechanic and method agree); 5-minute rest as the hold for white meat; ginger/garlic paste link; food colouring 2–4 ml per batch, outside the ratio)
- [x] `recipes/chashu-pork.md` (merged 2026-09-24: basic-ramen-tare.md's sake oven braise as a variation; tare use and storage notes)
- [x] `recipes/cheddar-herb-biscuits-or-savoury-scones.md` (fixed 2026-09-24: converted to FORMAT.md; stray "`werty" removed; buttermilk in the whisk step; case; favourite; closed paren; 230°C (450°F); ½ tsp baking soda restored)
- [x] `recipes/chef-johns-hamburger-buns.md` (fixed 2026-09-24: 40°C (104°F); typos; salt in egg wash; converted to FORMAT.md; cryptic notes left as-is, per the author)
- [x] `recipes/chicken-or-turkey-stock.md` (fixed 2026-09-24: converted to FORMAT.md; "or roughly"; consommé; left over; roast bones and veg; vegetable oil; add-ins marked optional; Equipment)
- [x] ! `recipes/chicken-patties.md` (fixed 2026-09-24: split into fillet and patty components; ground seasoning salt 2.5% → 1.5% (drifted in testing; the worksheet's 1.25% was good); fillets to 68°C, patties to 70°C (thin-poultry rule); sandwiches; tenderizes)
    - Brine (50% white vinegar, 10% salt): author will retest; it should roughly match a typical pickling liquid.
    - Ground patty formula synced to the worksheet 2026-09-24 (6% water, 0.125% baking soda, sugar 0.625%, pepper and garlic by weight), matching the weeknight reference page. Sage, onion powder, and shallot kept as optional.
- [x] `recipes/chicken-yakisoba.md` (fixed 2026-09-24: converted to prose; stir-fry; ½; chicken to 68°C; `####` labels; bean sprouts 100 g (1 cup), as in the source)
- [x] `recipes/chocolate-chip-cookie-for-one.md` (fixed 2026-09-24: converted to FORMAT.md; decadently; Savvy Cookbook in `source`; doneness cue; 175°C (350°F))
- [x] `recipes/classic-french-dressing.md` (fixed 2026-09-24: `vegan` tag dropped, vegan Worcestershire noted; servings)
- [x] `recipes/classic-pizza-sauce.md` (fixed 2026-09-24: converted to FORMAT.md; granulated garlic with the oregano; balsamic and butter at the end; herbs once; quick sauce as a variation; comma; 796 ml)
- [x] `recipes/coconut-jam-tarts.md` (fixed 2026-09-24: ice water in pastry; 1 tsp jam each; servings; converted to FORMAT.md)
- [x] `recipes/coconut-lentils.md` (fixed 2026-09-24: green/brown lentil time; `cuisine: Indian` to match the tag; "after blending" dropped; unit spacing; `####` label; blend, mash, or leave as is, to taste)
- [x] `recipes/corn-salsa.md` (fixed 2026-09-25: converted to FORMAT.md; smoked paprika listed as optional and added with the salt and pepper; typos; Rempels'; lower-case ingredients, Parmesan; 55 g (2 oz) cotija; garnish as a `####` label; `source: family` (a family recipe, per the author; the RecipeTin Eats credit dropped))
- [x] `recipes/cottage-pie.md` (fixed 2026-09-25: split into topping / filling / assembly; `[[Beef base]]` folded into the ingredient line, Variation dropped; reheat note rewritten; BtB spelled out; unit spacing; `aka: Shepherd's pie` kept as a search alias; browning sauce tested, [draft] note removed)
- [x] `recipes/creamy-roasted-red-pepper-soup.md` (fixed 2026-09-25: converted to FORMAT.md; cremini; coconut milk listed as a tin, cream used, rest reserved for thinning; oven heat-up and roast cue; 1 tsp smoked paprika as the default spice, others in the Notes)
- [x] `recipes/creme-brulee.md` (fixed 2026-09-25: converted to FORMAT.md; cream, not milk; one day; 165°C (325°F); doneness cue; custards stored un-torched and caramelized just before serving; variations as `###` prose; "less sweet" moved to Notes; lower case; Equipment added; `total_time`)
- [x] `recipes/crisp-topping.md` (fixed 2026-09-25: bottom-and-top method now says 1½–2 batches, half pressed in as the base; salt halved to 2.5 g (½ tsp), matching the last test; unit spacing)
- [x] `recipes/crispy-chicken-rub.md` (fixed 2026-09-25: typo; `[[Roast poultry]]`; 5–10 minute rest as the hold for 65°C breasts; Notes as bullets; unit spacing)
- [x] `recipes/curry-powders-and-related-spice-mixes.md` (fixed 2026-09-25: converted to FORMAT.md with one `##` per mix, garam masala first since the base mix uses it; garam masala method drafted and confirmed; Ceylon cinnamon plus cassia; duplicate cardamom line merged into 2 tbsp green cardamom seeds; "toast very lightly" given a pan and heat; Supreme Bassar is the brand; quick ginger/garlic paste kept, linked to `[[Ginger/garlic paste]]`)
- [x] `recipes/dairy-free-tomato-soup.md` (fixed 2026-09-25: converted to FORMAT.md; "Dairy-free"; butter → vegan butter (optional), stirred in at the end with the basil; `dairy-free` tag; 796 ml (28 oz) can; Dutch oven; sauté; Old World; meta line dropped)
- [x] `recipes/dal-tadka.md` (fixed 2026-09-25: split into dal / tadka components; Vice notes moved out of the method into an "Onion-first dal" variation with the link; cloves and fenugreek added to the tadka step; ratio bolded; dhungar; stray rule removed; split-pea timing and coconut-dal spices left as written, per the author)
- [x] `recipes/double-chocolate-banana-bread.md` (fixed 2026-09-25: converted to FORMAT.md; `source` is the Smitten Kitchen URL; intro rewritten; typos; 23×13 cm (9×5 in); 175°C (350°F); lower case; cinnamon marked optional; storage in Notes)
- [x] `recipes/egg-roll-bowls.md` (fixed 2026-09-25: prose method; ¼, ½)
- [x] `recipes/english-muffins.md` (fixed 2026-09-24: truncated steps finished; cornmeal, doneness check, yield; converted to FORMAT.md; "still tuning" note kept, per open question 5)
- [x] `recipes/essence-of-cola.md` (fixed 2026-09-25: alcohol added with the vanilla, marked optional; gum arabic whisked into a little warm syrup first; unit spacing)
- [x] `recipes/fajita-chicken-bowl.md` (fixed 2026-09-24: components as `##` sections; 68°C; corn oil, garlic, and fresh chili listed)
- [x] `recipes/farmer-soup.md` (fixed 2026-09-25: converted to FORMAT.md; ABC Country Restaurants; herbes de Provence; cornstarch; sauté; bite-size; bring back to a simmer after the slurry; thickener as a `####` label; "work in progress" kept, per open question 5)
- [x] `recipes/flatbread-white-sauce.md` (fixed 2026-09-25: America's Test Kitchen; unit spacing; dip use leaves out the raw yolks)
- [x] `recipes/focaccia.md` (fixed 2026-09-25: olive oil in the pans and drizzled over the top as you dimple, per the author; Mechanic says so; oven heated during the final rise; brine step placed in the method; `[[Pizza dough]]`; `####` labels; `servings: 2–10 (people)` restored, with the new `portions: 2–3 sheet pans`)
- [x] `recipes/french-onion-soup.md` (fixed 2026-09-25: converted to FORMAT.md as soup / crusty bread / assembly; 2 tbsp each butter and olive oil, more if the onions stick; herbs removed by stem, not "dried"; deglaze with the sherry; pressure cooker note covers the onion phase only; Mechanic is now the fond, sources moved to the intro; `[[Rich veg/mushroom stock]]`; Gruyère; Dutch oven; Joshua Weissman; suc; 220°C (425°F); ½ cup)
- [x] `recipes/fresh-egg-pasta.md` (fixed 2026-09-24: salt 3 g, about 1%)
- [x] `recipes/fruit-compote.md` (fixed 2026-09-25: unit spacing)
- [x] `recipes/fruit-crisp-individual.md` (fixed 2026-09-25: `&nbsp;` hack removed, the crisp-topping pointer is now a Notes bullet; `####` labels; unit spacing)
- [x] `recipes/garlic-broccoli.md` (fixed 2026-09-25: broccoli; vegetable stock listed first so the `vegan` tag holds; non-stick; `## Equipment`; `[[Weeknight ginger beef]]`; sensory cue before time)
- [x] `recipes/garlic-ginger-wing-sauce.md` (fixed 2026-09-25: savoury; `####` label; unit spacing; `cuisine: American` kept, since wings are the American dish and the tags name the flavour sources)
- [x] `recipes/german-platz.md` (fixed 2026-09-25: converted to FORMAT.md; bake time 25–35 min with a skewer cue; crumble butter cold, rubbed in (both confirmed); 2.5 cm (1 in) pan; 175°C (350°F); oven heated first; fruit and flour notes moved to Notes; linked to `[[The smells of India]]`, same neighbours)
- [x] `recipes/ginas-tomato-salsa.md` (fixed 2026-09-24: converted to FORMAT.md; keeps 5–7 days; Roma/Anaheim; second lime clarified; 2026-09-25: Gina's Mexican Café named in the intro)
- [x] `recipes/gingergarlic-paste.md` (fixed 2026-09-25: converted to FORMAT.md; cooking step (fry the paste until the sizzle dies away), confirmed; oil listed once, "plus more as needed"; South Asian; takeaway-style; 1 cup ginger is about 150 g; Notes moved to the end)
- [x] `recipes/gochujang-wing-sauce.md` (fixed 2026-09-25: unit spacing; en-dash range)
- [x] `recipes/goulash.md` (fixed 2026-09-24: Mechanic wording; bacon line; empty bullet; food-log prep-day version added as a variation)
- [x] `recipes/grand-moms-black-bean-corn-salsa.md` (fixed 2026-09-25: converted to FORMAT.md; 398 ml (14 oz) can; 1 tsp salt, to taste; avocado added just before serving; optional markers)
- [x] `recipes/grandma-fergusons-buns.md` (fixed 2026-09-24: yeast added to the dough; grams; bake time and cue; converted to FORMAT.md)
- [x] `recipes/grandmas-potato-salad.md` (fixed 2026-09-25: converted to FORMAT.md; eggs chopped and added with the potatoes; drain and cool; chill once; Hellmann's; bite-size)
- [x] `recipes/grandmas-yukkie-salad.md` (fixed 2026-09-25: converted to FORMAT.md; half the Cool Whip in the lemon layer, the rest in the strawberry; Jell-O throughout; ambrosia-style; water split per layer)
- [x] `recipes/granola-bars.md` (fixed 2026-09-25: intro says refined carbs (flour, sugar, binders); stale note deleted; unit spacing)
- [x] `recipes/greek-islands-creamy-greek-dressing.md` (fixed 2026-09-24: real intro; converted to FORMAT.md; title "Greek Islands'"; egg yolks optional with raw-yolk note; typos)
- [x] `recipes/greek-lemon-and-herb-marinade.md` (fixed 2026-09-25: converted to FORMAT.md; 2 lemons ≈ 100 ml; salt sized for a large cut, 2–2½ tsp per kg, `portions: enough for about 2 kg protein`; shallot; whisk; Accent; Greek fried rice; over-marinate; finishing sauce; balance note moved into the method; cross-linked with Greek marinade)
- [x] `recipes/greek-marinade.md` (fixed 2026-09-25: Mechanic states the lemon note plainly, duplicate Notes line dropped; cross-linked with the herb version (both kept per open question 4); extra-virgin; unit spacing)
- [x] `recipes/gurkensalat-german-cucumber-salad.md` (fixed 2026-09-25: converted to FORMAT.md; advice paragraphs moved to `servings`, Substitutions, and Notes; salt at least 30 minutes, or as long as the rest of the prep takes; dressing-salt fragment rewritten; typos; 40s; lower-case ingredients)
- [x] `recipes/gyro-base.md` (fixed 2026-09-24: typo; thaw-before-cooking contradiction; "still")
- [x] `recipes/gyro-dogs.md` (fixed 2026-09-25: components as dogs / glaze / garlic sauce / grill and assemble; 1 batch `[[Gyro base]]` (about 1 kg), 8 × ~125 g; buns listed; grilled to 71°C (160°F); Mechanic links to the base instead of repeating it; "inspired by"; comma splice)
- [x] `recipes/hoagie-rolls.md` (merged 2026-09-24: family tips from hoagie-style-french-rolls.md folded in; converted to FORMAT.md)
- [x] `recipes/hoagie-style-french-rolls.md` (merged into hoagie-rolls.md 2026-09-24; redirects)
- [x] `recipes/homemade-baileys-irish-cream.md` (fixed 2026-09-25: sentence-case title; em-dashes removed; yield moved to `portions`; swaps as Substitutions, spiced and orange as Variations; condensed milk can 300 ml (14 oz), since 14 oz is a weight; untested note removed (tested, per the author))
- [x] `recipes/hot-buffalo-chicken-dip.md` (fixed 2026-09-25: converted to FORMAT.md; metric first (250 g (8 oz), 20 cm (8 in), 190°C (375°F), 1 L (1 qt)); commas before prep notes; both cheddars; blue cheese marked optional; Frank's RedHot Original; family blockquote kept)
- [x] `recipes/hot-crab-artichoke-dip.md` (fixed 2026-09-25: converted to FORMAT.md; 120 g crab can, 398 ml (14 oz) artichokes; Miracle Whip; lower-case ingredients, Parmesan; 175°C (350°F); To serve added (crackers, baguette, chips))
- [x] `recipes/hot-ranch-spinach-and-artichoke-dip.md` (fixed 2026-09-25: converted to FORMAT.md; 175°C (350°F); spinach 300 g (10 oz), squeezed dry; 398 ml (14 oz) can; Parmesan)
- [x] `recipes/in-n-out-burger-spread.md` (fixed 2026-09-25: diner-style; ½ and ¼ glyphs (1/32 kept, no glyph); yield moved to `portions`)
- [x] `recipes/indian-takeout-tomato-puree.md` (fixed 2026-09-25: converted to FORMAT.md; `[[Ginger/garlic paste]]` link; water halved to 250 ml and cooked 20–30 min until near paste (the author: both); teaspoons/tablespoon; hyphens; spacing; renamed from `indian-takeout-tomato-purée.md`, old URL redirects via `aliases`)
- [x] `recipes/instant-pot-chicken-thigh-curry.md` (fixed 2026-09-25: em-dashes removed; serving garnishes moved to To serve; unit spacing; "needs testing" removed (tested))
- [x] `recipes/jerk-chicken.md` (merged 2026-09-24: now includes jerk-marinade.md (Jamaican cooking-class paste) and the Serious Eats notes as variations)
- [x] `recipes/jerk-marinade.md` (merged into jerk-chicken.md 2026-09-24; redirects)
- [x] `recipes/kalua-pig-cabbage.md` (fixed 2026-09-25: prose method; ¾ head; pork shoulder (butt); rice in To serve; cross-linked to `[[Maui/Kalua pulled pork]]`; renamed from `kālua-pig-cabbage.md`, old URL redirects via `aliases`)
- [x] `recipes/kormaqorma.md` (fixed 2026-09-24: method drafted (slow-fried onion paste), linked to base gravy; converted to FORMAT.md)
- [x] `recipes/lazy-pizza-dough-2022.md` (fixed 2026-09-24: "MF" softened; % column recomputed from the weights (70% water); 350 g focaccia + 3 × 250 g pizzas; temperatures rounded; typos; converted to FORMAT.md)
- [x] `recipes/lemon-chicken-marinade.md` (fixed 2026-09-25: MSG line corrected (rounds out savouriness so you can use less salt); extra-virgin; marinade size moved to `portions`; unit spacing)
- [x] `recipes/lemon-lime-iced-tea.md` (fixed 2026-09-25: teaspoons; spring and summer; American; 400 ml tea to fit a pint shaker with headroom (or two pint glasses); dashes → 15 ml lime, 10 ml lemon; variations as `###` prose)
- [x] `recipes/lemongrass-marinade.md` (fixed 2026-09-25: converted to FORMAT.md; marinate; large slices sentence rewritten; finely minced; Thai chili; yield moved to `portions`; salt listed)
- [x] `recipes/lentil-stew.md` (fixed 2026-09-25: converted to FORMAT.md; 2 tbsp tomato paste listed; water topped up one knuckle above the rice; sugar to taste (the ¼ cup was format drift); broiler note is about browning the peppers; pressure and stovetop paths in one step; Anaheim; sauté; add-ins as a `####` label; testing note removed)
- [x] `recipes/lentil-tacos.md` (fixed 2026-09-25: 1 tbsp neutral oil listed; green or brown lentils (yellow fall apart); "hearty, frugal filling"; Anaheim; sensory cues; unit spacing)
- [x] `recipes/lime-crema.md` (fixed 2026-09-25: fresh-tasting; yield moved to `portions`; unit spacing)
- [x] `recipes/marinara-sauce.md` (fixed 2026-09-25: converted to FORMAT.md; deglazing liquid and sugar listed (optional); butter stirred in off the heat at the end; onion and garlic minced, not shredded; medium-low; Italian; fire-roasted; Canadian can sizes (796 ml, 398 ml))
- [x] `recipes/marinated-pressed-tofu.md` (fixed 2026-09-25: `cuisine: Chinese` (dong doufu technique), tagged both `chinese` and `japanese` (usually cooked Japanese-style); preserve; "at least 48 hours"; servings spacing; 200°C (400°F); [draft] note removed)
- [x] `recipes/marshmallow-squares.md` (fixed 2026-09-25: converted to FORMAT.md; "stir until melted"; 23 × 33 cm (9 × 13 in) pan; your; medium-low; lower-case ingredients with metric; backstory moved into a family blockquote; add-ins marked optional)
- [x] `recipes/mauikalua-pulled-pork.md` (fixed 2026-09-25: converted to FORMAT.md as pork / sauce components; `[[Bruce's poultry and pork spice rub]]`; liquid smoke; alaea salt; foil moved to Equipment; sauce after the cook; 165°C (325°F), 120°C (250°F); 55 g (¼ cup) butter; Dutch oven; 5–10 cm (2–4 in); other cookers as a variation (pressure cooker about 50 minutes); 355 ml pineapple can noted as an alternative; sources labelled; cross-linked to `[[Kālua pig & cabbage]]`)
- [x] `recipes/mayo-marinade.md` (fixed 2026-09-24: safety, Mechanic, typos, Kenji note; dropped the `mediterranean` tag)
- [x] `recipes/mcburgers.md` (merged into mcdouble.md 2026-09-24; redirects)
- [x] `recipes/mcdouble.md` (merged 2026-09-24: McBurgers as the single-hamburger variation; 4:2:1 seasoning; converted to FORMAT.md)
- [x] `recipes/meat-sauce-aka-american-bolognese.md` (fixed 2026-09-24: 1 tbsp tomato paste; [[Beef base]] link; herbs named; converted to FORMAT.md)
- [x] `recipes/meatballs.md` (fixed 2026-09-25: `dairy-free` tag dropped; bake to 71°C (160°F) in the centre; promotional intro rewritten; Asian-style soy cut from 6.5% to 1.5%; yield moved to `portions`, `servings: 6–12` at 3–5 meatballs each; unit spacing)
- [x] `recipes/minestrone.md` (fixed 2026-09-25: Base/Soup as `####` labels; summer or fall; Bragg Liquid Aminos; 110 g (⅔ cup) pasta)
- [x] `recipes/miso-salmon.md` (fixed 2026-09-25: bake time about 8–10 minutes; unit spacing (green onions were already fixed))
- [x] `recipes/mushroom-and-lentil-freezer-base.md` (fixed 2026-09-25: volume conversions (1½ cups lentils, 1¾–2 cups sofrito); lentils finish cooking in the final dish; 2 tbsp tomato paste listed; cremini; quoted note rewritten; `[[Beef base]]` link)
- [x] `recipes/mushroom-parmesan-pasta-filling.md` (fixed 2026-09-25: converted to FORMAT.md; tags `pasta, bases` (matching spinach pecan filling); butter listed; fond sentence; thyme and porcini named in the method; Parmesan (title too); ragù; ½; punctuation and spacing)
- [x] `recipes/mushroom-soup.md` (fixed 2026-09-25: split into base / velouté / potage components; olive oil for the dairy-free potage; vegetable broth as the default; `cuisine: French`)
- [x] `recipes/naan.md` (fixed 2026-09-25: butter or ghee, garlic, and herbs for finishing listed under a `#### To finish` label; `servings: 4–6`, `portions: about 11 naan`; unit spacing)
- [x] `recipes/neapolitan-strips.md` (fixed 2026-09-25: converted to FORMAT.md; walnuts go in the vanilla layer; firm; wrap the log; box lined once; 28 g (1 square) chocolate; 6 mm (¼ in); 190°C (375°F) moved to just before baking; favourite; lower case)
- [x] `recipes/never-fail-chocolate-cake.md` (fixed 2026-09-25: skewer test dropped (bake to touch); ratio restated as the actual 1:3.6 (75 g : 270 g); sour-milk substitute rewritten; 23 cm (9 in) and 23 × 33 cm (9 × 13 in) pans; fraction glyphs; variations as `###`; Notes as bullets)
- [x] `recipes/nine-bean-soup-mix.md` (fixed 2026-09-25: converted to FORMAT.md; sausage/turkey/bacon goes in with the aromatics; ham hock or bone, meat shredded back in; ½ cup each (4½ cups) or a store-bought mix; soak moved to the method; 2 L (2 qt); 796 ml (28 oz) can; "bones" dropped; intro added, the cookbook note kept as a blockquote)
- [x] `recipes/no-knead-pizza-dough.md` (fixed 2026-09-24: rise, fridge, and shaping steps drafted; converted to FORMAT.md; title hyphenated)
- [x] `recipes/nut-crusted-salmon.md` (fixed 2026-09-25: `dairy-free` tag dropped; Parmesan; `####` labels; unit spacing)
- [x] `recipes/oliebollen.md` (fixed 2026-09-25: converted to FORMAT.md; retitled Oliebollen, renamed `oliebollen.md` (old URL redirects); milk; apples, raisins, and cinnamon folded in; frying oil no longer optional; fry 4–6 minutes, turning once; 10–12 cm (4–5 in) oil at 160–175°C (325–350°F); yield to `portions`; thick, scoopable batter; airtight)
- [x] `recipes/omas-kipfels.md` (fixed 2026-09-24: yeast proofed in milk with the ¼ cup sugar; salt listed; 4½ tsp yeast; converted to FORMAT.md)
- [x] `recipes/onion-base-for-curries.md` (fixed 2026-09-25: converted to FORMAT.md; 2–3 tbsp ghee or oil listed; 2 pieces cinnamon bark (about 5 cm each); `[[Base curry gravy]]` and `[[Ginger/garlic paste]]` links; `####` spice label)
- [x] `recipes/onion-bhaji.md` (fixed 2026-09-25: Mechanic and Notes agree (extra flour first, squeeze the onions only if still loose); test note dropped; `servings: 4–6`; served; two-stage fry as a `###` variation; unit spacing)
- [x] `recipes/our-favourite-chocolate-chip-cookies.md` (fixed 2026-09-25: converted to FORMAT.md; lower case throughout; 454 g (2 cups / 4 sticks) butter; `portions: about 2–3 dozen`; 175°C (350°F); storage to Notes)
- [x] `recipes/oven-roasted-corn.md` (fixed 2026-09-25: converted to FORMAT.md; Oven-roasted; not extra-virgin; halfway; 220°C (425°F); shucked; closing tip moved into the intro)
- [x] `recipes/pad-kra-pao-moo-saap.md` (fixed 2026-09-25: comma splices; method as prose; sensory cue before time; en-dash ranges)
- [x] `recipes/pan-fried-chicken-burger.md` (fixed 2026-09-24: safety, spelling, units; spreadsheet link moved to an HTML comment; panko aside became a variation)
- [x] `recipes/panago-style-jalapeno-cheese-dip.md` (fixed 2026-09-25: Panago-style; renamed to an ASCII slug (old URL redirects); Cheez Whiz; colon; New York-style; converted to FORMAT.md)
- [x] `recipes/pancakes-and-waffles.md` (fixed 2026-09-25: Mechanic softened (double-acting powder loses only some lift); waffle-iron note; all-purpose; unit spacing)
- [x] `recipes/paska-buns.md` (fixed 2026-09-24: converted to FORMAT.md; frosted buns refrigerated; 5-minute yeast bloom; metric oven and cream cheese; icing sugar; European; 2026-09-25: yield moved to `portions`; blockquote spacing; `source: family` kept, origin unknown (likely a book or TV show from the early 2000s))
- [x] `recipes/peach-fruit-crisp.md` (fixed 2026-09-25: cornstarch brought to a simmer; salt fixed at ¼ tsp filling, ½ tsp crumble, history notes dropped; Peach (or any fruit) crisp; unit spacing)
- [x] `recipes/peanut-butter-nanaimo-bars.md` (fixed 2026-09-25: converted to FORMAT.md as base / filling / glaze; `source: family` (checked against a Food Network version); filling step rewritten; 20 cm (8 in) pan; 115 g (4 oz); 2–3 cm water; icing sugar; lower case; heading colons)
- [x] `recipes/peanut-sauce.md`
- [x] `recipes/perogies.md` (fixed 2026-09-25: converted to FORMAT.md as dough / filling / assembly; rolling, cutting, filling, sealing, and boiling drafted (3 mm, 7–8 cm rounds, 1 tbsp, float + 2 min, fry in butter); 2.3 kg (5 lb); 250 g cream cheese; other fillings as a variation; dough is wet as written, onions boiled with the potatoes, `source: family` kept)
- [x] `recipes/pizza-dough-2021-edition.md` (fixed 2026-09-25: converted to FORMAT.md; malt-powder run-on merged into the Mechanic; 00-flour note moved there too; 175°C (350°F), 220°C (425°F); cornmeal; proof; yield to `portions`; 10 g malt kept, as used that year)
- [x] `recipes/pizza-dough-2022-edition.md` (fixed 2026-09-25: 7 g yeast is ~2¼ tsp; leftovers sentence; ciabatta parenthetical dropped, lower case; method as prose; 230°C (450°F); °C/°F throughout; yield to `portions`)
- [x] `recipes/pizza-dough.md` (fixed 2026-09-24: 990 g flour + 10 g gluten keeps 70% hydration; adopted the 2023 test (1.5% yeast, 200 g balls); yeast now added in the method; doneness cue)
- [x] `recipes/pizzeria-pizza-sauce.md` (fixed 2026-09-25: passata; `[[Quick pizza sauce]]`; salt and sugar listed at 10 g, note dropped; 6 g garlic is 2 tsp, start as written and adjust up; unit spacing)
- [x] ! `recipes/pork-dumpling-bowls.md`
    - Fractions "3/4", "1/2", "1/4" → glyphs. "scallions" → "green onions". L14: "highly rated" is promotional and about the source's reviews; drop.
- [x] ! `recipes/potato-leek-and-mushroom-soup.md` (Google links fixed 2026-09-24)
    - Butter for the mushrooms (L45) isn't listed (the 2 tbsp is for the leeks). L45: extra spaces in "Melt the     butter".
    - L9: "Serious Eat’s" → "Serious Eats’"; "John’s" → "Chef John’s". L43: "sautéd" → "sautéed". L38: "over blend" → "over-blend". L18: "1 ½ cup" → "cups". L25: "1 bag of mushrooms" → weight (~225 g).
- [x] ! `recipes/pressure-cooker-japanese-curry.md`
    - Two em-dashes (L48, L58). L24, L56: "Yukon gold" → "Yukon Gold".
    - Otherwise clean. (The food log's "Japanese curry #todo" can be ticked off.)
- [x] `recipes/prosecco-sangria.md` (fixed 2026-09-24: Prosecco topping added; 2-hour chill; converted to FORMAT.md)
- [x] ! `recipes/pulled-bbq-style-chicken.md` (Google links fixed 2026-09-24)
    - Tag `pork` is wrong → `poultry`.
    - L21: the rub step mentions salt, which isn't listed. L17: "1 teaspoons" → "1 teaspoon"; L19: "1.5 teaspoon" → "teaspoons".
    - Q: at 70°C, thighs and breasts are safe but won't shred easily; pulled chicken usually goes to ~80–85°C for thighs. Intended?
    - Title: "Pulled BBQ style" → "Pulled BBQ-style". L36: "dutch oven" → "Dutch oven"; L38 stray space before comma.
- [x] ! `recipes/pulled-pork.md`
    - Unfinished: `servings: TBD`, `total_time: TBD`, and a "[draft] Untested" note, while `draft: false`.
    - L23: "1 pork shoulders", while the rub line and method refer to shoulders plural. Give a weight (e.g. 1 boneless shoulder, 2–3 kg).
    - Q: 45–60 min at high pressure plus 20 min natural release is short for pull-apart shoulder (75–90 min is typical for a whole one). Tested?
    - Salt and pepper for the sauce (step 4) aren't listed. L22: `[[Bruce's Poultry and Pork Spice Rub]]` → sentence case.
- [x] ! `recipes/quick-crispy-wings.md` (Google links fixed 2026-09-24)
    - Missing step: the hot sauce (Frank's, butter, rub, herbs) is listed but never used. Add "Toss the baked wings in the sauce".
    - Timing contradicts: step 3 is 20–30 min, flip, then another 20–30 (40–60 total), but `cook_time` says 20–30.
    - L38: "preheat and oven" → "preheat the oven"; "219C (425F)" → "220°C (425°F)". L11: "5 birds worth" → "5 birds' worth". L41: comma splice.
- [x] ! `recipes/quick-hummus.md`
    - L14: "2x 3-4 cloves of garlic" is unclear. Q: 6–8 cloves total?
    - Step 1 reserves the cooking liquid "you may need some later", but it's never used again; Notes suggest olive oil to thin. Mention the liquid there too.
    - L16: "3 tablespoon" → "tablespoons". Steps 6–7: comma splices. Step 1 missing period. L9: "restaurant style" → "restaurant-style"; yield belongs in `servings`.
- [x] ! `recipes/quick-pizza-sauce.md`
    - L44: the "Canned tomato style" variation is incomplete (only the tomatoes and paste, no seasoning) and duplicates pizzeria-pizza-sauce.md. Link `[[Pizzeria pizza sauce]]` instead.
    - L50: "A bit sweet ... or less sugar" doesn't match this recipe (sugar is only "a pinch if needed"). It probably belongs to the variation.
    - No yield: 2 tbsp paste + water makes ~⅓ cup, about one pizza. Say so.
- [x] ! `recipes/ramen-eggs-ajitsuke-tamago.md`
    - L18: incorrect: "The eggs finish cooking in the marinade as they cool". They're shocked in ice water first and go into a cooled marinade, so they don't cook further. Drop the claim; the 7-minute time is the jammy result.
    - L46: reusing the marinade 2–3 times: bring it to a boil and cool before each reuse (it has held peeled eggs for days).
- [x] ! `recipes/ramen-noodles.md` (Google links fixed 2026-09-24)
    - L24: em-dash, and an open testing note ("consider testing some egg white"). Move it to Notes.
    - L16: "38% hydration": 145 g water over 400 g flour + gluten is ~36%. Minor.
    - L34: "noodlize" is jokey; fine in voice, but "cut into noodles" reads better in a recipe.
- [x] ! `recipes/red-thai-curry.md`
    - L22: "1/3" → "⅓". L34: "caramelised" → "caramelized".
    - Otherwise clean; strong Mechanic.
- [x] ! `recipes/rice-pudding.md`
    - `cuisine: Japanese` looks wrong for this rice pudding (vanilla, cinnamon, milk). Q: typo?
    - Q: the temperatures don't quite line up with the texture. Egg custards start to thicken around 70°C and curdle above ~80–85°C, so pulling at 65–70°C (L34) may leave it thin, and "above [70°C] the egg curdles" (L18) is too low. 71–75°C would be safer and still smooth.
    - L14: "icecream" → "ice cream". L25: "3¼ tablespoons sugar" is oddly precise (a scaled value?); "3 tablespoons" or 40 g.
- [x] ! `recipes/rich-vegmushroom-stock.md`
    - Contradiction: L11 says it "works best 2:3 (veg:water)", Notes (L50) say "At a ratio of 3:2".
    - The kombu is listed but never used in the method. Q: steeped after the simmer, like the ramen stock?
    - L9: "PhØ" → "pho" (or "phở"); "Ramen" → "ramen"; "Cooking With Glen’s" Q: the channel is "Glen & Friends Cooking".
    - L24: "shitake" → "shiitake"; L26: "5ml/1 teaspoons" → "1 teaspoon (5 ml)"; L29: "Veg oil" → "vegetable oil"; L45: "decompress" → "depressurize". L39: "### Directions:" → `## Method`.
- [x] `recipes/roast-poultry.md` (fixed 2026-09-24: breasts 65°C with the rest as the hold, 68°C boneless; "in pieces"; 220°C)
- [x] ! `recipes/rocky-road-brownies.md` (fixed 2026-09-24: meringue first; chocolate melted with butter; chips used; salt; bake time; metric; converted to FORMAT.md)
    - L9: very long backstory (open question 3).
- [x] `recipes/salsa-verde.md` (fixed 2026-09-24: converted to FORMAT.md; keeps 5–7 days; lime juice used in the blend)
- [x] `recipes/sandwich-sour-pickles.md`
- [x] ! `recipes/satay-marinade.md`
    - Missing step: the 1 tbsp salt is excluded from the blend (step 1) and never added. Q: rub it on the protein before the marinade (dry brine)?
    - No quantity of protein for this batch. Q: ~1 kg?
    - Step 3 "Cook protein until done" has no internal temperatures (pork/chicken/beef differ); link the doneness cheat sheet or list them.
    - L25: "juiced and zest" → "juiced and zested"; L27: "worcestershire" → "Worcestershire"; L40: "230C/450F" → "230°C (450°F)", "foil lined" → "foil-lined".
- [x] `recipes/sheet-pan-fast-food-style-gyros.md` (fixed 2026-09-24: now uses 1 batch [[Gyro base]]; 71°C; title hyphenated; converted to FORMAT.md)
- [x] ! `recipes/shredded-taco-chicken.md`
    - L30: "Marinade chicken" → "Marinate". L31: "excess marinate" → "excess marinade". L30: mismatched quotes around “ham“.
    - L36: "½-1cup" → "½–1 cup". Temps "75C-90C (170F-200F)", "200C/400F" → degree signs.
    - Otherwise the method is clear, and simmering the used marinade (step 4) is good.
- [x] ! `recipes/simple-chicken-pork-and-beef-gravy.md` (Google links fixed 2026-09-24)
    - Unit error: L9 "50mg roux to 250mg liquid" → "50 g roux to 250 ml liquid".
    - No quantities at all in the ingredient list. Add the 1:5 example as a base batch (25 g butter, 25 g flour, 250 ml stock + drippings).
    - L29: "pan dripping" → "pan drippings". L27: "## Notes:" colon.
- [x] ! `recipes/simple-chunky-salad-dressing.md`
    - L13: "Hellman's" → "Hellmann's"; L15: "Braggs" → "Bragg"; L15–16: "1-2 tablespoon", "2 tablespoon" → "tablespoons". L18: "coriander": ground or fresh?
    - L24: "Season to taste, but should balance..." has no subject → "It should balance...".
- [x] ! `recipes/simple-green-goddess-dressing.md`
    - L20: "dashi powder/msg" → "MSG". L9: "garlic forward" → "garlic-forward"; L13: "flat leaf" → "flat-leaf".
    - Notes (L33, L35) are test status; fine, but combine into one line.
- [x] ! `recipes/simple-marinara.md`
    - Tagged `vegan, dairy-free`, but the whole method depends on meat drippings (L18, L43). Drop `vegan`.
    - L14: "flat breads" → "flatbreads"; "as a quick and fresh pasta" → "a quick pasta sauce".
    - Q: the title "Simple marinara" undersells that it's a pan sauce from meat drippings; "Pan-drippings marinara"?
- [x] `recipes/simple-rice-bowls.md` (fixed 2026-09-24: converted to FORMAT.md; two example bowls split; chicken 68°C; Google Doc links → wiki links; rice is cooked)
- [x] ! `recipes/simple-shrimp-marinade.md`
    - No salt at all. Q: intentional?
    - No quantities for oil or shrimp: "Olive oil" → "2 tbsp olive oil"; add "for about 450 g shrimp".
    - L23: "Roasted jalapenos seeds in" → "Roasted jalapeños, seeds in". L15: "½ knob of ginger" → "1 tsp grated ginger".
- [x] ! `recipes/simple-sweet-pickled-veg.md`
    - L9 says it's for "beets, cabbage, and other hearty veg", but the method only covers beets. Add a line for raw veg (cabbage/carrot: no pre-cook, pour warm brine over).
    - L23: "1 bag of beets" → weight (~1 kg). L30: "cheese cloth" → "cheesecloth", "sauce pan" → "saucepan". L16, L25: double spaces.
    - The loose peppercorns and cloves vs the pickling spice in a bag (step 2) aren't clear. Say which go in the bag.
- [x] ! `recipes/simpler-thai-red-curry.md`
    - Ingredients never used: tomato paste (1½ tbsp) and the "savoury sauce" (miso/soy/sake). Salt is only implied.
    - L41: "219C (450F)". 219°C is 425°F; → "230°C (450°F)" or "220°C (425°F)".
    - L15–16: "2 can" → "2 cans", "2 cup" → "2 cups", "1 ½ tablespoon" → "tablespoons". L15: "non-emulsified coconut milk" Q: meaning no guar gum/stabilizers? Say that; it matters for splitting.
    - L39: "### Directions:" → `## Method`; L47: "## To serve:" colon.
    - Q: three Thai red curries now (this, red-thai-curry.md, bruces-thai-redgreen-curry.md). Consolidate?
- [x] ! `recipes/south-american-red-salsa.md` (fixed 2026-09-24: real intro; converted to FORMAT.md; comment anchor removed; typos; keeps 5–7 days)
    - Q: "South American" is vague. Is this a pebre (Chilean) or from a specific source? (Deferred 2026-09-24.)
- [x] ! `recipes/spaghetti-squash-boats-or-casserole.md`
    - No seasonings listed, though step 3 says "incorporate your seasonings". Q: what do you use (e.g. taco spice for the Mexican version, Italian herbs otherwise)?
    - Q: 30 minutes at 190°C is short for spaghetti squash halves (usually 40–50 min, until a fork shreds the strands easily). Add a doneness cue.
    - L10: "spagehetti" → "spaghetti". L17: "1 package" → weight (~450 g). Title Case ingredients. L29: "375 degrees F (190 C)" → "190°C (375°F)". L34–35: "Boats - fill" hyphen-dash → colon.
- [x] ! `recipes/spinach-dip.md`
    - L17: "Hellman's" → "Hellmann's"; L16–17: "1 ¼ cup" → "cups". Package and can sizes missing (Knorr packet, water chestnuts 227 ml, spinach 300 g).
    - L26: missing period; L27: double spaces. Title Case in the blockquote.
- [x] ! `recipes/spinach-mushroom-flatbread.md`
    - Missing temperature: step 2 "Preheat your oven with your flatbreads" never gives one. Q: 200°C (400°F)?
    - Formatting: the bullet sub-lists under steps 1 and 3 aren't indented, so the numbered list restarts and renders as separate lists.
    - L20: "criminis" → "cremini"; L14: "parmesan" → "Parmesan"; L15: "swiss" → "Swiss". L18: "## Topping:" sits at the same level as Ingredients; make it `####`.
- [x] ! `recipes/spinach-pecan-pasta-filling.md`
    - Error: step 1 fries "shallots" and adds "peppers", neither of which is in the ingredient list. Q: were these meant to be in the recipe (1 shallot, ½ red pepper?) or leftovers from the mushroom filling?
    - Q: "20g fresh or dried herbs". 20 g of dried herbs is about 10 tbsp, far too much. "5g black pepper" (~2 tsp) is also heavy for ~400 g filling. Check both.
    - Tag is wrong: `breads` → `bases` or `pasta`.
    - Step 1: "Fry nuts, shallots and garlic until translucent" (nuts don't go translucent). Toast the nuts first, then soften the shallot and garlic.
    - L9: "ragu" → "ragù"; L17: "parmesan" → "Parmesan"; L29: double period and double space.
- [x] `recipes/strawberry-rhubarb-compote.md`
- [x] ! `recipes/stuffed-mushroom-caps.md` (fixed 2026-09-24: 190°C (375°F); instructions out of the ingredient list; converted to FORMAT.md)
    - Backstory blockquote (open question 3).
- [x] ! `recipes/sweet-gochujang-sauce.md`
    - L9: the intro is copied word for word from thai-style-chilli-lime-sauce.md ("This is a vibrant, and tasty sauce for wings, chicken sandwiches, noodles, and tofu..."). Give each its own line; also drop the comma after "vibrant".
    - L20: "5 spice" → "five-spice". L19: "1-2 teaspoons ground ginger (or equivalent minced)": ground and fresh aren't equivalent by volume; "1–2 tsp ground ginger or 1 tbsp fresh".
    - Q: overlaps with gochujang-wing-sauce.md (cooked vs uncooked). Cross-link at least.
- [x] ! `recipes/sweet-potato-pie.md`
    - Imperial and odd units: "1 lb & 3 oz" → "540 g (1 lb 3 oz)"; "1 9in Deep Dish" → "one 23 cm (9 in) deep-dish"; "350 degrees F (175 C)" → "175°C (350°F)". L15: "¾ cups" → "¾ cup".
    - Step 7: no doneness cue for 50–55 min: "until the centre is just set with a slight wobble".
    - L9: source is Alton Brown on Food Network; put it in `source:` (currently `family`). "LOVED" all caps. Title Case ingredients and steps.
- [x] `recipes/sweet-soy-sauce-kecap-manis-style.md`
- [x] ! `recipes/szechuan-quick-noodles.md`
    - Title and body: "Szechuan" → "Sichuan" (current standard romanization; "Szechuan peppercorns" is still common on labels, so either is defensible. Pick one collection-wide; beef-base note too).
    - L54: "Needs acid" is a test note. Add "a splash of rice vinegar" to the seasoning step instead.
    - Q: 2 tsp MSG (~8 g) for one serving is heavy; most of the collection uses 0.5–1%. Intended?
- [x] ! `recipes/teriyaki-sauce.md`
    - Percentages mix volume and weight (sugar, MSG, ginger in g against shoyu in ml). Fine in practice; say "% of shoyu volume, solids by weight" once.
    - L37: "kabobs" → "kebabs". L33: "corn or rice starch" → "cornstarch or rice starch".
- [x] `recipes/thai-cucumber-relish.md`
- [x] ! `recipes/thai-style-chilli-lime-sauce.md`
    - Weight/volume pairs don't agree: "60g (2 tablespoons) Thai chilli paste" (2 tbsp ≈ 35 g); "20g (1 tablespoon) neutral oil" (≈ 14 g); "10g (1 teaspoon) MSG" (1 tsp ≈ 4 g); "10g (1 teaspoon) salt" (1 tsp ≈ 6 g fine salt, 3 g kosher). Pick the tested unit and fix the other.
    - L15: "150ml (½ cup + juice of 1 lime) lime juice" is circular. → "150 ml lime juice (about 5 limes)".
    - Typos: L9 "midly" → "mildly"; "Puré" → "Purée" (L11, L26, L37). Title: "Thai style" → "Thai-style". L33: "1/4 cup ... scallions" → "¼ cup ... green onions".
    - L9: intro duplicated from sweet-gochujang-sauce.md.
- [x] `recipes/the-anything-casserole.md` (fixed 2026-09-24: converted to FORMAT.md; reheat to 74°C; rough bake times from fridge and frozen)
- [x] ! `recipes/toblerone-shortbread.md`
    - No bake time. Step 6 only gives a cue; add "about 12–15 minutes".
    - Typos: L29 "Toblernone" → "Toblerone"; "spoon full" → "spoonful"; L17 "corn starch" → "cornstarch"; L31 "air-tight" → "airtight". L27: Title Case ("Icing Sugar, Corn Starch, Flour").
    - L11: "made by a coworker while both working at Discover Software, Linda" puts the name at the end; "made by Linda, a coworker at Discover Software".
    - L15: "1 lb butter" → "454 g (1 lb) butter". "batter" (steps 4–5) → "dough".
- [x] ! `recipes/tofu-in-tomato-sauce.md`
    - L14: the Mechanic paragraph sits in the intro with no heading ("The mechanic here is..."). Make it `## Mechanic` and give the page a one-line intro.
    - L24: "seasoning powder" is unclear for most readers. Name it (Vietnamese hạt nêm, or chicken/mushroom bouillon powder).
    - L35: "Heat a generous amount of oil ... over low heat. Once bubbling" is contradictory for shallow-frying tofu → "medium heat, until shimmering".
    - L33 repeats the cutting instructions already in the ingredient list. L51: "helps them break down faster than omitting it entirely" is redundant → "helps them break down faster".
- [x] ! `recipes/tofu-pepperoni.md`
    - L13: "1/2 package smoked tofu" → a weight (~200 g). L18: "1 teaspoon garlic powder and onion powder" → "1 teaspoon each".
    - L21: "## Hardware:" (legacy) listing a container and a spoon adds nothing; drop it.
    - L9: "It has a texture like cheese" Q: meaning firm and sliceable? Reword. L34: capitalize "Smoked".
- [x] ! `recipes/tomato-soup.md`
    - L21: "780ml ... (2 × 400ml tins)" is 800 ml. Tags say `italian`, `cuisine: world`.
    - Otherwise clean.
- [x] ! `recipes/triple-layered-double-pumpkin-cheesecake.md` (fixed 2026-09-24: 250 g blocks; gelatine bloomed first; wobble cue; per-layer components; converted to FORMAT.md)
    - L9: "Not sure where this recipe came from but it looks Yummy!" suggests it's untested, but `draft: false`. Q: made it?
    - No water bath; fine if the wobble cue works for you.
- [x] ! `recipes/ts-broccoli-salad.md` (Google links fixed 2026-09-24)
    - L14: prep for the broccoli isn't given (raw florets, chopped small? blanched?). L18: "1 package of slivered almonds" → weight (~100 g).
    - L22: "Hellman’s" → "Hellmann’s"; "Smoked Tempeh", "Apple Cider" → lower case. L38 repeats the tempeh substitute already in L13.
- [x] ! `recipes/tuna-rice-bowl.md`
    - L14 says it uses frozen tuna, but no thaw step. Add "thaw overnight in the fridge and pat very dry".
    - Doneness mismatch: the method says "center still red to pink" (rare to medium-rare), Notes say "Cook tuna to medium".
    - "scallion(s)" → "green onion(s)"; L57: "center" (see centre/center Q).
- [x] `recipes/turkey-burgers.md` (fixed 2026-09-24: converted to FORMAT.md; cook to 70°C; spelling, units, intro)
- [x] ! `recipes/ultimate-every-bun-recipe.md`
    - L10: "Weissman's" → "Joshua Weissman's". L22: "until dissolved" → "until smooth" (flour doesn't dissolve).
    - L66: Q: "refrigerated for up to a week". The fridge stales bread fastest; room temperature 2–3 days or freezer is usually better. Intentional?
    - L32: "60g (1 large egg)". A large egg is ~50 g out of shell. Minor.
    - Otherwise well built; dough weights match the table.
- [x] ! `recipes/unbaked-cookies.md`
    - Missing: how long to boil. No-bake cookies set only if the syrup boils for about 1–2 minutes; too short and they stay wet, too long and they crumble. Add "boil 1½ minutes".
    - L11: "use to make" → "used to make". Variations come before Directions; move them after. Title Case ingredients. No yield (~3 dozen?).
    - L19: "Coconut" → "shredded coconut" (sweetened or unsweetened?).
- [x] ! `recipes/uncle-bruces-ranch-dip.md`
    - Weight/volume pairs disagree: "2g (2 teaspoons) salt" (2 tsp is ~12 g fine salt or ~6 g kosher); "1g (1 ½ teaspoon) ground black peppercorns" (≈ 3.5 g). Q: which unit did you measure in?
    - Step 1 says "Add salt to taste", but salt is already a listed ingredient. Pick one.
    - L14: "Hellman’s" → "Hellmann’s". L9: "post-war style" → "post-war-style". L15: "1 ½ teaspoon" → "teaspoons".
- [x] `recipes/vaguely-asian-slaw-dressing.md` (merged into asian-slaw-dressing.md 2026-09-24; redirects)
- [x] ! `recipes/vegan-burger-savoury-chew-gluten.md` (fixed 2026-09-24: intro, forming and cooking drafted; amounts added; vegan Worcestershire; converted to FORMAT.md)
    - Filename (`vegan-burger-savoury-chew-gluten`) doesn't match the title.
- [x] ! `recipes/vegetarian-lasagna.md`
    - Contradiction: the marinara link is `[[Simple Marinara]]`, which is built on meat drippings, so it doesn't fit a vegetarian lasagna. Also, that recipe makes ~500 ml, far too little for a 8–10 serving lasagna (usually 1.5 L+). Link `[[Marinara sauce]]` or `[[Classic pizza sauce]]` and give a volume.
    - L14: "our kids first" → "our kids' first". L33: "caramelise" → "caramelize".
- [x] ! `recipes/velveting-pork.md`
    - Clean. (Optional: many velveting methods rinse after a baking-soda soak to avoid a soapy taste at ½ tsp per 350 g; worth a line if you've tasted it.)
- [x] ! `recipes/vindaloo-paste.md`
    - Incorrect: L47 "Lemon juice is the traditional souring agent". Goan vindaloo (from Portuguese vinha d'alhos) is traditionally made with vinegar and a lot of garlic. The Mechanic's "fenugreek and dried chilies are what make this vindaloo" is also debatable. Suggest: "Vinegar is traditional; lemon is my swap."
    - L21: "50g fresh ginger (2 inches)" → "(5 cm)". Q: only 3 garlic cloves for a vindaloo, intentional?
- [x] ! `recipes/vindaloo-wing-sauce.md`
    - L14: "mildy" → "mildly". L21: calls for "vindaloo spice blend (see [[Vindaloo Paste]])", but that recipe is a wet paste with lemon and ginger. Q: 1½ tbsp of the paste, or a dry blend?
    - L45: "[draft] needs testing" note while `draft: false`. L46 repeats the gochugaru tip already in the ingredient list.
- [x] ! `recipes/vodka-cream-sauce.md` (fixed 2026-09-24: cream added; 450 g pasta; 796 ml can; converted to FORMAT.md)
    - L10: "I have no idea if it's any good" with `draft: false`. Q: retest or mark draft?
- [x] ! `recipes/weeknight-ginger-beef.md`
    - L45: refers to broccoli ("stir-fry them alongside broccoli"), which isn't in the recipe.
    - Sesame seeds and chili oil (To serve) aren't listed; fine as garnish. L53: "teflon" → "non-stick". L18: "center" (see centre Q).
- [x] ! `recipes/weeknight-mapo-tofu.md`
    - Q: "2–3 tablespoons Szechuan peppercorns" for 3–4 servings is very numbing; most recipes use 1–2 teaspoons. Typo for teaspoons?
    - L67: "Kenji Lopez-Alt" → "Kenji López-Alt". "Szechuan" (see sichuan Q). "scallions" → "green onions". L63: "teflon".
    - L42: "medium-firm silken tofu" is fine (silken comes in grades), but it's worth saying "silken, medium-firm".
- [x] `recipes/welsh-cakes.md` (fixed 2026-09-24: street name removed; currants; griddle temp and time; converted to FORMAT.md)
- [x] ! `recipes/white-rock-cheesecake.md`
    - Q: family-only recipe: the blockquote says "Do not share outside of our family!" It's `draft: true`, which keeps it off the site, but it's in the repo. Note that carrot-cake.md, from the same restaurant with "This recipe stays in the family", is `draft: false` and published.
    - Missing ingredients: the crust (graham crumbs, butter, cinnamon) is used in step 2 but not listed. Step 2 is copied from the pumpkin cheesecake. No pan size.
    - Typos: "compliment" → "complement"; "scrapped" → "scraped"; "Tirmasu" → "Tiramisu"; "Drizzle with white cake with 1 shot" → "Drizzle the white cake with"; "Wrapped baked and cooled cake" → "Wrap the cooled cake"; "an 1 inch" → "2.5 cm (1 in)"; "Require" → "You'll need".
    - Title: "White Rock Cheesecake" → "White Rock cheesecake". L10: "Aka:" line → `aka:` frontmatter. "## Varieties:" → "## Variations".
- [x] `recipes/white-spot-burgers.md` (fixed 2026-09-24: converted to FORMAT.md; pasteurized yolk; triple "O" accounts presented as disagreeing; typos and units; beef ~500 g)
- [x] ! `recipes/winter-noodle-soup-with-kale-and-fennel.md` (Google links fixed 2026-09-24)
    - Ingredients never used: 4 cups water (only stock goes in) and the dill. Step 3 "Add bouquet and bay" (bay is already in the bouquet garni).
    - L50: "Add more wine to the soup or chef." A joke; keep if you like, but it's the only instruction for the second cup of wine's purpose.
    - Temps: "176C (350F)" → "175°C (350°F)". L48: "dutch oven" → "Dutch oven", "saute" → "sauté". L47: "bite size" → "bite-size". L59: "6L/qt" → "6 L (6 qt)".
- [x] `recipes/yam-and-sage-pasta-filling.md` (fixed 2026-09-24: 480 g (2 cups) yam; tags; test note moved to Notes; converted to FORMAT.md)
