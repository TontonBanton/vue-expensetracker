import { createApp } from 'vue'
import './assets/style.css'

//For Vue Toast
import Toast from 'vue-toastification';          // Note: use npm i vue-toastification@next for the latest version to avoid error
import 'vue-toastification/dist/index.css';      // Import toast css styling

import App from './App.vue'

//createApp(App).mount('#app')

const app = createApp(App)    //creates a new Vue application instance.
  app.use(Toast);             //registers the Toast plugin with the Vue application.
  app.mount('#app')           //mounts the Vue application to an HTML element with the id #app (index.html <div>)