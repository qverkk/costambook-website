export default {
  name: 'comment',
  components: {},
  props: [
    "comment"
  ],
  data() {
    return {
      date: null
    }
  },
  created() {
    console.log(this.comment);
    this.date = new Date(this.comment.date).toString();
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}