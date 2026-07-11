#!/usr/bin/env python3
"""
migrate.py — Migrate personal recipes from the Obsidian vault to Hugo content/recipes/.

Run with no arguments to migrate all new or changed files.
Run with a filename to migrate a single file.
"""

import os
import re
import sys
import tomllib
from pathlib import Path

import click
import frontmatter
import yaml


# Files that exist in the vault recipes dir but are not recipes
SKIP_FILES = frozenset({"Food log.md", "Recipes to test.md"})

# Output key order — Hugo-specific fields (draft, description, featured) trail vault fields
FIELD_ORDER = [
    "title", "tags", "source", "author", "date", "servings",
    "prep_time", "cook_time", "total_time", "cuisine",
    "draft", "description", "featured",
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
    path = (
        arg
        or os.environ.get("VAULT_RECIPES_PATH")
        or vault.get("recipes")
    )
    if not path:
        raise click.ClickException(
            "Vault recipes path not configured. "
            "Use --source, set VAULT_RECIPES_PATH, "
            "or copy tools/config.toml.example to tools/config.toml."
        )
    return Path(path).expanduser().resolve()


# ---------------------------------------------------------------------------
# Normalization helpers
# ---------------------------------------------------------------------------

def _slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def _normalize_tags(value) -> list[str]:
    if not value:
        return []
    if isinstance(value, str):
        value = [value]
    return [str(t).lstrip("#").strip() for t in value if str(t).strip()]


def _normalize_str(value) -> str | None:
    if isinstance(value, str):
        return value.lstrip("#").strip() or None
    return value


def _convert_wiki_links(text: str) -> str:
    """[[Slug|Display]] → [Display](Display),  [[Title]] → [Title](Title)."""
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"[\2](\2)", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"[\1](\1)", text)
    return text


def _serialize(post: frontmatter.Post) -> str:
    """Serialize a Post to a markdown string with ordered, flow-list YAML frontmatter."""
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

    return f"---\n{yaml_str}\n---\n\n{post.content.strip()}\n"


# ---------------------------------------------------------------------------
# Title index — for detecting updates vs new files and removed-from-vault
# ---------------------------------------------------------------------------

def _build_title_index(dest_dir: Path) -> dict[str, Path]:
    """Index dest files by title, for matching vault sources to existing files.

    Excludes family-archive files (source: family) — those come from
    normalize.py, not this vault, and must never be a migrate.py write target
    even if a personal recipe happens to share the same title.
    """
    index = {}
    for f in dest_dir.glob("*.md"):
        if f.name == "_index.md":
            continue
        try:
            post = frontmatter.load(str(f))
            if post.get("source") == "family":
                continue
            title = str(post.get("title", "")).strip()
            if title:
                index[title.lower()] = f
        except Exception:
            pass
    return index


# ---------------------------------------------------------------------------
# Per-file processing
# ---------------------------------------------------------------------------

def _process(src: Path, dest_dir: Path, title_index: dict, force: bool, dry_run: bool):
    """
    Returns (action, detail, dest_path).
    action: "new" | "updated" | "skipped" | "error" | "warning"
    detail: None or an explanatory string.
    dest_path: the destination Path on success, None on error/warning.
    """
    try:
        post = frontmatter.load(str(src))
    except Exception as e:
        return "error", f"could not parse frontmatter: {e}", None

    title = str(post.get("title", "")).strip()
    if not title:
        return "error", "missing required field: title", None

    tags_raw = post.get("tags")
    tags = _normalize_tags(tags_raw)
    if not tags:
        return "warning", "tags field is empty — skipped", None

    post["tags"] = tags
    if "cuisine" in post.metadata:
        post["cuisine"] = _normalize_str(post["cuisine"])
    if "draft" not in post.metadata:
        post["draft"] = False

    post.content = _convert_wiki_links(post.content)

    dest_path = title_index.get(title.lower()) or (dest_dir / f"{_slugify(title)}.md")

    if not force and dest_path.exists():
        if src.stat().st_mtime <= dest_path.stat().st_mtime:
            return "skipped", None, dest_path
        action = "updated"
    else:
        action = "new" if not dest_path.exists() else "updated"

    if not dry_run:
        dest_path.write_text(_serialize(post), encoding="utf-8")

    return action, None, dest_path


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

@click.command()
@click.argument("files", nargs=-1)
@click.option("--source", metavar="PATH", help="Override vault recipes directory.")
@click.option("--dest", default="content/recipes", show_default=True, metavar="PATH",
              help="Hugo content/recipes/ directory.")
@click.option("--force", is_flag=True, help="Re-migrate all files, ignoring mtime.")
@click.option("--dry-run", is_flag=True, help="Show what would change without writing.")
@click.option("--verbose", is_flag=True, help="Show skipped files too.")
def main(files, source, dest, force, dry_run, verbose):
    """Migrate personal recipes from the Obsidian vault to Hugo content/recipes/.

    Pass one or more filenames to migrate specific recipes, or omit to migrate all.
    """

    vault = _load_vault_config()
    source_dir = _resolve_source(source, vault)
    dest_dir = Path(dest)

    if not source_dir.exists():
        raise click.ClickException(f"Source directory not found: {source_dir}")
    if not dest_dir.exists():
        raise click.ClickException(f"Destination directory not found: {dest_dir}")

    title_index = _build_title_index(dest_dir)

    if files:
        src_files = [source_dir / f for f in files]
        missing = [f for f in src_files if not f.exists()]
        if missing:
            raise click.ClickException(f"File not found: {missing[0]}")
    else:
        src_files = sorted(source_dir.glob("*.md"))

    counts = dict(new=0, updated=0, skipped=0, error=0, warning=0)
    touched_dest: set[Path] = set()

    for src in src_files:
        if src.name in SKIP_FILES:
            if verbose:
                click.echo(f"    skip:    {src.name}  [not a recipe]")
            continue

        action, detail, dest_path = _process(src, dest_dir, title_index, force, dry_run)
        counts[action] = counts.get(action, 0) + 1

        if dest_path:
            touched_dest.add(dest_path)

        label = "[dry run] " if dry_run else ""
        if action == "new":
            click.echo(f"  ✓ {label}new:     {src.name}")
        elif action == "updated":
            click.echo(f"  ↑ {label}updated: {src.name}")
        elif action == "skipped":
            if verbose:
                click.echo(f"    skipped: {src.name}  (unchanged)")
        elif action in ("error", "warning"):
            click.echo(f"  ! {action}:   {src.name}  ({detail})", err=True)

    # Warn about files in dest not touched (may have been removed from vault).
    # Skip family-archive files (source: family) — those come from normalize.py
    # and were never sourced from this vault, so they're never "touched" here.
    if not files:
        for dest_file in sorted(dest_dir.glob("*.md")):
            if dest_file.name == "_index.md":
                continue
            if dest_file in touched_dest:
                continue
            try:
                post = frontmatter.load(str(dest_file))
            except Exception:
                continue
            if post.get("source") == "family":
                continue
            click.echo(
                f"  ? removed: {dest_file.name}  (not in vault — delete manually if intended)",
                err=True,
            )
            counts["warning"] += 1

    # Summary line
    parts = []
    if counts["new"]:     parts.append(f"{counts['new']} new")
    if counts["updated"]: parts.append(f"{counts['updated']} updated")
    if counts["skipped"]: parts.append(f"{counts['skipped']} skipped")
    if counts["error"]:   parts.append(f"{counts['error']} errors")
    if counts["warning"]: parts.append(f"{counts['warning']} warnings")

    total = sum(counts.values())
    prefix = "[dry run] " if dry_run else ""
    click.echo(f"\n{prefix}{total} files: {', '.join(parts) or 'nothing to do'}")

    if counts["error"]:
        sys.exit(1)


if __name__ == "__main__":
    main()
