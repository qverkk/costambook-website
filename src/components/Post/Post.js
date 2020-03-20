import Axios from "axios"
import store from "../../store"
import Comment from "../Comments/Comment"
import NewComment from "../Comments/NewComment"

export default {
  name: 'post',
  components: {
    Comment,
    NewComment
  },
  props: [
    "post"
  ],
  data() {
    return {
      image: "",
      likes: 0,
      dislikes: 0,
      showComments: false,
      comments: [],
      commentText: "Show comments"
    }
  },
  created() {
    this.dataUrl();
    this.fetchLikes();
    this.fetchComments();
  },
  computed: {
    userId() {
      return store.getters.userId
    }
  },
  mounted() {

  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
      if (this.showComments) {
        this.fetchComments();
        this.commentText = "Hide comments";
      } else {
        this.commentText = "Show comments";
      }
    },
    fetchComments() {
      Axios.get("http://localhost:8090/comments", {
          params: {
            postId: this.post.postId
          }
        })
        .then((res) => {
          console.log(res)
          this.comments = res.data;
        })
        .catch((res) => {
          console.log(res)
        })
    },
    dataUrl() {
      if (this.post.image != null) {
        this.image = "data:image/jpeg;base64," + this.post.image
      }
    },
    fetchLikes() {
      Axios.get("http://localhost:8090/likes", {
          params: {
            postId: this.post.postId
          }
        })
        .then((res) => {
          let posts = res.data;
          this.likes = 0;
          this.dislikes = 0;
          posts.forEach(p => {
            if (p.type == "LIKE") {
              this.likes += 1;
            } else {
              this.dislikes += 1;
            }
          });
        })
        .catch((res) => {
          console.log(res)
        })
    },
    like() {
      this.performLikeOrDislike("LIKE")
    },
    dislike() {
      this.performLikeOrDislike("DISLIKE")
    },
    performLikeOrDislike(type) {
      let data = JSON.stringify({
        "userId": this.userId,
        "postId": this.post.postId,
        "likeType": type
      });

      Axios.post("http://localhost:8090/likes", data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res) => {
          if (res.data == false) {
            return
          }
          this.fetchLikes();
        })
        .catch((res) => {
          console.log(res)
        })
    }
  }
}