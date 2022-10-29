import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Workflow from '../pages/Workflow.vue'
import Governance from '../pages/Governance.vue'
import Raptor from '../pages/Raptor.vue'
import About from '../pages/About.vue'
import Auth from '../pages/Auth.vue'

import MyRequests from '../pages/MyRequests.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: Auth
    },
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
    },
    {
      path: '/requests',
      component: MyRequests
    }
  ]
})

export default router
