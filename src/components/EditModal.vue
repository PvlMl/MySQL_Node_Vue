<template>
 <div v-if="isOpen" class="backdrop">
    <div class="popup">
      <form ref="formElem" @submit.prevent="editFile">
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

      <div class="spinner-border m-5" role="status" v-if="false">
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
      <button class="btn btn-danger"
      @click="$emit('closePopup')"
      >Сancel</button>
    </form>
    </div>
  </div>
</template>
<script>
export default {
    URL: "http://localhost:3000",
    props: {
        isOpen: {
          type: Boolean,
          default: false
        }
    },
   methods: {
    editFile() {
      const formData = new FormData(this.$refs.formElem);
      fetch("http://localhost:3000/edit/" + this.$route.params.id, {
        method: "PUT",
        body: formData,
      })
      .then(res => {if(res.statusText==="OK") this.$router.push('/')})
      .finally(this.$emit('closePopup'));
      this.$refs.formElem.reset();
    },
  },
}
</script>

<style scoped>
.btn {
    margin-left: 15px;
}
.popup {
  min-width: 500px;
  top: 70px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 101;
  background-color: white;
  border-radius: 10px;
}

.popup h1 {
  text-align: center;
  margin: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.footer {
  text-align: right;
}
</style>