<script setup>
import MyRequests from '../components/MyRequests.vue'
import AllRequests from '../components/AllRequests.vue'
import { useAuth } from '../composables/auth'
const { user } = useAuth()
</script>

<template>
  <MyRequests v-if="user.role === 'customer'"/>
  <AllRequests v-else />
</template>
