<script setup>
import { onMounted, reactive, ref } from 'vue'
import { format } from 'date-fns'
import RequestForm from '../components/RequestForm.vue'
import Table from '../components/Table.vue'
import { useApi } from '../composables/api'

const api = useApi()

const form = reactive({
  show: false
})

const requests = ref([])

const headers = {
  createdAt: 'Created',
  name: 'Name',
  description: 'Description',
  rationale: 'Rationale'
}

const filters = {
  createdAt: d => format(new Date(d), 'dd/MM/yyyy'),
  updatedAt: d => format(new Date(d), 'dd/MM/yyyy')
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
    <h1>My Requests</h1>
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
      :filters="filters"
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

.card {
  /* border: solid 0.5px black; */
  background-color: seashell;
  width: 200px;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 2px 2px 1px 1px gray;
}

</style>
