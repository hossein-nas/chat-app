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
        components: {
          sidebar: () => import('@/components/ChatUsers.vue'),
          default: () => import('./views/ChatIndex.vue')
        }
      },
      {
        path: ':chatId',
        name: 'chat-page',
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
    component: () => import('./views/UserProfile.vue')
  },
  {
    name: 'add-user',
    path: '/user/add/',
    component: () => import('./views/AddUser.vue')
  }

] as RouteRecordRaw[]
