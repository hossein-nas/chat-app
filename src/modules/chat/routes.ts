import { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'ChatBaseLayout',
    path: '/chat/',
    component: () => import('./layouts/ChatBaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'chat-index',
        meta: { requiresAuth: true },
        components: {
          sidebar: () => import('@/components/ChatUsers.vue'),
          default: () => import('./views/ChatIndex.vue')
        }
      },
      {
        path: ':chatId',
        name: 'chat-page',
        meta: { requiresAuth: true },
        components: {
          sidebar: () => import('@/components/ChatUsers.vue'),
          default: () => import('./views/ChatPage.vue')
        }
      }
    ]
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    meta: { requiresAuth: true },
    component: () => import('./views/UserProfile.vue')
  },
  {
    name: 'add-user',
    path: '/user/add/',
    meta: { requiresAuth: true },
    component: () => import('./views/AddUser.vue')
  }

] as RouteRecordRaw[]
