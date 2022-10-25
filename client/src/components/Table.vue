<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  headers: {
    type: Object,
    default: {}
  },
  filters: {
    type: Object,
    default: {}
  }
})

function objOnly (obj, arr) {
  if (!arr.length) return obj
  const result = {}
  for (let key of arr) {
    result[key] = obj[key]
  }
  return result
}

const data = props.data.map(row => objOnly(row, Object.keys(props.headers)))

const sort = reactive({
  key: null,
  asc: 0
})

const sortedData = computed(() => {

  if (sort.asc === 0) return data

  return [...data].sort((a, b) => {
    [a, b] = [a, b].map(c => c[sort.key].toUpperCase())
    return a > b ? sort.asc : a < b ? -sort.asc : 0
  })

})

function sortByKey (key) {

  if (key === sort.key) {
    sort.asc = ((sort.asc + 2) % 3) - 1
  } else {
    sort.key = key
    sort.asc = 1
  }

}

function headerText (key) {

  const titleCase = props.headers[key] || key
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  let arrow = ''

  if (sort.key === key && sort.asc !== 0) {
    arrow = 'arrow_' + (sort.asc > 0 ? 'up' : 'down') + 'ward'
  }

  return `
    <span class="header-text">
      ${titleCase}
      <span class="material-icons">${arrow}</span>
    </span>`
  
}

</script>

<template>
  <div class="wrapper">
    <table>
      <tr>
        <th
          v-for="(_val, key) in sortedData[0]"
          :key="key"
          v-html="headerText(key)"
          @click="sortByKey(key)"
        />
      </tr>
      <tr
        v-for="(item, i) in sortedData"
        :key="`row-${i}`"
      >
        <td
          v-for="(val, key) in item"
          :key="`cell-${key}-${i}`"
          v-html="key in filters ? filters[key](val) : val"
        />
      </tr>
    </table>
  </div>
</template>

<style scoped>
div.wrapper {
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100vw;
}

table {
  margin: 1em;
  border-collapse: collapse;
  border: 2px solid rgb(200,200,200);
}

td, th {
  border: 1px solid rgb(190,190,190);
  padding: 10px 20px;
}

th {
  background-color: rgb(235,235,235);
  cursor: pointer;
}

td {
  text-align: center;
}

tr:nth-child(even) td {
  background-color: rgb(250,250,250);
}

tr:nth-child(odd) td {
  background-color: rgb(245,245,245);
}

caption {
  padding: 10px;
}

</style>
