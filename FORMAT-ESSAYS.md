# Essay Format

Standard Markdown with YAML frontmatter. Essays live in `content/essays/`. Unlike recipes, they are finished prose pieces — not outlines or notes.

For voice, tone, and post-type guidance, see `~/.claude/rules/blog-writing-rules.md`.

## Frontmatter

Required fields: `title`, `date`. Everything else is optional.

```yaml
---
title: Bigger and better pencils
date: 2026-06-08
draft: false
tags: [ai, craft, software]
description: "AI hasn't changed the fundamentals of software development as much as the noise suggests."
---
```

| Field | Type | Notes |
|---|---|---|
| `title` | string | Essay title. Sentence case. |
| `date` | string | ISO 8601 (YYYY-MM-DD). Publication date. Required. |
| `draft` | boolean | `true` while in progress; `false` to publish. Default: `false`. |
| `tags` | string[] | Optional. Plain strings, no `#` prefix. Topic tags for browsing. |
| `description` | string | Optional. 1–2 sentences for SEO and listing cards. |

Essays do not use `cuisine`, `servings`, `prep_time`, `cook_time`, or `source`. Those fields are recipe-specific.

## Body

No required sections. Essays are free-form prose.

Typical structure (varies by post type):

1. Opening — a specific observation, scenario, or image that grounds the piece
2. Body — the argument, narrative, or exploration; one idea per section
3. Close — a landing point; actionable, reflective, or a restatement of the opening with new weight

Use `##` headings only when sections are long enough that a reader needs navigation. Short pieces (under 1000 words) rarely need headers. When in doubt, omit them.

## File naming

Kebab-case slug matching the title: `bigger-and-better-pencils.md` for "Bigger and better pencils."

No date prefix in the filename. The `date` field in frontmatter is the record of publication date.

## Vault draft format

Essays are outlined in the vault at `writing/essays/` before being drafted for publication. The vault format is an **outline**, not the published piece:

```markdown
**Thesis:** One sentence.

**Format:** Post type, approximate word count.

---

## Key points

1. ...
2. ...

## Open questions for the author

- ...
```

`Topics and ideas.md` in that folder is an authoring scratch file, not content — skip it on migration.

When migrating an essay from the vault, the outline is the source material. The published file in `content/essays/` should be finished prose, not the outline itself. Migration is manual.

## Lint validation

`/lint` checks for essays:

1. Required fields present: `title`, `date`
2. `date` is ISO 8601 format
3. `draft` is a boolean if present
4. `tags` is a list of plain strings (no `#` prefix) if present

No structural body checks — essay format is free-form.
