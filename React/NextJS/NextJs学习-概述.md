[NextJs学习-概述](#top)

- [Main Concepts](#main-concepts)
  - [完善的工程化机制](#完善的工程化机制)
- [智能文件路由系统](#智能文件路由系统)
  - [Routing Files](#routing-files)
  - [Nested Routes](#nested-routes)
  - [Dynamic Routes](#dynamic-routes)
  - [Route Groups and Private Folders](#route-groups-and-private-folders)
  - [Parallel and Intercepted Routes](#parallel-and-intercepted-routes)
  - [Dynamic Routes](#dynamic-routes-1)
  - [pages Routing Conventions](#pages-routing-conventions)
- [The App Router](#the-app-router)
  - [Terminology](#terminology)
  - [Component Hierarchy](#component-hierarchy)
  - [Colocation](#colocation)
- [Pages Router](#pages-router)
- [Metadata File Conventions](#metadata-file-conventions)
- [多种渲染模式来保证页面性能体验](#多种渲染模式来保证页面性能体验)
- [可扩展配置](#可扩展配置)
- [其他多方面性能优化方案](#其他多方面性能优化方案)
- [提供性能数据](#提供性能数据)
- [其他常用功能或扩展](#其他常用功能或扩展)

-----------------------------------------------------------------

## Main Concepts

- `npx create-next-app@latest`
- Routing and navigation:  `<Link />`
- Metadata
- Styling(Tailwind CSS)
- `<Image />`
- Client vs Server component
  - Data fetching: Get-request
- Server actions: (Post/put/delete)
- Suspense and streaming
- Caching
- static & dynamic rendering
- middleware
- production build and deploying

### 完善的工程化机制

- next.js 使用 **turbopack** 进行编译打包
- Next内置了以下工程化基础：
  - babel 内置，支持JS代码向后兼容
  - postcss 内置，支持CSS代码向后兼容
  - browserslist 支持配置兼容的浏览器信息，配合 babel 和 postcss 工作。
  - TypeScript 可选择使用，保证代码的质量，以及可阅读性和可维护性。
  - eslint 可选择使用，检测代码格式，可自定义规则。vscode 编写代码，或者build打包时都会有提示。
  - prettier 可通过扩展使用，格式化代码，可自定义规则。
  - css modules 内置
  - css-in-js 可扩展使用
  - tailwind css 可扩展使用
- 也做了一些打包优化功能：
  - tree shaking
  - 代码压缩
  - 页面自动静态化
  - 按需打包第三方 es 包（通过设置 transpilePackages 属性，让部分包可以被 next-babel 打包）
  - 异步动态加载组件，和 React.lazy 功能一样，只不过实现得更早
- 分析JS资源的组成，那么可以使用**@next/bundle-analyzer**

[⬆ back to top](#top)

## 智能文件路由系统

- Routing and navigation:  `<Link />`
- Next.js 的智能文件路由指的是，页面写在**app**目录的js文件都会被认为是页面，也会当成页面来打包，路由定义了一套动态路由的规则
- Top-level folders
  - ![Top-level folders](Top-level-folders.png)
- app 模式主要从以下三个方面来扩展和调整文件路由系统
  - 约定页面相关内容
  - 平行路由和插槽功能
  - 约定 web api 路由实现

```
├──📂public/    - Static assets to be served
├──📂src/                - Optional application source folder
│   ├──📂app/       - App Router
│   │     ├── 📂dashboard/
│   │     │      ├── 📂[id]/
│   │     │      ├── 📄page.tsx
│   │     │      ├── 📄loading.tsx
│   │     │      └── 📄layout.tsx
│   │     ├── 📄page.tsx
│   │     └── 📄layout.tsx         - Root Layout (Required)     
│   └──📂pages/     - Pages Router
│         └── 📂posts/
├── 📄next.config.js	     - Configuration file for Next.js
├── 📄package.json	       - Project dependencies and scripts
├── 📄middleware.ts	       - Next.js request middleware
├── 📄.env	               - Environment variables
├── 📄.env.local	         - Local environment variables
├── 📄.env.production	     - Production environment variables
├── 📄.env.development	   - Development environment variables
├── 📄.eslintrc.json	     - Configuration file for ESLint
├── 📄.gitignore	         - Git files and folders to ignore
├── 📄next-env.d.ts	       - TypeScript declaration file for Next.js
├── 📄tsconfig.json	       - Configuration file for TypeScript
└── 📄jsconfig.json	       - Configuration file for JavaScript
```

### Routing Files

|Files|types|meaning|
|---|---|---|
|layout	|.js .jsx .tsx|	Shared UI for a segment and its children|
|page	|.js .jsx .tsx|	Unique UI of a route and make routes publicly accessible|
|loading	|.js .jsx .tsx|	Loading UI for a segment and its children|
|not-found	|.js .jsx .tsx|	Not found UI for a segment and its children|
|error	|.js .jsx .tsx|	Error UI for a segment and its children|
|global-error	|.js .jsx .tsx|	Global Error UI|
|route	|.js .ts|	Server-side API endpoint|
|template	|.js .jsx .tsx|	Specialized re-rendered Layout UI, Re-rendered layout|
|default	|.js .jsx .tsx|	Parallel route fallback page|

- [Parallel route](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

### Nested Routes

|Folder|meaning|
|---|---|
|`folder`|	Route segment|
|`folder/folder`|	Nested route segment|

### Dynamic Routes

|Folder|meaning|
|---|---|
|`[folder]`	|Dynamic route segment|
|`[...folder]`	|Catch-all route segment|
|`[[...folder]]`|	Optional catch-all route segment|

### Route Groups and Private Folders

|Folder|meaning|
|---|---|
|`(folder)`	|Group routes without affecting routing|
|`_folder`	|Opt folder and all child segments out of routing|

### Parallel and Intercepted Routes

|Folder|meaning|
|---|---|
|`@folder`	|Named slot|
|`(.)folder`	|Intercept same level|
|`(..)folder`	|Intercept one level above|
|`(..)(..)folder`	|Intercept two levels above|
|`(...)folder`	|Intercept from root|

### Dynamic Routes

|Folder convention|suffix|meaning|
|---|---|---|
|`[folder]/index`	|.js .jsx .tsx	|Dynamic route segment|
|`[...folder]/index`	|.js .jsx .tsx	|Catch-all route segment|
|`[[...folder]]/index`	|.js .jsx .tsx	|Optional catch-all route segment|

|File convention|suffix|meaning|
|---|---|---|
|`[file]`	|.js .jsx .tsx	|Dynamic route segment|
|`[...file]`	.|js .jsx .tsx	|Catch-all route segment|
|`[[...file]]`	|.js .jsx .tsx	|Optional catch-all route segment|

[⬆ back to top](#top)

### pages Routing Conventions

- Special Files
- Routes
- Dynamic Routes

|Special Files|suffix|meaning|
|---|---|---|
|_app	|.js .jsx .tsx	|Custom App|
|_document	|.js .jsx .tsx	|Custom Document|
|_error	|js .jsx .tsx	|Custom Error Page|
|404	|.js .jsx .tsx	|404 Error Page
|500	|.js .jsx .tsx	|500 Error Page|

|Routes|suffix|meaning|
|---|---|---|
|**Folder convention**|		| |
|`index`	|.js .jsx .tsx	|Home page|
|`folder/index`	|.js .jsx .tsx	|Nested page|
|**File convention**| | |
|`index`	|.js .jsx .tsx	|Home page|
|`file`|.js .jsx .tsx	|Nested page|

|Dynamic Routes|suffix|meaning|
|---|---|---|
|**Folder convention**|		| |
|`[folder]/index`|.js .jsx .tsx	|Dynamic route segment|
|`[...folder]/index`	|.js .jsx .tsx	|Catch-all route segment|
|`[[...folder]]/index`	|.js .jsx .tsx	|Optional catch-all route segment|
|**File convention**| | |
|`[file]`	|.js .jsx .tsx	|Dynamic route segment|
|`[...file]`	|.js .jsx .tsx	|Catch-all route segment|
|`[[...file]]`	|.js .jsx .tsx	|Optional catch-all route segment|

[⬆ back to top](#top)

## The App Router

- The App Router works in a new directory named **app**
  - If application uses the **pages** directory, please also see the [Pages Router](https://nextjs.org/docs/pages/building-your-application/routing) documentation
- Note: 
  - The App Router takes priority over the Pages Router
  - By default, components inside **app** are React Server Components, but can be set to a Client Component

### Terminology

- ![Routing-Terminology1](Routing-Terminology.png)

### Component Hierarchy

- React components defined in special files of a route segment are rendered in a specific hierarchy
- ![React-Component-Hierarchy](React-Component-Hierarchy.png)

### Colocation

- special files, you have the option to colocate your **own** files (e.g. components, styles, tests, etc) inside folders in the app directory
- ![Colocation](Colocation.png)

### Advanced Routing Patterns

- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes): Allow to simultaneously show two or more pages in the same view that can be navigated independently. You can use them for split views that have their own sub-navigation. E.g. Dashboards.
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes): Allow  to intercept a route and show it in the context of another route. You can use these when keeping the context for the current page is important. E.g. Seeing all tasks while editing one task or expanding a photo in a feed.

[⬆ back to top](#top)

## Pages Router

- Pages Router has a **file-system** based router built on concepts of **pages**. When a file is added to the pages directory it's automatically available as a route

## Metadata File Conventions

- App Icons
- Open Graph and Twitter Images
- SEO

|App Icons|suffix|meaning|
|---|---|---|
|favicon	|.ico	|Favicon file|
|icon	|.ico .jpg .jpeg .png .svg	|App Icon file|
|icon	|.js .ts .tsx	|Generated App Icon|
|apple-icon	|.jpg .jpeg, .png	|Apple App Icon file|
|apple-icon	|.js .ts .tsx	|Generated Apple App Icon|

|Open Graph and Twitter Images|suffix|meaning|
|---|---|---|
|opengraph-image	|.jpg .jpeg .png .gif	|Open Graph image file|
|opengraph-image	|.js .ts .tsx	Generated Open Graph image|
twitter-image	.jpg .jpeg .png .gif	|Twitter image file|
|twitter-image	|.js .ts .tsx	|Generated Twitter image|

|SEO|suffix|meaning|
|---|---|---|
|sitemap	|.xml	|Sitemap file|
|sitemap	|.js .ts	|Generated Sitemap|
|robots	|.txt	|Robots file|
|robots	|.js .ts	|Generated Robots file|

[⬆ back to top](#top)

## 多种渲染模式来保证页面性能体验

渲染模式是决定页面性能很重要的因素，也是 Next.js 最核心的一部分，之前写了几篇相关的文章，这里就不进行再次说明了，建议去看看：

- [理解前端基础渲染模式｜CSR、SSR、同构、静态化](https://juejin.cn/post/7204085076504920119)
- [前端各种渲染模式性能对比分析](https://juejin.cn/post/7205875448575262776)
- [Next.js性能优化之ISR渲染入门和原理探索](https://juejin.cn/post/7199812069050171452)

## 可扩展配置

- 配置文件 next.config.js 中暴露了 webpack 实例，因此可以完全控制 webpack
- 配置文件 next.config.js 中支持配置自定义配置，你可以把一些公用的不变的配置写在 serverRuntimeConfig 或者 publicRuntimeConfig 中，前者只会出现在服务端，后者会暴露到客户端
- 可自定义 server ，你可以在启动服务的时候做一些自己想要做的处理，比如 node.js 性能监控等等
- 不自定义 server ，也可以使用它提供的 middreware 机制来拦截请求或者校验权限等事项
- 自定义 APP，也就是 _app.js，它用于处理多个页面公共部分
- 自定义 Document，也就是_document.js，用于自定义配置 html 生成内容，比如插入 Google 分析脚本
- 自定义错误界面 也就是 404 或者 500 错误状态的页面
- 自定义页面 head 属性，使用
next/head 提供的 Head 组件，用于自定义 html document 头部的 title/meta/base 等标签信息。
- 可自定义 babel 和 postcss 等工程化规则配置

[⬆ back to top](#top)

## 其他多方面性能优化方案

- [图片优化](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fbasic-features%2Fimage-optimization)
- [字体优化](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fbasic-features%2Ffont-optimization)

[⬆ back to top](#top)

## 提供性能数据

- Next.js 提供了获取应用性能数据的方法 [reportWebVitals](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2Fdocs%2Fadvanced-features%2Fmeasuring-performance%23sending-results-to-analytics), 只能在 App 组件中使用


```ts
// _app.tsx
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}
```

[⬆ back to top](#top)

## 其他常用功能或扩展

- API Routes ，Next.js 支持在 pages/api 目录下编写接口，可通过接口去实现 ISR 增量静态化功能，前端用于编写 BFF 接口应该也是一个不错的方案，但注意不能在 getStaticProps/getStaticPaths 中去请求，打包的时候请求不了。
- next/amp: 用于支持开发 AMP 应用

[⬆ back to top](#top)

> References
- [Next.js official](https://nextjs.org/)
- [Next.js运用实践](https://juejin.cn/column/7196868559125250104)
- [Next.js 13 的 app 目录模式功能梳理](https://juejin.cn/post/7221162775074734135)
