<script setup>
import { onMounted, reactive, ref } from 'vue'
import { format } from 'date-fns'
import RequestForm from '../components/RequestForm.vue'
import Table from '../components/Table.vue'
import { useApi } from '../composables/api'
import { useAuth } from '../composables/auth'
import { truncate } from '../utils'

const api = useApi()
const { user } = useAuth()

const form = reactive({
  show: false
})

const requests = ref([])

const headers = {
  createdAt: 'Created',
  name: 'Name',
  status: 'Status',
  category: 'Category',
  description: 'Description',
  rationale: 'Rationale',
  audience: 'Audience',
  urgency: 'Urgency'
}

const maps = {
  createdAt: d => format(new Date(d), 'dd/MM/yyyy'),
  updatedAt: d => format(new Date(d), 'dd/MM/yyyy'),
  description: d => truncate(d),
  rationale: r => truncate(r)
}

async function fetchRequests () {
  const res = await api.get('/request')
  requests.value = res.data
}

onMounted(() => {
  fetchRequests()
})

</script>

<template>

  <div class="title">
    <h1>{{user.isCustomer ? 'My' : ''}} Requests</h1>
    <button @click="form.show = true">New</button>
  </div>

  <Transition name="fade" mode="out-in">
    <RequestForm
      v-if="form.show"
      @hide="form.show = false"
      @submit="fetchRequests"
    />
    <Table
      v-else-if="requests.length"
      :key="requests.length"
      :data="requests"
      :headers="headers"
      :maps="maps"
    />
  </Transition>

</template>

<style scoped>

.title {
  display: flex;
  align-items: center;
  gap: 1em;
}

.requests {
  margin-top: 1em;
}

</style>
