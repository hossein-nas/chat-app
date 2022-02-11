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
      }
    ]
  }

] as RouteRecordRaw[]
