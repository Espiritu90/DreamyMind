import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router/auto'

const app = createApp(App)

app.use(
  createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
      // https://github.com/hannoeru/vite-plugin-pages/discussions/263
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      else return { top: 0 }
    }
  })
)

app.mount('#app')
