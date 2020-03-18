import {
  AUTH_LOGOUT
} from "../../store/actions/auth"
// import router from "../../router/index"
import store from "../../store"
import NewPost from "../NewPost"
import Post from "../Post"
import Axios from "axios"

export default {
  name: 'home',
  components: {
    NewPost,
    Post
  },
  props: [],
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.fetchPosts()
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
    },
    fetchPosts() {
      if (this.authenticated) {
        Axios.get("http://localhost:8090/posts")
          .then((res) => {
            this.posts = res.data;
          })
      }
    }
  }
}