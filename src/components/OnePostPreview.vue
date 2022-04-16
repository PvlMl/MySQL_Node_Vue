<template>
<div class="container">
  <div class="card text-center">
  <div class="card-body">
    <h5 class="card-title">{{post.title}}</h5>
    <p class="card-text">{{post.postBody}}</p>
    <a href="#" class="btn btn-success"
    @click="this.$router.push('/post/'+ post.id)"
    >Go to post</a>
  </div>
  <div class="card-footer text-muted text-end">
    {{getData}}
  </div>
</div>
</div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    getData(){
      return this.post.postDate.split('T')[0];
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px;
  width: 40%;
}
</style>
