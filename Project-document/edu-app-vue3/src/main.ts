import './assets/reset.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/* 创建pinia */
const pinia = createPinia()
pinia.use(piniaPersist)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
