<script setup>
import { reactive } from 'vue'
import { useAuth } from '../composables/auth'

const { user, authState } = useAuth()

</script>

<template>

  <main>

  <article>
    <Suspense>
      <RouterView />
    </Suspense>
  </article>
  
  </main>

</template>

<style scoped>

main {
  display: grid;
  place-items: center;
  height: 100vh;
}

.material-icons {
  font-size: 24px;
}

.menu-btn {
  border: none;
  background-color: transparent;
  color: whitesmoke;
  cursor: pointer;
  margin: 1em;
}

.bold-title {
  font-weight: 800;
  font-size: large;
}

.first-header-item {
  margin-left: auto;
}

.header-item {
  margin-right: 1em;
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;
}

</style>
