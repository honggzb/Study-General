[Vue3学习小结7--路由vue-router](#top)

- [简述](#简述)
- [路由器工作模式](#路由器工作模式)
- [嵌套路由](#嵌套路由)
- [路由传参](#路由传参)
  - [路由\_query参数](#路由_query参数)
  - [路由\_params参数](#路由_params参数)
  - [路由的props配置](#路由的props配置)
- [replace属性](#replace属性)
- [重定向redirect](#重定向redirect)
- [编程式导航](#编程式导航)

-------------------------------------

## 简述

- Vue3中要使用vue-router:  `npm i vue-router`
- 注册路由器插件: `app.use(router)`的职责包括
  1. 全局注册 `RouterView` 和 `RouterLink` 组件
  2. 添加全局 `$router` 和 `$route` 属性
  3. 启用 `useRouter()` 和 `useRoute()` 组合式函数
  4. 触发路由器解析初始路由
- **to的两种写法**
  - 字符写法： `<RouterLink to="/news" active-class="active">新闻</RouterLink>`
  - 对象写法：
    - `<RouterLink :to="{path: '/about'}" active-class="active">关于</RouterLink>`
    - `<RouterLink :to="{path: 'guanyu'}" active-class="active">关于</RouterLink>`
- 工程化： 一般路由组件通常存放在pages或views文件夹，一般组件通常放在components文件夹
  
```
├── 📂src/
|    ├── 📂router/
|    |     ├── 📄index.ts           - 定义route
|    |     └── 
|    ├── 📄App.vue                  - 使用route
|    ├── 📄main.ts                  - 注册路由器插件,  app.use(router)
|    └── 
```

```ts
//1) router/index.ts
// 创建一个路由器，并暴露出去
// 第一步：引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
// 引入一个一个可能要呈现组件
import Home from '../components/Home.vue'
import News from '../components/News.vue'
import About from '../components/About.vue'
// 第二步：创建路由器并暴露出去
const routes = [
  { path: '/home', name: "zhuye", component: Home },
  { path: '/news',  name: "xinwen", component: News },
  { path: '/about',  name: "guanyu", component: About }
]
export default createRouter({
  history: createWebHistory(),              //路由器的工作模式
  routes
})

//2) main.ts
// 引入用于创建应用
import { createApp } from 'vue'  
import './style.css'
// 应用App根组件
import App from './App.vue'
import router from './router'  // 引入路由器
const app = createApp(App)  // 创建一个应用
app.use(router)             // 注册路由器插件
// 挂载整个应用到app容器中
app.mount('#app')

//3) App.vue
<template>
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
    <!-- 展示区 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
  import {RouterLink,RouterView} from 'vue-router';
</script>
```

[⬆ back to top](#top)

## 路由器工作模式

- history模式
  - `history: createWebHistory(), // history模式`
  - 优点：URL更加美观，**不带有#**, 更接近传统的网站URL
  - 缺点: 后期项目上线，需要服务端配合处理路径问题，否则刷新会有404错误
- hash模式
  - `history: createWebHashHistory(), // hash模式`
  - 优点：兼容性更好，因为不需要服务端处理路径
  - 确定：URL带有#不美观，且在SEO优化方面相对较差

[⬆ back to top](#top)

## 嵌套路由

```ts
export default createRouter({
  history: createWebHistory(),          //路由器的工作模式
  routes: [
    { name: 'zhuye', path: '/home', component: Home },
    { name: 'xinwen', path: '/news', component: News,
      children: [
        { path: 'detail', name: "xiangqin", component: Detail }     //子路由不用写 '/'
      ]
    },
    { name: 'guanyu', path: '/about', component: About }
  ]
})
```

[⬆ back to top](#top)

## 路由传参

|路由传参|传递参数|接收参数|
|---|---|---|
|query|template文件中的RouterLink中  -->  url上使用**?**<br><RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">|`route = useRoute()` --> `route.query`|
|params|route文件中  -->  path上使用**:**<br>template文件中的RouterLink中 -->  url上  -->   `/news/detail/${news.id}`|`route = useRoute()` --> `route.params`|
|props||`defineProps(['id', 'title', 'content'])`|

### 路由_query参数

- 传递参数: template文件中的RouterLink中  -->  url上使用**?**  -->   `/xx/xx?aa=aaa&bb=bbb`
- 接收参数: `route = useRoute()` -->  `route.query`

```ts
//传递参数, components/news.vue
<!-- query传参 第一种 -->
<!-- <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{news.title}}</RouterLink> -->
<!-- query传参 第二种 -->
<RouterLink :to="{
            path: '/news/detail',     //path
            query: {
              id: news.id,
              title: news.title,
              content: news.content,
            }
}">{{news.title}}</RouterLink>
// 接收参数, components/detail.vue
<template>
<div>
    <h2> 编号：{{ query.id }} </h2>
    <h2> 标题：{{ query.title }} </h2>
    <h3> 内容：{{ query.content }} </h3>
</div>
</template>
<script setup lang="ts" name="Detail">
import {toRefs} from 'vue'
import { useRoute } from 'vue-router';   // useRoute
let route = useRoute()
const { query } = toRefs(route)
</script>
```

[⬆ back to top](#top)

### 路由_params参数

- 传递参数: 
  - route文件中  -->  path上使用**:**  -->   `detail/:id`
  - template文件中的RouterLink中 -->  url上  -->   `/news/detail/${news.id}`
- 接收参数: `route = useRoute()` -->  `route.params`
- note: 
  - 传递params参数时：若使用to的对象写法，**必须使用name配置项**，不能用path
  - 传递params参数时：：**传递参数属性不能是对象类型**
  - 传递params参数时：若是非必传，占位后加?,如：path: 'detail/:id/:title?/:content?'

```ts
//传递参数
// 1. router文件中, routes/index.ts
{
  name: 'xinwen', path: '/news', component: News,
  children: [
    {
      name: 'xiangqin',                      //必须使用name配置项
      path: 'detail/:id/:title/:content',
      component: Detail
    }
  ]
},
// 2. news文件传递参数, components/news.vue
  <!-- params传参 第一种 -->
  <RouterLink :to="`/news/detail/${news.id}/${news.title}/${news.content}`">{{ news.title }}</RouterLink>
  <!-- params传参 第二种 -->
  <RouterLink 
    :to="{
      name: 'xiangqin',                    //必须使用name配置项
      params: {
        id: news.id,
        title: news.title,
        content: news.content,
      }
    }">{{ news.title }}</RouterLink>
// 接收参数, components/detail.vue
<template>
<div>
    <h2> 编号：{{ params.id }} </h2>
    <h2> 标题：{{ params.title }} </h2>
    <h3> 内容：{{ params.content }} </h3>
</div>
</template>
<script setup lang="ts" name="Detail">
import {toRefs} from 'vue'
import { useRoute } from 'vue-router';
let route = useRoute()
const { params } = toRefs(route)
</script>
```

[⬆ back to top](#top)

### 路由的props配置

- 传递参数: router中配置路由规则
- 接收参数: `defineProps(['id', 'title', 'content'])`

```ts
//传递参数
// 1. router文件中, routes/index.ts
{
  name: 'xinwen', path: '/news', component: News,
  children: [
    {
      name: 'xiangqin', 
      path: 'detail/:id/:title/:content',
      component: Detail,
      props: true                          //new
    }
  ]
},
// 接收参数, components/detail.vue
<template>
<div>
    <h2> 编号：{{ id }} </h2>
    <h2> 标题：{{ title }} </h2>
    <h3> 内容：{{ content }} </h3>
</div>
</template>
<script setup lang="ts" name="Detail">
  defineProps(['id', 'title', 'content'])
</script>
```

[⬆ back to top](#top)

## replace属性

- 作用：控制路由跳转时操作浏览器历史记录的模式
- 开启replace模式: `<RouterLink replace ... >News</RouterLink>`

## 重定向redirect

```ts
// 不输入路径自动跳转
{ path: '/', redirect: '/about' },
// 无法匹配重定向 随便输入路径，未匹配到做重定向
{ path: '/:pathMatch(.*)*', redirect: '/news' }
```

## 编程式导航

- useRoute: `route.query`, `route.params`
- useRouter: `router.push`, `router.replace`

```ts
import {useRouter} from 'vue-router'
const router = useRouter()
onMounted(() => {
    setTimeout(() => {
      router.push('/news')
    }, 3000)
 })
 //
 <button @click="showNewsdetail(news)">GoTo news</button>
 function showNewsdetail(news: any) {
    router.push({
      name: 'xiangqin',
      params: {
          id: news.id,
          title: news.title,
          content: news.content,
        }
    })
  }
```

[⬆ back to top](#top)


[⬆ back to top](#top)

> References
- [Vue Router-cn-official](https://router.vuejs.org/zh/)
- https://www.cnblogs.com/Itstars/tag/vue.js/
- [Vue学习计划-Vue3--核心语法（六）路由](https://www.cnblogs.com/Itstars/p/17966831)

