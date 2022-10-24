<script setup>

  const emit = defineEmits(['hide', 'submit'])

  async function handleSubmit (e) {
    const data = Array
      .from(new FormData(e.target))
      .reduce((obj, [key, val]) => ({...obj, [key]: val || null}), {})
    
    const res = await fetch(`${import.meta.env.VITE_API}/request`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 9fa67626-6784-4194-a357-88b0021cec8c`
      }
    })

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
    <input type="text" name="category" id="category">

    <label for="description">Description</label>
    <textarea rows="8" name="description" id="description"></textarea>

    <label for="rationale">Rationale</label>
    <textarea rows="8" name="rationale" id="rationale"></textarea>

    <label for="category">Category</label>
    <input type="text" name="category" id="category">

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
  max-width: 24em;
  margin: 20px 0px;
}

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 1em;
  padding: 0.25em;
}

</style>