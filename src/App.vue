<script>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { sidebarWidth } from "@/components/sidebar/state";
export default {
  components: { Sidebar },

  setup() {
    return { 
      sidebarWidth,
      loggedIn: true, 
    };
  },
};
</script>

<template>
  <div id="mainContent" style="top: 0; left: 0">
    <div v-if="loggedIn">
    <router-view />
    </div>
    <div v-else>
      <Sidebar />
      <div
        :style="{ 'margin-left': sidebarWidth }"
        style="background-color: #f8f8f8; min-height: 90vh"
      >
        <router-view />
      </div>
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
