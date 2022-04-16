<template>
  <div class="container col-md-4">
    <form ref="formElem" @submit.prevent="submitFile">
      <div class="mb-3">
        <label for="title" class="form-label">title</label>
        <input
          class="form-control"
          id="title"
          placeholder="title"
          name="title"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">text</label>
        <textarea
          class="form-control"
          id="text"
          rows="3"
          placeholder="text"
          name="text"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">image link</label>
        <input
          class="form-control"
          id="image"
          placeholder="image"
          name="image"
        />
      </div>

      <div class="spinner-border m-5" role="status" v-if="adding">
        <span class="sr-only"></span>
      </div>
      <input
        type="submit"
        name="button"
        class="btn btn-success"
        id="sendMail"
        value="Send"
        v-else
      />
    </form>
  </div>
</template>
<script>
export default {
  URL: "http://localhost:3000",
  methods: {
    submitFile() {
      const formData = new FormData(this.$refs.formElem);
      fetch("http://localhost:3000/add", {
        method: "POST",
        body: formData,
      })
      this.$refs.formElem.reset();
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 5rem;
}
</style>