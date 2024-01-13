## create a react project

|project type|CLI|
|---|---|
| typescript project| `npx create-react-app myproject --template typescript`|
|Next.js全栈式的 React 框架<br>Next.js的App Router是对 Next.js API的重新设计，<br>旨在实现 React 团队的全栈架构愿景。它让你在异步组件中获取数据，这些组件甚至能在服务端构建过程中运行<br>Next.js 只支持React 16+| `npx create-next-app@latest`|
|Vite|`npm create vite@latest`|
|Remix 具有嵌套路由的全栈式 React 框架|`npx create-remix`|
|Gatsby 快速的支持 CMS 的网站的 React 框架|`npx create-gatsby`|
|Expo 具有真正原生 UI 的应用，包括 Android、iOS，以及 Web 应用| `npx create-expo-app`|

VSCode shotword

|shotword|CLI|
|---|---|
|rafce   | component|

## install and setup tailwindcss

- [tailwindcss install-using postcss](https://tailwindcss.com/docs/installation/using-postcss)
- `npm i tailwindcss postcss autoprefixer --save-dev`
- `npx tailwindcss init -p`
   - [Vite PostCSS module error when building app in Svelte](https://stackoverflow.com/questions/73136479/vite-postcss-module-error-when-building-app-in-svelte)
- adding following to 'postcss.config.js' and 'tailwind.config.js'
- adding three lines in 'index.css' file

```javascript
//postcss.config.js
 plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
//tailwind.config.js
content: ["./src/**/*.{html,tsx}"],
//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
