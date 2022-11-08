<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { format } from 'date-fns'
import { useApi } from '../composables/api'
import { useAuth } from '../composables/auth'
import { truncate, frequency, randomColor } from '../utils'
import Table from '../components/Table.vue'
import PieChart from '../components/PieChart.vue'
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


async function reset () {
  selectedRows.value = []
  await fetchRequests()
}

// charts data
const statusChart = computed(() => frequency(requests.value, 'status'))
const urgencyChart = computed(() => frequency(requests.value, 'urgency'))

</script>

<template>

  <div class="title">
    <h1>{{user.isCustomer ? 'My' : ''}} Projects</h1>
    <button
      v-if="user.isCustomer"
      v-text="'New'"
      @click="modals.newRequest = true"
    />
    <template v-if="(user.isManager || user.isAdmin) && selectedRows.length > 0">

    </template>
  </div>

  <div class="charts">
    <PieChart
      :key="requests"
      :data="requests"
      :aspect="1"
      :height="300"
      type="doughnut"
      column="status"
    />
    <PieChart
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
}

@media (width < 1025px) {
  .charts {
    justify-content: center;
  }
}

</style>
