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

const app = createApp(App)
app.use(surveyPlugin)
app.use(surveyCreatorPlugin).use(router);

app.mount('#app')
