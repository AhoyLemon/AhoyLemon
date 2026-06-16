---
applyTo: "**/*.vue"
description: "Vue SFC conventions: script setup, import order, composables, reactivity"
---

# Vue Preferences

## Component format

Always use `<script setup lang="ts">` — never the Options API or a non-setup block. Declare every block's language explicitly:

```vue
<script setup lang="ts">
<template lang="pug">
<style lang="scss">
```

## External files

For complex components, Pug and SCSS can live in co-located files, imported at the top of the script block:

```vue
<script setup lang="ts" src="./ComponentName.ts">
<template lang="pug" src="./ComponentName.pug">
<style lang="scss" src="./ComponentName.scss">
```

Simple components can keep everything inline — judge by length and complexity.

## Import order

Group with a blank line between groups:

1. Vue core (`ref`, `computed`, `watch`, etc.)
2. Vue Router / VueFire / other Vue ecosystem packages
3. Third-party libraries
4. Data files and assets
5. Shared utilities and composables
6. Firebase operations
7. Child components
8. Type definitions

## Composables

Extract logic into composables rather than letting it pile up in the component. If a block of reactive logic could be reused or is getting long, it belongs in a `use[Name].ts` file.

## Naming

Component filenames are PascalCase; directories are lowercase. Keep `App.vue` and `main.ts` thin — no business logic, minimal imports.

## Reactivity

`ref` for primitives, `reactive` for objects — don't mix them arbitrarily. Avoid `any` in reactive state; type it explicitly.

## Router

Use `<RouterView />` and `<RouterLink />` (PascalCase). Centralize route definitions — don't scatter them.
