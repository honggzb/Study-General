[Vue3学习小结14--自定义指令directive](#top)

- [Vue3自定义指令的三种注册方式](#vue3自定义指令的三种注册方式)
- [Vue3指令的钩子函数](#vue3指令的钩子函数)
- [案例](#案例)

-------------------------------------

## Vue3自定义指令的三种注册方式

1. 同组件结构:  只能在同一文件中使用
2. 通过directives选项注册: 必要引用后使用
3. 将一个自定义指令全局注册到应用层级： 可全局使用

```vue
//1)同组件结构
<script setup>
const vFocus = {  
  mounted: (el) => el.focus()
}
</script>
<template>
  <input v-focus />  // 在模板中启用 v-focus
</template>
//2)通过 directives 选项注册
export default {
  setup() { /*...*/ },
  directives: {  // 在模板中启用 v-focus
    focus: {   /* ... */ }
  }
}//3) 将一个自定义指令全局注册到应用层级
const app = createApp({})
app.directive('focus', {    // 使 v-focus 在所有组件中都可用
  /* ... */
})
```

4. 简化形式: 对于自定义指令来说，一个很常见的情况是仅仅需要在 mounted 和 updated 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令

```vue
app.directive('color', (el, binding) => {
  el.style.color = binding.value   // 这会在 `mounted` 和 `updated` 时都调用
})
<div v-color="color"></div>
```

## Vue3指令的钩子函数

- 一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数
- 钩子参数: 指令的钩子会传递以下几种参数
  - `el`：当前绑定的DOM 元素。这可以用于直接操作 DOM
  - `binding`：一个对象，包含以下属性
    - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 2
    - `oldValue`：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用
    - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`
    - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`
    - `instance`：使用该指令的组件实例
    - `dir`：指令的定义对象
    - `vnode`：代表绑定元素的底层 VNode
    - `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用
- 和内置指令类似，自定义指令的参数也可以是动态的
  - `<div v-example:[arg]="value"></div>`

```vue
const myDirective = {
  created(el, binding, vnode, prevVnode) {   //元素初始化的时候, 在绑定元素的 attribute 前 或事件监听器应用前调用
    // 下面会介绍各个参数的细节
  },
  beforeMount(el, binding, vnode, prevVnode) {},  // 在元素被插入到 DOM 前调用  只调用一次
  mounted(el, binding, vnode, prevVnode) {},  // 元素插入父级dom调用 及他自己的所有子节点都挂载完成后调用
  beforeUpdate(el, binding, vnode, prevVnode) {},  // 绑定元素的父组件更新前调用 元素被更新之前调用
  updated(el, binding, vnode, prevVnode) {},  // 在绑定元素的父组件 及他自己的所有子节点都更新后调用
  beforeUnmount(el, binding, vnode, prevVnode) {},  // 绑定元素的父组件卸载前调用 在元素被移除前调用
  unmounted(el, binding, vnode, prevVnode) {} // 绑定元素的父组件卸载后调用 只调用一次
} 
```

[⬆ back to top](#top)

## 案例

- app.vue --> 图片懒加载
- app1.vue --> general
- app2.vue --> 权限按钮
- app2.vue --> 自定义拖拽指令

[⬆ back to top](#top)

> References
- [小满zs-csdn博客](https://blog.csdn.net/qq1195566313/category_11618172.html)
- [自定义指令-official](https://cn.vuejs.org/guide/reusability/custom-directives.html)
