import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'survey',
    //   component: () => import('../App.vue'),
    // },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/view/loginPage.vue'),
    },
  ],
})

export default router
