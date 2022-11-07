<script>
const { useApi } = require('../composables/api')
const api = useApi()

const props = defineProps({
  requests: {
    type: Array,
    default: []
  }
})

const devs = await 
</script>

<template>
  <h1>Assign</h1>
  <form>
    <input type="text">
    <input type="text">
    <input type="text">
    <input type="text">
  </form>
</template>
