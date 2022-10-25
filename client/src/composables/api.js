export function useApi () {

  return {

    options: {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    },

    serialize (form) {
      return Array
        .from(new FormData(form))
        .reduce((obj, [key, val]) => ({...obj, [key]: val || null}), {})
    },

    async fetch (endpoint, options = {}) {

      const res = await fetch(import.meta.env.VITE_API + endpoint, {
        ...this.options,
        ...options
      })

      if (res.status === 401) {
        window.alert('Please sign in')
      }

      if (res.status === 403) {
        window.alert('You do not have permission to perform this action.')
      }

      const data = await res.json()

      return {
        data,
        status: res.status,
        ok: res.ok
      }

    },

    async get (endpoint) {
      return this.fetch(endpoint)
    },

    async post (endpoint, data) {
      return this.fetch(endpoint, {
        body: JSON.stringify(data),
        method: 'POST'
      })
    },

    async put (endpoint, data) {
      return this.fetch(endpoint, {
        body: JSON.stringify(data),
        method: 'PUT'
      })
    },

    async delete (endpoint) {
      return this.fetch(endpoint, { method: 'DELETE' })
    }

  }

}
