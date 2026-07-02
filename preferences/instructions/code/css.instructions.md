---
applyTo: "**/*.css,**/*.scss,**/*.vue"
description: "SCSS/CSS conventions: variables, nesting, responsive, shame, file architecture"
---

# SCSS / CSS Preferences

## Preprocessor

Match the project's complexity. Plain CSS when the project would otherwise ship with no build step — don't add one just to get SCSS. Reach for SCSS when complexity justifies it or it's already in the stack; as complexity grows, consider PostCSS and tree-shaking. Don't introduce a utility-class framework (e.g. Tailwind) unless it already dominates the project.

## Variables

Prefer SCSS variables over bare CSS custom property references. Assign each custom property to a SCSS variable once (`$color-primary: var(--color-primary);` — near the top of the file or in `abstracts/_variables.scss`), then use the variable everywhere instead of repeating `var(--color-name)` inline.

## Class naming

Prefer readable, nested selectors over enforced conventions like BEM. `.person-card .inside .bottom` beats `.person-card-inside__bottom` — clarity of intent matters more than single-class chains, and nesting should reflect the visual/structural hierarchy.

Avoid nesting deeper than 3 levels where possible, but going deeper is acceptable when warranted.

## Responsive design

Prefer container queries (`@container`) over media queries for component-level responsiveness. Use media queries only for layout-level or truly global breakpoints that can't be expressed as container queries.

## Source maps

Strip them in production builds (non-Vite pipelines like the sass CLI emit them by default).

## Sizing & spacing

`clamp()` is encouraged for fluid typography and spacing — prefer it over fixed breakpoint-based switches where it makes the intent clearer.

## Shame

Any rule targeting an ID (`#element`) or using `!important` must live in `_shame.scss` (or `todo/_shame.scss` in a structured project), not inline where it applies. These are overrides/hacks and should be isolated and visible as such.

## Debug color

`lime` (`color: lime` / `background: lime`) is a debug color — never leave it in committed code. If you see it, flag it.

## Interactive states

Every interactive element (buttons, links, inputs, form controls, etc.) must have a visible focus state.

Default browser focus styles (for example, the blue outline) are acceptable if not stated or inferred otherwise.

Prefer `:focus-visible` over `:focus` in most cases, especially for buttons.

If you override default focus styles (for example, `outline: none`), you must provide an alternative visible focus style.

In general, when writing `:hover`, prefer pairing it with `:focus-visible`.

Define `:active` states for pressable controls (for example: buttons, links, and existing accessible custom controls), not every focusable input. This does not permit introducing new clickable `div`/non-semantic controls. Don't style a button or link with `:hover` only.

## File architecture

The entry file (e.g. `site.scss`) contains no CSS rules — only `@use` statements. Follow [startHere's site.scss](https://github.com/AhoyLemon/startHere/blob/main/scss/site.scss) (structure adapted from [sass-guidelin.es](https://sass-guidelin.es/#architecture)), omitting sections that don't apply:

```scss
// ABSTRACTS: variables and mixins (never add lines to production CSS)
@use "abstracts/variables" as vars;
@use "abstracts/z-index" as *;
@use "abstracts/mixins" as mix;
@use "abstracts/extends";

// BASE: global site styles and typography
@use "base/reset";
@use "base/defaults";

// LIBRARIES: third-party Scss

// COMPONENTS: reusable rectangles — buttons, cards, callouts, toasts

// LAYOUT: grid system, topnav, footer

// SECTIONS: stripes like a hero — a component, but bigger

// PAGES: specific page templates

// FINALLY, a place for things we still need to get to
@use "todo/shame";
```

All actual styles live in the partials, not the entry file.
