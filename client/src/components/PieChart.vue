<script setup>
import { onMounted, ref, defineProps } from 'vue'
import Chart from 'chart.js/auto'

const el = ref(null)

const props = defineProps({
  labels: {
    type: Array,
    default: []
  },
  datasets: {
    type: Array,
    default: []
  },
  type: {
    type: String,
    default: 'pie'
  },
  colors: {
    type: Array,
    default: ['#150485', '#590995', '#C62A88', '#03C4A1']
  }
})

const config = {
  type: props.type,
  data: {
    labels: props.labels,
    datasets: props.datasets
  }
}

onMounted(() => {
  const chart = new Chart(el.value, config)
})

</script>

<template>
  <canvas id="chart" ref="el" />
</template>
