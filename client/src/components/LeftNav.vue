<script setup>
import { useAuth } from '../composables/auth'
import { useNav } from '../composables/nav'

const { user } = useAuth()
const { navState } = useNav()


</script>

<template>
    <nav id="left-nav" :class="{ 'hide': !navState.sideNav }">
    <RouterLink to="/requests" class="nav-item">Requests</RouterLink>
    <RouterLink v-if="user.role == 'customer'" to="/" class="nav-item">Subscriptions</RouterLink>
    <RouterLink to="/" class="nav-item">Projects</RouterLink>
    <RouterLink to="/" class="nav-item">Tasks</RouterLink>
    <RouterLink to="/" class="nav-item">Analytics</RouterLink>
    <RouterLink to="/" class="nav-item">Admin</RouterLink>

    <div
      v-if="navState.sideNav == true"
      class="scrim"
      @click="navState.sideNav = false"
    />

  </nav>
</template>

<style scoped>
nav {
  width: var(--nav-width);
  height: calc(100vh - var(--header-height));
  background-color: var(--primary);
  color: whitesmoke;
  transition: margin-left 0.3s;
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
