// 引入用于创建应用
import { createApp } from 'vue'  
import './style.css'
// 应用App根组件
import App from './App.vue'

/* 引入createPinia，用于创建pinia */
import { createPinia } from 'pinia'
/* 创建pinia */
const pinia = createPinia()

const app = createApp(App)  // 创建一个应用
app.use(pinia)             //  使用pinia插件

// 挂载整个应用到app容器中
app.mount('#app')
