import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@fortawesome/fontawesome-free/js/all";
import AuthService from "./components/authentication/authService";

axios.defaults.baseURL = "http://127.0.0.1:8001";

const app = createApp(App);
let isRefreshing = false;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

axios.interceptors.response.use(
  (response) => {
    console.log("response===========>",response);
    return response;
  },
  (error) => {
    console.log("error ===============> ",error);
    const status = error.response ? error.response.status : null;
    const status_msg = error.response ? error.response.data.code : null;
    console.log(status_msg);
    if (status === 401 && status_msg === "token_not_valid") {
      if (!isRefreshing) {
        isRefreshing = true;
        return AuthService.refreshToken()
          .then(async (response) => {
            if (response.status === 200) {
              isRefreshing = false;
              // New request with new token
              const config = error.config;
              let token = await JSON.parse(localStorage.getItem("access_token"));
              config.headers["Authorization"] = `Bearer ${token}`;

              return new Promise((resolve, reject) => {
                axios
                  .request(config)
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else if (status === 401) {
      localStorage.clear();
    }
    // axios error response
    return Promise.reject(error.response);
  }
);

app.use(router);
app.use(bootstrap);
app.use(ElementPlus);

app.mount("#app");
