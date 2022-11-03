import { reactive } from 'vue'
import { useApi } from './api'
import pick from '../utils/pick'
const api = useApi()

const state = reactive({
  loading: false,
  signedIn: false
})

const nullUser = {
  ein: null,
  role: null,
  email: null,
  firstName: null,
  lastName: null
}

const user = reactive({ ...nullUser })

if (!state.signedIn && localStorage.hasOwnProperty('user')) {
  Object.assign(user, JSON.parse(localStorage.getItem('user')))
  state.signedIn = true
}

async function signIn (email, password) {

  state.loading = true

  const res = await api.post('/auth/signin', {}, {
    headers: {
      'Authorization': `Basic ${btoa(email + ':' + password)}`
    }
  })

  if (!res.ok) return signOut()

  api.setTokens(res.data)

  const userData = pick(res.data, 'ein', 'role', 'email', 'firstName', 'lastName')
  localStorage.setItem('user', JSON.stringify(userData))
  Object.assign(user, userData)

  state.signedIn = true
  state.loading = false

  return userData

}

function signOut () {
  state.loading = true
  state.signedIn = false
  localStorage.clear()
  Object.assign(user, nullUser)
  state.loading = false
}

export function useAuth () {

  return {
    state,
    user,
    signIn,
    signOut
  }

}
