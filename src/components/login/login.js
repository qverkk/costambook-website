export default {
  name: 'login',
  components: {},
  props: [],
  data() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    login() {
      console.log(this.username);
      console.log(this.password);
    }
  }
}