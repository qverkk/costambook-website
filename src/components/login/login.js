//import axios from "axios";
import {
  AUTH_REQUEST
} from "../../store/actions/auth";
import store from "../../store"
import router from "../../router/index";

export default {
  name: "login",
  components: {},
  props: ['registered'],
  data() {
    return {
      username: "",
      password: "",
      userExists: true,
      passwordDoesntMatch: false,
      showRegistered: false
    };
  },
  computed: {},
  mounted() {
    console.log(this.registered);
    if (this.registered) {
      this.showRegistered = true;
    }
  },
  methods: {
    login() {
      let self = this;
      let data = JSON.stringify({
        username: this.username,
        password: this.password
      });

      store.dispatch(AUTH_REQUEST, data)
        .then((response) => {
          if (response.data == "User doesn't exist") {
            self.userExists = false;
          } else if (response.data == "Password doesn't match") {
            self.passwordDoesntMatch = true;
          } else {
            router.replace({
              name: "home"
            })
          }
        });
    }
  }
};