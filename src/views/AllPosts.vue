<template>
<div>
 <one-post-preview
 v-for="post in posts"
 :key="post.id"
 :post="post"
 /> 
</div>
</template>

<script>
 import OnePostPreview from '../components/OnePostPreview.vue'
 export default {
  URL: "http://localhost:3000",
  components: {
    OnePostPreview
  },
  data(){
    return {
      posts: []
    }
  },
  mounted(){
    this.getPosts()
  },
  methods: {
    getPosts(){
    fetch(this.$options.URL)
   .then(res => res.json())
   .then(res => this.posts = res)
    }
  },
}
</script>

<style scoped>

</style>


