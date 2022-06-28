import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DashboardView,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "Overview" */ '../views/Overview.vue')
      },
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "Messages" */ '../views/Orders.vue')
      },
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Products.vue')
      },
      {
        path: 'profile',
        component: () => import('../views/Profile.vue')
      },
      {
        path: 'products/create',
        component: () => import('../components/create_product.vue')
      },
      {
        path: 'orders/create',
        component: () => import('../components/create_order.vue')
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
