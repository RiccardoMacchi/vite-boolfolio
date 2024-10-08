import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Items from '@/pages/Items.vue'
import ItemDetails from '@/pages/ItemDetails.vue'
import Error404 from '@/pages/Error404.vue'
import LavoriByTech from '@/pages/LavoriByTech.vue'
import LavoriByType from '@/pages/LavoriByType.vue'
import Contacts from '@/pages/Contacts.vue'
import LavoriByFramework from '@/pages/LavoriByFramework.vue'


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
      path: '/contatti',
      name: 'contacts',
      component: Contacts
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
      path: '/lavori-per-tipo/:slug',
      name: 'lavoriByType',
      component: LavoriByType
    },
    {
      path: '/lavori-per-framework/:slug',
      name: 'lavoriByFramework',
      component: LavoriByFramework
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Error404
    },
  ]
})

export default router
