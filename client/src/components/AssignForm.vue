<script setup>
import ProfileBadge from './ProfileBadge.vue'
import { defineProps, reactive, computed } from 'vue'
import { useApi } from '../composables/api'
const api = useApi()

const emit = defineEmits(['cancel', 'submit'])

const props = defineProps({
  requests: {
    type: Array,
    default: []
  }
})

const res = await api.get('/user?role=dev')
const devs = res.data || []

const selected = reactive({})

const s = computed(() => props.requests.length > 1 ? 's' : '')

function reset () {
  for (let dev in selected) delete selected[dev]
}

function cancel () {
  if (!window.confirm('Cancel assigning?')) return
  reset()
  emit('cancel')
}

async function assign () {
  const res = await api.post('/request/assign', { devs: Object.keys(selected), requests: props.requests.map(r => r.id) })
  if (res.ok) {
    reset()
    emit('submit')
    emit('cancel')
  }
}

</script>

<template>
  <h1>Assign</h1>
  <p>Assigning {{props.requests.length}} request{{s}}</p>
  <section id="devs">
    <ProfileBadge
      v-for="dev in devs"
      :key="dev.ein"
      :profile="dev"
      @click="selected[dev.ein] = !selected?.[dev.ein]"
      :class="{
        'selected': Boolean(selected?.[dev.ein]),
        'profile': true
      }"
    />
  </section>
  <button
    class="primary"
    @click="assign()"
  >
    Save
  </button>
  <button
    class="secondary"
    @click="cancel()"
  >
    Cancel
  </button>
</template>

<style scoped>

#devs {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
}

.profile {
  box-sizing: border-box;
  border: 2px solid transparent;
}

.selected {
  border: 2px solid var(--primary);
}

button {
  margin-right: 1em;
}

</style>
