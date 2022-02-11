import { RouteRecordRaw } from 'vue-router'

const routes : RouteRecordRaw[] = [
  {
    name: 'LoginBaseLayout',
    path: '/auth/',
    component: () => import('./layouts/LoginBaseLayout.vue'),
    children: [
      {
        path: '',
        redirect: to => ({ name: 'login' })
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('./views/Login.vue')
      },
      {
        name: 'logout',
        path: 'logout',
        component: () => import('./views/Logout.vue')
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('./views/Signup.vue')
      }
    ]
  }
]

export default routes
