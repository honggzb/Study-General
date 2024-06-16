[Vue3学习小结16--Vue3定义全局函数和变量](#top)

-------------------------------------

- 自定义全局函数和变量
  - `app.config.globalProperties`
- 扩充自定义全局函数和变量的类型
  - `declare module 'vue' {}`


```ts
// 引入用于创建应用
import { createApp } from 'vue' 
import './style.css'
import App from './App.vue'

const app = createApp(App)  // 创建一个应用
app.config.globalProperties.$env = 'env/'     //全局变量
app.config.globalProperties.$filters = {      //全局函数
  format<T> (str: T) {
     return `xiaoman-${str}`
  }
}
type Filter = {
  format<T>(str: T): string
}
// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentCustomProperties"接口, 因为是vue3中实例的属性的类型.
declare module 'vue' {
  export interface ComponentCustomProperties {
      $filters: Filter,
      $env: string
  }
}

app.mount('#app')
```

- 使用自定义全局函数和变量
  - `getCurrentInstance`

```ts
<template>
  <div>{{ $env}}</div>
  <div>{{$filters.format(' plane')}}</div>
</template>
<script lang="ts" setup name="App">
  import { ref, getCurrentInstance } from 'vue'
  const app = getCurrentInstance()
  console.log(app.proxy.$filters.format('ts'))
  
</script>
```

[⬆ back to top](#top)

> References
- [小满zs-csdn博客](https://blog.csdn.net/qq1195566313/category_11618172.html)


