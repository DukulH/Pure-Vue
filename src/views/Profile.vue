<template>
  <div>
    <Header headerName="User Profile"></Header>
    <div class="m-4 shadow" style="background-color: white">
      <div class="m-5">
        <el-tabs
          class="mx-5 py-5"
          tabPosition="left"
          v-model="activeName"
        >
          <el-tab-pane label="User Info" name="first">
            <div class="row">
              <div class="col-md-4 d-flex justify-content-center">
                <img
                  class="img-fluid w-75"
                  style="border-radius: 20%"
                  src="https://images.statusfacebook.com/profile_pictures/black_and_white/black_and_white_32.jpg"
                  alt=""
                />
              </div>
              <div class="col-md-6">
                <p class="mt-3">
                  Name: <br />
                  <small class="infoText">Dukul Howlader Mohin</small>
                </p>
                <p class="mt-3">
                  Position: <br />
                  <small class="infoText">Admin</small>
                </p>
                <p class="mt-3">
                  Email: <br />
                  <small class="infoText">dukul.howlader30@gmail.com</small>
                </p>
                <p class="mt-3">
                  Phone Number: <br />
                  <small class="infoText">01846069269</small>
                </p>
                <p class="mt-3">
                  Address: <br />
                  <small class="infoText"
                    >120 west kafrul, Agargaon, Taltola, Dhaka-1207</small
                  >
                </p>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Edit Info " name="second">
            <div class="row">
              <div
                class="col-md-4 d-flex justify-content-center align-items-center"
              >
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :multiple = "false"
                >
                  <el-icon><Plus /></el-icon>
                </el-upload>
              </div>
              <div class="col-md-6">
                <el-form
                  :model="userProfileForm"
                  :rules="rules"
                  ref="userProfileForm"
                  label-width="120px"
                >
                  <el-form-item label="Name" prop="user_name">
                    <el-input v-model="userProfileForm.user_name"></el-input>
                  </el-form-item>

                  <el-form-item label="Position" prop="user_position">
                    <el-input
                      v-model="userProfileForm.user_position"
                      disabled
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="Email" prop="user_email">
                    <el-input
                      v-model="userProfileForm.user_email"
                      disabled
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="Phone Number" prop="user_phone_number">
                    <el-input
                      type="number"
                      pattern="[0-9]+"
                      v-model="userProfileForm.user_phone_number"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="Address" prop="user_address">
                    <el-input v-model="userProfileForm.user_address"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="info"
                      style="background-color: #010101"
                      @click="submitForm('userProfileForm')"
                      >Update</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";
import { ref } from "vue";

export default {
  name: "ProfileView",
  components: {
    Header,
  },
  data() {
    return {
      activeName: ref("first"),
      userProfileForm: {
        user_name: "",
        user_email: "",
        user_phone_number: null,
        user_address: "",
        user_position: "",
      },
      rules: {
        user_name: [
          {
            required: true,
            message: "Please input user name",
            trigger: "change",
          },
        ],
        user_phone_number: [
          {
            required: true,
            message: "Insert valid contact number",
            trigger: "change",
            min: 11,
            max: 11,
          },
        ],
        user_address: [
          {
            required: true,
            message: "Please input user address",
            trigger: "change",
          },
        ],
      },
    };
  },
};
</script>
<style>
.infoText {
  color: gray;
  font-weight: bold;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
