# Libraries

What the site needs to build, deploy, and edit, and why each piece is there. Nothing here is installed by a package manager: Hugo and the themes do the work, and the tools are stdlib Python and shell.

## To build

### Hugo (extended)

Static site generator. Builds the site from Markdown content and Go templates.

**Why Hugo:** fast builds, native Markdown and YAML frontmatter, a taxonomy system for tags and cuisines, render hooks for wiki links and diagram blocks, and output formats for `public/recipes/index.json`. No JavaScript build pipeline.

**Version:** the extended build, 0.163.0 or later (Fugu's `min_version`, from Blowfish; Fugu's CI tests 0.166.0). `brew install hugo` installs extended.

### Git

Both themes are git submodules (`git submodule update --init` on a fresh clone), and `enableGitInfo` reads each page's last commit for its **Updated** date. A build from a tarball, without `.git`, loses those dates.

### Fugu

The cookbook theme, a git submodule in `themes/fugu/` ([hugo-theme-fugu](https://github.com/robotpony/hugo-theme-fugu)). Page templates, render hooks (wiki links, formula and stack diagrams), recipe cards, sidebars, the client JS, the icon kits, archetypes, and the content tools. Its own docs are in `themes/fugu/docs/`.

**Why a separate theme:** the cookbook parts are reusable; the Not a Chef look (`custom.css`, colour scheme, homepage, header, footer, fonts) stays in this repo. See ARCHITECTURE.md "Hugo site" for the lookup order.

### Blowfish

The base theme under Fugu, a git submodule in `themes/blowfish/` ([docs](https://blowfish.page)). Fugu overrides most of its layouts, since none matched the settled design (`mockups/STYLE.md`); what's left from Blowfish is the base page shell and CSS, anything neither Fugu nor this repo overrides, and the vendored Fuse.js.

### Fuse.js

Fuzzy search, vendored by Blowfish (`themes/blowfish/assets/lib/fuse/`, v7.5.0 at the pinned submodule). Fugu's `partials/head.html` loads it, and `themes/fugu/assets/js/search.js` searches the site's index with it, pinned pages first.

The other client JS (`ingredients.js`, `automagic-sidebar.js`) is plain, dependency-free, and served with no build step.

### Google Fonts

Libre Franklin, Lora, and IBM Plex Mono, loaded from Google Fonts in `layouts/partials/fonts.html` (kept in sync with `mockups/STYLE.md`). Not self-hosted.

## To deploy

- **Python 3.11+**, for `tomllib`: `tools/deploy.sh` reads `tools/config.toml` with it and looks for a `python3.1x` on `PATH` first, since macOS's system `python3` can be older.
- **rsync and SSH** to the host; `tools/deploy.sh` sends `public/`. See README "Setup" for the SSH alias.

## Content tools

In `themes/fugu/tools/`. Python 3.11+, standard library only, no virtual environment.

- `frontmatter.py`, `drafts.py`: frontmatter checks and edits, the drafts list.
- `compare-builds.py`: diffs two builds of a site, for theme changes. Uses Hugo and Git.
- `screenshots.py`: retakes Fugu's docs screenshots. Needs Google Chrome (headless).
- `add-image.sh` (`/image-add`): needs **ImageMagick 7** (`magick`) and **exiftool** (`brew install imagemagick exiftool`).

## Mockups

The mocks in `mockups/` are static HTML, opened directly in a browser. One script needs **Node.js**: `mockups/export-layers.mjs` writes Fugu's layer kit SVGs from `exploded-builds.html` (stdlib only, no `npm install`). Nothing in the site build uses Node.

## Not used

- **Node.js in the build.** recipe-book (deprecated) used Node and TypeScript for its parser and CLI. Hugo handles Markdown here, and the client JS ships as written.
- **Third-party Python packages.** The retired `tools/migrate.py` used `python-frontmatter`, `click`, and `rich`; no current tool does. If the format validator (FORMAT.md §Validation) needs a dependency, it belongs to Fugu.
