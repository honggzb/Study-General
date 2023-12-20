[tailwindcss学习](#top)

- [installation](#installation)
- [TailwindCSS配置](#tailwindcss配置)
- [Core Concepts](#core-concepts)
  - [字符大小设置](#字符大小设置)
  - [字符粗细设置](#字符粗细设置)
  - [文字颜色设置](#文字颜色设置)
- [Tailwind CSS自定义按钮](#tailwind-css自定义按钮)
- [悬停,过渡,变换,动画](#悬停过渡变换动画)
- [响应式方案](#响应式方案)
- [自定义css属性](#自定义css属性)

------------------------------------------------------------

## installation

1. create new project: `npm create xxx`
2. install dependencies: `npm i -d tailwindcss postcss autoprefixer`

## TailwindCSS配置

1. `npx tailwindcss init -p`
   1. 创建'postcss.config.js'文件，这里的配置主要是添加tailwindcss的插件，这样你编写的css才会被tailwindcss处理
   2. 创建'tailwind.config.js'文件，主要进行扫描规则、主题、插件等配置
2. 在'tailwind.config.js'配置文件中添加所有模板文件的路径

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],        //react
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],  //vue
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. 引入Tailwind的基本指令, 根目录创建tailwind.css文件,将加载Tailwind的指令添加到CSS文件中

```css
/* tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
/*在其他文件中引入*/
import './tailwind.css';
```

4. Start the Tailwind CLI build process, `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`
   - 或将build命令添加到package.json文件中, 设置同时启动项目和tailwindcss监听的命令
   - `concurrently` 是一个跨平台并行执行命令的依赖，需要下载

```javascript
"scripts": {
    "serve": "concurrently \"npm run dev\" \"npm run tail\"",
    "dev": "vite",
    "tail": "tailwindcss -i ./src/style.css -o ./src/output.css --watch",
  },
```

1. Start using Tailwind in your HTML:
   1.  `<link href="/dist/output.css" rel="stylesheet">`
   2.  `<div class="w-32 h-32 bg-blue-500"></div>`

[⬆ back to top](#top)

## Core Concepts

- Tailwind CSS 是一个利用公用程序类（Utilize Class）的 CSS 框架
- Utilize Class实现了原子化 css：1个class代表1个css 属性

|Class|css属性|
|---|---|
|pr-px|padding-right: 1px;|
|w-3|width: 0.75rem;|

### 字符大小设置

|.text-{size}|字体大小|
|---|---|
|.text-xs|.75rem|
|.text-sm|.875rem|
|.text-base|1rem|
|.text-lg|1.125rem|
|.text-xl|1.25rem|
|.text-2xl|1.5rem|
|.text-3xl|1.875rem|
|.text-4xl|2.25rem|
|.text-5xl|3rem|
|.text-6xl|4rem|
|.text-7xl|4.5rem|
|.text-8xl|6rem|
|.text-9xl|8rem|

### 字符粗细设置 

|font-{thickness}|字符粗细|
|---|---|
|.font-thin|font-weight: 100|
|.font-extralight|font-weight: 200|
|.font-light|font-weight: 300;|
|.font-normal|font-weight: 400;|
|.font-medium|font-weight: 500;|
|.font-semibold|font-weight: 600;|
|.font-bold|font-weight：700；|
|.font-extrabold|font-weight：800；|
|.font-black|font-weight：900；|

### 文字颜色设置

|text-{color}-{color depth}|文字颜色|
|---|---|
|text-green-100|颜色：# f0fff4;|
|text-green-200|颜色：#c6f6d5；|
|text-green-300|颜色：#9ae6b4；|
|text-green-400|颜色：#68d391；|

[⬆ back to top](#top)

## Tailwind CSS自定义按钮

1. open src/input.css, 定义btn类

```css
@tailwind base;
@tailwind components;
.btn{
  @apply font-semibold text-white py-2 px-4 rounded;
}
@tailwind utilities;
```

2. `npm run build`
3. 使用btn类和添加的按钮创建，只将背景颜色更改为红色

```html
<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">前端晚间课</button>
<button class="bg-red-700 btn">前端晚间课</button>
```

## 悬停,过渡,变换,动画

- 悬停: `<button class="bg-red-700 btn hover:bg-red-500">前端晚间课</button>`
- 过渡:  
  - duration-1000，颜色会在1秒内缓慢变化
  - `<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded hover:bg-red-700 duration-1000">前端晚间课</button>`
- 参见 [变换](https://tailwindcss.com/docs/scale)
  - transform 和 scaling
  - `<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded transform hover:scale-110 hover:bg-red-700 duration-1000">前端晚间课</button>`
- 参见 [动画](https://tailwindcss.com/docs/animation)
  - animate-bounce 和 animate-pulse

[⬆ back to top](#top)

## 响应式方案

- 默认显示绿色，在最小为md(768px)的屏幕下显示蓝色, `<div class="w-32 h-32 bg-green-500 md:bg-blue-500" />`
- 在1300px以下（包含1300px）屏幕下显示绿色，以上显示蓝色, `<div class="w-32 h-32 max-[1300px]:bg-green-500 bg-blue-500"></div>`

## 自定义css属性

https://www.tailwindcss.cn/docs/configuration

[⬆ back to top](#top)

> references
- [tailwindcss official](https://tailwindcss.com/)
- [一次就能看懂的Tailwind CSS介绍](https://www.zhihu.com/tardis/bd/art/603429955)
- [TailwindCss实战总结](https://blog.csdn.net/qq_40147756/article/details/131907139)
