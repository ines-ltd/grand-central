<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { format } from 'date-fns'
import { useApi } from '../composables/api'
import { useAuth } from '../composables/auth'
import { truncate, frequency, randomColor } from '../utils'
import Table from '../components/Table.vue'
import Chart from '../components/Chart.vue'
import Modal from '../components/Modal.vue'
import RequestForm from '../components/RequestForm.vue'
import AssignForm from '../components/AssignForm.vue'

const api = useApi()
const { user } = useAuth()

// modal state
const modals = reactive({
  newRequest: false,
  assignForm: false,
  detailView: false
})

const charts = reactive({
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

// detail row

const detailRow = reactive({})

function openDetails (row) {
  Object.assign(detailRow, row)
  modals.detailView = true
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
  const res = await api.post('/request/delete', { requests: selectedRows.value })
  if (res.ok) reset()
}

async function rejectRequests () {
  const s = selectedRows.value.length > 1 ? 's' : ''
  const txt = `Are sure sure you want to reject ${selectedRows.value.length} request${s}`
  if (!window.confirm(txt)) return
  const res = await api.put('/request/reject', { requests: selectedRows.value })
  if (res.ok) reset()
}

async function reset () {
  selectedRows.value = []
  await fetchRequests()
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
    <button
      class="secondary"
      @click="charts.show = !charts.show"
    >
      Insights
    </button>
    <template v-if="(user.isManager || user.isAdmin) && selectedRows.length > 0">
      <button
        class="primary"
        style="margin-left: auto;"
        v-text="'Assign'"
        @click="modals.assignForm = true"
      />
      <button
        class="secondary"
        v-text="'Edit'"
      />
       <button
        class="warning"
        v-text="'Reject'"
        @click="rejectRequests"
      />
      <button
        class="warning"
        v-text="'Delete'"
        @click="deleteRequests"
      />
    </template>
  </div>

  <div
    v-if="charts.show"
    class="charts"
  >
    <Chart
      :key="requests"
      :data="requests"
      :aspect="1"
      :height="300"
      type="doughnut"
      column="status"
    />
    <Chart
      :key="requests"
      :data="requests"
      :aspect="2"
      :height="300"
      type="bar"
      column="urgency"
    />
  </div>

  <Table
    v-if="requests.length"
    :data="requests"
    :headers="headers"
    :maps="maps"
    @checked="(checked) => selectedRows = [...checked]"
    @open="(row) => openDetails(row)"
  />

  <Modal
    v-model:show="modals.newRequest"
  >
    <RequestForm
      @submit="fetchRequests"
      @hide="modals.newRequest = false"
    />
  </Modal>

  <Modal
    v-model:show="modals.assignForm"
  >
    <AssignForm 
      :requests="selectedRows"
      @submit="reset"
      @cancel="modals.assignForm = false"
    />
  </Modal>

  <Modal
    v-model:show="modals.detailView"
  >
    <pre>{{ detailRow }}</pre>
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

.charts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 1em;
}

@media (width < 1025px) {
  .charts {
    justify-content: center;
  }
}

</style>
