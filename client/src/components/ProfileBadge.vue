<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    default: ''
  },
  selected: {

  }
})
</script>

<template>
  <div class="wrapper">
    <img
      :src="profile.imgUrl"
      :alt="`Profile image for ${profile.firstName} ${profile.lastName}`"
    >
    <h2>{{ profile.firstName }}</h2>
  </div>
</template>

<style scoped>

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }

  h2 {
    font-size: medium;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>
