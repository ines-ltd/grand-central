<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { format } from 'date-fns'
import { useApi } from '../composables/api'
import { useAuth } from '../composables/auth'
import { truncate } from '../utils'
import RequestForm from '../components/RequestForm.vue'
import Table from '../components/Table.vue'

const api = useApi()
const { user } = useAuth()

// form state
const form = reactive({
  show: false
})

// headers
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

// selected rows
const selectedRows = ref([])

onMounted(() => {
  fetchRequests()
})

// requests
const requests = ref([])

async function fetchRequests () {
  const res = await api.get('/request')
  requests.value = res.data || []
}

async function deleteRequests () {
  const s = selectedRows.value.length > 1 ? 's' : ''
  const confMsg = `Are sure sure you want to delete ${selectedRows.value.length} request${s}`
  if (!window.confirm(confMsg)) return
  const res = await api.post('/request/delete', { requests: selectedRows.value })
  if (res.ok) {
    requests.value = requests.value.filter(r => !selectedRows.value.includes(r))
    selectedRows.value = []
  }
}

</script>

<template>

  <div class="title">
    <h1>{{user.isCustomer ? 'My' : ''}} Requests</h1>
    <button
      v-if="user.isCustomer"
      v-text="'New'"
      @click="form.show = true"
    />
    <template v-if="(user.isManager || user.isAdmin) && selectedRows.length > 0">
      <button
        class="primary"
        v-text="'Assign'"
      />
      <button
        class="secondary"
        v-text="'Edit'"
      />
      <button
        class="warning"
        v-text="'Delete'"
        @click="deleteRequests"
      />
    </template>
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
      @checked="(checked) => selectedRows = [...checked]"
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
