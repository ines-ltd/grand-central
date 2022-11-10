<script setup>

import { defineProps } from 'vue'
import { titleCase } from '../utils'

const props = defineProps({
  project: {
    type: Object,
    default : {}
  }
})

</script>

<template>
  <div class="card" @click="">

    <div>
      <div class="title">
        <h2>{{ titleCase(props.project.name) }}</h2>

        <Popper>
          <div :class="{
            'badge': true,
            'primary': props.project.status === 'Working',
            'warning': props.project.status === 'On hold',
          }">
            {{ props.project.status || 'Unknown' }}
          </div>
          <template #content>
            <div class="menu">
              <ul>
                <li>Working</li>
                <li>On hold</li>
                <li>Pending</li>
                <li>Blocked</li>
              </ul>
            </div>
          </template>
        </Popper>

      </div>
      <p>Priority {{ props.project.priorityScore }}</p>
    </div>
    

    
    <div>
      <h3>Devs</h3>
      <div class="devs">
        <span v-for="dev in props.project.developers">
          <Popper
            hover
            arrow
            offsetDistance="6"
            :content="dev.firstName"
          >
            <img
              :src="dev.imgUrl"
              :alt="`Profile image for ${dev.firstName}`"
            >
          </Popper>
        </span>
      </div>
    </div>

    <!-- <div class="actions">
      <button class="secondary" @click.stop>
        Details
      </button>
    </div> -->

  </div>
</template>

<style scoped>
.card {
  background-color: white;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px gray;
  width: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card .title {
  display: flex;
  align-items: start;
  gap: 1em;
}

.menu ul, .menu li {
  margin: 0;
  padding: 8px;
  text-indent: 0;
  list-style-type: none;
}

.menu li:hover {
  background-color: #4b4b4b;
  cursor: pointer;
}

h2 {
  font-size: medium;
}

h3 {
  font-size: small;
}

p {
  font-size: small;
}

.badge {
  color: whitesmoke;
  background-color: gray;
  font-weight: bold;
  font-size: x-small;
  width: fit-content;
  white-space: nowrap;
  padding: 5px;
  border-radius: 5px;
  margin-left: auto;
}

.badge.primary {
  background-color: var(--primary);
}

.badge.warning {
  background-color: var(--warning);
}

.devs {
  margin: 0.5em 0em;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5em;
}

.devs img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

:deep(.popper) {
  font-weight: bold;
  font-size: x-small;
}

/* .actions {
  display: flex;
  gap: 0.5em;
  justify-content: end;
  align-items: center;
} */

</style>
