// 引入用于创建应用
import { createApp } from 'vue'
//import 'bootstrap/dist/css/bootstrap.css'  
import './style.css'
// 应用App根组件
import App from './App.vue'
import Loading from './Loading/Loading'

const app = createApp(App)  // 创建一个应用

type Lod = {
  show: () => void,
  hide: () => void
}
// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentCustomProperties"接口, 因为是vue3中实例的属性的类型.
declare module 'vue' {
  export interface ComponentCustomProperties {
    $loading: Lod,
  }
}

app.use(Loading)

app.mount('#app')
