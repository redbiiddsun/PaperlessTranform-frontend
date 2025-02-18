import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'survey',
      component: () => import('../views/SurveyView.vue'),
    },
  ],
})

export default router
