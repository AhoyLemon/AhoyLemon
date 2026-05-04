---
applyTo: "**/*.tsx,**/*.jsx"
---

# React Preferences

I have far fewer strong opinions about React than I do about Vue. When in doubt, follow current React convention. The notes below mostly map Vue habits onto React equivalents so the result still feels familiar.

## Component format

Always use function components with `lang="ts"` (i.e. `.tsx` files). Never use class components.

Type props explicitly with an interface or type alias — don't rely on `React.FC` for typing children, and don't use `any` to dodge a prop shape.

```tsx
interface PersonCardProps {
  name: string
  role?: string
}

export function PersonCard({ name, role }: PersonCardProps) {
  // ...
}
```

## External files

For complex components, SCSS can live in a separate file co-located with the `.tsx` file. Import it at the top:

```ts
import './ComponentName.scss'
```

JSX stays in the `.tsx` file — there is no React equivalent of pulling the template out into a Pug file, and inventing one would be more confusing than helpful. If the JSX is getting long, that's a signal to break the component up, not to extract the markup.

## Import order

Organize imports in this order, with a blank line between groups:

1. React core (`useState`, `useEffect`, `useMemo`, etc.)
2. React Router / other React ecosystem packages
3. Third-party libraries
4. Data files and assets
5. Shared utilities and hooks
6. Firebase operations
7. Child components
8. Type definitions

## Hooks

Hooks are React's equivalent of Vue composables. Extract logic into custom hooks rather than letting it accumulate in the component. If a block of stateful logic could be reused or is getting long, it belongs in a `use[Name].ts` file.

Follow the rules of hooks: only call hooks at the top level, only call them from components or other hooks. Don't fight the linter on this.

## Naming

Component filenames are PascalCase (`PersonCard.tsx`). Directories are lowercase. Custom hook files start with `use` and are camelCase (`usePersonData.ts`). Keep `App.tsx` and `main.tsx` (or `index.tsx`) thin — no business logic, minimal imports.

## State

Prefer `useState` for simple values. Reach for `useReducer` when state transitions get branchy or several related values change together. Avoid `any` in state — type it explicitly.

Don't mutate state directly. When updating arrays or objects, return a new reference (`setItems([...items, next])`, not `items.push(next)`).

## Effects

`useEffect` is for syncing with external systems (subscriptions, timers, manual DOM, network requests when a data-fetching library isn't in use). It is not for deriving values from props or state — use a plain expression or `useMemo` for that.

If an effect's dependency array is fighting you, the effect probably shouldn't exist.

## Router

Use React Router. Centralize route definitions in one place — don't scatter `<Route>` declarations across the tree. Use `<Link>` and `<NavLink>` for in-app navigation rather than raw `<a>` tags.
