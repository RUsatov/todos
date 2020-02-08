import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/edit:id',
    name: 'edit',
    component: () => import('../views/Edit.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
