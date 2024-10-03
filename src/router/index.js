import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Items from '@/pages/Items.vue'
import ItemDetails from '@/pages/ItemDetails.vue'
import Error404 from '@/pages/Error404.vue'
import LavoriByTech from '@/pages/LavoriByTech.vue'
import LavoriByType from '@/pages/LavoriByType.vue'
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
    {
      path: '/dettagli-lavoro/:slug',
      name: 'itemsDetails',
      component: ItemDetails
    },
    {
      path: '/lavori-per-tecnologia/:slug',
      name: 'lavoriByTech',
      component: LavoriByTech
    },
    {
      path: '/lavori-per-tipologia/:slug',
      name: 'lavoriByType',
      component: LavoriByType
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Error404
    },
  ]
})

export default router
