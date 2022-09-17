import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/Dashboard.vue";
import ProfileView from "../views/Profile.vue";
import OrderView from "../views/Orders.vue";
import ProductView from "../views/Products.vue";
// import createOrder from "../components/order/create_order.vue";

const routes = [
  {
    path: "/",
    component: DashboardView,
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
  },
  {
    path: "/orders",
    component: OrderView,
  },
  {
    path: "/order/create",
    component: () => import("../components/order/create_order.vue"),
  },
  {
    path: "/order/:id",
    component: () => import("../components/order/print_order.vue"),
  },
  {
    path: "/order/edit/:id",
    component: () => import("../components/order/edit_order.vue"),
  },
  {
    path: "/products",
    name: "ProductsView",
    component: ProductView,
  },
  {
    path: '/product/create',
    component: () => import('../components/product/create_product.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
