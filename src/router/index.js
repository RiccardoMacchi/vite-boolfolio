import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Items from '@/pages/Items.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lavori',
      name: 'items',
      component: Items
    },
  ]
})

export default router
