import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
// Tailwind CSS
import './assets/main.css'
// SurveyJS
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import { surveyCreatorPlugin } from "survey-creator-vue";
import { surveyPlugin } from 'survey-vue3-ui';
// Pinia
import { createPinia } from "pinia";

const app = createApp(App)
const pinia = createPinia();
app.use(surveyPlugin)
app.use(surveyCreatorPlugin).use(router);
app.use(pinia)

app.mount('#app')
