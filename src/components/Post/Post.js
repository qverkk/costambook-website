export default {
  name: 'post',
  components: {},
  props: [
    "post"
  ],
  data() {
    return {
      image: ""
    }
  },
  created() {
    this.dataUrl()
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    dataUrl() {
      if (this.post.image != null) {
        this.image = "data:image/jpeg;base64," + this.post.image
      }
      // var reader = new FileReader();
      // let self = this;
      // reader.readAsDataURL(this.post.image);
      // reader.onloadend = function () {
      //   var base64data = reader.result;
      //   console.log(base64data);
      //   self.image = base64data;
      // }
      // const test = btoa(this.post.image);
    }
  }
}