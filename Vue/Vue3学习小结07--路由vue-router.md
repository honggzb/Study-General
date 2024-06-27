[Vue3学习小结7--路由vue-router](#top)

- [简述](#简述)
- [路由器工作模式](#路由器工作模式)
- [命名路由](#命名路由)
- [嵌套路由](#嵌套路由)
- [路由传参](#路由传参)
  - [路由\_query参数](#路由_query参数)
  - [路由\_params参数](#路由_params参数)
  - [路由的props配置](#路由的props配置)
- [历史记录](#历史记录)
  - [replace属性](#replace属性)
  - [横跨历史](#横跨历史)
- [重定向redirect](#重定向redirect)
- [编程式导航](#编程式导航)
- [命名视图](#命名视图)
- [导航守卫](#导航守卫)
  - [全局前置守卫router.beforeEach](#全局前置守卫routerbeforeeach)
  - [全局后置守卫router.afterEach](#全局后置守卫routeraftereach)
- [路由元信息- meta属性](#路由元信息--meta属性)
- [路由过渡动效 + transition组件](#路由过渡动效--transition组件)
- [滚动行为-scrollBehavior方法](#滚动行为-scrollbehavior方法)
- [动态路由](#动态路由)
  - [添加路由](#添加路由)
  - [删除路由](#删除路由)
-------------------------------------

路由设计

|path|file|function|component|level|
|---|---|---|---|---|
|/login|views/login/loginPage.vue|logn/register|LoginPage|1|

--------------------------------------
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

## 命名路由

```js
const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"Login",
        component:()=> import('../components/login.vue')
    },
]
```

- router-link跳转方式需要改变 变为对象并且有对应name:
  - `<router-link :to="{name:'Login'}">Login</router-link>`
  - `<router-link style="margin-left:10px" :to="{name:'Reg'}">Reg</router-link>`

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

## 历史记录

### replace属性

- 作用：控制路由跳转时操作浏览器历史记录的模式
- 采用replace进行页面的跳转会同样也会创建渲染新的Vue组件，但是在history中其不会重复保存记录，而是替换原有的vue组件
- 开启replace模式: `<RouterLink replace ... >News</RouterLink>`

```js
// 1)router-link 使用方法
<router-link replace style="margin-left:10px" to="/reg">Reg</router-link>
// 2)编程式导航
<button @click="toPage('/')">Login</button>
<button @click="toPage('/reg')">Reg</button>
import { useRouter } from 'vue-router'
const router = useRouter()
const toPage = (url: string) => {
  router.replace(url)
}
```

### 横跨历史

```js
<button @click="next">前进</button>
<button @click="prev">后退</button>
const next = () => {
  router.go(1)    //前进 数量不限于1
}
const prev = () => {
  router.back()   //后退
}
```

## 重定向redirect

```ts
// 不输入路径自动跳转
{ path: '/', redirect: '/about' },
// 无法匹配重定向 随便输入路径，未匹配到做重定向
{ path: '/:pathMatch(.*)*', redirect: '/news' }
```

## 编程式导航

- 可以借助 router 的实例方法，通过编写代码来实现导航

```js
// 1) 字符串模式
const router = useRouter()
const toPage = () => { router.push('/reg') }
// 2) 对象模式
const router = useRouter()
const toPage = () => {
  router.push({ path: '/reg'})
}
```

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

## 命名视图

命名视图可以在同一级（同一个组件）中展示更多的路由视图，而不是嵌套显示。 命名视图可以让一个组件中具有多个路由渲染出口，这对于一些特定的布局组件非常有用。 命名视图的概念非常类似于“具名插槽”，并且视图的默认名称也是 default。

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        components: {      // note: components, not component
            default: () => import('../components/layout/menu.vue'),
            header: () => import('../components/layout/header.vue'),
            content: () => import('../components/layout/content.vue'),
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
//
<div>
        <router-view></router-view>
        <router-view name="header"></router-view>
        <router-view name="content"></router-view>
</div>
```

[⬆ back to top](#top)

## 导航守卫

### 全局前置守卫router.beforeEach

- 每个守卫方法接收三个参数：
  - to: Route， 即将要进入的目标 路由对象
  - from: Route，当前导航正要离开的路由
  - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)
    - next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
    - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
- 案例: 权限判断

 ```js
const whileList = ['/']   //白名单 有值 或者登陆过存储了token信息可以跳转 否则就去登录页面
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (whileList.includes(to.path) || token) {
        next()
    } else {
        next({ path:'/' })
    }
})
 ```

 ### 全局后置守卫router.afterEach

- 全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身
- 使用场景: 一般可以用来做loadingBar

```js
<template>
    <div class="wraps"><div ref="bar" class="bar"></div></div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)
const startLoading = () => {
    let dom = bar.value as HTMLElement;
    speed.value = 1
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 90) {
            speed.value += 1;
            dom.style.width = speed.value + '%'
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1;
            window.cancelAnimationFrame(timer.value)
        }
    })

}
const endLoading = () => {
    let dom = bar.value as HTMLElement;
    setTimeout(() => {
        window.requestAnimationFrame(() => {
            speed.value = 100;
            dom.style.width = speed.value + '%'
        })
    }, 500)

}
defineExpose({
    startLoading,
    endLoading
})
</script>
<style scoped lang="less">
.wraps {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;
    .bar {
        height: inherit;
        width: 0;
        background: blue;
    }
}
</style>
//main.ts
import loadingBar from './components/loadingBar.vue'
const Vnode = createVNode(loadingBar)
render(Vnode, document.body)

router.beforeEach((to, from, next) => {
    Vnode.component?.exposed?.startLoading()
})
router.afterEach((to, from) => {
    Vnode.component?.exposed?.endLoading()
})
```

[⬆ back to top](#top)

## 路由元信息- meta属性

通过路由记录的 meta 属性可以定义路由的元信息。使用路由元信息可以在路由中附加自定义的数据，例如：
- 权限校验标识
- 路由组件的过渡名称
- 路由组件持久化缓存 (keep-alive) 的相关配置
- 标题名称

```js
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue'),
      meta: { title: "登录" }
    },
    {
      path: '/index',
      component: () => import('@/views/Index.vue'),
      meta: { title: "首页", }
    }
  ]
})
```

[⬆ back to top](#top)

## 路由过渡动效 + transition组件

- 使用`<transition>`结合css动画库'animate css'对导航进行动画处理
- 每个路由的组件有不同的过渡，你可以将元信息和动态的 name 结合在一起，放在`<transition>`

```html
<router-view #default="{route,Component}">
  <transition  :enter-active-class="`animate__animated ${route.meta.transition}`">
  <component :is="Component"></component>
  </transition>
</router-view>
```

```js
declare module 'vue-router'{
     interface RouteMeta {
        title:string,
        transition:string,
     }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Login.vue'),
      meta:{ title: "登录页面", transition: "animate__fadeInUp"}
    },
    {
      path: '/index',
      component: () => import('@/views/Index.vue'),
      meta:{ title: "首页！！！", transition: "animate__bounceIn"}
    }
  ]
})
```

[⬆ back to top](#top)

## 滚动行为-scrollBehavior方法

- 当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样
- `scrollBehavior` 方法
  - `to`: 要进入的目标路由对象，到哪里去
  - `from`: 离开的路由对象，从哪儿来
  - `savedPosition`: 会记录滚动条的坐标，点击"后退/前进" 时的记录值`(x:?,y:?)`
    -  `{ x: number, y: number }`
    -  `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)
  - `savedPosition` 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
- `scrollBehavior` 返回滚动位置的对象信息: `{ left: number, top: number }`

```js
// 1)
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    return { top:200 }
  },
})
//2) 滚动到元素位置- 始终在元素 #main 上方滚动 10px
crollBehavior(to, from, savedPosition) {
    return {
      el: '#main',      // el: document.getElementById('main'),
      top: -10,
    }
  },
//3) 滚动到锚点位置,
scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash }
    }
//4) 滚动到之前的位置, 在按下浏览器 后退/前进 按钮，或者调用 router.go() 方法时，页面会回到之前的滚动位置
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition    //不会发生滚动
    } else {
      return { top: 0, behavior: 'smooth' }
    }
}
```

- [关于vue的scrollBehavior（滚动行为）、缓存之前的位置](https://blog.csdn.net/muzidigbig/article/details/131709194)

[⬆ back to top](#top)

## 动态路由

- 动态路由都是后台会返回一个路由表前端通过调接口拿到后处理(后端处理路由)
- 主要使用的方法就是`router.addRoute()` 和 `router.removeRoute()`

### 添加路由

- `router.addRoute({ path: '/about', component: About })`
- 如果新增加的路由与当前位置相匹配，就需要你用 `router.push()` 或 `router.replace()` 来手动导航，才能显示该新路由

### 删除路由

- [小满Router（第十二章-动态路由）](https://xiaoman.blog.csdn.net/article/details/123783173)

[⬆ back to top](#top)

> References
- [Vue Router-cn-official](https://router.vuejs.org/zh/)
- https://www.cnblogs.com/Itstars/tag/vue.js/
- [Vue学习计划-Vue3--核心语法（六）路由](https://www.cnblogs.com/Itstars/p/17966831)

