## Hugo

Static site generator. Builds the site from Markdown content and Go templates.

**Why Hugo:** Fast builds, excellent Markdown support, first-class YAML frontmatter, taxonomy system for tags and cuisines, no JavaScript build pipeline required for basic operation. The Blowfish theme is Hugo-specific.

**Version:** Hugo extended (required by Blowfish for Tailwind CSS processing). Install via Homebrew: `brew install hugo`.

## Blowfish

Hugo theme. Installed as a git submodule in `themes/blowfish/`.

**Why Blowfish:** Feature-complete for this project — responsive, dark mode, search, taxonomies, multiple list layouts. Tailwind-based so it's easy to customize. Actively maintained.

**Docs:** https://blowfish.page

## Python (tools)

Python 3.11+. No virtual environment required for the simple tools; add one if dependencies grow.

### python-frontmatter

Parses Markdown files with YAML frontmatter into a Python object. Used by `migrate.py` (retired); the current tools (`frontmatter.py`, `drafts.py`) are stdlib only and don't need it.

```
pip install python-frontmatter
```

**Why:** Simple API for the exact task (read frontmatter + body, modify frontmatter, write back). Handles YAML edge cases that a manual regex approach would miss.

### click

CLI framework for `migrate.py` (retired). Not needed by any current tool.

```
pip install click
```

**Why:** Cleaner than argparse for tools with subcommands, options, and help text. Standard for Python CLI tools.

### tomllib

Built-in Python 3.11+ stdlib module for reading `tools/config.toml`. No install required.

### rich (optional)

Formatted terminal output (tables, progress, coloured status lines).

```
pip install rich
```

**Why:** Was for `migrate.py`'s output (retired). No current tool uses it.

## No Node.js dependency

recipe-book (deprecated) used Node.js and TypeScript for the parser/CLI. This project does not. Hugo handles Markdown natively; the Python tools handle file transformation. Client-side features (scaling, unit conversion, the sidebar, search) are plain JS in `assets/js/`, served as-is with no build step or package manager. If a validator is needed later (`SPEC.md` §8), it can be a standalone Python tool.

## Deployment

No specific library — `tools/publish.sh` builds and checks `public/`, then `tools/deploy.sh` rsyncs it to the server. Requires SSH access to the host. `make deploy` runs both.
