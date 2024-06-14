[Vue3学习小结15-自定义Vue3工程库](#top)

- [Project setup](#project-setup)
- [codes in project](#codes-in-project)
- [Project publish](#project-publish)
- [use package](#use-package)

---------------------------

- 同时定义一个 hook + 自定义指令，监听DOM的宽高变化
  - 实现一个监听元素变化的hook
  - 会用到一个新的API resizeObserver  兼容性一般 可以做polyfill
  - 可以监听元素的变化 执行回调函数 返回 contentRect 里面有变化之后的宽高
- 用vite打包
- 发布到npm

## Project setup

1. create 'src/index.ts'
2. `npm init`
3. `tsc --init`
4. create 'vite.config.ts'
5. create 'index.ts' in root directory
6. `npm i vue vite -D`
7. create 'index.d.ts' in root directory
8. modify 'package.json', adding `"build": "vite build"`
9. run `npm run build` in command line, it will generate 2 file in 'dist' directory
   1.  'v-resize-xm.mjs'
   2.  'v-resize-xm.umd.js'
10. modify 'package.json' again

```ts
// 1) vite.config.ts
import { defineConfig } from 'vite'
import useResize from './src'
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'useResize'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          useResize: "useResize"
        }
      }
    }
  }
})
// 2) index.d.ts
declare const useResize: {
  (el: HTMLElement, callback: Function): void;
  install: (app: App) => void;
};
export default useResize
// 3) package.json
"scripts": {
    "build": "vite build"
  },
"main": "dist/v-resize-xm.umd.js",
"module": "v-resize-xm.mjs/",
"files": [
    "dist",
    "index.d.ts"
],
```

[⬆ back to top](#top)

## codes in project

```ts
// src/index.ts
import type { App } from 'vue'
//InterSectionObserver
// MutationObserver: 侦听子集的变化，还有属性的变化 以及增删改查
// ResizeObserver 
//1) Hooks 定义
function useResize(el: HTMLElement, callback: Function) {
  let resize = new ResizeObserver((entries) => {
    console.log(entries)
    callback(entries[0].contentRect)
  })
  resize.observe(el);
}
// 2) 注入 App
const install = (app: App) => {
  app.directive('resize', {   // 自定义指令
    mounted(el, binding) {
      useResize(el, binding.value)
    },
  })
}
// 3) 注册
useResize.install = install
// 4) 
export default useResize
```

[⬆ back to top](#top)

## Project publish

1. `npm adduser`
2. `npm login`
3. `npm publish`

[⬆ back to top](#top)

## use package

1. `npm i v-resize-xm -D`
2. 方法1--直接使用
3. 方法2--注册为全局directive后使用

```ts
// 1) 方法1--直接使用
<div id="resize">
  <img id="img" width="300" height="300" src="./assets/images/piNxLo4.jpg" />
</div>
<script lang="ts" setup name="App">
  import { onMounted } from 'vue'
  import useResize from 'v-resize-xm'
  onMounted(() => {
    useResize(document.querySelector('#resize') as HTMLElement, (e:any){
      console.log(e)
    })
  })
</script>
// 2) 方法2--注册为全局directive后使用 main.ts
import useResize from 'v-resize-xm'
use(useResize)
// 
<div v-resize="aaa" id="resize">
  <img id="img" width="300" height="300" src="./assets/images/piNxLo4.jpg" />
</div>
<script lang="ts" setup name="App">
  cosnt aaa = (e) => {
    console.log(e)
  }
</script>
```

[⬆ back to top](#top)

> reference
- [配置 Vite- official](https://cn.vitejs.dev/config/)
