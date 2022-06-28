<template>
<div class="sidebar">
    <!-- <div class="title">
           <h3>
               <font-awesome-icon icon="fas fa-chalkboard" />
                Inventory
           </h3>
        </div>
        <div class="menu-items">
            <router-link to="/" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="fas fa-chart-pie" />
                    Overview
                </div>
            </router-link>
            <router-link to="/profile" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="fas fa-user" />
                    Profile
                </div>
            </router-link>
            <router-link to="/orders" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="fas fa-shopping-cart" />
                    Orders
                </div>
            </router-link>
            <router-link to="/products" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="fas fa-box-open" />
                    Products
                </div>
            </router-link>
            
        </div> -->
    <el-col>
        <h5 class="my-5 text-center" style="color: #AFE1AF">Pure Care BD</h5>
        <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#AFE1AF">
            <router-link to="/" class="routerLinkTextDesign">
                <el-menu-item index="1">
                    <i class="el-icon-setting"></i>
                    <span>Home</span>
                </el-menu-item>
            </router-link>
            <router-link to="/profile" class="routerLinkTextDesign">
                <el-menu-item index="2">
                    <i class="el-icon-user"></i>
                    <span>Profile</span>
                </el-menu-item>
            </router-link>
            <router-link to="/orders" class="routerLinkTextDesign">
                <el-menu-item index="3">
                    <i class="el-icon-s-order"></i>
                    <span>Orders</span>
                </el-menu-item>
            </router-link>
            <router-link to="/products" class="routerLinkTextDesign">
                <el-menu-item index="4">
                    <i class="el-icon-box"></i>
                    <span>Products</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </el-col>
</div>
</template>

<script>
export default {
    name: 'SideBar',
    data() {
        return {
            isCollapse: true,
        };
    },
    methods: {

    }
}
</script>

<style scoped>
.routerLinkTextDesign {
    text-decoration: none;
}

.el-menu-vertical-demo {
    width: 200px;
}

/* .title {
    color: white;
    font-size: 24px;
    margin-top: 10px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 6px;

}

.menu-items>* {
    margin-top: 60px;
} */

/* .side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: rgb(68, 209, 2);
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before,
.side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before,
.side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: teal;
} */
</style>
