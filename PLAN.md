# Plan

Phased. Each phase ships something usable.

## Phase 0: Hugo scaffolding

Set up the site skeleton before any content migration.

- [x] Initialize Hugo site: `hugo new site .`
- [x] Add Blowfish as a git submodule: `themes/blowfish/`
- [x] Configure `hugo.toml`: site name, base URL, language, Blowfish settings
- [x] Create empty content sections: `content/recipes/`, `content/essays/`, `content/reference/`
- [x] Configure taxonomies: `tags`, `cuisine`
- [x] Add wiki link render hook: `layouts/_default/_markup/render-link.html`
- [x] Verify `hugo build` succeeds (16 pages, 55ms)
- [x] Add `.claude/commands/` with stub command files

**Note:** Hugo upgraded to 0.163.0 (Blowfish required 0.158+). Blowfish version warning is a false positive — build succeeds.

**Output:** Buildable Hugo site with no content. ✓

## Phase 1: Personal recipe migration

Migrate the 69 personal recipes from `development-notes/recipes/` (the vault has since moved to `~/writing/me/recipes/`).

- [x] Create `tools/config.toml.example` with vault path placeholders
- [x] Copy to `tools/config.toml` (gitignored) with local paths
- [x] Write `tools/migrate.py` with click CLI (config.toml + env var + --source flag resolution)
- [x] Test against a few sample recipes; verify output matches FORMAT.md
- [x] Run full migration: 68 recipes migrated (65 personal + 3 from test run)
- [x] Verify Hugo builds with all recipes (196 pages, 112ms)
- [x] Wiki links: no cross-references in current vault recipes; render hook tested and ready
- [x] Write `.claude/commands/migrate.md`
- [x] Write `.claude/commands/lint.md`

**Notes:**
- `Food log.md` is skipped automatically (not a recipe)
- Title-based slugs are used (not source filenames) — some recipes have longer slugs than their vault filenames
- Tags flow-sequence format preserved: `[mains, weeknight]`
- `cuisine: "#Indian"` normalized to `cuisine: Indian` automatically

**Output:** Hugo site with 68 personal recipes, all published. ✓

## Phase 2: Family archive normalization

Migrate the family archive from `development-notes/gdrive/Alderson Family Recipes/`.

- [x] Write `tools/normalize.py` with click CLI
- [x] Implement skip list for meta files (Recipe Template, How to add a recipe, About...)
- [x] Implement folder-to-tag mapping (see ARCHITECTURE.md)
- [x] Run `--dry-run` first; review what would be created
- [x] Run full normalization — 163 files written (140 new, 3 duplicates, 24 pre-run)
- [ ] Review drafts; promote to published as they pass — **144 of 153 family-archive recipes are still `draft: true`** as of 2026-08-20
- [x] Write `.claude/commands/gdrive-migrate.md` (since removed, see below)

**Conflict resolution:** Some personal and family archive recipes overlap (two Chai versions, etc.). Personal recipe kept; family archive version normalized as a draft. Per-file merge/replace/discard decisions have not been made yet.

**Output:** Family archive migrated into `content/recipes/` but not reviewed. The `gdrive/` source folder has since been deleted, so this repo is the only remaining copy of that content — the review step can no longer be skipped by going back to check the source. `tools/normalize.py` and `.claude/commands/gdrive-migrate.md` were removed since there's no longer a source to re-run them against; any further family recipes get added by hand.

## Phase 3: Essays and reference pages

Scaffold essays content type and migrate reference material.

- [ ] Essays: add Hugo content type config, verify layout
- [x] Reference: normalize and migrate appendices from `gdrive/X. Appendices/`
- [x] CSV data: import planning/research CSVs to `content/reference/` as markdown tables
- [ ] Update vault with any publishable essay drafts
- [ ] Migrate essays manually from vault when ready
- [x] Write `.claude/commands/recipe-new.md`

**Output:** All three content sections populated. Site is structurally complete.

## Phase 3a: Binary recipe import (Recipes to process) — BLOCKED

Import ~80 unprocessed family recipes from `gdrive/X. Appendices/Recipes to process/`. These were `.doc`/`.docx`/`.pdf` files that cannot be read with standard tools.

**Blocked:** the `gdrive/` folder has been deleted; this source no longer exists. If any of these unprocessed recipes are still wanted, they need to be pulled from the original Google Drive (or another backup) by hand, not through a batch import tool.

- [ ] Install pandoc (`brew install pandoc`) or confirm availability
- [ ] Write `tools/import-legacy.py` — batch converts `.doc`/`.docx` to markdown, normalizes frontmatter, outputs to `content/recipes/` as `draft: true`
- [ ] Handle `.pdf` separately (e.g., `not-afterthoughts-bake-mega-file.pdf`, 8 pages)
- [ ] Review and promote drafts

**Output:** Legacy recipe archive available for review and promotion.

## Phase 3b: CSV rendering

Add the ability to render structured CSV/table data in Hugo pages — for costing sheets, flour comparisons, and menu data already imported to `content/reference/`.

- [ ] Evaluate options: Hugo shortcode, embedded markdown tables (current approach), or a lightweight JS table library
- [ ] Implement chosen approach
- [ ] Update CSV-sourced reference pages to use new rendering

**Output:** Structured data pages are readable and browsable in the published site.

## Phase 4: Obsidian vault integration

- [x] Vault confirmed at `~/writing/me/` (staging ground for notes and in-progress recipes)
- [x] Migration tool tested against the live vault
- [ ] Verify wiki links resolve in both Obsidian and Hugo
- [ ] Establish review workflow: edit in Obsidian → run `/migrate` → check in Hugo

**Output:** End-to-end authoring workflow validated.

## Phase 5: Self-hosted deployment

- [x] Decide on host and server setup (VPS; SSH access via `~/.ssh/config` alias, configured locally in `tools/config.toml`, gitignored)
- [x] Write `tools/deploy.sh` using rsync or similar
- [x] Add `make deploy` target
- [x] Write `.claude/commands/publish.md` (runs `make build` then `make deploy`; errors clearly if `tools/config.toml` isn't set up)
- [ ] Test full deploy: build → transfer → verify live site
- [ ] Set up automated builds (cron or webhook) if desired

**Output:** Site live on your server. Manual deploy with a single command.

## Phase 6: Theme customization

The design exploration this phase used to describe is done — `mockups/STYLE.md`/`style.html` and `mockups/COMPONENTS.md`/`components.html` (distilled from `mockups/archived/style-guide.html`, `recipe-spec-sheet.html`, and `homepage.html`) already settle the palette, type system, and every component. This phase is now about **translating those static mockups into working Hugo/Blowfish templates**, not designing from scratch.

Two facts from inspecting `themes/blowfish/` directly change how this has to be built (found 2026-09-17, not assumed):

- **Blowfish's color scheme system doesn't match our token model.** A scheme file (`assets/css/schemes/*.css`, e.g. `fire.css`, the one currently active in `params.toml`) defines full Tailwind-style 50–900 shade ramps for `neutral`/`primary`/`secondary` as RGB triplets, consumed by Tailwind Typography's `.prose` classes throughout the theme. Our style guide defines ~15 semantic tokens with only light/dark pairs, no intermediate shades. A custom scheme means generating real 9-step ramps anchored on our hex values, not just dropping our tokens in.
- **Nothing is actually wired up yet.** `layouts/` in this repo only has the wiki-link render hook and the `index.json` generator — recipes, essays, and reference all currently fall back to Blowfish's generic `_default/single.html`/`list.html` (plain Tailwind prose). None of the mockup's components (ingredient check, Mechanic callout, stat rail, recipe card, mega-menu, etc.) exist as Hugo templates. None of Blowfish's 5 built-in homepage layouts (`hero`/`profile`/`page`/`card`/`background`) matches `homepage.html`'s structure either — that one needs a full custom `layouts/index.html`.

### 6.0 — Resolve what COMPONENTS.md left open

`mockups/COMPONENTS.md`'s closing section lists concrete unresolved duplicates (two competing recipe-card designs, a `.cuisine-chip` naming collision, two "archive stats" treatments, three different answers for where search/theme-toggle live, two page-note shapes, essay/reference teaser layouts that haven't converged). **Do this pass before writing templates** — building a Hugo partial for a recipe card is wasted work if it's the design that gets cut. This can be the "polish and filter for quality" pass already flagged as pending.

- [x] Work through COMPONENTS.md's numbered list, pick one option for each, note the decision back in `STYLE.md`/`style-guide.html` (done 2026-09-17 — see `STYLE.md`'s "Decisions" subsection)
- [x] Fold the "candidate" components (ingredient sub-head/sub-note, notes-sub, variation block, wikilink/extlink, listing-page header, site footer, prose-as-default procedure) into `STYLE.md`'s ratified component list (done 2026-09-17, demonstrated in `style.html` §3)

### 6.1 — Blowfish scheme + global chrome ✅ done 2026-09-17

- [x] Generate a custom `assets/css/schemes/not-a-chef.css`: 50–900 ramps for `neutral` and `primary`, computed (not eyeballed) from every real light/dark token in `STYLE.md` via HSL bucketing/interpolation — see the file's own header comment for the method. `--highlight`/`--flag` stay bespoke, non-Tailwind CSS custom properties (decision recorded in `STYLE.md`); a `secondary` ramp is still generated from `--highlight` since Tailwind's color system expects the key to exist, but nothing of ours reads it.
- [x] Set `colorScheme = "not-a-chef"` in `config/_default/params.toml`
- [x] Override `layouts/partials/head.html` to load the three fonts (Google Fonts `<link>`, since Blowfish has no font-customization hook)
- [x] Bridge our semantic tokens (`--bg`/`--ink`/`--accent`/etc., verbatim from `STYLE.md`, light default + `.dark` override) into `assets/css/custom.css` — Blowfish's own markup never reads them, but this is what lets Phase 6.2's component CSS (`.rcard`, `.ing`, `.mechanic`, ported straight from the mockups) work unmodified against real templates instead of being rewritten against Tailwind's ramp. Verified: `.dark{--bg:#1B1C16;...}` present in the built CSS bundle, targeting Blowfish's real `.dark`-class mechanism.
- [x] Override `layouts/partials/footer.html` with the mockup's `.site-footer` shape (brand blurb, Browse/Index link columns, theme toggle) — verified in the built HTML.
- [x] Found and fixed a real Blowfish quirk: `footer.showAppearanceSwitcher` doesn't control the footer at all — it puts an icon-only toggle in the *header* nav (`desktop-menu.html`/`mobile-menu.html`). Set to `false` (documented inline in `params.toml`) since our toggle now lives in the footer, reusing the theme's own `#appearance-switcher` id/JS so no script changes were needed.
- [x] `hugo --quiet` builds clean; confirmed in the rendered output: fonts linked, footer renders with the toggle, header no longer has the icon toggle (`appearance-switcher` appears exactly once, in the footer), dark-mode CSS block present in the compiled bundle.
- **Not verified**: no Chrome extension was connected this session, so the actual rendered look — Blowfish's own chrome (nav, buttons, prose) against the new scheme, and the dark-mode toggle actually working in a browser — hasn't been eyeballed yet. Do that before calling 6.1 fully sound; Tailwind's neutral/primary ramps are a real color-math translation of the tokens, not a guaranteed pixel match to the mockups.

### 6.2 — Recipe content: the harder, more custom half

FORMAT.md's markdown structure (`## Mechanic`, `## Ingredients`, `## Method`, component headings) needs to render as the mockup's actual components, not generic Tailwind prose. Two ways to get there, worth deciding explicitly rather than drifting into one:

- **(a) Markdown render hooks** (`layouts/_default/_markup/render-heading.html`, extending the existing `render-link.html` pattern) that detect known section headings and wrap their content in the right component markup/classes
- **(b) A custom single-recipe layout** (`layouts/recipes/single.html`) that reads frontmatter directly (servings/prep_time/cook_time → stat rail) and leaves body content to simpler, more generic styling

Recommend (a) for anything that needs real interactivity or specific markup the raw list/paragraph can't produce (ingredient checkboxes, Mechanic's left-border box, numbered-step badges), and (b) for the frontmatter-driven pieces (stat rail, taxonomy chips) that don't touch body content at all.

Broken into pieces (2026-09-18), each landing and getting browser-verified on its own rather than as one big template rewrite:

#### 6.2a — Wiki links ✅ done 2026-09-18

- [x] `.wikilink`/`.extlink`/`.broken-link` classes applied in `render-link.html`, CSS ported from `mockups/style.html` §3 into `custom.css`
- [x] The bigger real bug this piece actually turned up: **Goldmark has no `[[Wiki Link]]` syntax at all.** FORMAT.md's spec (and CLAUDE.md's "recipes are drafted and edited here directly," i.e. in real Obsidian syntax, not migrate.py's old pre-converted `[Title](Title)` form) assumes `[[Title]]` just works in Hugo — it never did. Confirmed on real content: `content/recipes/pulled-pork.md` and `content/reference/soft-sandwich-bun-research.md` both rendered as literal bracket text. Across the whole 230+ file corpus this syntax is barely used (2 raw `[[...]]` links, 1 old pre-converted link), but it was completely broken every time it appeared.
- [x] Fixed with a full override of `layouts/_default/single.html` (Blowfish's default has no hook point otherwise): `.RawContent` is regex-rewritten (`[[Title]]` → `[Title](<Title>)`, `[[Title|Alias]]` → `[Alias](<Title>)`) and rendered via `.RenderString` instead of `.Content`, so the result flows through the real `render-link.html` hook like any other link. This affects every page using the default single template — recipes, essays, and reference alike, until each gets its own custom layout.
- [x] Two sub-bugs found only by actually testing against real content, not just a clean build:
  - **Link destinations can't contain literal spaces in CommonMark** without `<angle-bracket>` wrapping — every multi-word recipe title broke this until the replacement template was changed to `[$1](<$1>)`. Before the fix, `hugo --quiet` built clean and the output *looked* plausible (rendered as inert bracket text) — no error, just silently wrong.
  - **Curly vs. straight apostrophes**: `content/recipes/chef-johns-hamburger-buns.md`'s real title uses a curly `'`; the wiki link to it (`soft-sandwich-bun-research.md`) was typed with a straight `'`. `where site.RegularPages "Title" X` can't normalize, so title matching was rewritten as a manual `range` + `eq` comparison with both sides normalized first.
  - Also found and fixed a genuine content bug this surfaced: `pulled-pork.md`'s spice-rub cross-reference was a malformed path-style link (`[[recipes/bruces-poultry-pork-spice-rub]]`, not even the real slug) instead of a title — corrected to `[[Bruce's Poultry and Pork Spice Rub]]`.
  - **A Go template pitfall worth remembering**: `$x | replace "a" "b"` is *not* `replace($x, "a", "b")` — a pipe appends the piped value as the **last** argument, and `replace`'s signature is `(subject, old, new)`, so piping put `$destination` in the `new` position instead of `subject`. Silently returned the wrong (unchanged) string with no error. Fixed by calling `replace $x "a" "b"` directly (nested, not piped) wherever the piped value needs to be the first argument to a multi-arg function.
- [x] Verified in an actual Chrome window (light + dark), not just a clean build: wikilink styling/arrow/navigation, extlink styling/target=_blank, and broken-link styling all confirmed on real pages (`pulled-pork`, `al-pastor-marinade-pantry-hack`, `soft-sandwich-bun-research`).
- **Known minor gap, not chased**: Hugo's auto-generated `.Summary`/meta-description text (used in `related.html` teasers and `<meta>` tags) still runs off the original untransformed `.Content`, so a page with a `[[wiki link]]` in the first ~70 words will show raw brackets in *other* pages' "related" teasers and in its own meta description. Only affects `soft-sandwich-bun-research.md` currently (a draft, not live). Fixing it properly means teaching Hugo's summary generation about the same transform, which is disproportionate for one draft page — revisit if it shows up on a published page.

#### 6.2b — Ingredient list: decorate + hook ✅ done 2026-09-18

- [x] Interactivity decision made: real, persisted via `localStorage` (per-browser, keyed by page URL + ingredient text) — not just presentational. Reasoning: personal cookbook site, no shared/cross-device state needed, and a checklist that forgets itself on refresh mid-cook is worse than no checklist.
- [x] Ingredient list styling (checkbox component), including sub-head (`#### Dry`/`#### Wet`, and the real corpus's `### ComponentName` variant — see below) and sub-note (tab-indented sub-item, no checkbox)
- **The real design problem this piece turned on**: Hugo/Goldmark has no render hook for lists at all (only headings/links/images/codeblocks/blockquotes/tables) — so a heading hook can mark *where* an ingredient section starts, but can't reach the `<ul>`/`<li>` markup underneath it. A wrapping `<div>` from the heading hook was considered and rejected: heading hooks render one self-contained tag per invocation with no "end of section" hook to close it, so the *last* section on any page would leave an unclosed div that eats the next real closing tag in the page (the `.article-content` wrapper's own `</div>`), corrupting everything after it. Solved instead with the split the user asked for: `render-heading.html` only *marks* (adds `data-ing-heading="true"` to the h2, `.ing-subhead` to h3/h4s inside an open section) — genuinely safe, since each heading tag is self-closing within one hook call. `assets/js/ingredients.js` does the actual decorating + hooking client-side: walks the DOM from each marked h2 to the next h2, finds the `<ul>`, and turns it into the real component.
- **Heading detection heuristic, verified against real content, not assumed**: FORMAT.md documents freeform heading names, and the real 230-recipe corpus proves it — `## Ingredients`, `## Ingredients:`, `## Directions:`, one-off component names (`## Tadka`, `## Marinara`), even non-`##` component structure (`content/recipes/gyro-dogs.md` groups its ingredients under `### Gyro dogs` / `### Swicy glaze` / `### Garlic sauce` inside one `## Ingredients`, not FORMAT.md's documented `####` convention). Positive matching ("is this heading named Ingredients") isn't robust against that; instead `render-heading.html` flags every `##` **ingredient by default**, excluding only a known list of non-ingredient optional-section names (method/directions/steps/notes/to serve/variations/timing/equipment/substitutions/mechanic, matched case-insensitive with trailing `:` stripped). A false positive (checkbox on a stray non-ingredient bullet list) is harmless; a false negative would silently drop real styling. Confirmed correct against `dal-tadka.md` (multi-component, `## Dal`/`## Tadka`) and `gyro-dogs.md` (h3-grouped) via temporary `warnf` debug output before trusting it — not assumed from reading the template.
- Real bugs found and fixed, none of them build errors (`hugo --quiet` stayed clean through every one — the same lesson as 6.2a, verify in the browser):
  - **Missing space between the quantity span and the ingredient text** ("200gred lentils") — the regex match consumed the trailing whitespace as part of the quantity token and it was never put back when the remainder text was sliced off.
  - **Glued mixed-number fractions didn't get a quantity span** — "1½" (digit immediately followed by a unicode fraction character, no space) is FORMAT.md's own example style (`## Ingredients`'s "2 tsp loose-leaf black tea" is a plain case, but its sibling example blocks use "1½ tsp" elsewhere) and is common in the real corpus, but the original regex only handled a bare fraction or a spaced mixed number ("1 1/2"). Extended to allow an optional fraction character directly after the leading digits.
- **A Go template idiom worth trusting less than expected, after 6.2a's `replace` pipe bug**: `.Text | plainify | strings.TrimSuffix ":" | strings.TrimSpace | lower` was suspect for the same reason `replace` broke (pipe appends the piped value as the *last* argument) — empirically verified via `warnf` before shipping it, and this one's fine (`strings.TrimSuffix`'s signature genuinely does take the string being trimmed last, unlike `replace`). Different Hugo string functions disagree on argument order; the fix from 6.2a (verify with real output, don't assume from the function name) is the actual lesson, not "always avoid piping."
- Verified in an actual Chrome window (light + dark): checkbox check/strikethrough, quantity styling (including "1½ teaspoons", "¾ teaspoon", "3–4 garlic cloves" ranges), sub-notes ("— add split peas..."), sub-heads ("GYRO DOGS" small-caps label), and checked-state persistence across a page reload via `localStorage` — all confirmed on `dal-tadka` and `gyro-dogs`. Graceful fallback confirmed too: non-numeric quantities ("1 tiny pinch", "8 split-top hot dog buns") correctly get no quantity span and stay checkable, not broken.

#### 6.2c — Ingredient config menu: scale recipe + change units ✅ done 2026-09-18

- [x] A `<details>`/`<summary>` config menu (gear icon), injected by `assets/js/ingredients.js` at the top-right of the *first* ingredient heading only — one menu governs every `.qty` on the page, since a multi-component recipe (`dal-tadka`'s `## Dal`/`## Tadka`) has several ingredient headings but scaling/units is a whole-recipe operation, not a per-section one. Same disclosure pattern as the nav's mega-menu dropdowns (`.nav-drop`), so no open/close JS was needed, just CSS.
- [x] **Scale recipe**: ½×/1×/2×/3× preset pills plus a custom number input. Reuses `.filter-pill`'s "neutral outline, accent-soft fill when active" language rather than inventing a new selected-state treatment.
- [x] **Change units**: As written / Metric / Imperial, same pill treatment. Approximate, cooking-standard conversion factors (1 cup = 240 mL, 1 tbsp = 15 mL, 1 tsp = 5 mL, 1 oz = 28.35 g, 1 lb = 453.6 g), not lab-precise ones — consistent with this project's existing tolerance for ballpark numbers (`data/ingredient_prices.yaml`'s own approximation).
- [x] Persistence split deliberately: scale is per-recipe (`localStorage`, keyed by page URL, like the checkboxes), units is site-wide (one preference, like the theme toggle) — a taste for metric or imperial isn't specific to one recipe.
- **Real design problem worth recording**: the regex in 6.2b that matches a leading quantity treats a plain space and a hyphen/en-dash as the same kind of separator (it has to, to match both "1 1/2" and "2-3" with one pattern) — so turning matched text into a real number meant disambiguating a mixed number from a range after the fact: if the second half of a split token contains a "/", it's read as the fractional part of a mixed number and added to the first half; otherwise the two halves are a range's endpoints. Verified against the real corpus's actual shapes (`1½`, `¾`, `1 1/2`, `3–4`) via the browser, not assumed.
- **Scoped down on purpose**: non-convertible count units (cloves, heads, cans, pinches, sprigs, bunches, ...) have no conversion table and aren't re-pluralized when the count changes ("2 clove" not "2 cloves") — correctly pluralizing "bunch"/"pinch" isn't a flat "+s" rule, and getting it wrong silently would be worse than leaving the original word alone. Same tolerance this file already documented for its qty-matching heuristic ("harmless fallback, not a broken layout").
- Verified in an actual Chrome window (light + dark), on `dal-tadka` (multi-component, fractions, a range, mixed g/L/tbsp/tsp units): preset and custom scaling math (including fraction rounding like ¾×2.5→1⅞, and range scaling 3–4×2.5→7½–10), metric↔imperial conversion in both directions, one menu governing both `## Dal` and `## Tadka` sections, `localStorage` persistence of both scale and units across a reload, and the default 1×/as-written state rendering pixel-identical to before this feature (it just restores the untouched original text rather than reformatting it).
- This absorbs the "servings scaling" and "portion scaling and measure conversion" line items that Phase 7 and Phase 9 had scoped to a future `warped-food.js` — done here instead since it only touches the same qty spans `ingredients.js` already owns; Phase 9's `warped-food.js` still owns the *other* ingredient features on those lists (optional-ingredient toggle, substitutions, shopping list, pantry tool).

Still open from the original 6.2 scope, unblocked by either piece above:

- [ ] `layouts/recipes/single.html`: title, taxonomy row (cuisine chip + tags), stat rail from frontmatter
- [ ] Render hook or shortcode for the Mechanic callout
- [ ] Numbered-step vs. prose procedure — both need to work, since FORMAT.md allows either
- [ ] Notes list, notes sub-section, variation blocks
- [ ] `layouts/recipes/list.html`: the recipe card grid, using whichever card design won in 6.0
- [ ] Same pass for `layouts/essays/` and `layouts/reference/` once there's real content to verify against

### 6.3 — Homepage ✅ done 2026-09-17

- [x] `layouts/index.html`, built from `mockups/archived/homepage.html`'s structure with real Hugo data throughout — `where site.RegularPages "Section" "recipes"`/`"reference"` for counts and "recently added" (`.ByDate.Reverse`, first 6), `.Site.Taxonomies.cuisine`/`.tags` (`.ByCount.Reverse`) for browse sections. No number in the template is hand-written. New `layouts/partials/recipe-card.html` (the ratified `.rcard`) is shared with the mega-menu/nav work below and will be reused by the recipes list page in 6.2.
- [x] Mega-menu: built in a full override of `layouts/partials/header/basic.html` (Blowfish's own nav/dropdown system doesn't support mega-panels at all, so this replaces rather than extends it — `config/_default/params.toml`'s `header.layout` changed to `"basic"` so it renders unwrapped, not inside the fixed/blurred chrome the other header layouts add). One real difference from the mockup: there's no `course` taxonomy configured (only `tag` and `cuisine`, see `hugo.toml`), so the "By course" column was dropped rather than faked — "By cuisine" + "Quick filters" (top real tags) instead.
- [x] Dropped the `featured` frontmatter field (was never used by any recipe) rather than wiring it up — see `DESIGN.md`. "Recently added" is plain real-date sorting.
- Also needed and built along the way: `config/_default/menus.en.toml` deleted (its `[[main]]`/`[[footer]]` menus became dead config once the nav and footer overrides stopped reading `.Site.Menus` — everything they need is either hardcoded structure or real taxonomy/section data now). The homepage hero's search button reuses Blowfish's real `#search-button`/Fuse.js search (and `/` shortcut) rather than being a fake input.
- **Real gap surfaced, not hidden**: Reference has 19 draft files but 0 published, and Essays has 0 files at all — confirmed both in a real `hugo --quiet` build (reference guides stat = 0, `.section-caveat` shown) and a `--buildDrafts` build (stat = 19, real titles/links appear in both the nav mega-panel and the homepage split section). This is accurate, not a bug — see Phase 2/8's draft-review backlog.
- **Now visually verified in a browser (2026-09-17)** — see the fixes below, found this way.

### Bugs found and fixed by an actual browser check (2026-09-17)

The "not yet visually verified" caveat above was real: three genuine bugs only showed up once someone looked at the rendered page, not from `hugo --quiet` building clean.

1. **Stat rail had no layout at all** — `.stat-rail`/`.stat`/`.stat-label`/`.stat-value` were added to the *mockup* (`mockups/style.html`) during 6.1 but never ported into the real site's `assets/css/custom.css`, so the hero and any future stat rail rendered as unstyled stacked text. Fixed by adding the missing rule block to `custom.css`.
2. **Cuisine/tag "top" lists were backwards** — `site.Taxonomies.cuisine.ByCount.Reverse` was used on the assumption `.ByCount` returns ascending order; it doesn't, it's already descending in this Hugo version, so `.Reverse` produced the *least*-common cuisines/tags first (a mega-menu showing eight cuisines all with count 1). Fixed in both `layouts/index.html` and `layouts/partials/header/basic.html` by dropping `.Reverse`.
3. **Dark-mode theme toggle collapsed to nothing in dark mode** — the footer button used Tailwind utility classes `hidden`/`dark:inline` for its icon/label swap. Blowfish's CSS is a static precompiled bundle (no build step runs here — see `custom.css`'s own header comment) containing only the exact `dark:` variants Blowfish's own templates use; `dark:hidden` exists (Blowfish's header icon toggle uses it) but `dark:inline` was never generated anywhere, so it silently did nothing and the button showed no icon or text at all once `.dark` was active. Fixed by switching to plain custom classes (`.tt-light`/`.tt-dark`) styled directly in `custom.css`, which doesn't depend on Tailwind's static class set. **Lesson for any future markup here: don't reach for a `dark:*` Tailwind utility unless it's grep-able in `themes/blowfish/assets/css/compiled/main.css` first** — if it's not already used somewhere in the shipped theme, it doesn't exist.

Also found and worth knowing: **the long-running `hugo server -D` dev process can go stale** after enough live-reload cycles across template/config edits in one session (one point in this session showed 83 recipes/0 reference guides — the *published-only* counts — despite `-D` being on, until the server was killed and restarted, after which it correctly showed 230/19). If preview numbers look wrong mid-session, restart the server before assuming the template is broken.

### A second, real browser session (Chrome, 2026-09-17) — four more bugs

Testing in an actual Chrome window (not just fetch/grep) surfaced four more real bugs the first pass missed, three of them only visible by physically opening the mobile drawer and looking at the footer at a narrow width:

1. **Mobile drawer collapsed to a sliver.** `.drawer-panel`/`.drawer-backdrop` used `position: absolute`, which anchors to `.site-nav-inner` (`position: relative`) — a box only as tall as the nav bar, not the viewport. `top:0; bottom:0` on that short box collapsed both to the nav bar's own height, clipping every drawer link. Fixed by switching both to `position: fixed` (`assets/css/custom.css`).
2. **Drawer's X button and backdrop click did nothing.** `<details>` alone has no way to close itself except re-clicking the `<summary>` — the mockup this was ported from had a small inline `<script>` wiring backdrop/close-button clicks to `drawerToggle.open = false`, which never got carried over when the nav was rebuilt as a Hugo partial. Added it back (`layouts/partials/header/basic.html`); also changed the close control from a non-interactive `<span aria-hidden="true">` to a real `<button>` so it's keyboard/screen-reader reachable too.
3. **Footer theme-toggle button stretched into a tall, narrow pill instead of staying compact** — `.foot-row`'s flex row had no `align-items`, so it defaulted to `stretch`; on any line where the toggle shared space with the taller `.foot-links` column (which happens at both narrow width, where brand/links/toggle wrap, and was likely subtle at desktop width too), the toggle stretched to match. Fixed with `align-items: flex-start` on `.foot-row`.
4. **The dev-server draft staleness (noted above) is worse than "eventually goes stale" — it's "every single rebuild loses `-D`."** Confirmed repeatedly: a completely fresh `hugo server -D` start always shows the correct 230 recipes/19 reference guides; the *very first* live-reload rebuild after *any* file edit (CSS-only edits included) reliably drops back to published-only counts (83/0) even with `--disableFastRender`. **This only affects the live preview process** — a one-shot `hugo --quiet`/`hugo --minify` build (what an actual deploy uses) is unaffected, since each such run starts fresh. Practical rule: after editing anything while `hugo server -D` is running, kill and restart it before trusting what it shows — don't rely on live-reload for draft-inclusive preview in this Hugo version (v0.166, flagged as untested against this Blowfish version at startup — possibly related).

`tools/preview.sh` was updated to open in Chrome specifically (`open -a "Google Chrome"`) rather than the system default browser, since that's what the Claude-in-Chrome extension used to test this site can see.

### The real problem, found by comparing side by side against the mockup (2026-09-17)

The user pushed back hard on the work above ("fonts are incorrect, colours, layouts don't match... maybe 50% there") — correctly. The checks up to this point were all *piecemeal*: grepping for a class name, reading one computed style at a time. None of it was an actual side-by-side comparison against the real mockup. Doing that (serving `mockups/` over `python3 -m http.server` and opening both it and `localhost:1313` in Chrome at the same viewport) found the actual root cause in about five minutes:

**The entire site's page background was plain white, everywhere, in both light and dark mode — never the warm cream `--bg` token.** Blowfish's `<body>` tag (`themes/blowfish/layouts/_default/baseof.html`) is hardcoded to Tailwind's `bg-neutral` class (no numeric suffix). `bg-neutral` resolves to `--color-neutral`, which every scheme file — including the one generated for this project — hardcodes to pure white as a matter of Blowfish convention (confirmed identical across all the theme's shipped schemes). None of the `assets/css/schemes/not-a-chef.css` ramp work in 6.1 ever touched this, because `bg-neutral` never reads the ramp at all. The same bug hit the search modal (`#search-modal` also used bare `bg-neutral`). Every other color check that passed (accent color, card borders, chip colors) was real, but they were all sitting on the wrong canvas — which is exactly the kind of thing that reads as "colors don't match" without any single element being obviously broken in isolation.

Fixed both with direct overrides in `assets/css/custom.css` (`body { background-color: var(--bg) }`, `#search-modal { background-color: var(--surface) }`), verified with exact computed-style comparison against the mockup (`rgb(243, 243, 236)` / `#F3F3EC` matches exactly in both) and a screenshot comparison at matching viewports.

**Also found and fixed in this pass**: a recipe page's `## Mechanic`/`## Ingredients` headings were rendering in Lora (serif) instead of Libre Franklin — the blanket `.prose { font-family: Lora }` rule from 6.1 caught headings too, when STYLE.md's split is by role (headings vs. body text) not by container. Fixed with `.prose :where(h1,h2,h3,h4,h5,h6) { font-family: 'Libre Franklin' }`.

**Lesson, stated plainly**: checking that a CSS rule exists in the bundle, or that one element's computed style matches one token, is not the same as verifying the page matches the design. The only check that actually caught the body-background bug was opening the real mockup HTML next to the real site in the same browser and comparing them directly — do that first on any future visual-parity claim, not last.

### Header/footer weren't full-bleed (2026-09-17, user-reported)

The user caught this by eye at desktop width: the header and footer bars didn't span edge to edge — they had visible margins on both sides instead of their background reaching the browser window's edges. Real cause: `layouts/partials/header/basic.html` and `footer.html` render as direct children of Blowfish's `<body>`, which is hardcoded (`themes/blowfish/layouts/_default/baseof.html`) to `max-w-7xl` plus responsive padding up to 128px per side at wide viewports — that's Blowfish's own layout, untouched by anything in Phase 6 so far. `.site-nav`/`.site-footer` inherited that inset instead of reaching the real viewport edges. Only visible on a wide window — every screenshot up to this point in the session had been at a narrow (~430–500px) width, where 128px of padding doesn't apply and the bug is much less obvious (Blowfish's own responsive padding starts at just 24px there).

Fixed without touching `<body>` (which not-yet-customized pages like the recipe single/list, essays, and reference pages still rely on for their own layout) — a standard full-bleed breakout on `.site-nav`/`.site-footer` in `assets/css/custom.css`:
```css
.site-nav, .site-footer {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```
This cancels out body's padding/max-width/centering exactly regardless of viewport width (verified algebraically and by checking `getBoundingClientRect()` at 1320px: nav now spans -4px to 1316px, i.e. the full window width, the ~4px either side being the well-known/accepted vw-vs-scrollbar rounding this technique has). The inner `.site-nav-inner`/`.site-footer-inner` (`max-width:1100px; margin:0 auto`) still center correctly inside the now full-width bar, matching the mockup exactly. Confirmed the mega-menu dropdown (positioned relative to the nav item, not the bar) was unaffected.

**Another point for the "check at more than one viewport" list**: this session's whole visual-audit pass (the one that found the body-background bug) was done at a narrow width by habit, left over from testing the mobile drawer. A real design-parity check needs at least one desktop-width pass too — bugs don't scale evenly across breakpoints.

### More bugs found by continued real review (2026-09-17)

- **Article prev/next pagination was completely untouched Blowfish default** (bare Tailwind utilities, no padding, a thin dotted `<hr>`) — no mockup ever covered it, since recipe/reference/essay single pages are still Blowfish's stock layout (Phase 6.2). Overrode `layouts/partials/article-pagination.html` to match the system (section divider, accent-colored label, proper spacing) since it's small and was visibly broken in the meantime — but the rest of that page's furniture (breadcrumbs, title/meta block, draft badge, TOC) is *still* default and still Phase 6.2's job, not done by this fix.
- **That same component then had a real, measured spacing bug**: three uncoordinated margins (`.article-content`'s Tailwind `mb-20`, the wrapping `<footer>`'s Tailwind `pt-8`, and the new component's own `margin-top`) stacked to 152px of dead space before the divider, while *nothing* separated the component from the site footer after it (measured gap: exactly 0px) — found only by `getBoundingClientRect()` on the actual DOM, not by looking at a screenshot. Zeroed the two Blowfish sources so the component's own margin is the single, deliberate source of spacing on both sides now (measured: 60px before, 40px after).
- **The homepage's Essays section was static, unlike Reference's live-data version** — it always rendered "No essays published yet" with zero content binding, while Reference was built properly data-driven from the start. Real essays got added to the vault after the homepage was built (`content/essays/food-memories/*.md`), and the homepage never picked them up — not a regression, a gap that was invisible only because essay count happened to be zero when it was built. Made Essays data-driven the same way as Reference: real count in the dek, a `.browse-list` of recent essays when any exist, a "View all" link past 5. **General lesson: any "no X yet" placeholder branch needs to be revisited once real X starts existing — it won't announce itself, since the whole point of the placeholder is that it looks intentional either way.**
- **That first essays fix was itself an IA mistake, caught immediately**: the flat essay list rendered *below* all four format tiles with no visual connection to them — all 5 real essays happen to be "Food memories," but nothing said so. Fixed by nesting each format's essays under its own tile instead, matched by content path (`content/essays/food-memories/` → the "Food memories" card) rather than a tag, since `FORMAT-ESSAYS.md` has no formal `format` field yet — only the other three (empty) tiles stay as pure descriptions. If essays for a second format show up, the same path-matching approach picks them up automatically; if the four-format split gets used heavily, formalizing a real `format` frontmatter field (rather than inferring it from folder path) is worth revisiting then, not now.

### Header vs. content width mismatch, and the fix that then broke default pages (2026-09-17)

User caught the nav rendering *wider* than the hero/homepage content below it. Measuring both (`getBoundingClientRect`) showed why: 6.1's full-bleed fix freed `.site-nav`/`.site-footer` from Blowfish's `<body>` padding (up to 128px per side at wide viewports), but never freed the actual page content — `.hero`'s own `max-width:1100px` was capped by body's *narrower* available space instead of ever reaching its own 1100px, while the nav (already escaped) correctly hit the full 1100px. Same root cause as the full-bleed fix, just the half that got left unfixed.

Removing `<body>`'s padding/max-width entirely fixed the homepage — but immediately broke every still-default Blowfish page (recipe/essay/reference singles and lists, Phase 6.2), which had no centering or gutter of their own and were relying entirely on body's padding for it; their content bled to the true viewport edges (user caught this too, live, mid-fix). Fixed by centering `<main>` (the one wrapper common to both our custom homepage and Blowfish's defaults) at the same 1100px column instead — the homepage's nav/hero alignment stays exact (each already carries its own 20px padding, so no double-gutter), and default pages get *a* gutter back, just without their own extra 20px inset yet (a known, minor, visible gap versus the custom sections' — consistent with those templates simply not being rebuilt).

Also: **a second, different kind of dev-server staleness** showed up here — after this CSS edit, the served page kept using the *old* fingerprinted CSS bundle (verified: `hugo --quiet`'s one-shot `public/` build had the fix; the long-running `hugo server` didn't, even with `--disableFastRender`) until `resources/_gen` was deleted and the server restarted. Not the same bug as the draft-count staleness noted earlier, but the same lesson: **don't trust a long-running `hugo server -D` session's output after any edit — restart it and re-verify, every time**, for content state and for asset content both.

### The `<main>` fix didn't actually work — a flexbox gotcha (2026-09-17)

User caught the reference page's header still misaligned with its content, well past what "still-default pages get a smaller gutter" should explain. Measuring `<main>` directly showed why: it was rendering at 646px (matching `article`'s own `max-w-prose` cap) instead of the 1100px the new rule asked for — `max-width:1100px` was computed correctly, but `<body>` is `display:flex;flex-direction:column` (Blowfish's own layout) and `<main>` is a flex item, and **`margin:0 auto` alone on a flex item with no explicit width doesn't stretch-then-center the way it does on a normal block — it makes the item shrink-to-fit its content instead, silently ignoring `max-width` as a *cap* (since there's nothing to cap; the item was never trying to be wide in the first place).** Fixed by adding `width: 100%` to the same rule, forcing `<main>` to take the full cross-axis size before `max-width` has anything to actually cap.

**Verified with an actual full sweep this time**, not a spot check: measured `.site-nav-inner`/`main`/`.site-footer-inner`'s left position and width via `getBoundingClientRect()` on all of — homepage, recipes list, a recipe single, essays list, an essay single, reference list, a reference single, `/tags/`, a tag term page, `/cuisine/`, a cuisine term page, `/the-food-log/`, `/vlog/`, a vlog single — plus dark mode. All now measure identical (same left edge, same 1100px width) on every one. This is the level of check that should have run right after the original `<main>` fix, not after the user found the gap a second time.

### List-page pagination (page 1/2/3…) was also untouched Blowfish default

Same story as `article-pagination.html`, different component: the numbered pager at the bottom of listing pages (`layouts/partials/pagination.html`) was still bare Tailwind utility classes (`mx-1`, no padding, no border) — no target size, no visual weight, nothing matching the system. No mockup ever covered it either. Overrode it with a pill treatment matching `.filter-pill` (border, radius, padding; accent-soft fill for the current page), and gave it its own `margin: 40px 0` rather than leaning on Blowfish's `mt-8` plus whatever the footer happens to add (the exact class of bug found in `article-pagination.html` moments earlier). Verified on both a short pager (`/reference/`, 2 pages, clicked through to page 2) and a long one with ellipsis (`/recipes/page/4/`, 20 pages — `← 1 2 3 4 5 6 … 20 →`), and measured the gap before the footer directly (40px, deliberate).

### 6.4 — Verify

- [ ] Build incrementally (nav → recipe single → recipe listing → homepage → footer), `hugo --quiet` + visual check after each section, not one big-bang build
- [ ] Dark mode check across all three content types once 6.1's `.dark`-class targeting is confirmed working
- [ ] Cross-check `public/recipes/index.json` numbers against what the mega-menu/homepage actually render, to catch any live-data wiring bugs

**Output:** The mockups become the actual site. A cookbook, not a generic blog, in both light and dark mode, with the recipe index as the live source of truth rather than a number copied into a mockup by hand.

## Phase 7: UX improvements

Four areas, roughly in priority order. Some of this depends on Phase 6 landing first since card and typography decisions affect layout work here.

**Recipe browsing and filtering**
- [ ] Verify the `tags` and `cuisine` taxonomy pages are usable as filters, not just link dumps
- [ ] Check Fuse.js search relevance against real recipe titles, tags, and ingredient text
- [ ] Add sort or filter controls to the recipe listing (by cuisine, prep time, tag) if Blowfish supports it natively; otherwise scope a shortcode

**Single recipe readability**
- [ ] Print-friendly view: ingredients and method only, no nav chrome, works from a browser print dialog — implementation now owned by Phase 9's `warped-food.js`, not scoped separately here
- [x] Servings scaling (multiply ingredient quantities on the page) — done in 6.2c, in `assets/js/ingredients.js` rather than `warped-food.js`
- [ ] Mobile layout check for the "phone propped up while cooking" case: large touch targets, no accidental nav taps
- [ ] Confirm wiki-link cross-references (e.g. `[[Pizza Sauce]]` as an ingredient) are visually clear as links, not just plain text

**Essay and reference layout**
- [ ] Migrate at least one real essay from the vault so the default article layout gets verified against real content (currently unverified, see Phase 3)
- [ ] Table of contents behavior on long reference pages (technique guides, glossaries)
- [ ] Resolve CSV/table rendering (Phase 3b) as part of this pass, not separately

**Navigation and homepage**
- [ ] Verify the built homepage (Phase 6.3) reads well against real content, not just the mockup's hand-picked six recipes — iterate on layout/copy once it's live
- [ ] Verify the footer taxonomy links (Tags, Cuisines) work end to end
- [ ] Cross-link essays and reference pages to related recipes where it makes sense

**Output:** The site is easy to browse, easy to cook from on a phone, and essays/reference pages don't feel like an afterthought.

## Phase 8: Publishing tools

Two unrelated tracks under one banner: finishing the deploy pipeline, and building tooling for the draft-review backlog from Phase 2.

**Finish self-hosted deploy**

This is Phase 5, unchanged. Listed here again only because it's part of "publishing tools" as a project: decide on host, write `tools/deploy.sh`, test a full deploy end to end.

**Draft review tooling**

144 of 153 family-archive recipes are still `draft: true` (see Phase 2). Reviewing them one at a time by hand is slow. Scope some tooling to speed it up:

- [ ] A review workflow, likely a `/review-draft` command, that surfaces one draft at a time with a summary (title, tags, source folder) and a clear publish/merge/discard decision
- [ ] A duplicate report: cross-reference draft titles against published personal recipes to flag likely overlaps before review starts, so obvious duplicates get triaged first
- [ ] A way to flip `draft: true` → `false` without hand-editing YAML frontmatter, either a CLI flag on an existing tool or a small standalone script
- [ ] Surface review progress somewhere visible (e.g. a count in `public/recipes/index.json` or a note in `CLAUDE.md`), so it's obvious how much backlog remains without grepping frontmatter

**Output:** Deploy is a single command. The 144-draft backlog has a workflow instead of being 144 individual manual edits.

## Phase 9: Recipe format specification & warped-food.js

Two tracks under one banner: formalizing the recipe format as a testable spec, and a vanilla-JS enhancement layer for recipe pages modeled on `warped.js` (`~/projects/sites/warped.js/warped.js`, the site-JS for warpedvisions.org) but not sharing a file with it — see the standing decision below.

**Architecture decision: three layers, not one.** Working through the full feature wishlist (see below) surfaced that not everything belongs in client JS. Every feature is placed in exactly one of: **source** (hand-authored Markdown/YAML, unchanged), **build-time enrichment** (Hugo computes static JSON from source + `data/` files at `hugo build` time — no server, no database, same mechanism `layouts/recipes/list.json.json` already uses for `public/recipes/index.json`), or **client-time** (`warped-food.js`, reading the rendered page and the build-time JSON). Full mapping in `SPEC.md` §7.

**Explicitly deferred, not designed around a guess:** saved recipes, personal notes, ratings, and reader-side change-tracking. Any version of these worth having needs state shared across family members' devices, which needs a backend — that breaks the "no CMS, static site" decision already on record in `ARCHITECTURE.md`. A local-only (`localStorage`) fallback was considered and also deferred rather than shipped as a lesser version. Author-side change tracking already exists today for free: git history on `content/recipes/`. Revisit once the rest of this phase is real and the itch is still there. See `SPEC.md` §10.

**Recipe format specification**

FORMAT.md is prose guidance, and `/lint` (Phase 0/DESIGN.md) only checks a handful of frontmatter basics. Neither is precise enough to test a recipe file for structural conformance the way the `recipe-writing` skill checks voice and style. This track writes that missing layer.

- [x] Write `SPEC.md`: a normative version of FORMAT.md using RFC 2119 language (MUST/SHOULD/MAY) — frontmatter schema, the ingredient line grammar (extended with an `(optional)` marker), a new `####` convention for grouping ingredients within one component, two new optional body sections (`## Equipment`, `## Substitutions`), and the two new `data/` files the format now depends on (`ingredient_prices.yaml`, `departments.yaml`). Versioned `0.1.0` (draft), not `1.0.0` — FORMAT.md updated to point to it and stays the human-readable companion, not a competing source of truth
- [ ] Prototype ingredient-name canonicalization (matching `"450g butternut squash, peeled and diced"` → `butternut squash`) against a real slice of `content/recipes/` before committing further to `data/departments.yaml`'s shape — `SPEC.md` §6 flags this as the fragile part of the whole spec, worth de-risking early
- [ ] Write a validator (`tools/validate_recipe.py` or an extension of `/lint`) that checks a recipe file against `SPEC.md` mechanically: frontmatter types, ingredient-line parse success rate, `## Substitutions` grammar, `####` ingredient-group placement
- [ ] Run the validator against all published recipes as a baseline; file discrepancies as spec bugs (the recipe is fine but the spec doesn't describe it) or content bugs (the recipe doesn't conform) rather than assuming the recipe is wrong
- [ ] Wire the validator into `/lint` so structural conformance and the existing frontmatter checks run together, one command

**Build-time enrichment (Hugo)**

New layouts/partials, not part of `warped-food.js`:

- [ ] Extend `layouts/recipes/list.json.json` (or add a sibling output) with parsed ingredients per recipe — the shared input every client-time ingredient feature below reads
- [ ] `data/ingredient_prices.yaml` (ingredient → approximate unit price, hand-maintained, carries an `updated:` date) joined at build time into a per-recipe cost estimate — approximate by design, not a grocery total (`SPEC.md` §6)
- [ ] `data/departments.yaml` (canonical grocery department order, outside-in, + ingredient → department mapping) — shared by the shopping-list and pantry-tool features below
- [ ] A schema.org `Recipe` JSON-LD partial in `<head>`, built from frontmatter + `## Equipment` — this is the "auto-SEO structured schema" ask; it's a Hugo template concern, not a `warped-food.js` feature
- [ ] Verify Hugo's native related-content feature (keyed on `tags`/`cuisine`) produces reasonable suggestions before considering a manual `related:` frontmatter override
- [ ] A site-wide `public/link-index.json` (a new custom Hugo output format, home-scoped — e.g. `linkindex` — not the existing `home = [..., "JSON"]` entry, which is Blowfish's own search index and already owns `public/index.json` via `search.js`) mapping every page's `title` and vault-relative path (`.File.Dir` + `.File.ContentBaseName`) to its `RelPermalink`. Covers recipes, essays, and reference alike — unlike `public/recipes/index.json`, which is recipes-only. This is the resolution source for wiki-link resolution below
- [ ] Meta-description fix: `og:description`/`twitter:description` fall through to Blowfish's raw-content auto-summary whenever a page has no frontmatter `description`/`summary`, which leaks literal `[[Title]]` syntax into social/link-preview cards on any page whose opening lines contain a raw wiki-link (confirmed on `soft-sandwich-bun-research.md` during the investigation below). Fix by requiring/defaulting a clean `description`/`summary` on affected pages, or stripping wiki-link brackets at the template level — this is a build-time, non-JS fix, since crawlers and link-unfurlers don't execute `warped-food.js`

**`warped-food.js`**

A single dependency-free JS file, `static/js/warped-food.js`, loaded on recipe pages only. Follows `warped.js`'s shape (a different file, not a shared one — see the architecture note above): one IIFE-scoped namespace object, a `window.WarpedFoodConfig` override merged over sane defaults, a debug flag gated `_d()` logger, a DOM-element cache populated once, event delegation instead of per-element listeners, and every public method wrapped so a failure in one feature can't break the others or block page render.

- [ ] Scaffold the file: namespace object, config merge, cache init, debug logging, auto-init on `DOMContentLoaded` — structurally mirror `warped.js`, not its branding/rainbow-link content
- [x] ~~Ingredient helpers: portion scaling and measure conversion~~ — done in 6.2c, in `assets/js/ingredients.js` instead of here
- [ ] Optional-ingredient toggle using the `(optional)` marker, reading the shared ingredient grammar in `SPEC.md` §3
- [ ] Print view: a toggle that condenses the page into ingredients + method only, tuned for a browser print dialog (absorbs the Phase 7 print-friendly-view goal)
- [ ] Cook mode: larger text, no accidental nav taps, keep-awake if the Wake Lock API is available — UI-only, no data dependency
- [ ] Substitutions: parse `## Substitutions` into an interactive ingredient-swap control on top of the section's static rendering (progressive enhancement per `SPEC.md` §5)
- [ ] Shopping list: assemble a department-ordered list (outside-in) across a reader's selected recipes, reading `data/departments.yaml`'s build-time output
- [ ] Win-the-fridge / pantry tool: given on-hand ingredient names, surface matching recipes, reading the same canonicalized ingredient vocabulary as the shopping list
- [ ] Ingredient/step check-off: tap an ingredient or method sentence to strike it, state kept in `localStorage` per recipe slug so it survives a reload mid-cook
- [ ] Wiki-link styling for in-recipe cross-references (`[[Pizza Sauce]]` as an ingredient): visually distinguish these from a plain external link, using this site's actual STYLE.md tokens rather than `warped.js`'s rainbow-hue technique
- [ ] Wiki-link *resolution*, upstream of the styling item above and solved client-side on purpose: raw Obsidian `[[Title]]` / `[[Title|Display]]` / `[[path/to/note]]` syntax is never converted into a real link today, and can't be — tested directly (2026-09-18) by repurposing the already-enabled `passthrough` goldmark extension to claim `[[`/`]]` as an inline delimiter with a `render-passthrough.html` hook; it never fired, because goldmark's built-in link parser already owns `[` as its trigger character and swallows unresolved `[[...]]` as literal text before any render hook (passthrough or `render-link.html`) gets a turn. Native (Go-level) parsing would need a custom goldmark inline parser and a non-standard Hugo build — disproportionate for this site. So: on `DOMContentLoaded`, walk text nodes under `.article-content` (skip `<code>`/`<pre>`), regex-match the three wiki-link forms above, resolve each against `link-index.json`, and rewrite matches to real `<a class="wikilink">` tags (feeding the styling item above); leave unresolved matches as visible plain text, same spirit as `render-link.html`'s `broken-link` fallback, so a typo'd reference stays visible rather than silently vanishing. Explicitly not fixed by this: meta descriptions, OG/Twitter cards, RSS — none run JS, hence the separate build-time fix above
- [ ] Verify degrade-safe: JS disabled or failing shouldn't remove content, only the enhancement — recipe still fully readable and printable via browser defaults. Doubly true for wiki-link resolution above: with JS off, a raw `[[Title]]` renders as plain bracketed text, not a broken link or a crash

**Output:** A recipe file can be checked for structural conformance the same way `/lint` already checks frontmatter, recipe pages carry build-time SEO/cost/related data with no JS required to see it, and `warped-food.js` layers cooking-time interactivity on top without a framework or build step.

---

## Dependencies

```
Phase 0 → Phase 1 → Phase 2
                 ↘           ↘
                  Phase 3   Phase 4
                       ↘       ↓
                        Phase 5
```

Phase 0 is a blocker for everything. Phase 1 and Phase 3 can overlap once Phase 0 is done. Phase 4 (Obsidian install) can start as soon as Phase 1 is complete enough to test against.

Phases 6, 7, 8, and 9 sit outside this chain:

- **Phase 6** (theme) and **Phase 7** (UX) only need Phase 1's published recipes to preview against. Neither depends on Phase 2's draft backlog or on Phase 5. Do Phase 6 before Phase 7: card and typography decisions there affect the layout work in Phase 7.
- **Phase 8** is two independent tracks. The deploy track duplicates Phase 5, do that work once, not twice. The draft-review-tooling track depends only on Phase 2 already being underway (it is) and can start any time.
- **Phase 9** is also two independent tracks. The spec/validator track only needs Phase 1's corpus to test against and can start any time after that. The `warped-food.js` track should follow Phase 6, since its wiki-link styling pulls from STYLE.md's settled tokens rather than inventing its own; it absorbs the two client-side stretch goals originally sketched in Phase 7, so do it instead of those, not in addition to them.
