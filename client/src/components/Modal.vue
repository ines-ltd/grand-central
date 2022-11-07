<script setup>
import { reactive, computed } from 'vue'

const props = defineProps(['show'])
const emit = defineEmits(['update:show'])

const show = computed({

  get () {
    return props.show
  },

  set () {
    emit('update:show', !props.show)
  }

})

</script>

<template>
  
  <div
    class="scrim"
    v-show="show"
    @click="show = false"
  >
    <div
      class="card"
      v-show="show"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>

.scrim {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: 1;
}

.card {
  max-width: 100%;
  padding: 1em;
  margin: 5px;
  border-radius: 5px;
  background-color: white;
  cursor: default;
  z-index: 2;
}

</style>
