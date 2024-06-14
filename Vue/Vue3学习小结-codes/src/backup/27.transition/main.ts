// 引入用于创建应用
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import 'bootstrap/dist/css/bootstrap.css'  
import './style.css'
// 应用App根组件
import App from './App.vue'

const app = createApp(App)  // 创建一个应用
app.use(ElementPlus)
// 挂载整个应用到app容器中
app.mount('#app')
