// 创建一个路由器，并暴露出去
// 第一步：引入createRouter
import { createRouter, createWebHistory } from 'vue-router'
import Props from '../pages/01-props/Father.vue'
import Event from '../pages/02-custom-event/Father.vue'
import Bus from '../pages/03-mitt/Father.vue'
import Model from '../pages/04-v-model/Father.vue'
import AttrsListeners from '../pages/05-$attris/Father.vue'
import RefParent from '../pages/06-$refs-$parent/Father.vue'
import ProvideInject from '../pages/07-provide-inject/Father.vue'
import Pina from '../pages/08-pinia/Father.vue'
import Slot1 from '../pages/09-slot/Father.vue'
import Slot2 from '../pages/10-slot/Father.vue'

const routes = [
  { path: '/props', component: Props },
  { path: '/event', component: Event },
  { path: '/mitt', component: Bus },
  { path: '/model', component: Model },
  { path: '/attrs', component: AttrsListeners },
  { path: '/ref-parent', component: RefParent },
  { path: '/provide-inject', component: ProvideInject },
  { path: '/pinia', component: Pina },
  { path: '/slot1', component: Slot1 },
  { path: '/slot2', component: Slot2 },
]

export default createRouter({
  history: createWebHistory(),              //路由器的工作模式
  routes,
})