export function useApi () {

  return {

    serialize (form) {
      return Array
        .from(new FormData(form))
        .reduce((obj, [key, val]) => ({...obj, [key]: val || null}), {})
    },

    async fetch (endpoint, data = null, options = {}) {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }

      if (data) options.body = JSON.stringify(data)

      const res = await fetch(import.meta.env.VITE_API + endpoint, {
        ...config,
        ...options
      })

      if (res.status === 401) {
        return window.alert('Authentication error.')
      }

      if (res.status === 403) {
        return window.alert('Insufficient permissions.')
      }

      return {
        data: await res.json(),
        status: res.status,
        ok: res.ok
      }

    },

    async get (endpoint) {
      return this.fetch(endpoint, null, { method: 'GET' })
    },

    async post (endpoint, data, options) {
      return this.fetch(endpoint, data, { method: 'POST', ...options })
    },

    async put (endpoint, data, options) {
      return this.fetch(endpoint, data, { method: 'PUT', ...options })
    },

    async delete (endpoint) {
      return this.fetch(endpoint, null, { method: 'DELETE' })
    },

    setTokens (tokens) {
      localStorage.setItem('token', tokens.token)
      localStorage.setItem('refresh', tokens.refresh)
    }

  }

}
