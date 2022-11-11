<script setup>
import Blank from './layouts/Blank.vue'
import Default from './layouts/Default.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>

  <Blank v-if="route.name === 'auth'" />
  <Default v-else />

</template>
