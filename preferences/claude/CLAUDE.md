# Personal Development Preferences

These are Lemon's personal coding preferences. Apply them globally across all projects unless a project-level `CLAUDE.md` overrides them.

---

## General

### Stack defaults

TypeScript over JavaScript. Vite as the build tool. bun as the package manager. Prefer Vue if a framework is needed and none is already in use.

### Architecture

Default to static sites. Reach for SSR until when content genuinely requires dynamic or authenticated data. Avoid client-rendered SPAs when static or SSR would suffice. GitHub Pages with GitHub Actions is a fine deployment target. Firebase is acceptable for lightweight backend needs (auth, Firestore, functions) but don't over-engineer toward it.

### Frontend first

Solve problems on the frontend before reaching for backend or server-side solutions. A composable, a computed property, or a smart component is usually the right answer before an API endpoint is.

### UX philosophy

Favor speed and clarity over elaborate interaction design. A fast, readable, simple UI beats a complex or heavily animated one. Don't add UX layers that weren't asked for.

### Dependencies

Keep them lean. Don't introduce a new package when the problem can be solved cleanly with what's already in the project. If a new dependency is genuinely needed, say so explicitly and explain why.

### Terminal scripts

When writing Node.js CLI or terminal utility scripts, use `chalk` for colored output and `cli-table3` for tabular data. Make the output legible and pleasant, not just functional.

### Workflow — starting complex tasks

Before beginning any multi-step task (adding a feature, refactoring, debugging something non-trivial), produce a numbered todo list of the steps involved. Keep it updated as work progresses. This is not optional for complex work.

### Workflow — ending tasks

After completing a task, check whether any documentation should be updated — README files, inline JSDoc/TSDoc, or anything in a `docs/` folder. If something changed that affects how a developer would understand or use the code, update the relevant docs before considering the task done.

### Code quality

Assume Prettier and ESLint are in use. Don't produce code that would fail either. Validate TypeScript — don't suppress type errors or reach for `any` as a shortcut.

### File length

Once a file exceeds 900 lines, flag it as a candidate for refactoring. This is a soft signal, not a hard rule — use judgement based on whether the file has grown in coherent or tangled ways.

### Git

Commit messages should start with the relevant issue number when one exists, e.g. `#42 Fix scoring bug`. When a PR resolves an issue, the merge commit should begin with `This closes #XX`.

---

## TypeScript

### File organisation

Split TypeScript into focused, single-purpose files rather than one large file. For example: `src/ts/_gameLogic.ts`, `src/ts/_computeds.ts`, `src/ts/_api.ts`. Each file should have a clear responsibility.

Files intended primarily to be imported by others (not entry points) should be prefixed with an underscore, e.g. `_helpers.ts`, `_types.ts`.

### Naming conventions

- **Types and interfaces** — PascalCase: `export interface MerchItem`, `export type CartEntry`
- **Functions** — camelCase: `export function calculateMerchPrice(item: MerchItem): number`

### Logging

`console.log` is for debugging only and should not appear in production code. Remove it before committing.

`console.warn` is acceptable in production for unexpected but recoverable situations (caught errors, fallback paths, etc.).

---

## SCSS / CSS

### Preprocessor

Match the complexity of the project. Plain CSS is preferred in simple projects that don't already have a Node dependency — don't introduce a build step just for styles. Reach for SCSS when the project's complexity justifies it, or when it's already part of the stack. Do not introduce a utility-class framework (e.g. Tailwind) unless it's already dominant in the project.

### Variables

Prefer SCSS variables over bare CSS custom property references throughout the code. If a CSS custom property exists (e.g. `--color-primary`), assign it to a SCSS variable once near the top of the relevant file or in `abstracts/_variables.scss`, then use the variable everywhere:

```scss
// Define once
$color-primary: var(--color-primary);

// Use everywhere
color: $color-primary;
```

Do not repeat `var(--color-name)` inline throughout the codebase.

### Class naming

Prefer readable, nested class selectors over enforced naming conventions like BEM. A selector like `.person-card .inside .bottom` is preferable to `.person-card--inside__bottom`. Nesting in SCSS should reflect the visual/structural hierarchy.

Try to avoid nesting deeper than 3 levels.

### Responsive design

Prefer container queries (`@container`) over media queries (`@media`) for component-level responsiveness. Use media queries only for layout-level or truly global breakpoints that can't be expressed as container queries.

### Sizing & spacing

`clamp()` is encouraged for fluid typography and spacing. Prefer it over fixed breakpoint-based size switches where it makes the intent clearer.

### Shame

Any CSS rule that targets an ID (`#element`) or uses `!important` must be written in `_shame.scss` (or `todo/_shame.scss` in a structured project), not inline where it appears. These are overrides or hacks and should be isolated and visible as such.

### Debug color

`lime` (i.e. `color: lime` or `background: lime`) is a debug color. Never leave it in committed code. If you see it, flag it.

### Interactive states

Any interactable element — especially buttons, links, and form controls — must have both `:hover` and `:active` states defined. Don't style a button without them. Similar, make sure `:focus-visible` is styled for buttons, links, and form controls to ensure keyboard accessibility.

### Source maps

Include source maps in local/development builds. Strip them in production builds.

### File architecture

The main entry file (e.g. `site.scss`, `styles.scss`) should contain no actual CSS rules — only `@use` statements. Organize those imports in this order, omitting any sections that don't apply to the project:

```scss
// Abstracts (output no CSS on their own)
@use 'abstracts/variables';
@use 'abstracts/z-index';
@use 'abstracts/mixins';
@use 'abstracts/extends';

// Libraries (third-party)

// Base
@use 'base/reset';
@use 'base/defaults';

// Layout
@use 'layout/grid';
@use 'layout/nav';

// Components
@use 'components/button';
@use 'components/card';

// Sections (large page regions, heroes, etc.)

// Pages (template-specific overrides)

// Shame (known hacks and temporary fixes)
@use 'todo/shame';
```

Actual styles belong in the appropriate partial, not in the entry file.

---

## Vue

### Component format

Always use `<script setup lang="ts">`. Never use the Options API or a non-setup script block.

Every block should declare its language explicitly:

```vue
<script setup lang="ts">
<template lang="pug">
<style lang="scss">
```

### External files

For complex components, Pug and SCSS can live in separate files co-located with the `.vue` file:

```vue
<template lang="pug" src="./Megachurch.pug"></template>
<style lang="scss" src="./Megachurch.scss"></style>
```

Simple components can keep everything inline in the `.vue` file — use judgement based on file length and complexity.

### Import order

Organize imports in this order, with a blank line between groups:

1. Vue core (`ref`, `computed`, `watch`, etc.)
2. Vue Router / VueFire / other Vue ecosystem packages
3. Third-party libraries
4. Data files and assets
5. Shared utilities and composables
6. Firebase operations
7. Child components
8. Type definitions

### Composables

Extract logic into composables rather than letting it accumulate in the component. If a block of reactive logic could be reused or is getting long, it belongs in a `use[Name].ts` file.

### Naming

Component filenames are PascalCase. Directories are lowercase. Keep `App.vue` and `main.ts` thin — no business logic, minimal imports.

### Reactivity

Prefer `ref` for primitives and `reactive` for objects. Don't mix them arbitrarily. Avoid `any` in reactive state — define types explicitly.

### Router

Use `<RouterView />` and `<RouterLink />` (PascalCase). Centralize route definitions — don't scatter them.
