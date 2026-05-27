# Notion Preferences

## Access

Always use the Notion API (via MCP) to create and edit Notion content — never describe what a page should look like and ask the user to create it manually.

If a page or workspace is referenced and you receive a 404 or don't have access, say so immediately before proceeding. Don't guess at content or silently fall back.

### Multiple workspaces — partially solved

Lemon has two Notion workspaces, and both are connected simultaneously via different MCP servers:

| Server | Workspace | How it connects |
|---|---|---|
| `claude.ai Notion` | `blankmetal` (work) | OAuth — sees all pages Lemon can access |
| `notion-personal` | `ahoylemon` (personal) | Local MCP server with an internal integration token |

**Which tools to use:** When a task involves a `blankmetal` page, use the `claude.ai Notion` tools. When it involves an `ahoylemon` page, use the `notion-personal` tools.

**Limitation:** The `ahoylemon` integration only sees pages that have been explicitly shared with it in Notion. If you get a 404 on a personal page, tell Lemon — "this page hasn't been shared with the Claude integration yet, you'll need to connect it in Notion under Connections."

**If both fail:** The `claude.ai Notion` OAuth token can expire or get disconnected. If neither workspace is reachable, flag it clearly rather than guessing.

## Page setup

Every page must have:

- A **clear, descriptive title** that makes the page findable at a glance.
- An **icon** — use an emoji that fits the subject. Don't leave pages icon-less.

## Dates and times

Always use Notion's native `@date` mention syntax for dates and times. In the enhanced Markdown format this looks like:

```
<mention-date start="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" end="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" startTime="HH:MM" timeZone="America/Chicago"/>
```

Do not write dates as plain text strings (e.g. "May 6, 2026" or "5/6/26") when a mention is possible. This applies everywhere — callout blocks, bullet lists, table cells, headings.

For flight times and other timezone-sensitive entries, always include `timeZone`.

## People

Use `<mention-user>` to @mention people whenever you know their Notion user ID or can resolve them. Don't write names as plain text if the person is a known Notion user in the workspace.

## Writing style

Do not use em dashes (—) or semicolons (;) in any written prose. These are banned. Use a period, a comma, or restructure the sentence instead.

## Content style

Looking at good examples, the patterns that work well:

- Lead with a **callout block** that gives the essential who/what/when at a glance — destination, date range, confirmation numbers, etc.
- Use a `<table_of_contents>` block on longer pages.
- Use `---` dividers to break major sections.
- Tables for structured data (flights, schedules) — include a header row.
- Inline dates as the anchor for itinerary-style lists: `- <mention-date .../> | **LABEL**`
- Sub-pages for detail that would clutter the overview.
