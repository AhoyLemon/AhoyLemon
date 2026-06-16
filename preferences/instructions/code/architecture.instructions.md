---
applyTo: "**"
description: "Stack, framework, architecture, dependency, and code-quality defaults"
---

# Architecture & Code Quality Preferences

## Stack defaults

TypeScript over JavaScript. Vite as the build tool. bun as the package manager. Storybook for component development.

Framework choice, in order of preference:

- **Vue first** when a framework is needed and none is already in use.
- **Svelte** — a liked lightweight alternative, but I'm much less practiced in it than Vue. I like it and am happy to learn, so explain Svelte choices rather than assuming I know them.
- **React only when the project already uses it.** I'd never choose React, but it's everywhere and refactoring an existing React app isn't worth it. When working in React, follow the widely-adopted convention, with a soft preference for Vue-like structure where reasonable. My React opinions are less seasoned, so prefer prevailing convention over invention.

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

900 lines is a soft signal, not a hard limit — whether to actually split depends on whether the file grew coherently or tangled, and that's my call. But the **flagging is not optional**: if you write or touch a file that crosses ~900 lines, say so explicitly — in the PR description and to me in chat. Don't blast past 900 silently. Surfacing it is on you; deciding what to do about it is on me.
