import Axios from "axios";
import Post from "../Post"

export default {
  name: 'user',
  components: {
    Post
  },
  props: [
    "id"
  ],
  data() {
    return {
      user: null,
      posts: []
    }
  },
  created() {
    this.fetchUserData();
    this.fetchPosts();
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    fetchUserData() {
      Axios.get("http://localhost:8090/user", {
          params: {
            id: this.id
          }
        })
        .then((res) => {
          this.user = res.data;
        })
        .catch((res) => console.log(res))
    },
    fetchPosts() {
      Axios.get("http://localhost:8090/posts", {
          params: {
            userId: this.userId
          }
        })
        .then((res) => {
          console.log(res);
          this.posts = res.data;
        })
        .catch((res) => console.log(res));
    }
  }
}