<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { pick } from '../utils'

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  headers: {
    type: Object,
    default: {}
  },
  maps: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits(['checked', 'open'])

// Selected Rows
const checkedRows = ref([])

// Wrangling data
const data = computed(() => [...props.data])
watch(data, () => checkedRows.value = [])

const sort = reactive({
  key: null,
  asc: 0
})

const sortedData = computed(() => {

  if (sort.asc === 0) return data.value

  return [...data.value].sort((a, b) => {
    [a, b] = [a, b].map(c => (c[sort.key] || '').toUpperCase())
    return a > b ? sort.asc : a < b ? -sort.asc : 0
  })

})

const displayData = computed(() => sortedData.value.map(row => pick(row, ...Object.keys(props.headers))))

function sortByKey (key) {

  if (key === sort.key) {
    sort.asc = ((sort.asc + 2) % 3) - 1
  } else {
    sort.key = key
    sort.asc = 1
  }

}

// Making header text
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

let wait
let timer
function toggleChecked (i) {

  if (wait) return
  wait = true

  timer = setTimeout(() => {
    
    const row = sortedData.value[i]
    const isChecked = checkedRows.value.includes(row)
    if (isChecked) {
      checkedRows.value = checkedRows.value.filter(r => r.id !== row.id)
    } else {
      checkedRows.value.push(row)
    }
    wait = false
    emit('checked', checkedRows.value)

  }, 200)

}

function openDetails (i) {
  clearTimeout(timer)
  wait = false
  emit('open', sortedData.value[i])
}

</script>

<template>
  <div class="wrapper">
    <table>
      <tr>
        <!-- <th>
          <div style="width: 1em;">
            <input
              type="checkbox"
              name="select-all"
              id="select-all"
              v-model="selectAll"
            >
          </div>
        </th> -->
        <th
          v-for="(_val, key) in displayData[0]"
          :key="key"
          v-html="headerText(key)"
          @click="sortByKey(key)"
        />
      </tr>
      <tr
        v-for="(item, i) in displayData"
        :key="`row-${i}`"
        :class="{
          'selected': checkedRows.map(r => r.id).includes(sortedData[i].id)
        }"
        @click="toggleChecked(i)"
        @dblclick="openDetails(i)"
      >
        <!-- <td>
          <input
            v-model="checkedRows"
            type="checkbox"
            name="row-select"
            :id="`checkbox-${i}`"
            :value="sortedData[i]"
          >
        </td> -->
        <td
          v-for="(val, key) in item"
          :key="`cell-${key}-${i}`"
          v-text="key in maps ? maps[key](val, item) : val"
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
  font-size: smaller;
  box-shadow: 2px 2px 2px 1px gray;
  border-radius: 10px;
}

table th:first-child {
  border-top-left-radius: 10px;
}

table th:last-child {
  border-top-right-radius: 10px;
}

table tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}
    
table tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

td, th {
  padding: 10px 10px;
}

th {
  background-color: var(--secondary);
  color: whitesmoke;
  cursor: pointer;
}

td {
  text-align: center;
}

tr td {
  background-color: white;
}

tr:hover td {
  background-color: #42b88330;
  cursor: pointer;
}

tr.selected td {
  color: white;
  background-color: var(--primary);
}

caption {
  padding: 10px;
}

input[type=checkbox] {
  margin: 0;
  padding: 0;
}

</style>
