[Vue3学习小结20--event loop和nextTick](#top)
- [event loop](#event-loop)
- [nextTick()](#nexttick)
- [Tick](#tick)

-------------------------------------

## event loop

- 概述
  - js是单线程, 意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行   --> 出现了**异步**的概念
  - 随着HTML5到来js也支持了多线程webWorker 但是也是不允许操作DOM
- 异步机制分类
  - 同步任务
  - 异步任务
    1. 宏任务:  `script`(整体代码)、`setTimeout`、`setInterval`、`UI交互事件`、`postMessage`、`Ajax`
    2. 微任务: `Promise.then catch finally`、`MutaionObserver`、`process.nextTick`(Node.js 环境)
- 异步运行机制：所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"，异步任务执行队列中**先执行宏任务**，然后清空当次宏任务中的所有微任务，然后进行下一个tick如此形成循环
  - ![异步运行机制](异步运行机制.png)

```js
async function Prom() {    // 异步function  宏任务1
    console.log('Y')          // 同步代码
    await Promise.resolve()   // 异步代码， 微任务5
    console.log('X')
  }
  setTimeout(() => {         //宏任务2
    console.log(1)
    Promise.resolve().then(() => {
      console.log(2)
    })
  }, 0)
  setTimeout(() => {         //宏任务3
    console.log(3)
    Promise.resolve().then(() => {
      console.log(4)
    })
  }, 0)
  Promise.resolve().then(() => {   //微任务1
    console.log(5)
  })
  Promise.resolve().then(() => {   //微任务2
    console.log(6)
  })
  Promise.resolve().then(() => {   //微任务3
    console.log(7)
  })
  Promise.resolve().then(() => {  //微任务4
    console.log(8)
  })
  Prom()
  console.log(0)     // 同步代码
  /*  宏任务队列  -->  宏任务1, 宏任务2, 宏任务3
  *   微任务队列  -->  微任务1,微任务2,微任务3,微任务4
  *   执行顺序： 
  *       --> 同步代码 
  *       --> 宏任务1 
  *       --> 微任务队列(微任务1,微任务2,微任务3,微任务4) 
  *       --> 宏任务1里的异步代码（宏任务1执行完毕）
  *       --> 宏任务2和其所有微任务  
  *       --> 宏任务3和其所有微任务
  **/
  // Y 0 5 6 7 8 X 1 2 3 4
```

## nextTick()

- 等待下一次 DOM 更新刷新的工具方法
- 类型: 
  - `function nextTick(callback?: () => void): Promise<void>`
- 当在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新
  - `nextTick()`可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise
- `nextTick()` 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行
- 源码地址 'core\packages\runtime-core\src\scheduler.ts'

```ts
<template>
   <div ref="xiaoman">{{ text }}</div>
   <button @click="change">change div</button>
</template>
<script setup lang='ts'>
import { ref,nextTick } from 'vue';
const text = ref('小满开飞机')
const xiaoman = ref<HTMLElement>()
 // 写法1- 回调函数模式
const change = () => {   //no  async
   text.value = '小满不开飞机'
   console.log(xiaoman.value?.innerText) //小满开飞机
   nextTick(() => {
      console.log(xiaoman.value?.innerText) //小满不开飞机
   });    
}
 // 写法2 - async await 写法
const change = async () => {   // use async function
   text.value = '小满不开飞机'
   console.log(xiaoman.value?.innerText) //小满开飞机
   await nextTick();    // 后面的均为异步代码, 前面的是同步代码
   console.log(xiaoman.value?.innerText) //小满不开飞机
}
</script>
```

[⬆ back to top](#top)

## Tick

- 浏览器这一帧率Tick做了什么
1. 处理用户的事件，就是event 例如 click，input change 等。
2. 执行定时器任务
3. 执行 requestAnimationFrame
4. 执行dom 的回流与重绘
5. 计算更新图层的绘制指令
6. 绘制指令合并主线程 如果有空余时间会执行 requestidlecallback
- 例如显示器是60FPS, 那浏览器绘制一帧就是1000 / 60  ≈ 16.6ms

[⬆ back to top](#top)

> References
- [小满zs-csdn博客](https://blog.csdn.net/qq1195566313/category_11618172.html)
- [nextTick()- offical](https://cn.vuejs.org/api/general.html#nexttick)
- [组件实例- offical](https://cn.vuejs.org/api/component-instance.html#nexttick)
