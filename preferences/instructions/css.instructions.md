---
applyTo: "**/*.{scss,css,sass,vue}"
---

# SCSS / CSS Preferences

## Preprocessor

Match the complexity of the project. Plain CSS is preferred in simple projects that don't already have a Node dependency — don't introduce a build step just for styles. Reach for SCSS when the project's complexity justifies it, or when it's already part of the stack. As complexity grows further, consider PostCSS and tree-shaking. Do not introduce a utility-class framework (e.g. Tailwind) unless it's already dominant in the project.

## Variables

Prefer SCSS variables over bare CSS custom property references throughout the code. If a CSS custom property exists (e.g. `--color-primary`), assign it to a SCSS variable once near the top of the relevant file or in `abstracts/_variables.scss`, then use the variable everywhere:

```scss
// Define once
$color-primary: var(--color-primary);

// Use everywhere
color: $color-primary;
```

Do not repeat `var(--color-name)` inline throughout the codebase.

## Class naming

Prefer readable, nested class selectors over enforced naming conventions like BEM. A selector like `.person-card .inside .bottom` is preferable to `.person-card-inside__bottom`. Clarity of intent matters more than keeping selector chains to a single class name. Nesting in SCSS should reflect the visual/structural hierarchy.

Avoid nesting deeper than 3 levels.

## Responsive design

Prefer container queries (`@container`) over media queries (`@media`) for component-level responsiveness. Use media queries only for layout-level or truly global breakpoints that can't be expressed as container queries.

## Source maps

Include source maps in local/development builds. Strip them in production builds.

## Sizing & spacing

`clamp()` is encouraged for fluid typography and spacing. Prefer it over fixed breakpoint-based size switches where it makes the intent clearer.

## Shame

Any CSS rule that targets an ID (`#element`) or uses `!important` must be written in `_shame.scss` (or `todo/_shame.scss` in a structured project), not inline where it appears. These are considered overrides or hacks and should be isolated and visible as such.

## Debug color

`lime` (i.e. `color: lime` or `background: lime`) is a debug color. Never leave it in committed code. If you see it, flag it.

## Interactive states

Any interactable element — especially buttons, links, and form controls — must have both `:hover` and `:active` states defined. Don't style a button without them.

## File architecture

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
