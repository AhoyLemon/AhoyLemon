---
applyTo: "**"
---

# Personal Coding Preferences

## Stack

Default to Vue (not React or Angular). Use TypeScript over JavaScript. Use Pug for HTML templating. Use SCSS for styles, with modern `@use` syntax rather than `@import`. Use Vite as the build tool. Prefer npm.

## Styles

Never add Tailwind CSS to a project that doesn't already use it. If Tailwind is present but not dominant, still write new styles in SCSS or plain CSS. Only match Tailwind if it clearly accounts for the majority of the project's existing styling. Do not reach for utility-class frameworks when component-scoped SCSS solves the problem cleanly.

## Architecture

Default to static sites. Use server-side rendering only when the content genuinely requires dynamic or authenticated data. Avoid client-rendered SPAs when a static or SSR approach would suffice. GitHub Pages with GitHub Actions is a fine deployment target. Firebase is acceptable for lightweight backend needs (auth, Firestore, functions), but don't over-engineer toward it.

## Frontend First

Solve problems on the frontend before reaching for backend or server-side solutions. A Vue composable, a computed property, or a smart component is usually the right answer before an API endpoint is.

## UX Philosophy

Favor speed and clarity over elaborate interaction design. A fast, readable, simple UI is always preferable to a complex or heavily animated one. Don't add UX layers that the user hasn't asked for.

## Dependencies

Keep them lean. Don't introduce a new package when the problem can be solved cleanly with what's already in the project. If a new dependency is genuinely needed, say so explicitly and explain why.

## Terminal Scripts

When writing Node.js CLI or terminal utility scripts, use `chalk` for colored output and `cli-table3` for tabular data. Make the output legible and pleasant — not just functional.

## Workflow — Starting Complex Tasks

Before beginning any multi-step task (adding a feature, refactoring, debugging something non-trivial), produce a numbered todo list of the steps involved. Keep it updated as the task progresses, checking off completed steps. This is not optional for complex work.

## Workflow — Ending Tasks

After completing a task, check whether any documentation should be updated. This includes README files, inline JSDoc/TSDoc, `copilot-instructions.md`, and any `docs/` folder content. If something changed that affects how a developer would understand or use the code, update the relevant docs before considering the task done.

## Code Quality

Assume Prettier and ESLint are in use. Don't produce code that would fail either. Validate TypeScript — don't suppress type errors or use `any` as a shortcut. SCSS should be structured and avoid nesting beyond 3 levels deep.

## Project Structure

Vue components use PascalCase filenames. Directories are lowercase. Shared utilities live in a `shared/` or `utils/` folder. Views/pages live in `views/`. Keep entry points clean and thin — logic belongs in composables or components, not in `main.ts` or `App.vue`.

## Git

Commit messages should start with the relevant issue number when one exists, e.g. `#42 Fix scoring bug`. When a PR resolves an issue, the merge commit should begin with `This closes #XX`.
