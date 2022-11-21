import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/Dashboard.vue";
import ProfileView from "../views/Profile.vue";
import OrderView from "../views/Orders.vue";
import ProductView from "../views/Products.vue";
import Login from "../views/Login.vue"
// import createOrder from "../components/order/create_order.vue";

const routes = [
  {
    path: "/",
    component: Login,
    meta:{
      auth: false,
      hideSidebar: true,
    }
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    meta:{auth: true}
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
    meta:{auth: true}
  },
  {
    path: "/orders",
    component: OrderView,
    meta:{auth: true}
  },
  {
    path: "/order/create",
    component: () => import("../components/order/create_order.vue"),
    meta:{auth: true}
  },
  {
    path: "/order/:id",
    component: () => import("../components/order/print_order.vue"),
    meta:{auth: true}
  },
  {
    path: "/order/edit/:id",
    component: () => import("../components/order/edit_order.vue"),
    meta:{auth: true}
  },
  {
    path: "/products",
    name: "ProductsView",
    component: ProductView,
    meta:{auth: true}
  },
  {
    path: '/product/create',
    component: () => import('../components/product/create_product.vue'),
    meta:{auth: true}
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next) => {
  if(to.meta.auth && !JSON.parse(localStorage.getItem('access_token'))){
    next('/');
  }
  else if(!to.meta.auth && JSON.parse(localStorage.getItem('access_token'))){
    next("/dashboard")
  }
  else{
    next();
  }

})

export default router;
