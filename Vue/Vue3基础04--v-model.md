[Vue3基础04--v-model](#top)

- [基本用法](#基本用法)
  - [Vue 3.4之前](#vue-34之前)
  - [Vue 3.4开始](#vue-34开始)
- [多个 v-model 绑定](#多个-v-model-绑定)
- [v-model 修饰符](#v-model-修饰符)
  - [内置的修饰符](#内置的修饰符)
  - [自定义修饰符](#自定义修饰符)
  - [带参数的 v-model 修饰符](#带参数的-v-model-修饰符)

---------------------------------------------

v-model 可以在组件上使用以实现双向绑定

## 基本用法

### Vue 3.4之前

- 在子组件中使用v-model所传递的参数，Vue给了默认的名字modelValue

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const updateValue = () => {
   emit("update:param", "newValue")
}
</script>
<template>
  <p>子组件的参数是{{ modelValue }}</p>
  <button @click="updateValue">更改父组件的值</button>
</template>
<!-- Parent.vue -->
const param = ref('oldValue')
<Child v-model="" />
```

### Vue 3.4开始

 从 **Vue 3.4** 开始，推荐的实现方式是使用 `defineModel()` 宏
- `defineModel(`) 返回的值是一个 `ref`
  - 它的 `.value` 和父组件的 `v-model` 的值同步；
  - 当它被子组件变更了，会触发父组件绑定的值一起更新
- ![v-model 基本用法](./images/v-model1.png)

[⬆ back to top](#top)

## 多个 v-model 绑定

组件上的每一个 v-model 都会同步不同的 prop，而无需额外的选项

```vue
<UserName v-model:first-name="first" v-model:last-name="last" />
<!-- child component -->
<script setup>
const props = defineProps({
  param1: String,
  param2: String,
});
const emit = defineEmits(["update:param1", "update:param2"]);
const updataParam1 = () => {
  emit("update:param1", "newValue")
}
const updataParam2 = () => {
  emit("update:param2", "newValue")
};
</script>
<template>
  <p>子组件的参数是{{ param1 }}, {{ param2 }}</p>
  <button @click="updataParam1">更改父组件param1的值</button>
  <button @click="updataParam2">更改父组件param2的值</button>
</template>
<!-- Parent.vue -->
const param1 = ref('zhangsan')
const param2 = ref('Li Si')
<Child v-model:param1="param1" v-model:param2="param2" />
```

[⬆ back to top](#top)

## v-model 修饰符

### 内置的修饰符

- [内置的修饰符](https://cn.vuejs.org/guide/essentials/forms.html#modifiers)

|modifiers |   |
|---|---|
| `.lazy` |默认情况下，v-model 会在每次 input 事件后更新数据, <br>lazy 修饰符在每次 `change` 事件后更新数据|
|`.number`|number 修饰符会在输入框有 `type="number"` 时自动启用|
|`.trim`|自动去除用户输入内容中两端的空格|

### 自定义修饰符

capitalize (首字母大写) 修饰符

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>
<template>
  <input type="text" v-model="model" />
</template>
<!-- using -->
<MyComponent v-model.capitalize="myText" />
```

[⬆ back to top](#top)

### 带参数的 v-model 修饰符

```vue
<UserName v-model:first-name.capitalize="first" v-model:last-name.uppercase="last" />
<!-- child component -->
<script setup>
const [firstName, capitalize] = defineModel('firstName')
const [lastName, uppercase] = defineModel('lastName')
console.log(capitalize) // { capitalize: true }
console.log(uppercase) // { uppercase: true }
</script>
<!-- 3.4 之前的用法 -->
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])
console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```

[⬆ back to top](#top)
