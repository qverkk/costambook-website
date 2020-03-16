import {
  AUTH_LOGOUT
} from "../../store/actions/auth"
// import router from "../../router/index"
import store from "../../store"

export default {
  name: 'home',
  components: {},
  props: [],
  data() {
    return {

    }
  },
  computed: {
    authenticated() {
      return store.getters.isAuthenticated
    }
  },
  mounted() {

  },
  methods: {
    logout: function () {
      store.dispatch(AUTH_LOGOUT)
    }
  }
}