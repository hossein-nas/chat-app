import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import { store, key } from './store'
import { init } from '@/boot/firebase'

import './assets/css/index.css'

init(() => {
  createApp(App)
    .use(router)
    .use(store, key)
    .mount('#app')
})
