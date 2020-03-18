import Axios from "axios";

export default {
  name: 'new-post',
  components: {},
  props: [],
  data() {
    return {
      description: "",
      choosenFile: null,
      uploadOk: false,
      uploadFailure: false,
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
    resetWarrnings() {
      this.uploadOk = false;
      this.uploadFailure = false;
    },
    createPost() {
      this.resetWarrnings();

      if (this.choosenFile != null) {
        const uploadImageData = new FormData();
        uploadImageData.append("imageFile", this.choosenFile, this.choosenFile.name);
        uploadImageData.append("description", this.description);
        Axios.post("http://localhost:8090/posts", uploadImageData)
          .then((res) => {
            console.log(res);
            this.uploadOk = true;
          })
          .catch((res) => {
            console.log(res);
            this.uploadFailure = true;
          })
      } else {
        const uploadImageData = new FormData();
        uploadImageData.append("imageFile", null);
        uploadImageData.append("description", this.description);
        Axios.post("http://localhost:8090/posts", uploadImageData)
          .then((res) => {
            console.log(res);
            this.uploadOk = true;
          })
          .catch((res) => {
            console.log(res);
            this.uploadFailure = true;
          })
      }
    },
    uploadPost(base64) {
      if (base64 != null) {
        this.sendPost(base64);
      } else {
        this.sendPost(null);
      }
    },
    sendPost(blob) {
      let wrapper = new Object();
      wrapper.description = this.description;
      wrapper.file = blob;

      Axios({
          url: "http://localhost:8090/posts",
          data: wrapper,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          console.log(response);
          this.uploadOk = true;
        })
        .catch((response) => {
          console.log(response);
          this.uploadFailure = true;
        })
    }
  }
}