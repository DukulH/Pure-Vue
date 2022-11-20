<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { sidebarWidth } from "@/components/sidebar/state";
export default {
  components: { Sidebar },

  setup() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return {
      sidebarWidth,
      isLoggedIn,
    };
  },
};
</script>

<template>
  <div id="mainContent" style="top: 0; left: 0">
    <div v-if="isLoggedIn">
      <Sidebar />
      <div
        :style="{ 'margin-left': sidebarWidth }"
        style="background-color: #f8f8f8; min-height: 90vh"
      >
        <router-view />
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>

    <!-- <el-footer style="height: 95px; background-color: #f8f8f8">
      <div
        class="d-flex justify-content-center align-items-center w-50 m-auto rounded"
        style="background-color: white; height: 80px"
      >
        <p class="mb-0" style="color: gray">
          2022 © Influence - Designed by Dukul Howlader
        </p>
      </div>
    </el-footer> -->
  </div>
</template>
