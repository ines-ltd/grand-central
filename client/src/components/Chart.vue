<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const el = ref(null)

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
]

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
}

const config = {
  type: 'line',
  data: data
}

onMounted(() => {
  console.log(el)
  const chart = new Chart(el.value, config)
  console.log(chart)
})

</script>

<template>
  <div class="wrapper">
    <canvas id="chart" ref="el" />
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 60em;
}
</style>
