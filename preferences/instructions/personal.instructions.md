---
applyTo: "**"
---

# General Development Preferences

More specific preferences for Vue, SCSS, and other areas live in their own instructions files. This file covers general approach and workflow.

## Stack defaults

TypeScript over JavaScript. Vite as the build tool. npm as the package manager. Prefer Vue if a framework is needed and none is already in use.

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

## Workflow — starting complex tasks

Before beginning any multi-step task (adding a feature, refactoring, debugging something non-trivial), produce a numbered todo list of the steps involved. Keep it updated as work progresses. This is not optional for complex work.

## Workflow — ending tasks

After completing a task, check whether any documentation should be updated — README files, inline JSDoc/TSDoc, `copilot-instructions.md`, or anything in a `docs/` folder. If something changed that affects how a developer would understand or use the code, update the relevant docs before considering the task done.

## Code quality

Assume Prettier and ESLint are in use. Don't produce code that would fail either. Validate TypeScript — don't suppress type errors or reach for `any` as a shortcut.

## Git

Commit messages should start with the relevant issue number when one exists, e.g. `#42 Fix scoring bug`. When a PR resolves an issue, the merge commit should begin with `This closes #XX`.