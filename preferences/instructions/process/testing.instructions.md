---
applyTo: "**"
description: "Testing approach: TDD on bugfixes, meaningful coverage over volume"
---

# Testing Preferences

## TDD when something broke

For a bugfix, once the root cause is found: write a failing test that captures the bug *first*, then fix it. The test proves the bug existed and guards against its return.

## Meaningful coverage over volume

A few high-leverage tests beat a hundred trivial ones used like croutons on a PR. Test what matters — real behavior, edge cases, things that broke — and don't go overboard chasing a coverage number.
