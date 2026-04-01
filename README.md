# checkout-components-examples

Example sites demonstrating integration of `@fastspring/checkout-sdk` and FastSpring checkout web components across different frameworks and environments.

---

## Examples

| Example | Stack | Description |
|---|---|---|
| [vanilla/basic](examples/vanilla/basic/) | Plain HTML + JS | No framework, IIFE script tag |
| [react/basic](examples/react/basic/) | React 19 + Vite | `useEffect` SDK initialisation |
| [react/nextjs](examples/react/nextjs/) | Next.js 15 | Client Component with `'use client'` |
| [vue/basic](examples/vue/basic/) | Vue 3 + Vite | `onMounted` SDK initialisation |
| [vue/nuxt](examples/vue/nuxt/) | Nuxt 3 | `<ClientOnly>` wrapper for SSR safety |
| [angular/basic](examples/angular/basic/) | Angular 19 | Standalone component, `ngOnInit` |
| [svelte/basic](examples/svelte/basic/) | Svelte 5 + Vite | `onMount` SDK initialisation |
| [astro/basic](examples/astro/basic/) | Astro 5 | Client-side `<script>` island |

---

## Prerequisites

- **Node.js v18+** — [https://nodejs.org/en/download](https://nodejs.org/en/download)
  All examples (including the vanilla one via `npx`) require Node.js to be installed.
  Verify your version:
  ```bash
  node -v   # should print v18.x.x or higher
  ```

---

## Running an Example

### Vanilla

No build step needed:

```bash
cd examples/vanilla/basic
npx http-server . -p 5173
# Open http://localhost:5173
```

### All other examples (React, Vue, Angular, Svelte, Astro, Next.js, Nuxt)

```bash
cd examples/<framework>/<variant>   # e.g. examples/react/basic
npm install
npm run dev
# Open http://localhost:5173
```

---

## Shared Utilities

Common helpers and a mock server for local development live in [`shared/`](shared/).

---

## Docs

- [Integration Patterns](docs/integration-patterns.md)
- [Best Practices](docs/best-practices.md)
- [Troubleshooting](docs/troubleshooting.md)
