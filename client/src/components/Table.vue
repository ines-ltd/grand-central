<script setup>
import { reactive, computed } from 'vue'


const sort = reactive({
  key: null,
  asc: 0
})

const headers = {
  price: 'Cost',
  rating: 'User Rating'
}

const data = [
  {
    name: 'T-Shirt',
    price: 5.99,
    rating: 7
  },
  {
    name: 'Jeans',
    price: 7.50,
    rating: 4
  },
  {
    name: 'Shoes',
    price: 14.99,
    rating: 9
  }
]

const sortedData = computed(() => {

  if (sort.asc === 0) return data

  return [...data].sort((a,b) => {
    console.log(a, b)
    return a[sort.key] > b[sort.key]
    ? sort.asc
    : b[sort.key] > a[sort.key] ? -sort.asc : 0
  })

})

function sortByKey (key) {

  console.log('click!')

  if (key === sort.key) {
    sort.asc = ((sort.asc + 2) % 3) - 1
  } else {
    sort.key = key
    sort.asc = 1
  }

}

function headerText (key) {

  const titleCase = headers[key] || key
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
      v-for="(item,i) in sortedData"
      :key="`row-${i}`"
    >
      <td
        v-for="(val, key) in item"
        :key="`cell-${key}-${i}`"
        v-html="val"
      />
    </tr>
  </table>
</template>

<style scoped>
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
