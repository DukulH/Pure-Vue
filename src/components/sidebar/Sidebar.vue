<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1 style="text-align: center">
      <span v-if="collapsed">
        <div>P</div>
        <div>C</div>
        <div>B</div>
      </span>
      <span v-else> Pure Care BD </span>
    </h1>
    <SidebarLink to="/dashboard" icon="fas fa-shop">Dashboard</SidebarLink>
    <SidebarLink to="/profile" icon="fas fa-user">Profile</SidebarLink>
    <SidebarLink to="/orders" icon="fas fa-bag-shopping">Orders</SidebarLink>
    <SidebarLink to="/products" icon="fas fa-list">Products</SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left"></i>
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import SidebarLink from "./SidebarLink.vue";
export default {
  name: "SideBar",
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: black;
  --sidebar-item-hover: gray;
  --sidebar-item-active: gray;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 2px solid ;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255);
  transition: 0.2s linear;
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
