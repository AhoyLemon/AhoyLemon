---
applyTo: "**/*.pug,**/*.html,**/*.vue,**/*.svg"
description: "Semantic HTML, Pug, and SVG conventions"
---

# Markup (HTML & Pug) Preferences

**WCAG AA is the baseline.** Accessibility is baked in, not a separate pass bolted on at the end — if we're writing semantic markup, we're writing accessible markup. The single exception: code explicitly declared a **prototype** may break any rule here (including the clickable-`<div>` rule). Outside of a stated prototype, treat everything below as firm.

## Semantic markup principles

These apply to both Pug and HTML:

- **Use the element that natively does the job.** Buttons are `<button>`, links are `<a>`. **A clickable `<div>` (or any interactive behavior bolted onto a non-interactive element) is grounds for rejecting a PR.** No exceptions worth arguing.
- Use semantic structural elements (`<header>`, `<nav>`, `<main>`, `<article>`, etc.) over generic `<div>`/`<span>` wrappers. The element should describe what it is.

## Accessibility

- **Every image has alt text.** Never skip it. Decorative images pair an explicit empty `alt=""` with `role="presentation"` — a deliberate declaration that the image is decorative, not an omission.
- **Every form field has a label.** Never skip it.
- **Forms are real `<form>` elements.** Put the action on the form itself (its `submit` handler / `action`), never on a click handler on the button.
- **ARIA only where there's no native substitute** — e.g. `aria-controls`, `aria-describedby`, `aria-live`. Never add ARIA that duplicates native semantics.

## Attributes

- **Casing:** class names are lowercase; IDs are PascalCase. e.g. `<nav id="MainNav" class="nav primary">`.
- **In Pug too, quote attribute values with double quotes:** `div(data-property="I do a thing")`, not single quotes.

## Pug specifics

- Let indentation carry the structural hierarchy — that's Pug's whole point.
- Use Pug's concise syntax (`.class`, `#id`, attribute shorthands), but don't sacrifice readability for terseness.

## Pug vs HTML — when to reach for which

- **Solo work** (decks, personal projects) — Pug is the default.
- **Team work** — stay in HTML unless Pug is already established in the project.

## SVG

- **Inline** monochromatic icons (~99% of the time) and any SVG with `:hover`/`:active` states — inlining is what makes them styleable.
- **`<img src>`** for picture-like assets (e.g. a company logo). Don't move heaven and earth to inline an SVG that's effectively just an image.
- **Inline SVG must include a `<title>`** as its first child so it's accessible (decorative inline SVG instead gets `aria-hidden="true"`). An SVG loaded via `<img src>` uses `alt` like any other image.
