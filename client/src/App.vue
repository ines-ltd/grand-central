<script setup>
import { reactive } from 'vue'
import { useAuth } from './composables/auth'
import Auth from './pages/Auth.vue'

const { state: authState } = useAuth()

const state = reactive({ showNav: false })

function toggleNav () {
  state.showNav = !state.showNav
}
</script>

<template>

  <header>
    <button class="menu-btn" @click="toggleNav">
      <span class="material-icons" v-text="'menu'"/>
    </button>
    <RouterLink to="/" class="header-item">
      <span class="bold-title">GC</span>
    </RouterLink>
    <RouterLink to="/workflow" class="header-item first-header-item">Workflow</RouterLink>
    <RouterLink to="/governance" class="header-item">Governance</RouterLink>
    <RouterLink to="/raptor" class="header-item">Raptor</RouterLink>
    <RouterLink to="/about" class="header-item">About</RouterLink>
    <RouterLink to="/auth" class="header-item">
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

  <nav id="left-nav" :class="{ 'hide': !state.showNav }">
    <RouterLink to="/requests" class="nav-item">Requests</RouterLink>
    <RouterLink to="/" class="nav-item">My Tasks</RouterLink>
    <RouterLink to="/" class="nav-item">My Projects</RouterLink>
    <RouterLink to="/" class="nav-item">My Team Tasks</RouterLink>
    <RouterLink to="/" class="nav-item">All Projects</RouterLink>
    <RouterLink to="/" class="nav-item">Subscriptions</RouterLink>
    <RouterLink to="/" class="nav-item">Analytics</RouterLink>
    <RouterLink to="/" class="nav-item">Admin</RouterLink>

    <div
      v-if="state.showNav == true"
      class="scrim"
      @click="state.showNav = false"
    />

  </nav>

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

nav {
  width: var(--nav-width);
  height: calc(100vh - var(--header-height));
  background-color: var(--primary);
  color: whitesmoke;
  transition: margin-left 0.3s;
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

.nav-item {
  display: block;
  color: whitesmoke;
  text-decoration: none;
  padding: 1em;
  cursor: pointer;
}

.nav-item:hover {
  background-color: var(--primary-dark);
}

.hide {
  margin-left: calc(0px - var(--nav-width));
}

.scrim {
  visibility: hidden;
}

@media (max-width: 1024px) {

  main {
    grid-template-columns: 1fr;
  }

  nav {
    position: absolute;
    z-index: 2;
  }

  .scrim {
    position: absolute;
    left: var(--nav-width);
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.8;
    z-index: 1;
    cursor: pointer;
    visibility: visible;
  }
}

</style>
