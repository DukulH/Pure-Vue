<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { sidebarWidth } from "@/components/sidebar/state";
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth };
  },
};
</script>

<template>
  <div id="mainContent" style="top: 0; left: 0;">
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }" style="background-color: #F8F8F8; min-height: 98vh;">
      <router-view />
    </div>
  </div>
</template>
