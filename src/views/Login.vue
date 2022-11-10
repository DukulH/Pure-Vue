<template>
  <div
    class="LoginPageBody"
    v-loading="show_loader"
    element-loading-text="Logging..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(255, 255, 255, .9)"
    style="width: 100%"
  >
    <section>
      <section
        class="LeftSection d-flex justify-content-center align-items-center"
      >
        <div class="w-75">
          <h1 class="mb-5 text-center">Pure Care BD</h1>
          <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item label="" prop="email" class="mb-4 w-75 m-auto">
              <el-input
                placeholder="Enter your email"
                v-model="loginForm.email"
              ></el-input>
            </el-form-item>

            <el-form-item label="" prop="password" class="mb-2 w-75 m-auto">
              <el-input
                placeholder="Enter your password"
                v-model="loginForm.password"
                type="password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item class="w-75 m-auto mb-3">
              <a href="#" style="color: #010101">Forgot Password?</a>
            </el-form-item>

            <el-form-item>
              <input
                type="button"
                value="Login"
                class="w-75 m-auto rounded"
                style="background-color: #010101; color: white; border: none"
                @click="submitForm('loginForm')"
              />
            </el-form-item>
          </el-form>
        </div>
      </section>
      <section class="RightSection"></section>
    </section>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      show_loader: false,
      svg: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: ["blur", "change"],
          },
          {
            message: "Password must contain 8 characters",
            min: 8,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.show_loader = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginForm.email);
        } else {
          console.log("error submit!!");
        }
      });
    },
  },
};
</script>

<style>
.LoginPageBody {
  background: url("../assets/profileBG.jpg");
  background-repeat: no-repeat;
  min-height: 100vh;
  background-size: 100%;
}
.LeftSection {
  min-height: 100vh;
  background-color: white;
  width: 50%;
}
</style>
