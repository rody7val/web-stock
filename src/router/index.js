import { createRouter, createWebHashHistory } from 'vue-router'
import { VueEasyJwt } from "vue-easy-jwt";
import home from '../views/home.vue'
import item from '../views/item.vue'
import user from '../views/user.vue'
import create from '../views/create.vue'
import login from '../views/login.vue'
import logout from '../views/logout.vue'
import signup from '../views/signup.vue'

const jwt = new VueEasyJwt()
const routes = [
  {
  	path: '/login',
  	name: 'login',
  	component: login
  },
  {
  	path: '/logout',
  	name: 'logout',
  	component: logout
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/item/:id',
    name: 'item',
    component: item
  },
  {
    path: '/create',
    name: 'create',
    component: create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: user
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    if (route.meta.requiresAuth) {
      const token = localStorage.getItem("token")
      if (jwt.isExpired(token)) {
        next({ path: "/login" })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

export default router
