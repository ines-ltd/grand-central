<script setup>

  import { useApi } from '../composables/api'
  const api = useApi()

  const emit = defineEmits(['hide', 'submit'])

  async function handleSubmit (e) {
    
    const res = await api.post('/request', api.serialize(e.target))

    if (res.status === 201) {
      e.target.reset()
      emit('hide')
      emit('submit')
    } else {
      window.alert('There was a problem saving your request :(')
    }
  }

</script>

<template>
  <form action="" @submit.prevent="handleSubmit">

    <h2>New Request</h2>

    <label for="name">Name</label>
    <input type="text" name="name" id="name">

    <label for="category">Category</label>
    <select name="category" id="category">
      <option value=""></option>
      <option value="A">Category A</option>
      <option value="B">Category B</option>
      <option value="C">Category C</option>
    </select>

    <label for="description">Description</label>
    <textarea rows="8" name="description" id="description"></textarea>

    <label for="rationale">Rationale</label>
    <textarea rows="8" name="rationale" id="rationale"></textarea>

    <button type="submit">
      Submit
    </button>
    <button
      class="secondary"
      type="reset"
      style="margin-left: 1em;"
      @click="$emit('hide')"
    >
      Cancel
    </button>

  </form>
</template>

<style scoped>

form {
  width: 30em;
  padding: 1em;
  box-sizing: border-box;
}

h2 {
  margin-bottom: 1em;
}

</style>