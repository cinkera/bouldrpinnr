import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import( '../views/Play.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  // console.log('\n router BeforeEach, auth.currentUser: ', auth.currentUser);
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
