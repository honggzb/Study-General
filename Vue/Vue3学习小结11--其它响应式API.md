[Vue3学习小结11--其它响应式API](#top)

- [shallowRef 与 shallowReactive](#shallowref-与-shallowreactive)
- [readonly 与 shallowReadonly](#readonly-与-shallowreadonly)
- [toRaw 与 markRaw](#toraw-与-markraw)
- [customRef](#customref)

-------------------------------------

## shallowRef 与 shallowReactive

||shallowRef|shallowReactive|
|---|---|---|
|作用|创建一个响应式数据，但只对顶层属性进行响应式处理|创建一个浅层响应式对象，只会使对象的最顶层属性变成响应式的，<br>对象内部的嵌套属性则不会变成响应式的|
|用法|`let myVar = shallowRef(initValue)`|`let myVar = shallowReactive(initValue)`|
|特点|只跟踪引用值的变化，不关心值内部的变化|对象的顶层属性是响应式的，但嵌套对象的属性不是|

[⬆ back to top](#top)

## readonly 与 shallowReadonly

||readonly|shallowReadonly|
|---|---|---|
|作用|用于创建一个对象的深只读副本|与readonly类似，但只作用于对象的顶层属性|
|用法|`const original = reactive({...})`<br>`const readOnlyCopy = readonly(original)`|`const original = reactive({...})`<br>`const shallowReadonlyCopy=shallowReadonly(original)`|
|特点|对象的所有嵌套属性都将变成只读<br>任何尝试修改这个对象的操作都会被阻止|只将对象的顶层属性设置为只读，对象内部的嵌套属性仍然是可变的<br>适用于只需保护对象顶层属性的场景|
|应用场景|创建不可变的状态快照<br>保护全局状态或配置不被修改||

[⬆ back to top](#top)

## toRaw 与 markRaw

- toRaw：用于获取一个响应式对象的原始对象， toRaw 返回的对象不再是响应式的，不会触发视图更新
  - 例如, 在需要将响应式对象传递给非 Vue 的库或外部系统时，使用 toRaw 可以确保它们收到的是普通对象
- markRaw: 记一个对象，使其永远不会变成响应式的
  - 例如使用mockjs时，为了防止误把mockjs变为响应式对象，可以使用 markRaw 去标记mockjs
  - `npm i mockjs`
  - `let mockjs = markRaw(mockjs)`

```ts
import {reactive, toRaw, markRaw, isReactive} from 'vue'
/* toRaw  */
// 响应式对象
let person = reactive({name: 'mecy', age: 19})
// 原始对象
let rawPerson = toRaw(person)
/* markRaw */
let nameArr = markRaw([
  {id: '01', name: '小明'},
  {id: '02', name: '小白'},
  {id: '03', name: '小红'},
])
// 根据原始对象nameArr去创建响应式对象 nameObj，创建失败，因为nameArr被markRaw标记了
let nameObj = reactive(nameArr)
console.log(isReactive(person)) // true
console.log(isReactive(rawPerson)) // false
console.log(isReactive(nameArr))  // false
console.log(isReactive(nameObj))  // false
```

[⬆ back to top](#top)

## customRef

- 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行逻辑控制

```ts
//useMsgRef.ts -- 实现防抖效果hook
import {customRef} from 'vue'
export default function(initValue: string, delay: number) {
  let msg = customRef((tarck, trigger)=>{
    let timer: number
    return {
      get(){
        tarck()             // 告诉Vue数据msg很重要，要对msg持续关注，一旦变化就更新
        return initValue
      },
      set(value){
        clearTimeout(timer)
        timer = setTimeout(() => {
          initValue = value
          trigger()         // 通知Vue数据msg变化了
        }, delay)
      }
    }
  })
  return msg
}
//组件中使用
<template>
  <div>
    <h2>{{ msg }}</h2>
    <input type="test" v-model="msg"/>
  </div>
</template>
<script setup lang="ts" name="App">
  import useMsgRef from './useMsgRef.ts'
  let msg = useMsgRef('初始值', 1000)
</script>
```

[⬆ back to top](#top)

> References
- [响应式 API：进阶](https://cn.vuejs.org/api/reactivity-advanced)
- https://www.cnblogs.com/Itstars/tag/vue.js/
- [Vue学习计划-Vue3--其他API：shallowRef与shallowReactive、readonly与shallowReadonly、toRaw与markRaw、customRef](https://www.cnblogs.com/Itstars/p/17966822)
