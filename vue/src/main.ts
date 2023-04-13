import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './style.css'

const app = createApp(App)
app.use(router).use(store).mount('#app')
app.use(Toast, {});
