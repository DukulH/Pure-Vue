<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { sidebarWidth } from "@/components/sidebar/state";
import Footer from "./components/footer/Footer.vue";
export default {
  components: { Sidebar, Footer },

  setup() {
    return {
      sidebarWidth,
    };
  },
};
</script>

<template>
  <div id="mainContent" style="top: 0; left: 0">
    <div v-if="!$route.meta.hideSidebar">
      <Sidebar />
      <div
        :style="{ 'margin-left': sidebarWidth }"
        style="background-color: #f8f8f8; min-height: 90vh"
      >
        <router-view />
      </div>
      <Footer />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
