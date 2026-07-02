---
applyTo: "**"
description: "Stack, framework, architecture, dependency, and code-quality defaults"
---

# Architecture & Code Quality Preferences

## Stack defaults

TypeScript over JavaScript. Vite as the build tool. bun as the package manager. Storybook for component development.

Framework choice, in order of preference:

- **Vue first** when a framework is needed and none is already in use.
- **Svelte** — a liked lightweight alternative. Explain Svelte choices rather than assuming I know them.
- **React only when the project already uses it.** Follow prevailing convention over invention, with a soft preference for Vue-like structure where reasonable.

## Architecture

Default to static sites. Reach for SSR only when content genuinely needs dynamic or authenticated data. Avoid client-rendered SPAs when static or SSR would suffice. GitHub Pages + GitHub Actions is a fine deployment target. Firebase is acceptable for lightweight backend needs (auth, Firestore, functions) — don't over-engineer toward it.

## Frontend first

Solve problems on the frontend before reaching for the backend. A composable, computed property, or smart component usually beats a new API endpoint.

## UX philosophy

Favor speed and clarity over elaborate interaction design. A fast, readable, simple UI beats a complex or heavily animated one. Don't add UX layers that weren't asked for.

## Dependencies

Keep them lean. Don't add a package when the project's existing tools solve the problem cleanly. If a new dependency is genuinely needed, say so and explain why.

## Terminal scripts

See [terminal.instructions.md](./terminal.instructions.md) for how to write CLI and terminal utility scripts.

## Code quality

Assume Prettier and ESLint are in use — don't produce code that fails either. Validate TypeScript; don't suppress type errors or reach for `any`.

## File length

- This guidance applies to files you touch in the current work; unchanged oversized files do not need to be surfaced.
- Prefer files at 900 lines or fewer for ergonomics.
- This is a convention, not a hard blocker.
- If an edited non-CSS/SCSS file grows past 900 lines, try to split the finished work into self-contained, importable files.
- If that split is not practical within scope, that's acceptable; list edited files over 900 lines in the PR description.
- The 900-line guidance does not apply to CSS or SCSS files.
- Across languages, files made primarily to be imported should be prefixed with `_` (for example: `_functions.ts`, `_modal.pug`, `_mixins.scss`).
