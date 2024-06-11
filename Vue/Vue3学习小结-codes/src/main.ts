// 引入用于创建应用
import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'  
import './style.css'
// 应用App根组件
import App from './App.vue'
import Hello from './Hello.vue'

const app = createApp(App)  // 创建一个应用

app.component('Hello', Hello)   // Hello为全局组件
//2) 
app.config.globalProperties.x = 99
declare module 'vue' {
  interface ComponentCustomProperties {
    x: number
  }
}

app.directive('beauty', (element, {value}) => {
  element.innerText += value
  element.style.color = 'green'
  element.style.backgroundColor = 'yellow'
})

// 挂载整个应用到app容器中
app.mount('#app')
