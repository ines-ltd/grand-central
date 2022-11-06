<script setup>

import { useAuth } from '../composables/auth'
const { user, authState, signIn, signOut } = useAuth()

async function submit (e) {

  const form = new FormData(e.target)
  await signIn(form.get('email'), form.get('password'))
  e.target.reset()

}

</script>

<template>
  <div class="wrapper">
    <form
      v-if="!authState.signedIn"
      @submit.prevent="submit"
    >

      <h1>Sign in</h1>

      <label for="email">Email</label>
      <input type="email" name="email" id="email">
      
      <label for="password">Password</label>
      <input type="password" name="password" id="password">

      <button class="sign-in-btn" type="submit">Submit</button>

      
    </form>
    
    <template v-else>
      <h1>Hey, {{ user.firstName }}!</h1>
      <button class="dashboard-btn">
        Go to dashboard
      </button>
      <button
      v-text="'Sign out'"
      type="button"
      class="secondary"
      @click="signOut"
      />
      <pre>{{ user }}</pre>
    </template>
    
  </div>
</template>

<style scoped>

h1 {
  margin-bottom: 1em;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
}

input {
  display: block;
}

.sign-in-btn {
  margin-right: 1em;
}

.dashboard-btn {
  margin-bottom: 0.5em;
}

</style>
