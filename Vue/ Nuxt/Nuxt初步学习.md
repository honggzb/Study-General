[Nuxt初步学习](#top)

- [General](#general)
- [file-based Routing](#file-based-routing)
  - [Pages](#pages)
- [Server](#server)

## General

Nuxt is a free and open-source framework with an intuitive and extendable way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js

- Front end (Vue) + Back end(Nitro) = full-stack developer
  - The Nuxt server engine **Nitro** unlocks new full-stack capabilitie
- **File-based routing**: define routes based on the structure of <mark>`pages/`</mark> directory. This can make it easier to organize application and avoid the need for manual route configuration
- **Code splitting**: Nuxt automatically splits your code into smaller chunks, which can help reduce the initial load time of your application.
- **Server-side rendering**: Nuxt comes with built-in SSR capabilities, so you don't have to set up a separate server yourself
  - Faster initial page load time:
  - Improved SEO
  - Better performance on low-powered devices
  - Better accessibility
  - Easier caching
- **Server engine**:
  - In development, it uses Rollup and Node.js workers for server code and context isolation. It also generates server API <mark>`server/api/`</mark> directory and server middleware <mark>`server/middleware/`</mark> directory
- **Auto-imports**:
  - use <mark>`components/`</mark> directory  --> for vue components
  - use <mark>`composables/`</mark> directory --> for vue composables
  - use <mark>`utils/`</mark> directory       --> for helper functrions and other utilitities
- **Data-fetching utilities**: Nuxt provides composables to handle SSR-compatible data fetching as well as different strategies.
- **Zero-config** TypeScript support: write type-safe code without having to learn TypeScript with our auto-generated types and tsconfig.json
- **Configured build tools**: use `Vite` by default to support hot module replacement (HMR) in development and bundling your code for production with best-practices baked-in

## file-based Routing

### Pages

```
├── 📂pages/
|    ├──📄about.vue
|    ├──📄index.vue       # mapped to the / route of your application
|    ├──📂posts/
|    |    ├──📄[id].vue   # Dynamic Routes, mapped to /posts/[id]
|    ├──📂users-[group]/
|    |    ├──📄[id].vue   # Dynamic Routes, mapped to /users-[group]/[id]
```

## Server

```
├── 📂server/
|    ├──📂api/
|    |    └──📄hello.ts      # /api/hello
|    ├──📂routes/
|    |    └──📄bonjour.ts    # /bonjour
|    ├──📂middleware/
|    |    └──📄log.ts        # log all requests
```

```ts
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    hello: 'world'
  }
})
//pages/index.vue
<script setup lang="ts">
const { data } = await useFetch('/api/hello')
</script>
<template>
  <pre>{{ data }}</pre>
</template>
```
