import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

const token = localStorage.getItem("user-token");
console.log("Token: " + token);
if (token) {
  axios.defaults.headers.common['Authorization'] = token;

  axios
    .get("http://localhost:8090/user/validate", {
      params: {
        "token": token
      }
    })
    .then((response) => {
      console.log("Validating token")
      console.log(response);
      if (!response.data) {
        localStorage.removeItem("user-token");
        console.log("Token is not ok, removing")
      } else {
        console.log("Token is ok");
      }
    })
    .catch((response) => {
      console.log(response);
      console.log("Error while validating token, removing");
      localStorage.removeItem("user-token");
    });
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");