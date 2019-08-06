import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',  
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    
    {
      path: '/proximité',
      name: 'proximité',      
      component: () => import(/* webpackChunkName: "about" */ './views/proximité.vue')
    },
    {
      path: '/arrêt',
      name: 'arrêt',
      component: () => import(/* webpackChunkName: "about" */ './views/arrêt.vue')
    },{
      path: '/statistiqueFlotte',
      name: 'statistiqueFlotte',
      component: () => import(/* webpackChunkName: "about" */ './views/statistiqueFlotte.vue')
    },{
      path: '/généraleFlotte',
      name: 'généraleFlotte',
      component: () => import(/* webpackChunkName: "about" */ './views/généraleFlotte.vue')
    },
    
    
  ]
})
