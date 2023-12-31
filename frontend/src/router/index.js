import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rocket from '../views/Rocket.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Crew from '../views/Crew.vue'
import Core from '../views/Core.vue'
import Map from '../views/Map.vue'
import Launch from '../views/Launch.vue'
import Events from '../views/Events.vue'
import { userStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Map,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
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
      path: '/register',
      name: 'register',
      component: Register
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
      path: '/core/:id',
      name: 'core',
      component: Core,
      beforeEnter:(to, from, next)=>{
        const usr = userStore();

        if(usr.getLoggedIn) next()
        else next('/login')
      }
    },
    {
      path: '/map/:id?',
      name: 'map',
      component: Map,
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
