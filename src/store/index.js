import Vue from "vue";
import Vuex from "vuex"
import user from "./modules/user";
import auth from "./modules/auth";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules: {
    user,
    auth
  },
  strict: debug
})

export default store;