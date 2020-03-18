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
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.choosenFile);
        fileReader.addEventListener("load", () => {
          this.uploadPost(fileReader.result);
        });
      } else {
        this.uploadPost(null)
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