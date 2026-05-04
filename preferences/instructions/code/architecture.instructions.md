---
applyTo: "**"
---

# Architecture & Code Quality Preferences

## Stack defaults

TypeScript over JavaScript. Vite as the build tool. bun or npm as the package manager. Prefer Vue if a framework is needed and none is already in use.

## Architecture

Default to static sites. Reach for server-side rendering only when content genuinely requires dynamic or authenticated data. Avoid client-rendered SPAs when static or SSR would suffice. GitHub Pages with GitHub Actions is a fine deployment target. Firebase is acceptable for lightweight backend needs (auth, Firestore, functions), but don't over-engineer toward it.

## Frontend first

Solve problems on the frontend before reaching for backend or server-side solutions. A composable, a computed property, or a smart component is usually the right answer before an API endpoint is.

## UX philosophy

Favor speed and clarity over elaborate interaction design. A fast, readable, simple UI beats a complex or heavily animated one. Don't add UX layers that weren't asked for.

## Dependencies

Keep them lean. Don't introduce a new package when the problem can be solved cleanly with what's already in the project. If a new dependency is genuinely needed, say so explicitly and explain why.

## Terminal scripts

When writing Node.js CLI or terminal utility scripts, use `chalk` for colored output and `cli-table3` for tabular data. Make the output legible and pleasant, not just functional.

## Code quality

Assume Prettier and ESLint are in use. Don't produce code that would fail either. Validate TypeScript — don't suppress type errors or reach for `any` as a shortcut.

## File length

Once a file exceeds 900 lines, flag it as a candidate for refactoring. This is a soft signal, not a hard rule — use judgement based on whether the file has grown in coherent or tangled ways.
