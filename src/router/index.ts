import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index/Index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/Chat.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/Home.vue'),
      children : [
        {
          path: 'info',
          name: '/info',
          component: () => import('../views/info/Info.vue')
        },
        {
          path: 'session',
          name: '/session',
          component: () => import('../views/session/Session.vue')
        }
      ]
    },
  ]
})

export default router
