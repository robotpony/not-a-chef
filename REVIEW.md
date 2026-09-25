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
- [ ] Remove stale "needs testing" / "[draft]" / "work in progress" notes: every recipe has been tested (the author, 2026-09-25); the text just wasn't updated. Remaining ones from open question 5 include `base-curry-gravy`, `butter-chicken`, `english-muffins`, `farmer-soup`, `sheet-pan-fast-food-style-gyros`, `vindaloo-wing-sauce`, `vodka-cream-sauce`.
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
- [x] `recipes/pork-dumpling-bowls.md` (fixed 2026-09-25: fraction glyphs; "highly rated" dropped; method as prose; serving line moved to To serve (green onions were already fixed))
- [x] `recipes/potato-leek-and-mushroom-soup.md` (fixed 2026-09-25: converted to FORMAT.md as soup / mushroom garnish; mushroom butter listed; emulsion note as a Mechanic; Serious Eats'; Chef John's; sautéed; over-blend; 1½ cups; 225 g mushrooms)
- [x] `recipes/pressure-cooker-japanese-curry.md` (fixed 2026-09-25: em-dashes; Yukon Gold; unit spacing (food log already links the recipe))
- [x] `recipes/prosecco-sangria.md` (fixed 2026-09-24: Prosecco topping added; 2-hour chill; converted to FORMAT.md)
- [x] `recipes/pulled-bbq-style-chicken.md` (fixed 2026-09-25: converted to FORMAT.md as chicken / braising liquid; `poultry` tag; salt 1–1.5% of the chicken; breasts pulled at 70°C, thighs at 80–85°C so they shred; 1 tsp, 1½ tsp; Pulled BBQ-style; Dutch oven; sauce and other cookers as variations)
- [x] `recipes/pulled-pork.md` (fixed 2026-09-25: TBD fields: `servings` dropped (Notes: 150–250 g per person), `total_time: 13–25 hr`; [draft] note removed; 1–2 shoulders; 45–60 min matches the ~50 min for a bone-in shoulder; sauce salt and pepper listed; wiki-link case; method as prose)
- [x] `recipes/quick-crispy-wings.md` (fixed 2026-09-25: converted to FORMAT.md as wings / hot sauce; wings tossed in the sauce; `cook_time: 40–60 minutes`; `servings: 2–3`; preheat the oven; 220°C (425°F); birds'; comma splice)
- [x] `recipes/quick-hummus.md` (fixed 2026-09-25: converted to FORMAT.md; 6–8 cloves garlic; cooking liquid used to thin; tablespoons; comma splices; restaurant-style; yield to `portions`)
- [x] `recipes/quick-pizza-sauce.md` (fixed 2026-09-25: canned-tomato variation replaced by a `[[Pizzeria pizza sauce]]` link; "a bit sweet" note dropped; yield ~⅓ cup (1 pizza))
- [x] `recipes/ramen-eggs-ajitsuke-tamago.md` (fixed 2026-09-25: "finish cooking in the marinade" claim replaced (the 7-minute boil sets the yolk); marinade boiled and cooled before reuse; unit spacing)
- [x] `recipes/ramen-noodles.md` (fixed 2026-09-25: em-dash; egg-white idea and sodium carbonate warning moved to Notes; ~36% hydration; "cut the noodles"; method as prose)
- [x] `recipes/red-thai-curry.md` (fixed 2026-09-25: ⅓; caramelized; unit spacing)
- [x] `recipes/rice-pudding.md` (fixed 2026-09-25: pull at about 70°C, curdling above ~80°C; `cuisine: world`; ice cream; 3 tbsp (40 g) sugar)
- [x] `recipes/rich-vegmushroom-stock.md` (fixed 2026-09-25: converted to FORMAT.md; one ratio (2:3 veg:water) in the Mechanic and Notes; kombu steeped in the strained stock (or soaked in the water beforehand); phở; ramen; Glen & Friends Cooking; shiitake; 1 tsp (5 ml); vegetable oil; depressurize)
- [x] `recipes/roast-poultry.md` (fixed 2026-09-24: breasts 65°C with the rest as the hold, 68°C boneless; "in pieces"; 220°C)
- [x] `recipes/rocky-road-brownies.md` (fixed 2026-09-24: meringue first; chocolate melted with butter; chips used; salt; bake time; metric; converted to FORMAT.md; 2026-09-25: backstory moved into a family blockquote under a one-line intro)
- [x] `recipes/salsa-verde.md` (fixed 2026-09-24: converted to FORMAT.md; keeps 5–7 days; lime juice used in the blend)
- [x] `recipes/sandwich-sour-pickles.md`
- [x] `recipes/satay-marinade.md` (fixed 2026-09-25: converted to FORMAT.md; salt dry-brines the protein first; ~1 kg protein; chicken 68°C, pork 63°C, linked to the food safety page; zested; Worcestershire; 230°C (450°F); foil-lined)
- [x] `recipes/sheet-pan-fast-food-style-gyros.md` (fixed 2026-09-24: now uses 1 batch [[Gyro base]]; 71°C; title hyphenated; converted to FORMAT.md)
- [x] `recipes/shredded-taco-chicken.md` (fixed 2026-09-25: converted to FORMAT.md; temperature note as a Mechanic (breast capped at 70°C, per the pulled-chicken answer); marinate; marinade; quotes; ½–1 cup; °C/°F; cooking options as prose; sauce storage to Notes)
- [x] `recipes/simple-chicken-pork-and-beef-gravy.md` (fixed 2026-09-25: 50 g roux to 250 ml; base batch listed (25 g butter, 25 g flour, 250 ml stock + drippings); ratio as a Mechanic; drippings; Notes as bullets, heading colon)
- [x] `recipes/simple-chunky-salad-dressing.md` (fixed 2026-09-25: Hellmann's; Bragg; tablespoons; ground coriander; balance sentence; headings)
- [x] `recipes/simple-green-goddess-dressing.md` (fixed 2026-09-25: MSG; garlic-forward; flat-leaf; test notes combined; method as prose; 12 g garlic)
- [x] `recipes/simple-marinara.md` (fixed 2026-09-25: olive oil base with pan drippings as a variation (title kept; `vegan` tag stays for the base); flatbreads; "quick pasta sauce"; yield to `portions`; unit spacing)
- [x] `recipes/simple-rice-bowls.md` (fixed 2026-09-24: converted to FORMAT.md; two example bowls split; chicken 68°C; Google Doc links → wiki links; rice is cooked)
- [x] `recipes/simple-shrimp-marinade.md` (fixed 2026-09-25: converted to FORMAT.md; 2 tbsp olive oil; for about 450 g shrimp; ½ tsp salt added; roasted jalapeños, seeds in; 1 tsp grated ginger)
- [x] `recipes/simple-sweet-pickled-veg.md` (fixed 2026-09-25: converted to FORMAT.md; raw-veg variation; ~1 kg beets; cheesecloth; saucepan; spice bag vs loose peppercorns and cloves spelled out; double spaces)
- [x] `recipes/simpler-thai-red-curry.md` (fixed 2026-09-25: converted to FORMAT.md; tomato paste fried with the curry paste; savoury sauce added with the stock; salt listed; 220°C (425°F); non-emulsified glossed (no stabilizers); plurals; `[[Ginger/garlic paste]]` (consolidation already decided: keep all three))
- [x] ! `recipes/south-american-red-salsa.md` (fixed 2026-09-24: real intro; converted to FORMAT.md; comment anchor removed; typos; keeps 5–7 days)
    - Q: "South American" is vague. Is this a pebre (Chilean) or from a specific source? (Deferred 2026-09-24.)
- [x] `recipes/spaghetti-squash-boats-or-casserole.md` (fixed 2026-09-25: converted to FORMAT.md; seasoning listed (French or Italian herbs, taco spice for the Mexican version); fork-shred doneness cue; spaghetti; ~450 g meat; lower case; 190°C (375°F); boats/casserole as prose; `servings: 2`)
- [x] `recipes/spinach-dip.md` (fixed 2026-09-25: converted to FORMAT.md; Hellmann's; cups; 300 g spinach, 227 ml water chestnuts (now used in the method); punctuation and spacing; blockquote case)
- [x] `recipes/spinach-mushroom-flatbread.md` (fixed 2026-09-25: converted to FORMAT.md; 200°C (400°F); sub-lists folded into prose; cremini; Parmesan; Swiss; Topping as a `####` label; lemon juice used)
- [x] `recipes/spinach-pecan-pasta-filling.md` (fixed 2026-09-25: converted to FORMAT.md; 1 shallot listed, peppers dropped; herbs 20 g fresh or ~1 tbsp dried; pepper 1–2 g; tags `pasta, bases`; nuts toasted first; ragù; Parmesan; yield to `portions`)
- [x] `recipes/strawberry-rhubarb-compote.md`
- [x] `recipes/stuffed-mushroom-caps.md` (fixed 2026-09-24: 190°C (375°F; 2026-09-25: intro line above the blockquote; blockquote spacing; yield to `portions`)
- [x] `recipes/sweet-gochujang-sauce.md` (fixed 2026-09-25: own intro; five-spice; ginger ground vs fresh; cross-linked with `[[Gochujang wing sauce]]`; converted to FORMAT.md)
- [x] `recipes/sweet-potato-pie.md` (fixed 2026-09-25: converted to FORMAT.md; 540 g (1 lb 3 oz); 23 cm (9 in) deep-dish; 175°C (350°F); ¾ cup; slight-wobble doneness cue; `source: Alton Brown, Food Network`; lower case)
- [x] `recipes/sweet-soy-sauce-kecap-manis-style.md`
- [x] `recipes/sichuan-quick-noodles.md` (fixed 2026-09-25: renamed to `sichuan-quick-noodles.md` to match the title (old URL redirects; no Szechuan left in content); rice vinegar added to the finish, test note dropped; MSG 1–2 g (the 2 tsp was an estimate); stock-only variation as `###`; unit spacing)
- [x] `recipes/teriyaki-sauce.md` (fixed 2026-09-25: volume/weight basis stated in the Mechanic; kebabs; cornstarch or rice starch)
- [x] `recipes/thai-cucumber-relish.md`
- [x] `recipes/thai-style-chili-lime-sauce.md` (fixed 2026-09-25: Thai-style; renamed to `thai-style-chili-lime-sauce.md` (old URL redirects); own intro; grams kept, volume equivalents corrected; MSG cut to 1% (5 g); 150 ml lime juice (about 5 limes); mildly; purée; ¼ cup green onions; yield to `portions`; converted to FORMAT.md)
- [x] `recipes/the-anything-casserole.md` (fixed 2026-09-24: converted to FORMAT.md; reheat to 74°C; rough bake times from fridge and frozen)
- [x] `recipes/toblerone-shortbread.md` (fixed 2026-09-25: converted to FORMAT.md; bake to colour (edges just golden, roughly 12–15 minutes); Toblerone; spoonful; cornstarch; airtight; lower case; "made by Linda, a coworker"; 454 g (1 lb) butter; dough, not batter; yield to `portions`)
- [x] `recipes/tofu-in-tomato-sauce.md` (fixed 2026-09-25: one-line intro and `## Mechanic`; seasoning powder named (hạt nêm or bouillon powder); medium heat until shimmering; repeated cutting step dropped; Notes line trimmed)
- [x] `recipes/tofu-pepperoni.md` (fixed 2026-09-25: converted to FORMAT.md; ~200 g tofu; garlic and onion powder 1 tsp each; Hardware dropped; texture reworded (firm and sliceable); Notes)
- [x] `recipes/tomato-soup.md` (fixed 2026-09-25: 800 ml (2 × 400 ml tins); `italian` tag dropped to match `cuisine: world`; unit spacing)
- [x] `recipes/triple-layered-double-pumpkin-cheesecake.md` (fixed 2026-09-24: 250 g blocks; gelatine bloomed first; wobble cue; per-layer components; converted to FORMAT.md; 2026-09-25: "Not sure where this came from" intro replaced (all recipes are tested); 300 ml condensed milk)
- [x] `recipes/ts-broccoli-salad.md` (fixed 2026-09-25: converted to FORMAT.md as dressing / salad; raw small florets; ~100 g almonds; Hellmann’s; lower case; duplicate tempeh line merged into a Vegetarian variation)
- [x] `recipes/tuna-rice-bowl.md` (fixed 2026-09-25: thaw overnight and pat dry; doneness agrees (centre red to pink); `####` labels; unit spacing (green onions and centre were already fine))
- [x] `recipes/turkey-burgers.md` (fixed 2026-09-24: converted to FORMAT.md; cook to 70°C; spelling, units, intro)
- [x] `recipes/ultimate-every-bun-recipe.md` (fixed 2026-09-25: Joshua Weissman's; until smooth; 60 g beaten egg (about 1 large); fridge storage kept, per the author; yield to `portions`; unit spacing; en-dash ranges)
- [x] `recipes/unbaked-cookies.md` (fixed 2026-09-25: converted to FORMAT.md; boil 1½ minutes; used to make; variations after the method; lower case; sweetened shredded coconut; about 2 dozen in `portions`)
- [x] `recipes/uncle-bruces-ranch-dip.md` (fixed 2026-09-25: converted to FORMAT.md; grams kept, volumes corrected (½ tsp pepper, ½ tsp kosher salt); salt listed plus more to taste; Hellmann’s; post-war-style; dried dill; substitutions as a variation)
- [x] `recipes/vaguely-asian-slaw-dressing.md` (merged into asian-slaw-dressing.md 2026-09-24; redirects)
- [x] `recipes/vegan-burger.md` (fixed 2026-09-24: intro, forming and cooking drafted; amounts added; vegan Worcestershire; converted to FORMAT.md; 2026-09-25: renamed to `vegan-burger.md` to match the title (old URL redirects))
- [x] `recipes/vegetarian-lasagna.md` (fixed 2026-09-25: marinara → `[[Marinara sauce]]`, as much as needed (about 1.5 L); kids'; caramelize; unit spacing)
- [x] `recipes/velveting-pork.md` (fixed 2026-09-25: optional flavouring as a `####` label; unit spacing; baking soda first, then rinse and pat dry, then cornstarch and flavouring)
- [x] `recipes/vindaloo-paste.md` (fixed 2026-09-25: "Vinegar is traditional; lemon is my swap" with the *vinha d'alhos* origin; Mechanic and fenugreek note scoped to this version; 50 g ginger (5 cm); garlic is 3 cloves or more, to taste)
- [x] `recipes/vindaloo-wing-sauce.md` (fixed 2026-09-25: mildly; 1½ tbsp `[[Vindaloo paste]]` (paste works); salt to taste; stale "needs testing" note and repeated gochugaru note dropped)
    - TODO: write up the dry vindaloo spice blend (logged in the September 2026 food log).
- [x] `recipes/vodka-cream-sauce.md` (fixed 2026-09-24: cream added; 450 g pasta; 796 ml can; converted to FORMAT.md; 2026-09-25: "no idea if it's any good" dropped (all recipes are tested); lower case; 1 tbsp each olive oil and butter)
- [x] `recipes/weeknight-ginger-beef.md` (fixed 2026-09-25: stray broccoli reference dropped (carrots stir-fried separately until crisp-tender); `## Equipment`, non-stick; unit spacing; "centre" was already fine)
- [x] `recipes/weeknight-mapo-tofu.md` (fixed 2026-09-25: Sichuan peppercorns 2–3 tsp, with the numbing 2–3 tbsp version in Notes; Kenji López-Alt; non-stick; `## Equipment`; silken tofu (medium-firm); `####` labels; unit spacing; Sichuan and green onions were already fine)
- [x] `recipes/welsh-cakes.md` (fixed 2026-09-24: street name removed; currants; griddle temp and time; converted to FORMAT.md)
- [x] `recipes/white-rock-cheesecake.md` (fixed 2026-09-25: converted to FORMAT.md as crust / filling; crust ingredients listed, matching the pumpkin cheesecake's crust; White Rock cheesecake; `aka:` in frontmatter; one-line intro; Variations; complement, scraped, Tiramisu, "Drizzle the cake", "Wrap the cooled cake", 2.5 cm (1 inch), "You'll need"; blockquote kept; "Do not share" note removed and published (`draft: false`), per the author (carrot cake's note was already gone); Whistler uses a boxed cake mix (drier and more cohesive, holds up in the filling); 23 cm (9 inch) round pan)
- [x] `recipes/white-spot-burgers.md` (fixed 2026-09-24: converted to FORMAT.md; pasteurized yolk; triple "O" accounts presented as disagreeing; typos and units; beef ~500 g)
- [x] `recipes/winter-noodle-soup-with-kale-and-fennel.md` (Google links fixed 2026-09-24; fixed 2026-09-25: converted to FORMAT.md as chicken / soup / noodles; water goes in with the stock, dill with the spices; "Add the bouquet garni"; 175°C (350°F); Dutch oven; sauté; bite-size; yield to `portions` (6 L (6 qt)), `servings: 10`; wine: a splash to deglaze, about 1 cup in all to taste, the rest for the cook)
- [x] `recipes/yam-and-sage-pasta-filling.md` (fixed 2026-09-24: 480 g (2 cups) yam; tags; test note moved to Notes; converted to FORMAT.md)
