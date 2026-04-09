---
applyTo: "**/*.vue"
---

# Vue Preferences

## Component format

Always use `<script setup lang="ts">`. Never use the Options API or a non-setup script block.

Every block should declare its language explicitly:

```vue
<script setup lang="ts">
<template lang="pug">
<style lang="scss">
```

## External files

For complex components, Pug and SCSS can live in separate files co-located with the `.vue` file. Import them at the top of the script block:

```ts
import Template from './ComponentName.pug'
import './ComponentName.scss'
```

Simple components can keep everything inline in the `.vue` file — use judgement based on file length and complexity.

## Import order

Organize imports in this order, with a blank line between groups:

1. Vue core (`ref`, `computed`, `watch`, etc.)
2. Vue Router / VueFire / other Vue ecosystem packages
3. Third-party libraries
4. Data files and assets
5. Shared utilities and composables
6. Firebase operations
7. Child components
8. Type definitions

## Composables

Extract logic into composables rather than letting it accumulate in the component. If a block of reactive logic could be reused or is getting long, it belongs in a `use[Name].ts` file.

## Naming

Component filenames are PascalCase. Directories are lowercase. Keep `App.vue` and `main.ts` thin — no business logic, minimal imports.

## Reactivity

Prefer `ref` for primitives and `reactive` for objects. Don't mix them arbitrarily. Avoid `any` in reactive state — define types explicitly.

## Router

Use `<RouterView />` and `<RouterLink />` (PascalCase). Centralize route definitions — don't scatter them.
