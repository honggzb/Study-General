[Vue3基础03--watcher+template Ref](#top)

- [Watchers](#watchers)
  - [Basic Example](#basic-example)
  - [watchEffect](#watcheffect)
  - [停止一个侦听器](#停止一个侦听器)
  - [一次性侦听器(3.4+)](#一次性侦听器34)
- [Template Refs模板引用](#template-refs模板引用)
  - [v-for中的模板引用](#v-for中的模板引用)
  - [组件上的ref](#组件上的ref)


## Watchers

### Basic Example

- watch is lazy by default

```ts
<script setup>
import { ref, watch } from 'vue'
const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)
// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>
<template>
  <p>Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

### watchEffect

- 可以用`watchEffect`函数来简化watch， 当侦听器的回调使用与源完全相同

```ts
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

### 停止一个侦听器

```ts
<script setup>
import { watchEffect } from 'vue'
// 它会自动停止
watchEffect(() => {})
// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
//手动停止一个侦听器
const unwatch = watchEffect(() => {})
unwatch()
```

### 一次性侦听器(3.4+)

```ts
watch(source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  }, { once: true }
)
```

[⬆ back to top](#top)

## Template Refs模板引用

- 需要直接访问底层 DOM 元素。要实现这一点，我们可以使用特殊的 `ref` attribute
- `ref`允许我们在一个特定的 DOM 元素或子组件实例被**挂载后**(**OnMounted**)，获得对它的直接引用

```vue
<script setup>
import { ref, onMounted } from 'vue'
const input = ref(null)
onMounted(() => {     //挂载后获得对input的直接引用
  input.value.focus()
})
</script>
<template>
  <input ref="input" />
</template>
```

### v-for中的模板引用

```vue
<script setup>
import { ref, onMounted } from 'vue'
const list = ref([1, 2, 3])
const itemRefs = ref([])
onMounted(() => alert(itemRefs.value.map(i => i.textContent)))    //1,2,3
</script>
<template>
  <ul>
    <li v-for="item in list" ref="itemRefs"> {{ item }} </li>
  </ul>
</template>
```

### 组件上的ref

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'
const child = ref(null)
onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>
<template>
  <Child ref="child" />
</template>
```

[⬆ back to top](#top)

