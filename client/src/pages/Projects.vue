<script setup>
import { ref } from 'vue'

import ProjectCard from '../components/ProjectCard.vue'

import { useApi } from '../composables/api'
const api = useApi()

const projects = ref([])
const res = await api.get('/project')
projects.value = res.data

</script>

<template>
  <h1>Projects</h1>
  <section class="projects">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </section>
</template>

<style scoped>
.projects {
  margin: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}
</style>
