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
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/view/signUpPage.vue'),
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/view/ForgotPassword.vue'),
    },
  ],
})

export default router
