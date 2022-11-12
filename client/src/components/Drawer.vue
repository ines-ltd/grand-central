<script setup>
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <Transition name="slide">
    <footer v-if="show">
      <slot></slot>
    </footer>
  </Transition>
</template>

<style scoped>
  footer {
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: white;
    box-shadow: -2px 0px 2px 2px gray;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(100%);
  }

</style>
