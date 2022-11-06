<script setup>
import { reactive, computed, ref, watch, defineEmits } from 'vue'
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

const emit = defineEmits(['checked'])

// Selected Rows
const checkedRows = ref([])
const selectAll = ref(false)

watch ([checkedRows, selectAll], ([checked, select], [oldChecked, oldSelect]) => {

  // not all rows are checked and selectAll becomes true
  if (checked.length < data.length && !oldSelect && select) {
    checkedRows.value = sortedData.value
    return
  }

  // all rows are selected and selectAll becomes false
  if (checked.length === data.length && oldSelect && !select) {
    checkedRows.value = []
    return
  }

  // everything is selected and selectAll is true but a row becomes unselected
  if (oldChecked.length === data.length && checked.length < data.length && select) {
    selectAll.value = false
  }

  // everything becomes selected but selectAll is false
  if (oldChecked.length < data.length && checked.length === data.length && !select) {
    selectAll.value = true
  }

  // if checked rows changes, emit the event
  if (oldChecked.length !== checked.length) {
    emit('checked', checked)
  }

})

// Wrangling data
const data = [...props.data]

const sort = reactive({
  key: null,
  asc: 0
})

const sortedData = computed(() => {

  if (sort.asc === 0) return data

  return [...data].sort((a, b) => {
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

</script>

<template>
  <div class="wrapper">
    <table>
      <tr>
        <th>
          <input
            type="checkbox"
            name="select-all"
            id="select-all"
            v-model="selectAll"
          >
        </th>
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
      >
        <td>
          <input
            v-model="checkedRows"
            type="checkbox"
            name="row-select"
            :id="`checkbox-${i}`"
            :value="sortedData[i]"
          >
        </td>
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
  border: 2px solid rgb(200,200,200);
  font-size: smaller;
}

td, th {
  border: 1px solid rgb(190,190,190);
  padding: 10px 10px;
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

input[type=checkbox] {
  margin: 0;
  padding: 0;
}

</style>
