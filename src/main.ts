import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import { init } from '@/boot/firebase'

import './assets/css/index.css'

init(() => {
  createApp(App)
    .use(router)
    .mount('#app')
})
