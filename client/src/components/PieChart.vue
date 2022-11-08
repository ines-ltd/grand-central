<script setup>
import { onMounted, ref, defineProps } from 'vue'
import Chart from 'chart.js/auto'
import { frequency, titleCase } from '../utils';

const el = ref(null)

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  type: {
    type: String,
    default: 'pie'
  },
  colors: {
    type: Array,
    default: ['#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#64DFDF', '#72EFDD', '#80FFDB']
  },
  column: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  aspect: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 33
  }
})

const map = frequency(props.data, props.column)

const config = {
  type: props.type,
  data: {
    labels: [...map.keys()],
    datasets: [
      {
        label: props.column,
        data: [...map.values()],
        backgroundColor: props.colors
      }
    ]
  },
  options: {
    aspectRatio: props.aspect,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        text: Boolean(props.title) ? props.title : titleCase(props.column),
        position: 'top',
        display: true
      }
    }
  }
}

onMounted(() => {
  const chart = new Chart(el.value, config)
})

</script>

<template>
  <div :style="{
    'height': props.height.toString() + 'px',
    'width': (props.aspect * props.height).toString() + 'px',
    'max-width': '100%'
  }">
    <canvas id="chart" ref="el" />
  </div>
</template>
