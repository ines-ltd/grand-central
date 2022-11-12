<script setup>
  import { reactive, computed, ref, watch } from 'vue'
  import { titleCase } from '../utils'

  const props = defineProps({
    data: {
      type: Array,
      default: [],
    },
    meta: {
      type: Object,
      default: {},
    },
    selected: {
      type: Array,
      default: [],
    },
  })

  const emit = defineEmits(['update:selected', 'open'])

  const selectedRows = computed({
    get() {
      return props.selected
    },
    set(val) {
      emit('update:selected', val)
    },
  })

  const sort = reactive({
    key: null,
    asc: 0,
  })

  const sortedData = computed(() => {
    if (sort.asc === 0) return props.data

    return [...props.data].sort((a, b) => {
      ;[a, b] = [a, b].map((c) => (c[sort.key] || '').toUpperCase())
      return a > b ? sort.asc : a < b ? -sort.asc : 0
    })
  })

  function sortByKey(key) {
    if (key === sort.key) {
      sort.asc = ((sort.asc + 2) % 3) - 1
    } else {
      sort.key = key
      sort.asc = 1
    }
  }

  function headerText(key) {
    const text = props.meta[key]?.label || titleCase(key)
    let arrow = ''

    if (sort.key === key && sort.asc !== 0) {
      arrow = 'arrow_' + (sort.asc > 0 ? 'up' : 'down') + 'ward'
    }

    return `
    <span class="header-text">
      ${text}
      <span class="material-icons">${arrow}</span>
    </span>`
  }

  const click = reactive({
    wait: false,
    timer: null,
  })

  function rowClick(item) {
    if (click.wait) {
      clearTimeout(click.timer)
      click.wait = false
      return openDetails(item)
    }

    click.wait = true
    click.timer = setTimeout(() => {
      click.wait = false
      toggleChecked(item)
    }, 200)
  }

  function toggleChecked(item) {
    if (selectedRows.value.includes(item)) {
      selectedRows.value = selectedRows.value.filter((r) => r.id !== item.id)
    } else {
      selectedRows.value.push(item)
    }
  }

  function openDetails(item) {
    emit('open', item)
  }
</script>

<template>
  <div class="wrapper">
    <table>
      <tr>
        <th
          v-for="(_val, key) in meta"
          :key="key"
          v-html="headerText(key)"
          @click="sortByKey(key)"
        />
      </tr>
      <tr
        v-for="(item, i) in sortedData"
        :key="`row-${i}`"
        :class="{
          selected: selectedRows.includes(item),
        }"
        @click="rowClick(item)"
      >
        <td
          v-for="(_val, key) in meta"
          :key="`cell-${key}-${i}`"
          v-text="
            props.meta[key].map ? props.meta[key].map(item[key]) : item[key]
          "
          :style="{ 'text-align': props.meta[key].align || 'left' }"
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

  td,
  th {
    padding: 10px 10px;
  }

  th {
    background-color: var(--secondary);
    color: whitesmoke;
    cursor: pointer;
  }

  td.center {
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

  input[type='checkbox'] {
    margin: 0;
    padding: 0;
  }
</style>
