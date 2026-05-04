---
applyTo: "**/*.ts"
---

# TypeScript Preferences

## File organisation

Split TypeScript into focused, single-purpose files rather than one large file. For example: `src/ts/_gameLogic.ts`, `src/ts/_computeds.ts`, `src/ts/_api.ts`. Each file should have a clear responsibility.

Files intended primarily to be imported by others (not entry points) should be prefixed with an underscore, e.g. `_helpers.ts`, `_types.ts`.

## Naming conventions

- **Types and interfaces** — PascalCase: `export interface MerchItem`, `export type CartEntry`
- **Functions** — camelCase: `export function calculateMerchPrice(item: MerchItem): number`

## Logging

`console.log` is for debugging only and should not appear in production code. Remove it before committing.

`console.warn` is acceptable in production for unexpected but recoverable situations (caught errors, fallback paths, etc.).
