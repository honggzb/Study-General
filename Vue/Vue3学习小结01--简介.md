[Vue3学习小结--1简介](#top)

- [特点](#特点)
- [创建vue工程](#创建vue工程)
- [Vue Component](#vue-component)
- [vue-devtools](#vue-devtools)

-------------------------------------

## 特点

- 渐进式框架
  - 无需构建步骤，渐进式增强静态的 HTML
  - 在任何页面中作为 Web Components 嵌入
  - 单页应用 (SPA)
  - 全栈 / 服务端渲染 (SSR)
  - Jamstack / 静态站点生成 (SSG)
  - 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

|||
|---|---|
|性能的提升|打包大小减少41%<br>初次渲染快55%，<br>更新渲染快133%内存减少54%|
|源码的升级|使用Proxy代替defineProperty实现响应式<br>重写虚拟DOM的实现和Tree-Shaking|
|拥抱TypeScript|Vue3可以更好的支持TypeScript|
|新的特性||
|Composition Api(组合Api)|setup, ref和reactive, computed与watch,…|
|新的内置组件|Fragment,Teleport,Suspense,…|
|其他改变|新的生命周期钩子<br>data选项应始终被声明为一个函数<br>移除keyCode支持作为v-on的修饰符|

## 创建vue工程

- 使用vue-cli： `npm create vue@latest`
- 使用Vite: `npm create vite@latest`
- vite-env.d.ts: 
  - client.d.ts
- main.ts: vue3通过`createApp`函数来创建一个应用实例

```
├── 📂src/
|    ├── 📂assets/
|    ├── 📂component/               - 
|    |     ├── 📄HelloWorld.vue
|    |     └── 
|    ├── 📄App.vue                  -
|    ├── 📄style.css
|    ├── 📄main.ts                  - 根组件
|    └── 📄vite-env.d.ts            - 让ts认识一些类型的文件
├── 📄index.html                    -入口文件
├── 📄tsconfig.json
├── 📄tsconfig.node.json
└── 📄vite.config.ts
```

![使用Vite](./images/使用Vite.png)

[⬆ back to top](#top)

## Vue Component

```ts
<template>
  <div class="app">
    <h1>Hello</h1>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'App'     //name of component
  }
</script>
<style>
  .app {
    backgroung-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
</style>
```

[⬆ back to top](#top)

## vue-devtools

- 链接:https://pan.baidu.com/s/139hspAnspD7bJbo81xigmg 密码:1hsv
- `git clone https://github.com/vuejs/vue-devtools.git`
  - `npm run build`
  - 游览器输入地址“chrome://extensions/”进入扩展程序页面，点击“加载已解压的扩展程序...”按钮，选择vue-devtools>shells下的chrome文

> https://www.cnblogs.com/Itstars/tag/vue.js/
