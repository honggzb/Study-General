[Vue3学习小结8--pinia状态管理](#top)

- [搭建 pinia 环境](#搭建-pinia-环境)
- [存储+读取数据](#存储读取数据)
- [修改数据](#修改数据)
- [storeToRefs](#storetorefs)
- [getters](#getters)
- [$subscribe](#subscribe)
- [store组合式写法](#store组合式写法)

-------------------------------------

## 搭建 pinia 环境

1. `npm install pinia`
2. modify 'src/main.ts'

```ts
import { createApp } from 'vue'
import App from './App.vue'
/* 引入createPinia，用于创建pinia */
import { createPinia } from 'pinia'
/* 创建pinia */
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)     /* 使用插件 */
app.mount('#app')
```

## 存储+读取数据

- 存储/定义： 创建文件 src/store/xxx.ts, 定义并暴露一个store: `usexxx`
  - `state() {}`    <-- data  状态
  - `getter: {}`    <-- computed 计算
  - `action: {}`    <-- methods 动作
- 组件中使用state中的数据:  `const sumStore = useSumStore()`

```ts
// 存储/定义   src/store/count.ts
import { defineStore } from "pinia";
//定义并暴露一个store --- useCountStore
export const useCountStore = defineStore('count', {
  actions: {},
  state(){
    return { sum: 6 }
  },
  getters: {}
})
// 组件中使用state中的数据   src/components/Count.vue
<template>
  <h2>当前求和为：{{ sumStore.sum }}</h2>
</template>
<script setup lang="ts" name="Count">
  // 引入对应的useXxxxxStore	
  import {useSumStore} from '@/store/sum'
  // 调用useXxxxxStore得到对应的store
  const sumStore = useSumStore()
</script>
```

[⬆ back to top](#top)

## 修改数据

1. 直接修改: `countStore.sum = 666`
2. 批量修改: `countStore.$patch({ sum:999, school:'美丽的学校' })`
3. 借助action修改（action中可以编写一些业务逻辑）

```ts
import { defineStore } from 'pinia'
export const useCountStore = defineStore('count', {
  /*************/
  actions: {
    increment(value:number) {
      if (this.sum < 10) {
        this.sum += value    //操作countStore中的sum
      }
    },
    //减
    decrement(value:number){
      if(this.sum > 1){
        this.sum -= value
      }
    }
  },
  /*************/
})
// 组件中调用action即可
countStore.increment(n.value)   // 调用对应action
```

[⬆ back to top](#top)

## storeToRefs

- 借助storeToRefs将store中的数据转为ref对象，方便在模板中使用
- 注意：pinia提供的storeToRefs只会将数据做转换，而Vue的toRefs会转换store中所有数据，效率低

```ts
/* 得到countStore */
const countStore = useCountStore()
/* 使用storeToRefs转换countStore，随后解构 */
const {sum, school, address} = storeToRefs(countStore)
```

[⬆ back to top](#top)

## getters

```ts
//getters配置 -- count.ts
getters:{
    bigSum:(state):number => state.sum *10,
    upperSchool():string{
      return this. school.toUpperCase()
    }
}
//组件中读取数据 -- Count.vue
let {sum,school,bigSum,upperSchool} = storeToRefs(countStore)
```

## $subscribe

- 通过 store 的 `$subscribe()` 方法侦听 state 及其变化, 类似于watch

```ts
talkStore.$subscribe((mutate,state)=>{
  console.log('LoveTalk',mutate,state)
  localStorage.setItem('talk',JSON.stringify(talkList.value))
})
```

[⬆ back to top](#top)

## store组合式写法

1. 写成函数形式
2. 数据使用reactive
3. 方法单独写成function
4. 最后数据和方法需要return出去

```ts
import {defineStore} from 'pinia'
import axios from 'axios'
import {nanoid} from 'nanoid'
import {reactive} from 'vue'
export const useTalkStore = defineStore('talk', () => { // 1）写成函数形式
  // 2） vue语法，定义响应式数据,talkList就相当于state
  let talkList = reactive(JSON.parse(localStorage.getItem('talkList') as string ) || [])
  // 3）function就相当于actions中的方法
  async function getATalk(){
    // 获取数据， 连续解构 + 重命名
    const {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
    let obj = {id: nanoid(),title}
    talkList.unshift(obj)
  }
  // 4）最后需要return出去
  return { talkList, getATalk }
})
```

[⬆ back to top](#top)

> References
- [pinia-cn-official](https://pinia.vuejs.org/zh/)
- https://www.cnblogs.com/Itstars/tag/vue.js/
- [Vue学习计划-Vue3--核心语法（七）pinia](https://www.cnblogs.com/Itstars/p/17966830)
