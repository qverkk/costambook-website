import Axios from "axios";

export default {
  name: 'new-post',
  components: {},
  props: [],
  data() {
    return {
      description: "",
      choosenFile: null,
      rules: {
        image: [
          value => !value || value.size < 2000000 || 'Image must be below 2MB!'
        ]
      }
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    createPost() {
      // let data = JSON.stringify({
      //   "description": this.description,
      //   "image": this.choosenFile || ""
      // })
      // console.log(data);
      // Axios.post("http://localhost:8090/posts", data, {
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((response) => {
      //     console.log(response);
      //   })
    }
  }
}