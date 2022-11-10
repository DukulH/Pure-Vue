<template>
  <div>
  <Header headerName="Dashboard"></Header>
  <!-- <DashboardCard backgroundColor="red"/> -->
  <div class="d-flex justify-content-between flex-row mx-5 mt-5">
    <div style="width: 24%;" v-for="item in cards" :key="item.id">
    <DashboardCard 
        :backgroundColor="item.backgroundColor" 
        :count="item.count" 
        :name="item.name"
        :nameColor="item.nameColor"
        :countColor="item.countColor"></DashboardCard>
  </div>
  </div>
  
</div>
</template>

<script>
import Header from "../components/header/Header.vue"
import DashboardCard from "../components/dashboard/DashboardCard.vue";
export default {
  name: "DashboardView",
  components:{
    Header,
    DashboardCard
},
  data(){
    return {
      cards:[
        { 
          id:1,
          backgroundColor: "#010101",
          count:120,
          countColor:"#FFFFFF",
          name:"Total Orders",
          nameColor:"#FFFFFF",
          icon:"",
        },
        {
          id:2,
          backgroundColor: "#FFFFFF",
          count: 180,
          countColor:"#010101",
          name:"Total Order Today",
          nameColor:"#898989",
          icon:"",
        },
        {
          id:3,
          backgroundColor: "#FFFFFF",
          count: 250,
          countColor:"#010101",
          name:"Pending Orders",
          nameColor:"#898989",
          icon:"",
        },
        {
          id:4,
          backgroundColor: "#FFFFFF",
          count: 150,
          countColor:"#010101",
          name:"Delivered Orders",
          nameColor:"#898989",
          icon:"",
        }
      ],

      }
    
  }
};
</script>
<style>


</style>

