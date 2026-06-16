---
applyTo: "**/*.css,**/*.scss,**/*.vue"
description: "SCSS/CSS conventions: variables, nesting, responsive, shame, file architecture"
---

# SCSS / CSS Preferences

## Preprocessor

Match the project's complexity. Plain CSS for simple projects with no existing Node dependency — don't add a build step just for styles. Reach for SCSS when complexity justifies it or it's already in the stack; as complexity grows, consider PostCSS and tree-shaking. Don't introduce a utility-class framework (e.g. Tailwind) unless it already dominates the project.

## Variables

Prefer SCSS variables over bare CSS custom property references. If a custom property exists (e.g. `--color-primary`), assign it to a SCSS variable once — near the top of the file or in `abstracts/_variables.scss` — then use the variable everywhere:

```scss
// Define once
$color-primary: var(--color-primary);

// Use everywhere
color: $color-primary;
```

Don't repeat `var(--color-name)` inline throughout the codebase.

## Class naming

Prefer readable, nested selectors over enforced conventions like BEM. `.person-card .inside .bottom` beats `.person-card-inside__bottom` — clarity of intent matters more than single-class chains, and nesting should reflect the visual/structural hierarchy.

Avoid nesting deeper than 3 levels where possible, but going deeper is acceptable when warranted.

## Responsive design

Prefer container queries (`@container`) over media queries for component-level responsiveness. Use media queries only for layout-level or truly global breakpoints that can't be expressed as container queries.

## Source maps

Include them in local/dev builds; strip them in production.

## Sizing & spacing

`clamp()` is encouraged for fluid typography and spacing — prefer it over fixed breakpoint-based switches where it makes the intent clearer.

## Shame

Any rule targeting an ID (`#element`) or using `!important` must live in `_shame.scss` (or `todo/_shame.scss` in a structured project), not inline where it applies. These are overrides/hacks and should be isolated and visible as such.

## Debug color

`lime` (`color: lime` / `background: lime`) is a debug color — never leave it in committed code. If you see it, flag it.

## Interactive states

Every interactable element — especially buttons, links, and form controls — must define both `:hover` and `:active`. Don't style a button without them.

## File architecture

The entry file (e.g. `site.scss`) should contain no CSS rules — only `@use` statements, in this order (omit sections that don't apply):

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

Actual styles belong in the appropriate partial, not the entry file.
