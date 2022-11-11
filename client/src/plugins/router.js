import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Workflow from '../pages/Workflow.vue'
import Governance from '../pages/Governance.vue'
import Raptor from '../pages/Raptor.vue'
import About from '../pages/About.vue'
import Auth from '../pages/Auth.vue'
import Requests from '../pages/Requests.vue'
import Projects from '../pages/Projects.vue'

import { useAuth } from '../composables/auth'
const { user, authState } = useAuth()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        public: true
      }
    },
    {
      path: '/auth',
      component: Auth,
      meta: {
        public: true
      },
      name: 'auth'
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
    },
    {
      path: '/projects',
      component: Projects,
      meta: {
        protected: true,
        roles: ['dev', 'manager', 'admin']
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!authState.signedIn && !to.meta.public) return next('/auth')
  if (to.meta.protected && !to.meta.roles.includes(user.role)) return next('/')
  return next()
})

export default router
