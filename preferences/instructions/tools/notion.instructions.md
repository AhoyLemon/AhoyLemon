---
applyTo: "**"
description: "Notion API/MCP usage, two-workspace routing, and content style"
---

# Notion Preferences

## Access

Always create and edit Notion content via the Notion API (MCP) — never describe a page and ask Lemon to build it manually.

On a 404 or missing access, say so immediately. Don't guess at content or silently fall back.

### Two workspaces

Both are connected at once via separate MCP servers — pick by which workspace the task targets:

| Server | Workspace | Connection |
|---|---|---|
| `claude.ai Notion` | `blankmetal` (work) | OAuth — all pages Lemon can access |
| `notion-personal` | `ahoylemon` (personal) | Local MCP server, internal integration token |

- **`notion-personal` only sees pages explicitly shared with the integration.** On a 404 for a personal page, tell Lemon to connect it in Notion under Connections.
- If neither workspace is reachable, the `claude.ai Notion` OAuth token may have expired — flag it rather than guessing.

## Page setup

Every page needs a **clear, descriptive title** and a fitting **emoji icon**. Never leave a page icon-less.

## Dates and times

Always use Notion's native `@date` mention syntax, never plain-text dates ("May 6, 2026"). This applies everywhere — callouts, lists, table cells, headings:

```
<mention-date start="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" end="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" startTime="HH:MM" timeZone="America/Chicago"/>
```

Always include `timeZone` for flights and other timezone-sensitive entries.

## People

@mention people with `<mention-user>` whenever you can resolve their Notion user ID. Don't write a known user's name as plain text.

## Writing style

No em dashes (—) or semicolons (;) in Notion page prose. Use a period, a comma, or restructure. (This applies to content you write into Notion, not to these instruction files.)

## Content style

Patterns that work well:

- Lead with a **callout block** giving the essential who/what/when — destination, dates, confirmation numbers.
- `<table_of_contents>` on longer pages.
- `---` dividers between major sections.
- Tables (with a header row) for structured data like flights and schedules.
- Inline dates as itinerary anchors: `- <mention-date .../> | **LABEL**`
- Sub-pages for detail that would clutter the overview.
