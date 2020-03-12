import axios from "axios";

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

      axios
        .post("http://localhost:8090/user/login", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function (response) {
          if (response.data == "User doesn't exist") {
            self.userExists = false;
          } else if (response.data == "Password doesn't match") {
            self.passwordDoesntMatch = true;
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }
};