import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import item from '../views/item.vue'
import create from '../views/create.vue'

const routes = [
  { path: '/', name: 'home', component: home },
  { path: '/item/:id', name: 'item', component: item },
  { path: '/create', name: 'create', component: create }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
