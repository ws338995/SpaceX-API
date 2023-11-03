import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rockets from '../views/Rockets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rockets',
      name: 'rockets',
      component: Rockets
    }
  ]
})

export default router
