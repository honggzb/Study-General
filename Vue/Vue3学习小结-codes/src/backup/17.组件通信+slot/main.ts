// 引入用于创建应用
import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'  
import './style.css'
// 应用App根组件
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'  // 引入路由器
import emitter from './utils/emitter'

const app = createApp(App)  // 创建一个应用
const pinia = createPinia()

app.use(pinia)              // 使用插件
app.use(router)             // 使用插件

// 挂载整个应用到app容器中
app.mount('#app')
