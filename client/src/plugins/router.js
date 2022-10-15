import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Workflow from '../pages/Workflow.vue'
import Governance from '../pages/Governance.vue'
import Raptor from '../pages/Raptor.vue'
import About from '../pages/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/workflow',
      component: Workflow
    },
    {
      path: '/governance',
      component: Governance
    },
    {
      path: '/raptor',
      component: Raptor
    },
    {
      path: '/about',
      component: About
    }
  ]
})

export default router
