import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [vue()],

  server: {
    port: process.env.PORT,
    host: "0.0.0.0"
  }

})
