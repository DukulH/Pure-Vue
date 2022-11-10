<template>
<header class="header">
<div class="d-flex">
 <div class="col-md-9">
   <div class="d-flex align-items-center ms-5" style="height: 100px">
    <div style="color: #828282;">
        <button class="border-0" style="background-color: white; color: #818181;" @click="toggleSidebar"><i class="fas fa-bars-staggered"></i></button>
    </div>
    <div class="ms-3" style="font-size: 25px; font-weight: bold; color: #010101;">
        {{headerName}}
    </div>
  </div>
</div>
<div class="col-md-3" style="align-self: center; color: #939393;">
    <div class="d-flex align-items-center">
        <div class="col-md-6 text-end" style="border-left: 1px solid #939393;">
            Dukul Howlader
        </div>
        <div class="col-md-3 text-center ">
            <img class="img-fluid" style="width:60%" src="../../assets/logo.png" alt="">
        </div>
        <div class="col-md-3" >
            <el-dropdown class="" :hide-on-click="false">
    <h4 class="el-dropdown-link">
      <i class="fas fa-sort-down"></i>
    </h4>
    <template #dropdown>
      <el-dropdown-menu class="mx-5">
        <el-dropdown-item class="m-5">My profile</el-dropdown-item>
        <el-dropdown-item class="p-2">Settings</el-dropdown-item>
        <el-dropdown-item class="p-2">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
        </div>
    </div>
</div>
</div>
  
</header>
</template>
<script>
import { toggleSidebar } from '../sidebar/state';
export default{
props:['headerName'],
setup(){
    return{ toggleSidebar }
}
}
</script>
<style>
.header{
    color: black;
    background-color: white;
}
</style>