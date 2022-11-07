<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { format } from 'date-fns'
import { useApi } from '../composables/api'
import { useAuth } from '../composables/auth'
import { truncate } from '../utils'
import Table from '../components/Table.vue'
import Modal from '../components/Modal.vue'
import RequestForm from '../components/RequestForm.vue'
import AssignForm from '../components/AssignForm.vue'

const api = useApi()
const { user } = useAuth()

// modal state
const modals = reactive({
  newRequest: false,
  assignForm: false
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
  const txt = `Are sure sure you want to delete ${selectedRows.value.length} request${s}`
  if (!window.confirm(txt)) return
  // Delete from the database
  const res = await api.post('/request/delete', { requests: selectedRows.value })
  if (res.ok) {
    await fetchRequests()
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
      @click="modals.newRequest = true"
    />
    <template v-if="(user.isManager || user.isAdmin) && selectedRows.length > 0">
      <button
        class="primary"
        v-text="'Assign'"
        @click="modals.assignForm = true"
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

  <Table
    v-if="requests.length"
    :key="requests.length"
    :data="requests"
    :headers="headers"
    :maps="maps"
    @checked="(checked) => selectedRows = [...checked]"
  />

  <Modal
    v-model:show="modals.newRequest"
    @submit="fetchRequests"
  >
    <RequestForm @hide="modals.newRequest = false" />
  </Modal>

  <Modal
    v-model:show="modals.assignForm"
  >
    <AssignForm 
      :requests="selectedRows"
      @cancel="modals.assignForm = false"
    />
  </Modal>


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
