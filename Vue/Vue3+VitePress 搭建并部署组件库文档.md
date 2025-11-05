[Vue3 + VitePress 搭建并部署组件库文档](#top)

- [项目目录结构](#项目目录结构)
- [setup](#setup)
- [构建组件库（packages）](#构建组件库packages)
- [集成 Element Plus \& Arco Design UI](#集成-element-plus--arco-design-ui)
- [配置VitePress主题与组件演示](#配置vitepress主题与组件演示)
- [vitpress使用组件打包配置](#vitpress使用组件打包配置)
- [本地开发和构建](#本地开发和构建)
- [打包优化](#打包优化)
- [打包测试](#打包测试)

-----------------------------------------------------------------
## 项目目录结构

```
MY-VITEPRESS/
├── docs/                     # 文档内容（Markdown）
│   └── components/           # 示例页面
│       ├── btn-examples.md
│       └── index.md
├── packages/                 # 封装的组件源码
│   ├── components/           # Vue 组件
│   │   └── MyButton.vue
│   ├── directives/
│   ├── examples/             # 使用示例代码
│   └── theme-chalk/          # 样式变量
├── .vitepress/               # VitePress 配置
│   ├── config.ts
│   └── theme/
├── vite.config.ts
└── package.json
```

[⬆ back to top](#top)

## setup

1. `npm init -y`
2. `npm install vue@3 vite @vitejs/plugin-vue -D`
3. `npm install vitepress -D`  -- vitepress是独立运行的，不依赖 vite 项目本身，但可以共存
4. 创建'/docs/index.md'，并写入内容, 在根目录执行`npm run docs:dev`

```
---
title: 我的组件库文档
description: 基于 Vue3 + VitePress + Element Plus 的组件库文档
---
# 欢迎使用我的组件库
这是一个基于 Vue3、VitePress 构建的组件库文档平台，集成了 Element Plus 和 Arco Design UI 的功能。
## 快速开始
//```vue
<template>
  <my-button type="primary">点击我</my-button>
</template>
<script setup>
import MyButton from '../packages/components/button/index.vue'
</script>
```

## 构建组件库（packages）

1. 创建 'packages' 文件夹，与docs同级目录
2. 创建 'components/button', 封装组件
3. 创建 'packages/components/index.ts'
4. 创建 'packages/directives/domResize.ts'

[⬆ back to top](#top)

## 集成 Element Plus & Arco Design UI

1. `npm i element-plus -S`
2. `npm i @arco-design/web-vue -S`
3. 引入样式（在 'packages/main.ts' 中）
4. 批量注册组件: 创建'packages/index.ts'文件
   - 封装的所有组件进行批量注册，使其能够通过 `app.use()` 的方式全局安装到 Vue 应用中

```ts
import { createApp } from "vue";
import App from "./App.vue";
/* 样式文件 */
import router from "./router";
import { domResize } from "./directives/domResize";
import "./theme-chalk/global.scss";
import ArcoVue from '@arco-design/web-vue';
import ElementPlus from 'element-plus'
import '@arco-design/web-vue/dist/arco.css';
import './styles/element/index.scss'
const app = createApp(App);
app.directive("domResize", domResize);
app.use(ArcoVue);
app.use(ElementPlus)
app.use(router).mount("#app");
//packages/index.ts
export * from "./components";
import { installer as install } from "./install";
export default install;
```

[⬆ back to top](#top)

## 配置VitePress主题与组件演示

- 修改 'docs/.vitepress/config.ts'

```ts
import { defineConfig } from "vitepress";
import { resolveConfig, pluginsConfig } from "../../scripts/preview.ts";
export default defineConfig({
    title: "Wy-design",
    description: "组件库",
    base: "/",
    vite: {
        server: {
            port: 5175,
        },
        resolve: resolveConfig,
        plugins: pluginsConfig,
    },
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "组件", link: "/components/guide-examples" },
            { text: "图表", link: "/charts/demo" },
        ],
        // 使用路径映射来控制侧边栏
        sidebar: {
            // 当前路径以 /guide-examples 开头时，显示“组件”侧边栏
            "/components/": [
                {
                    text: "组件",
                    items: [
                        { text: "操作指南", link: "/components/guide-examples" },
                        { text: "按钮", link: "/components/btn-examples" },
                    ],
                },
            ],
            // 当前路径以 /demo 开头时，显示“图表”侧边栏
            "/charts/": [
                {
                    text: "图表",
                    items: [{ text: "demo1", link: "/charts/demo" }],
                },
            ],
        },
        socialLinks: [{ icon: "github", link: "https://github.com/wuyongGitHub/wuyongGitHub.github.io" }],
    },
});
```

[⬆ back to top](#top)

## vitpress使用组件打包配置

- 新建'docs/.vitepress/theme/index.ts'，引入打包后的dist

```ts
import Theme from "vitepress/theme";
import { App, h, defineAsyncComponent } from "vue";
import asyncComponents from "@/examples/index";
import { domResize } from "@/directives/domResize";
// 样式
import "element-plus/dist/index.css";
import "@arco-design/web-vue/dist/arco.css";
import "../../../packages/styles/element/index.scss";
// 必须引入并注册组件库
import ElementPlus from "element-plus";
import ArcoVue from "@arco-design/web-vue";
const WyBasicsDocsImage = defineAsyncComponent(() => asyncComponents.then((Components) => Components["WyBasicsDocsImage"]));
export default {
    ...Theme,
    Layout() {
        return h(Theme.Layout, null, {
            "home-hero-image": () => {
                return h(WyBasicsDocsImage);
            },
        });
    },
    async enhanceApp({ app }: { app: App }) {
        let Components = await asyncComponents;
        app.directive("domResize", domResize);
        //  注册 UI 库
        app.use(ElementPlus);
        app.use(ArcoVue);
        //  注册你二次封装的组件
        for (let i in Components) {
            app.use(Components[i]);
        }
    },
};
```

[⬆ back to top](#top)

## 本地开发和构建

```json
"scripts": {
    "start": "vite --host --mode development",  //启动案例使用预览
    "build": "vue-tsc --noEmit && vite build --mode developmentBuild && node buildPackage/vetur.js  &&  node buildPackage/index.js ",  //打包组件生成/build/dist目录
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.ts,.js,.jsx,.mjs --fix --ignore-path .gitignore",
    "prettier": "prettier --write .",
    "style": "stylelint 'packages/**/*.(css|scss)' --fix",
    "prepare": "husky install",
    "docs:dev": "vitepress dev docs",   //启动本地文档预览，热更新
    "docs:build": "cross-env NODE_ENV=production vitepress build docs", //构建文档输出静态文件
    "docs:preview": "vitepress preview docs" //预览构建结果
    },
```

[⬆ back to top](#top)

## 打包优化

- 'vite.config.ts'进行打包优化，排除了 vue, element-plus 等大型依赖打包

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { pluginsConfig, resolveConfig } from "./scripts/preview";
import Inspect from "vite-plugin-inspect";
import dts from "vite-plugin-dts";
export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
            cssCodeSplit: true,
            rollupOptions: {
                external: ["@ant-design/icons-vue", "ant-design-vue", "element-plus", "unplugin-vue-components", "unplugin-auto-import", "vue"],
                output: [
                    {
                        format: "es",
                        entryFileNames: "[name].js",
                        exports: "named",
                        name: "JbDesign",
                        dir: "./build/dist",
                    },
                    {
                        format: "es",
                        entryFileNames: "[name].js",
                        exports: "named",
                        preserveModules: true,
                        preserveModulesRoot: "packages",
                        dir: "./build/es",
                    },
                    {
                        format: "cjs",
                        entryFileNames: "[name].js",
                        exports: "named",
                        preserveModules: true,
                        preserveModulesRoot: "packages",
                        dir: "./build/lib",
                    },
                ],
            },
            lib: {
                entry: resolve(__dirname, "./packages/index.ts"),
                name: "JbDesign",
                fileName: (format) => `Wy-design.${format}.js`,
                formats: ["es", "cjs"],
            },
        },
        plugins: [
            vue(),
            dts({
                tsconfigPath: "./tsconfig.prod.json",
                outDir: "build/lib",
            }),
            dts({
                tsconfigPath: "./tsconfig.prod.json",
                outDir: "build/es",
            }),
            ...pluginsConfig,
            // Inspect({
            //     build: true,
            //     outputDir: ".vite-inspect",
            // }),
        ],
        resolve: resolveConfig,
    };
});
```

[⬆ back to top](#top)

## 打包测试

1. `npm run build`
2. 将build文件名改成Wy-Design，移入需要使用的项目，后期会将该包上传到npm服务或者npm私服中通过install进行安装拉取使用
3. 使用该组件包的项目中**全局**注册使用:
   1. `import wyDesign from "./Wy-Design/dist/index";`
   2. `import "./build/dist/index.css";`
   3. `app.use(wyDesign);`
4. 或者按需引入
   1. `import { WyButton } from "../../Wy-Design";`

[⬆ back to top](#top)

> References
- [Vue3 + VitePress 搭建并部署组件库文档平台（结合 Element Plus 与 Arco Design Vue）](https://juejin.cn/post/7559021218080194606)
  - https://github.com/wuyongGitHub/wuyongGitHub.github.io
  - https://wuyonggithub.github.io/
- [手把手从零搭建一个 vue3 组件库](https://juejin.cn/column/7265586015291752488)
  - https://vangleer.github.io/vangle/
  - https://github.com/vangleer/vangle
- [Vue3 企业级优雅实战 - 组件库框架](https://juejin.cn/post/7167257784612814861)
- [Vite+TypeScript从零搭建Vue3组件库](https://juejin.cn/column/7118932817119019015)
- [【前端工程化-组件库】从0-1构建Vue3组件库（概要设计）](https://juejin.cn/post/7250357906713313341)
- [【前端工程化-组件库】从0-1构建Vue3组件库（单元测试）](https://juejin.cn/post/7254443448563908663)
- [【从 0 到 1 搭建 Vue 组件库框架】0. 系列导论](https://juejin.cn/post/7254341178258505788)
- [从 0 到 1 搭建 Vue3 + Vite 组件库：流程、规范与最佳实践](https://juejin.cn/post/7533042229683830823)
- [组件库工程化环境设计](https://juejin.cn/column/7369120920146952227)
  - https://github.com/Devil-Training-Camp/virtual-scroll-list-liudingkang
