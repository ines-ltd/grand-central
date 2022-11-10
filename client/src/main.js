import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import Popper from 'vue3-popper'

createApp(App)
  .use(router)
  .component('Popper', Popper)
  .mount('#app')
