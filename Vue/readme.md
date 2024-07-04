```
├── 📂Vue/
│   ├── 📂Vue3学习小结-codes-自定义Vue3工程库/
│   ├── 📂Vue3学习小结-codes/
│   ├── 📂unit-test-codes
│   ├── 📂vue-code-execise/
│   │     ├── 📄
│   │     └──
│   ├── 📂vue使用技巧/
│   │     ├── 📄vue3使用技巧之svg图标.md
│   │     └──
│   ├── 📂遇到的问题/
│   ├── 📄Vue3基础01--Essentials.md
│   ├── 📄Vue3基础02--Components.md
│   ├── 📄Vue3基础03--watcher+template Ref.md
│   ├── 📄Vue3学习小结01--简介.md
│   ├── 📄Vue3学习小结02--OptionsAPI、CompositionAPI与setup.md
│   ├── 📄Vue3学习小结03--响应式数据ref、reactive和toRefs、toRef.md
│   ├── 📄Vue3学习小结04--computed计算属性、watch监听、watchEffect函数.md
│   ├── 📄Vue3学习小结05--标签的ref属性、props父子通信.md
│   ├── 📄Vue3学习小结06--生命周期Lifecycle、自定义Hook.md
│   ├── 📄Vue3学习小结07--路由.md
│   ├── 📄Vue3学习小结08--pinia状态管理.md
│   ├── 📄Vue3学习小结09--组件通信.md
│   ├── 📄Vue3学习小结10--slot插槽.md
│   ├── 📄Vue3学习小结11--其它响应式API.md
│   ├── 📄Vue3学习小结12--Vue3新组件.md
│   ├── 📄Vue3学习小结13--内置指令+内置组件.md
│   ├── 📄Vue3学习小结14--自定义指令directive.md
│   ├── 📄Vue3学习小结15-自定义Vue3工程库.md
│   ├── 📄Vue3学习小结16--Vue3定义全局函数和变量.md
│   ├── 📄Vue3学习小结17--编写Vue3自定义插件.md
│   ├── 📄Vue3学习小结18--UI库ElementUI，AntDesigin等.md
│   ├── 📄Vue3学习小结20--event loop和nextTick.md
│   ├── 📄Vue3学习小结21--开发h5适配.md
│   ├── 📄Vue3学习小结22--vue环境配置.md
│   ├── 📄Vue3学习小结23--Vue3性能优化.md
│   ├── 📄Vue3学习小结24--Proxy跨域.md
│   ├── 📄Vue3学习小结25--编译宏.md
│   ├── 📄Vue3学习小结26--unocss原子化.md
│   ├── 📄Vue3学习小结27--unit test by Vitest.md
│   ├── 📄Vue3学习笔记-Vue3特性-2023.md
│   ├── 📄Vue官网学习小结.md
│   ├── 📄Vue官网学习小结之组件.md
│   └── 📄关于VScode vue3卡顿.md
```

## General

- **create project**
  - 使用vue-cli： `npm create vue@latest`
  - 使用Vite: `npm create vite@latest`
- package.json:
  - `"dev": "vite --open",`
  - `"preview": "vite preview",`
- **setup的语法糖**:  把name和setup放在一个script中, `<script lang="ts" setup name="News">`
  - `npm i vite-plugin-vue-setup-extend -D`  -->
  - add `"compilerOptions": {  "types": ["element-plus/global"]` to 'tsconfig.json' -->
  - add following in vite.config.ts
    1. `import VueSetupExtend from 'vite-plugin-vue-setup-extend'`
    2. `plugins: [ vue(), VueSetupExtend()]`
- **bootstrap**:
  - `npm install bootstrap`
  - add `import 'bootstrap/dist/css/bootstrap.css` to main.ts
- **LESS**: `npm i less -d`  -->   `<style scoped lang="less">`
- **animate.css** --> npm i animate -D --> import 'animate.css' in component
- **gsap** --> npm i gsap -D --> import gsap from 'gsap' in component
- **TailwindCSS**
  1. 安装 Tailwind 以及其它依赖项: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`
  2. 生成配置文件: `npx tailwindcss init -p`
  3. 修改配置文件 'tailwind.config.js'   -->   `content: ["./src/**/*.{html,ts,js,vue}"],`
  4. Add the Tailwind directives to your CSS: 
      1. `@tailwind base;`
      2. `@tailwind components;`
      3. `@tailwind utilities;`

## Vue学习资源

- [vuejs官网](https://vuejs.org/)
- [vuejs中文官网](https://cn.vuejs.org/)
- [vuejs源码](https://github.com/vuejs/vue)
- [vuejs官方工具](https://github.com/vuejs)
- [vuejs官方论坛](https://forum.vuejs.org/c/chinese)
- [vue3官方推荐社区项目：VueUse](https://www.vueusejs.com/)
- [Vue.js 教程](http://www.runoob.com/vue2/vue-tutorial.html)
- https://www.cnblogs.com/Itstars/tag/vue.js/
- https://github.com/learncodeacademy/react-js-tutorials
- [Vue基础知识汇总(含webpack打包工具的使用)](https://juejin.im/post/5db25275f265da4d3c071cfa?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)
- [vue3最新学习资料集合，不断更新](https://learnku.com/articles/48928)
- [web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/vue.html#%E4%B8%80%E3%80%81%E4%BB%8E%E5%8E%86%E5%8F%B2%E8%AF%B4%E8%B5%B7)

## Bilibili学习资源

- Vue3
  - [尚硅谷Vue3入门到实战，最新版vue3+TypeScript前端开发教程](https://www.bilibili.com/video/BV1Za4y1r7KE)
  - [Vue3 + vite + Ts + pinia + 实战 + 源码 + electron](https://www.bilibili.com/video/BV1dS4y1y7vd)
  - [尚硅谷Vue项目实战硅谷甄选，vue3项目+TypeScript前端项目一套通关](https://www.bilibili.com/video/BV1Xh411V7b5)
  - [尚硅谷Vue2.0+Vue3.0全套教程丨vuejs从入门到精通](https://www.bilibili.com/video/BV1Zy4y1K7SH)
- Vue2
  - [尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)](https://www.bilibili.com/video/BV1Vf4y1T7bw)

## Book

- [Vue3 入门指南与实战案例](https://vue3.chengpeiquan.com/)

## Github resource

- [Sample - vite+vue3+vue-router4+pinia](https://github.com/mutoe/vue3-realworld-example-app)
- [Sample - Vue3, Vite, Pinia (Vuex 5), Vue Router 4, Quasar,](https://github.com/CharlieDigital/vue3-pinia-quasar-ts)
- [Vue vben admin免费开源的中后台模版vue3,vite5](https://github.com/vbenjs/vue-vben-admin/blob/main/README.zh-CN.md)
- [vue-admin--vue3,vite](https://github.com/huccct/vue-admin/tree/main)
📦
