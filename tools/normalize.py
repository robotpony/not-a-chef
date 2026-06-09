#!/usr/bin/env python3
"""
normalize.py — Normalize and migrate the family archive from the gdrive vault.

Routes files to content/recipes/, content/essays/, or content/reference/
based on folder path and content. All output is draft: true for manual review.

Run with no arguments to process all new or changed files.
Run with file paths (relative to source root) to process specific files.
"""

import os
import re
import sys
import tomllib
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote

import click
import frontmatter
import yaml


SKIP_FILES = frozenset({
    "Recipe Template.md",
    "How to add a recipe.md",
    "About the Alderson Family book of recipes.md",
})

GDRIVE_KEYS = frozenset({"gdrive_id", "gdrive_path", "google_document", "synced"})

FIELD_ORDER = [
    "title", "tags", "source", "author", "date", "servings",
    "prep_time", "cook_time", "total_time", "cuisine",
    "draft", "description", "featured",
]

# Longest-prefix-first so specific paths match before their parents
FOLDER_TAG_MAP = [
    ("Mains/Breakfast",              ["mains", "breakfast"]),
    ("Mains/Casseroles",             ["mains", "casseroles"]),
    ("Mains/Curries",                ["mains", "curries"]),
    ("Mains/Dumplings",              ["mains", "dumplings"]),
    ("Mains/Mashes",                 ["mains", "mashes"]),
    ("Mains/Meat/Beef",              ["mains", "beef"]),
    ("Mains/Meat/Burgers",           ["mains", "burgers"]),
    ("Mains/Meat/Pork",              ["mains", "pork"]),
    ("Mains/Meat/Poultry",           ["mains", "poultry"]),
    ("Mains/Meat",                   ["mains"]),
    ("Mains/Rice bowls",             ["mains", "rice-bowls"]),
    ("Mains/Soups",                  ["mains", "soups"]),
    ("Mains/Stews",                  ["mains", "stews"]),
    ("Mains/Stir fries",             ["mains", "stir-fries"]),
    ("Mains",                        ["mains"]),
    ("Appetizers and sides",         ["appetizers", "sides"]),
    ("Bases and flavour bombs",      ["bases"]),
    ("Breads and pastas",            ["breads"]),
    ("Desserts",                     ["desserts"]),
    ("Drinks",                       ["drinks"]),
    ("Salads",                       ["salads"]),
    ("Sauces, dips, and condiments", ["sauces"]),
]


class _FlowListDumper(yaml.Dumper):
    """YAML dumper that serializes lists as flow sequences: [a, b, c]."""
    pass

_FlowListDumper.add_representer(
    list,
    lambda d, v: d.represent_sequence("tag:yaml.org,2002:seq", v, flow_style=True),
)


# ---------------------------------------------------------------------------
# Config / path resolution
# ---------------------------------------------------------------------------

def _load_vault_config() -> dict:
    config_path = Path(__file__).parent / "config.toml"
    if config_path.exists():
        with open(config_path, "rb") as f:
            return tomllib.load(f).get("vault", {})
    return {}


def _resolve_source(arg: str | None, vault: dict) -> Path:
    path = arg or os.environ.get("VAULT_GDRIVE_PATH") or vault.get("gdrive")
    if not path:
        raise click.ClickException(
            "Vault gdrive path not configured. "
            "Use --source, set VAULT_GDRIVE_PATH, "
            "or copy tools/config.toml.example to tools/config.toml."
        )
    return Path(path).expanduser().resolve()


# ---------------------------------------------------------------------------
# Text helpers
# ---------------------------------------------------------------------------

def _slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def _clean_google_urls(text: str) -> str:
    """Replace Google redirect URLs with the actual destination URL."""
    def _replace(m):
        qs = parse_qs(urlparse(m.group(0)).query)
        urls = qs.get("q")
        return unquote(urls[0]) if urls else m.group(0)
    return re.sub(r"https://www\.google\.com/url\?[^\s\)\]\"']+", _replace, text)


def _normalize_bullets(text: str) -> str:
    """Convert '* item' list markers to '- item'."""
    return re.sub(r"^(\s*)\* ", r"\1- ", text, flags=re.MULTILINE)


def _extract_title_and_body(text: str, filename: str) -> tuple[str, str]:
    """
    Extract title from first # heading and remove it from body.
    Falls back to the filename stem if no heading is found.
    """
    text = re.sub(r"^IN DEVELOPMENT\s*\n?", "", text.strip(), flags=re.IGNORECASE)
    text = text.strip()
    m = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
    if m:
        raw_title = m.group(1).strip()
        # Strip inline images (including base64 data URLs embedded in headings)
        raw_title = re.sub(r"!\[.*?\]\(.*?\)", "", raw_title)
        title = raw_title.strip()
        body = (text[:m.start()] + text[m.end():]).strip()
        return title or Path(filename).stem, body
    return Path(filename).stem, text


def _infer_tags(src: Path, gdrive_root: Path) -> list[str]:
    """Infer tags from the file's folder path relative to the gdrive root."""
    try:
        rel = src.relative_to(gdrive_root)
    except ValueError:
        return []
    parts = rel.parts[:-1]
    if not parts:
        return []
    rel_dir = "/".join(parts)
    for prefix, tags in FOLDER_TAG_MAP:
        if rel_dir == prefix or rel_dir.startswith(prefix + "/"):
            return list(tags)
    return []


# ---------------------------------------------------------------------------
# Classification
# ---------------------------------------------------------------------------

def _classify(src: Path, gdrive_root: Path) -> str | None:
    """
    Return 'recipes', 'essays', 'reference', or None (unknown — flag for review).

    Routing rules:
      X. Appendices/**       → reference
      root-level files       → essays
      known recipe subfolders → recipes
      anything else          → None (flagged)
    """
    try:
        rel = src.relative_to(gdrive_root)
    except ValueError:
        return None

    parts = rel.parts

    if parts[0] == "X. Appendices":
        return "reference"

    if len(parts) == 1:
        return "essays"

    rel_dir = "/".join(parts[:-1])
    for prefix, _ in FOLDER_TAG_MAP:
        if rel_dir == prefix or rel_dir.startswith(prefix + "/"):
            return "recipes"

    return None


# ---------------------------------------------------------------------------
# Serialization
# ---------------------------------------------------------------------------

def _serialize(post: frontmatter.Post, duplicate_of: str | None = None) -> str:
    ordered = {k: post[k] for k in FIELD_ORDER if k in post.metadata}
    for k, v in post.metadata.items():
        if k not in ordered:
            ordered[k] = v
    yaml_str = yaml.dump(
        ordered,
        Dumper=_FlowListDumper,
        default_flow_style=False,
        sort_keys=False,
        allow_unicode=True,
    ).rstrip()
    if duplicate_of:
        yaml_str = f"# duplicate_of: {duplicate_of}\n{yaml_str}"
    return f"---\n{yaml_str}\n---\n\n{post.content.strip()}\n"


# ---------------------------------------------------------------------------
# Title index
# ---------------------------------------------------------------------------

def _build_personal_recipe_index(recipes_dir: Path) -> tuple[dict[str, Path], set[str]]:
    """
    Returns (title_index, slug_set) for non-draft (personal) recipes.
    title_index: lowercase title → path
    slug_set: set of stem names (slugs) for all non-draft recipe files
    """
    title_index: dict[str, Path] = {}
    slug_set: set[str] = set()
    if not recipes_dir.exists():
        return title_index, slug_set
    for f in recipes_dir.glob("*.md"):
        if f.name == "_index.md":
            continue
        try:
            post = frontmatter.load(str(f))
            if not post.get("draft", False):
                title = str(post.get("title", "")).strip()
                if title:
                    title_index[title.lower()] = f
                slug_set.add(f.stem)
        except Exception:
            pass
    return title_index, slug_set


# ---------------------------------------------------------------------------
# Per-file processing
# ---------------------------------------------------------------------------

def _process(
    src: Path,
    gdrive_root: Path,
    dest_root: Path,
    personal_index: dict[str, Path],
    personal_slugs: set[str],
    force: bool,
    dry_run: bool,
) -> tuple[str, str | None, Path | None]:
    """
    Process a single gdrive file.
    Returns (action, detail, dest_path).
    action: "new" | "updated" | "skipped" | "duplicate" | "error"
    """
    section = _classify(src, gdrive_root)
    if section is None:
        try:
            rel = src.relative_to(gdrive_root)
        except ValueError:
            rel = src.name
        return "flagged", f"unknown folder: {'/'.join(rel.parts[:-1])}", None

    try:
        post = frontmatter.load(str(src))
    except Exception:
        # Fallback: strip the --- block manually (gdrive YAML may have unescaped quotes)
        raw = src.read_text(encoding="utf-8", errors="replace")
        m = re.match(r"^---\n.*?\n---\n(.*)", raw, re.DOTALL)
        if m:
            post = frontmatter.Post(m.group(1))
        else:
            post = frontmatter.Post(raw)

    # Strip gdrive-only metadata
    for key in list(post.metadata.keys()):
        if key in GDRIVE_KEYS:
            del post.metadata[key]

    # Extract title and begin body cleanup
    title, body = _extract_title_and_body(post.content, src.name)
    if not title:
        return "error", "could not determine title", None

    dest_dir = dest_root / section

    body = _clean_google_urls(body)
    body = _normalize_bullets(body)
    post.content = body

    # Build new frontmatter
    tags = _infer_tags(src, gdrive_root) if section == "recipes" else []
    new_meta: dict = {"title": title}
    if tags:
        new_meta["tags"] = tags
    new_meta["source"] = "family"
    for k, v in post.metadata.items():
        if k not in new_meta:
            new_meta[k] = v
    new_meta["draft"] = True
    post.metadata = new_meta

    # Determine destination path and detect duplicates
    slug = _slugify(title)
    duplicate_of_path: Path | None = None

    if section == "recipes":
        # Match by title first, then fall back to slug collision
        personal_match = personal_index.get(title.lower())
        if personal_match is None and slug in personal_slugs:
            personal_match = dest_dir / f"{slug}.md"
        if personal_match:
            duplicate_of_path = personal_match
            standard = dest_dir / f"{slug}.md"
            # Avoid overwriting a personal recipe at the same path
            dest_path = (
                dest_dir / f"{slug}-family.md"
                if standard.resolve() == personal_match.resolve()
                else standard
            )
        else:
            dest_path = dest_dir / f"{slug}.md"
    else:
        dest_path = dest_dir / f"{slug}.md"

    # Incremental check
    if not force and dest_path.exists():
        if src.stat().st_mtime <= dest_path.stat().st_mtime:
            return "skipped", None, dest_path
        action = "updated"
    else:
        action = "duplicate" if duplicate_of_path else "new"

    if not dry_run:
        dest_dir.mkdir(parents=True, exist_ok=True)
        dup_ref: str | None = None
        if duplicate_of_path:
            try:
                dup_ref = str(duplicate_of_path.relative_to(dest_root.parent))
            except ValueError:
                dup_ref = str(duplicate_of_path)
        dest_path.write_text(_serialize(post, dup_ref), encoding="utf-8")

    detail: str | None = None
    if duplicate_of_path:
        try:
            detail = str(duplicate_of_path.relative_to(dest_root.parent))
        except ValueError:
            detail = str(duplicate_of_path)

    return action, detail, dest_path


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

@click.command()
@click.argument("files", nargs=-1)
@click.option("--source", metavar="PATH", help="Override vault gdrive directory.")
@click.option("--dest", default="content", show_default=True, metavar="PATH",
              help="Hugo content/ root directory.")
@click.option("--force", is_flag=True, help="Re-process all files, ignoring mtime.")
@click.option("--dry-run", is_flag=True, help="Show what would change without writing.")
@click.option("--verbose", is_flag=True, help="Show skipped and meta files too.")
def main(files, source, dest, force, dry_run, verbose):
    """Normalize family archive files from the gdrive vault into Hugo content/.

    Routes files to content/recipes/, content/essays/, or content/reference/
    based on folder path and content. All output is draft: true.

    Pass file paths relative to the source root to process specific files,
    or omit to process all new or changed files.
    """
    vault = _load_vault_config()
    source_dir = _resolve_source(source, vault)
    dest_root = Path(dest).resolve()

    if not source_dir.exists():
        raise click.ClickException(f"Source directory not found: {source_dir}")

    personal_index, personal_slugs = _build_personal_recipe_index(dest_root / "recipes")

    if files:
        src_files = []
        for f in files:
            p = Path(f)
            if not p.is_absolute():
                p = source_dir / p
            if not p.exists():
                raise click.ClickException(f"File not found: {p}")
            src_files.append(p)
    else:
        src_files = sorted(source_dir.rglob("*.md"))

    counts: dict[str, int] = {
        "new": 0, "updated": 0, "skipped": 0,
        "duplicate": 0, "flagged": 0, "error": 0, "meta": 0,
    }

    for src in src_files:
        if src.name in SKIP_FILES:
            counts["meta"] += 1
            if verbose:
                click.echo(f"    skipped:   {src.name}  [meta file]")
            continue

        action, detail, dest_path = _process(
            src, source_dir, dest_root, personal_index, personal_slugs, force, dry_run
        )
        counts[action] = counts.get(action, 0) + 1

        label = "[dry run] " if dry_run else ""
        section = dest_path.parent.name if dest_path else "?"
        filename = dest_path.name if dest_path else "?"

        if action == "new":
            click.echo(f"  ✓ {label}new:       {section}/{filename}  [draft]")
        elif action == "updated":
            click.echo(f"  ↑ {label}updated:   {section}/{filename}  [draft]")
        elif action == "duplicate":
            click.echo(f"  ~ {label}duplicate: {section}/{filename}  [draft, duplicates {detail}]")
        elif action == "skipped":
            if verbose:
                click.echo(f"    skipped:   {section}/{filename}  [unchanged]")
        elif action == "flagged":
            try:
                rel = src.relative_to(source_dir)
            except ValueError:
                rel = src.name
            click.echo(f"  ? flagged:   {rel}  ({detail}) — move manually", err=True)
        elif action == "error":
            try:
                rel = src.relative_to(source_dir)
            except ValueError:
                rel = src.name
            click.echo(f"  ! error:     {rel}  ({detail})", err=True)

    parts = []
    if counts["new"]:       parts.append(f"{counts['new']} new")
    if counts["updated"]:   parts.append(f"{counts['updated']} updated")
    if counts["duplicate"]: parts.append(f"{counts['duplicate']} duplicates")
    if counts["skipped"]:   parts.append(f"{counts['skipped']} skipped")
    if counts["meta"]:      parts.append(f"{counts['meta']} meta skipped")
    if counts["flagged"]:   parts.append(f"{counts['flagged']} flagged")
    if counts["error"]:     parts.append(f"{counts['error']} errors")

    total = sum(counts.values())
    prefix = "[dry run] " if dry_run else ""
    click.echo(f"\n{prefix}{total} files: {', '.join(parts) or 'nothing to do'}")

    if counts["error"]:
        sys.exit(1)


if __name__ == "__main__":
    main()
