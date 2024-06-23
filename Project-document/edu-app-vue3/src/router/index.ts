import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/course',
      name: 'course',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Course.vue')
    },
    {
      path: '/course-info/:id',
      name: 'CourseInfo',
      component: () => import('../views/CourseInfo.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/course-play/1',
      // path: '/course-play-play/:courseId/:chapterId',
      name: '/course-play',
      component: () => import('../views/CoursePlay.vue')
    },
    // {
    //   path: "/cart",
    //   name: "Cart",
    //   component: () =>
    //     import('../views/Cart.vue'),
    //     beforeEnter:(to, from, next) => {
    //       console.log( useUserStore().userInfo.id )
    //       if( useUserStore().userInfo.id ){
    //         next();
    //       }else{
    //         next('/login');
    //       }
    //     }
    // },
    {
      path: "/cart",
      name: "Cart",
      component: () => import('../views/Cart.vue')
    },
    {
      path: "/confirmOrder",
      name: "confirm Order",
      component: () => import('../views/ConfirmOrder.vue')
      // component: () =>
      //   import('../views/ConfirmOrder.vue'),
      //   beforeEnter:(to, from, next) => {
      //     if( useUserStore().userInfo.id ){
      //       next();
      //     }else{
      //       next('/login');
      //     }
      //   }
    },
  ]
})

export default router
