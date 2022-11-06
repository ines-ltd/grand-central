import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Workflow from '../pages/Workflow.vue'
import Governance from '../pages/Governance.vue'
import Raptor from '../pages/Raptor.vue'
import About from '../pages/About.vue'
import Auth from '../pages/Auth.vue'
import Requests from '../pages/Requests.vue'

import { useAuth } from '../composables/auth'
const { user, state: authState } = useAuth()
console.log(user.role, 'router')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: Auth,
      meta: {
        public: true
      }
    },
    {
      path: '/',
      component: Home,
      meta: {
        public: true
      }
    },
    {
      path: '/workflow',
      component: Workflow,
      meta: {
        protected: true,
        roles: ['manager', 'admin']
      }
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
      component: Requests
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!authState.signedIn && !to.meta.public) return next('/auth')
  if (to.meta.protected && !to.meta.roles.includes(user.role)) return next('/')
  return next()
})

export default router
