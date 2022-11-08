<script setup>
import { reactive } from 'vue'
import { useAuth } from './composables/auth'
import { useNav } from './composables/nav'
import Auth from './pages/Auth.vue'
import LeftNav from './components/LeftNav.vue'

const { user, authState } = useAuth()
const { toggleNav } = useNav()

</script>

<template>

  <header>
    <button class="menu-btn" @click="toggleNav">
      <span class="material-icons" v-text="'menu'"/>
    </button>
    <RouterLink to="/" class="header-item">
      <span class="bold-title">GC</span>
    </RouterLink>
    <RouterLink to="/auth" class="first-header-item header-item">
      <span
        :class="{
          'material-icons': authState.signedIn,
          'material-icons-outlined': !authState.signedIn
        }"
        v-text="'person'"
      />
    </RouterLink>

  </header>

  <main>

    <LeftNav />

  <article>
    <Suspense>
      <RouterView />
    </Suspense>
  </article>
  
  </main>

</template>

<style scoped>

header {
  color: whitesmoke;
  background-color: var(--secondary);
  height: var(--header-height);
  display: flex;
  align-items: center;
}

main {
  display: grid;
  grid-template-columns: auto 1fr;
  height: calc(100vh - var(--header-height));
}

article {
  padding: 1em;
  overflow-y: auto;
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

@media (max-width: 1024px) {

  main {
    grid-template-columns: 1fr;
  }

}

</style>
