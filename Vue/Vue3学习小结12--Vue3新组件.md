[Vue3学习小结12--Vue3新组件](#top)

- [Teleport传送门](#teleport传送门)
- [Suspense异步组件](#suspense异步组件)
- [全局API转移到应用对象](#全局api转移到应用对象)
- [其他- vue3迁移指南](#其他--vue3迁移指南)

-------------------------------------

## Teleport传送门

- Teleport是一种能够将我们的组件html结构移到到指定位置的技术
  
```ts
<template>
	<div class="app">
    <button @click="isShow = true">点击弹窗</button>
    <!-- 将弹窗位置改为以参照body -->
    <Teleport to='body'>
      <div class="model" v-if="isShow">
        <h2>显示标题</h2>
        <h2>显示内容</h2>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </Teleport>
	</div>
</template>
<script setup lang="ts" name="App">
import { ref } from 'vue';
let isShow = ref(false)
</script>
<style>
.app{
  width: 500px;
  height: 600px;
  background-color: aqua;
  filter: saturate(20%); /*此样式就导致position:fixed不会以浏览器窗口为基准了 */
}
.model{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10%;
  left: 50%;
  width: 200px;
  height: 300px;
  background-color: antiquewhite;
}
</style>

```

[⬆ back to top](#top)

## Suspense异步组件

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 在大型应用中，可能需要将应用分割成小一些的代码块 并且减少主包的体积, 这时候就可以使用异步组件
- [Element plus Skeleton 骨架屏](https://element-plus.org/zh-CN/component/skeleton.html#%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81)
- 使用步骤:
  - 引入异步组件
  - 使用Suspense包裹组件，并配置好default与fallback
- 其他组件如：异步组件defineAsyncComponent等等

```ts
//父组件
<template>
	<div class="app">
    <button @click="isShow = true">点击弹窗</button>
    <Suspense>
        <!-- <template #default>
            <Child/>
        </template> -->
        <!-- 插槽的形式： default默认是展示要显示的组件内容 -->
        <Child/>
        <!-- fallback表示发送请求过程中展示的内容 -->
        <template #fallback>
            loading...
        </template>
    </Suspense>
	</div>
</template>
<script setup lang="ts" name="App">
import Child from './Child.vue';
import { ref } from 'vue';
let isShow = ref(false)
</script>
// 子组件
<template>
  <div>
    <h2>数字是{{ num }}</h2>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
let num = ref(0)
// 子组件内使用可以直接使用await, setup()的组件支持async，返回一个Promise, 但是async setup()的组件的呈现必须要使用Suspense包裹
const {data:{content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
console.log(content, 'content')
</script>
```

[⬆ back to top](#top)

## 全局API转移到应用对象

- app.component全局注册组件
- app.config 全局属性
- app.directive 全局指令，参考Vue2自定义指令或者官网
- app.mount
- app.unmount
- app.use

```ts
//src/main.ts
// 引入用于创建应用
import Hello from './Hello.vue'
const app = createApp(App)  // 创建一个应用
app.component('Hello', Hello)   // Hello为全局组件
//2) 
app.config.globalProperties.x = 99
declare module 'vue' {
  interface ComponentCustomProperties {
    x: number
  }
}
app.directive('beauty', (element, {value}) => {
  element.innerText += value
  element.style.color = 'green'
  element.style.backgroundColor = 'yellow'
})
// 挂载整个应用到app容器中
app.mount('#app')

```

[⬆ back to top](#top)

## 其他- vue3迁移指南

- 过渡类名`v-enter`修改为`v-enter-form`、过渡类名`v-leave`修改为`v-leave-form`
- `keyCode`作为`v-on`修饰符的支持
- `v-model`指令在组件上的使用已经被重新设计，替换掉了`v-bind.sync`
- `v-if`和`v-for`在同一个元素身上使用优先级发生了变化
- 移除了`$on`、`$off`和`$once`实例方法
- 移除了过滤器`filter`
- 移除了`$children`实例`propert`
- [非兼容性改变- official](https://v3-migration.vuejs.org/zh/breaking-changes/)

> References
- [响应式 API：进阶](https://cn.vuejs.org/api/reactivity-advanced)
- [扩展全局属性](https://cn.vuejs.org/guide/typescript/options-api.html#augmenting-global-properties)
- https://www.cnblogs.com/Itstars/tag/vue.js/
- [Vue学习计划-Vue3--Vue3新组件](https://www.cnblogs.com/Itstars/p/17966823)
