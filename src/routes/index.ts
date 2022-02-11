import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { LoginRoutes } from '@/modules/login'

const routes: RouteRecordRaw[] = [
  ...LoginRoutes,
  {
    path: '/auth/:pathMatch(.*)*',
    name: 'Auth-NotFound',
    redirect: () => ({ name: 'login' })
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
