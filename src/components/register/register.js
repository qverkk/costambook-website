import axios from "axios";
import router from "../../router/index";

export default {
  name: "register",
  components: {},
  props: [],
  data() {
    return {
      show1: false,
      show2: false,
      userExists: false,
      username: "",
      password: "",
      repeatpassword: "",
      firstName: "",
      lastName: "",
      rules: {
        required: v => !!v || "Required",
        passwordMin: v => v.length >= 8 || "Min 8 characters",
        repearPasswordMatches: v =>
          v === this.password || "Passwords don't match"
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    register() {
      if (!this.firstName) {
        console.log("First name is empty");
        return;
      }
      if (!this.lastName) {
        console.log("Last name is empty");
        return;
      }
      if (!this.username) {
        console.log("Username is empty");
        return;
      }
      if (this.password.length < 8) {
        console.log("Password is too short");
        return;
      }
      if (this.password !== this.repeatpassword) {
        console.log("Passwords don't match");
        return;
      }

      let self = this;

      let data = JSON.stringify({
        "username": this.username,
        "password": this.password,
        "firstName": this.firstName,
        "lastName": this.lastName
      });

      axios.post("http://localhost:8090/user/register", data, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(function (response) {
          if (response.data === "User already exists") {
            self.userExists = true;
          } else if (response.status == 201) {
            router.replace({
              name: "login",
              params: {
                registered: true
              }
            })
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    }
  }
};