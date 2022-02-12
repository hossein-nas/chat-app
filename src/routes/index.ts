import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { LoginRoutes } from '@/modules/login'
import { ChatRoutes } from '@/modules/chat'
import { isSignedIn } from '@/boot/firebase'
import { store as _store } from '@/store'

const routes: RouteRecordRaw[] = [
  ...LoginRoutes,
  ...ChatRoutes,
  {
    path: '/',
    redirect: { name: 'chat-index' }
  },
  // Auth wild card
  {
    path: '/auth/:pathMatch(.*)*',
    name: 'Auth-NotFound',
    redirect: () => ({ name: 'login' })
  },

  // All route wild card.
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

router.beforeEach(async (to, from, next) => {
  // fetching signedIn status from firebase
  const signedIn = await isSignedIn()

  // For routes which need to be authenticated
  if (to.meta.requiresAuth && !signedIn.value) {
    return next({ name: 'login' })
  }

  // To prevent entering routes which not allowed when user is authenticated
  if (to.meta.requiresAuth === false && signedIn.value) {
    return next({ name: 'chat-index' })
  }

  if (signedIn.value) {
    await _store.dispatch('init')
  }

  next()
})

export default router
