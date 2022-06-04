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
    path: '/contribute',
    name: 'contribute',
    component: () => import( '../views/Contribute.vue')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import( '../views/Play.vue')
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import( '../views/Results.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../views/Games.vue'),
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/Learn.vue'),
  },
  {
    path: '/allContributions',
    name: 'allContributions',
    component: () => import('../views/allContributions.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/adminControlPanel',
    name: 'adminControlPanel',
    component: () => import('../views/adminControlPanel.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/allboulders',
    name: 'AllBoulders',
    component: () => import('../views/allBoulders.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/allroutes',
    name: 'AllRoutes',
    component: () => import('../views/allRoutes.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/allusers',
    name: 'AllUsers',
    component: () => import('../views/allUsers.vue'),
    meta: {
      authRequired: true,
    },
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  // console.log('\n router BeforeEach, auth.currentUser: ', auth.currentUser);

  // route guard for authenticated pages
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } 
  // Route Guard for Admin Control Page
  else if(to.name == 'AdminControlPanel' && auth.currentUser.uid != 'dQ2nCzva75ZvgE8Xy6YzRKO8urf2') {
    next('/contribute')
  } else {
    next()
  }
})

export default router
