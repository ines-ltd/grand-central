<script setup>
  import { onMounted, reactive, ref, computed } from 'vue'
  import { format } from 'date-fns'
  import { useApi } from '../composables/api'
  import { useAuth } from '../composables/auth'
  import Table from '../components/Table.vue'
  import Chart from '../components/Chart.vue'
  import Modal from '../components/Modal.vue'
  import RequestForm from '../components/RequestForm.vue'
  import AssignForm from '../components/AssignForm.vue'
  import Drawer from '../components/Drawer.vue'

  const api = useApi()
  const { user } = useAuth()

  onMounted(() => {
    fetchRequests()
  })

  const requests = reactive({ all: [], selected: [] })
  async function fetchRequests() {
    const res = await api.get('/request')
    requests.all = res.data || []
  }

  const modals = reactive({
    newRequest: false,
    assignForm: false,
    detailView: false,
  })

  const charts = reactive({ show: false })

  // only keys in the meta are displayed in the table
  const meta = {
    createdAt: {
      header: 'Created',
      map: (d) => format(new Date(d), 'dd/MM/yyyy'),
    },
    name: {
      header: 'Name',
    },
    status: {
      header: 'Status',
    },
    category: {
      header: 'Category',
    },
    audience: {
      header: 'Audience',
    },
    urgency: {
      header: 'Urgency',
    },
  }

  // content of the detail modal
  const detailRow = reactive({})
  function openDetails(row) {
    Object.assign(detailRow, row)
    modals.detailView = true
  }

  async function deleteRequests() {
    const s = requests.selected.length > 1 ? 's' : ''
    const txt = `Are sure sure you want to delete ${requests.selected.length} request${s}`
    if (!window.confirm(txt)) return
    const res = await api.post('/request/delete', {
      requests: requests.selected,
    })
    if (res.ok) reset()
  }

  async function rejectRequests() {
    const s = requests.selected.length > 1 ? 's' : ''
    const txt = `Are sure sure you want to reject ${requests.selected.length} request${s}`
    if (!window.confirm(txt)) return
    const res = await api.put('/request/reject', {
      requests: requests.selected,
    })
    if (res.ok) reset()
  }

  async function reset() {
    requests.selected = []
    await fetchRequests()
  }
</script>

<template>
  <div class="title">
    <h1>{{ user.isCustomer ? 'My' : '' }} Requests</h1>
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
  </div>

  <div
    v-if="charts.show"
    class="charts"
  >
    <Chart
      :key="requests.all"
      :data="requests.all"
      :aspect="1"
      :height="300"
      type="doughnut"
      column="status"
    />
    <Chart
      :key="requests.all"
      :data="requests.all"
      :aspect="2"
      :height="300"
      type="bar"
      column="urgency"
    />
  </div>

  <Table
    v-if="requests.all.length"
    :data="requests.all"
    :meta="meta"
    @checked="(checked) => (requests.selected = [...checked])"
    @open="(row) => openDetails(row)"
  />

  <Modal v-model:show="modals.newRequest">
    <RequestForm
      @submit="fetchRequests"
      @hide="modals.newRequest = false"
    />
  </Modal>

  <Modal v-model:show="modals.assignForm">
    <AssignForm
      :requests="requests.selected"
      @submit="reset"
      @cancel="modals.assignForm = false"
    />
  </Modal>

  <Modal v-model:show="modals.detailView">
    <pre>{{ detailRow }}</pre>
  </Modal>

  <Drawer
    :show="(user.isManager || user.isAdmin) && requests.selected.length > 0"
  >
    <div class="drawer-buttons">
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
        v-text="'Reject'"
        @click="rejectRequests"
      />
      <button
        class="warning"
        v-text="'Delete'"
        @click="deleteRequests"
      />
    </div>
  </Drawer>
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

  .drawer-buttons {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }

  @media (width < 1025px) {
    .charts {
      justify-content: center;
    }
  }
</style>
