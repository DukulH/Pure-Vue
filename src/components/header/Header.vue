<template>
  <header class="header">
    <div class="d-flex">
      <div class="col-md-9">
        <div class="d-flex align-items-center ms-5" style="height: 100px">
          <div style="color: #828282">
            <button
              class="border-0"
              style="background-color: white; color: #818181"
              @click="toggleSidebar"
            >
              <i class="fas fa-bars-staggered"></i>
            </button>
          </div>
          <div
            class="ms-3"
            style="font-size: 25px; font-weight: bold; color: #010101"
          >
            {{ headerName }}
          </div>
        </div>
      </div>
      <div class="col-md-3" style="align-self: center; color: #939393">
        <div class="d-flex align-items-center">
          <!-- <div class="col-md-6 text-end" style="border-left: 1px solid #939393">
            Dukul Howlader
          </div>
          <div class="col-md-3 text-center">
            
          </div> -->
          <div class="col-md-3">
            <div class="box">
              <div
                class="dropdown"
                @click="(e) => e.target.classList.toggle('active')"
              >
                <img
                  class="img-fluid"
                  style="width: 20%"
                  src="../../assets/logo.png"
                  alt=""
                />
                Dukul Howalder Mohin
                <span class="left-icon"></span>
                <span class="right-icon"></span>
                <div class="items">
                  <a href="/profile" style="--i: 1"><span></span>My Profile</a>
                  <a href="" style="--i: 2"><span></span>Settings</a>
                  <a href="" @click="authService.logout()" style="--i: 3"><span></span>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { toggleSidebar } from "../sidebar/state";
import authService from "../authentication/authService";
export default {
  props: ["headerName"],
  setup() {
    return {
      toggleSidebar,
      authService
    };
  },
};
</script>
<style>
.header {
  color: black;
  background-color: white;
  
}

.box {
  position: relative;
  width: 350px;
  z-index: 10;
  
}

.dropdown {
  position: relative;
  width: 100%;
  height: 60px;
  background: #ffffff;
  color: #010101;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}
.dropdown.active{
  overflow: visible;
}

.dropdown .left-icon,
.dropdown .right-icon {
  position: relative;
  top: 2px;
  display: inline-block;
  width: 15px;
  height: 4px;
  background: #010101;
  border-radius: 40px;
  transition: 0.5s;
}

.dropdown .left-icon {
  left: 7px;
  transform: rotate(45deg);
}
.dropdown .right-icon {
  transform: rotate(-45deg);
}

.dropdown.active .left-icon {
  transform: rotate(135deg);
}
.dropdown.active .right-icon {
  transform: rotate(-135deg);
}

.dropdown .items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  margin-top: 63px;
  overflow: hidden;
}

.dropdown .items a {
  position: relative;
  left: 100%;
  display: flex;
  font-size: 14px;
  background: #ffffff;
  color: #010101;
  text-decoration: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 2.5px;
  z-index: 1;
  overflow: hidden;
  transition: 0.5s;
  transition-delay: calc(60ms * var(--i));
}
.dropdown .items a:hover {
  color: #ffffff;
}
.dropdown.active .items a {
  left: 0;
}

.dropdown .items a span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1919;
  z-index: -1;
  border-radius: inherit;
  transform: rotate(160deg);
  transform-origin: right;
  transition: 0.3s;
}

.dropdown .items a:hover span {
  transform: rotate(0deg);
}
</style>
