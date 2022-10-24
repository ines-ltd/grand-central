<script setup>
import { onMounted, reactive, ref } from 'vue';
import RequestForm from '../components/RequestForm.vue';
import Table from '../components/Table.vue'

const form = reactive({
  show: false
})

const requests = ref([])

async function fetchRequests () {
  const res = await fetch(`${import.meta.env.VITE_API}/request`, {
  headers: {
      'Authorization': `Bearer 9fa67626-6784-4194-a357-88b0021cec8c`
    }
  })

  requests.value = await res.json()
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
      :headers="{ name: 'Name', description: 'Description', rationale: 'Rationale' }"
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
