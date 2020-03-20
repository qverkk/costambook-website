import Axios from "axios"
import store from "../../../store"

export default {
  name: 'new-comment',
  components: {},
  props: [
    "postId"
  ],
  data() {
    return {
      comment: ""
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    addNewComment() {
      let data = JSON.stringify({
        "postId": this.postId,
        "userId": store.getters.userId,
        "text": this.comment
      });

      Axios.post("http://localhost:8090/comments", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res) => {
          console.log(res)
          this.$emit('posted')
        })
        .catch((res) => {
          console.log(res)
        })
    }
  }
}