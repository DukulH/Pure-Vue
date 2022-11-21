<template>
  <el-footer style="height: 95px; background-color: #f8f8f8" :style="{ 'margin-left': sidebarWidth }">
        <div
          class="d-flex justify-content-center align-items-center w-50 m-auto rounded"
          style="background-color: white; height: 80px"
        >
          <p class="mb-0" style="color: gray">
            2022 © Influence - Designed by Dukul Howlader
          </p>
        </div>
      </el-footer>
</template>

<script>
import { sidebarWidth } from "@/components/sidebar/state";
export default {
name:"Footer",
setup() {
    return {
      sidebarWidth,
    };
  },
}
</script>

<style>

</style>