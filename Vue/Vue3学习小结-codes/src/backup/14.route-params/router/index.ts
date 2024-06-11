// 创建一个路由器，并暴露出去
// 第一步：引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
// 引入一个一个可能要呈现组件
import Home from '../components/Home.vue'
import News from '../components/News.vue'
import About from '../components/About.vue'
import Detail from '../components/Detail.vue'

// 第二步：创建路由器并暴露出去

const routes = [
  { path: '/home', name: "zhuye", component: Home },
  {
    name: 'xinwen',
    path: '/news',
    component: News,
    children: [
      { path: 'detail/:id/:title/:content', name: "xiangqin", component: Detail }
    ]
  },
  { path: '/about',  name: "guanyu", component: About }
]

export default createRouter({
  history: createWebHistory(),              //路由器的工作模式
  routes,
})