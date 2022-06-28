<template>
    <div class="dashboard">
        <Sidebar/>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>

import Sidebar from '../components/side_bar'
export default {
  name: 'DashboardView',
  components: {
        Sidebar
    }
}
</script>
<style>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 5.5fr;
    background-color: rgb(84, 92, 100);
    height: 100vh;
    width: 100vw;
}
.content {
    background-color: #f2f8fd;
}
</style>