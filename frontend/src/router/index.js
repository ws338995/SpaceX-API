import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rockets from '../views/Rockets.vue'
import Login from '../views/Login.vue'

import { userStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/rockets',
      name: 'rockets',
      component: Rockets,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    }
  ]
})

export default router
