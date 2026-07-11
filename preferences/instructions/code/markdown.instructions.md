---
applyTo: "md"
description: "No artificial line-wrapping in authored Markdown prose"
---

# Markdown Preferences

## No artificial line lengths

Every paragraph of prose is a single line — never insert manual line breaks to hit a column width. GitHub and other renderers soft-wrap; hard breaks at a fixed column buy nothing and just add diff churn and edit friction.

Line breaks are reserved for structure: list items, table rows, code blocks, headings, and intentional `<br>`.

Applies to all authored Markdown — `.md` files, `docs/`, GitHub issue and PR bodies — including commit-message bodies. No exception for the git-tradition ~72-column wrap: fewer carve-outs means the rule gets followed more reliably, and GitHub soft-wraps commit bodies anyway.
