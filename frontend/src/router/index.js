import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rocket from '../views/Rocket.vue'
import Login from '../views/Login.vue'
import Crew from '../views/Crew.vue'
import Launch from '../views/Launch.vue'
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
      path: '/rocket/:id',
      name: 'rocket',
      component: Rocket,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    },
    {
      path: '/crew/:id',
      name: 'crew',
      component: Crew,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    },
    {
      path: '/launch/:id',
      name: 'launch',
      component: Launch,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    }
  ]
})

export default router
