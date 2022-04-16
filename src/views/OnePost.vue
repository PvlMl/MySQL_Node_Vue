<template>
<edit-modal
:isOpen="isPopupOpen"
@close-popup="closePopup"
 />
  <div class="container"
  v-if="post"
  >
    <div class="well">
      <div class="media">
        <a class="pull-left"  target="_blank" :href="post.imageLink">
          <img class="item-img" :src="post.imageLink" />
        </a>
        <button type="button" class="btn btn-danger btn-lg"
        @click="deletePost"
        >Remove this post</button>
        <button type="button" class="btn btn-success btn-lg"
        @click="openPopup"
        >Edit this post</button>
        <div class="media-body">
          <h4 class="media-heading">{{post.title}}</h4>
          <p>
            {{post.postBody}}
          </p>
          <ul class="list-inline list-unstyled">
            <li>
              <span>{{getData}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditModal from '../components/EditModal.vue';
export default {
  URL: "http://localhost:3000",
  components: {
    EditModal
  },
  data() {
    return {
      post: null,
      isPopupOpen: false
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      fetch(this.$options.URL + "/post/" + this.$route.params.id)
        .then((res) => res.json())
        .then((res) => (this.post = res[0]));
    },
    deletePost(){
      if (!confirm("Are you sure?")) return;
      fetch(this.$options.URL + "/delete/" + this.$route.params.id, {
        method: "DELETE"
      }).then(res => {if(res) this.$router.push('/')})
    },
    openPopup(){
      this.isPopupOpen = true;
    },
    closePopup(){
      this.isPopupOpen = false;
    }
  },
  computed: {
    getData(){
      return this.post.postDate.split('T')[0];
    }
  }
};
</script>

<style scoped>
.item-img {
  width: 500px; 
  height: 300px; 
}
.container {
  margin-top: 5rem;
  background-color: aliceblue;
}
.btn-lg{
  margin-left: 10%;
}
</style>