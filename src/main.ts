import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

// Tailwind CSS
import './assets/main.css'

// Pinia
import { createPinia } from "pinia";

// Formkit
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'

const app = createApp(App)
const pinia = createPinia();
app.use(router)
app.use(pinia)
app.use(plugin, defaultConfig(config))

app.mount('#app')
