---
applyTo: "**/*.ts,**/*.tsx,**/*.vue"
description: "TypeScript file organisation, naming, and logging conventions"
---

# TypeScript Preferences

## File organisation

Split TypeScript into focused, single-purpose files rather than one large file (e.g. `src/ts/_gameLogic.ts`, `_computeds.ts`, `_api.ts`). Prefix files meant to be imported (not entry points) with an underscore: `_helpers.ts`, `_types.ts`.

## Naming conventions

- **Types and interfaces** — PascalCase: `export interface MerchItem`
- **Functions** — camelCase: `export function calculateMerchPrice(item: MerchItem): number`

## Types

Give non-trivial objects their own named `interface` or `type` rather than declaring the shape inline at the point of use. Rough trigger: an object with roughly 3+ properties probably wants its own named type. It keeps call sites readable and the shape reusable.

## Logging

`console.log` is debugging-only — remove it before committing. `console.warn` is fine in production for unexpected-but-recoverable situations (caught errors, fallback paths).
