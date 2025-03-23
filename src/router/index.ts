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
      path: '/auth',
      name: 'auth',
      component: () => import('@/view/AuthPage.vue'),
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/LoginForm.vue'),
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/components/SignUpForm.vue'),
        },
      ],
    },
    {
      path: '/recovery',
      name: 'Forgot-Email',
      component: () => import('@/view/ForgotPasswordPage.vue'),
      children: [
        {
          path: '/recovery/verify',
          name: 'Forgot-OTP',
          component: () => import('@/view/ForgotPasswordPage.vue'),
        },
        {
          path: '/recovery/reset',
          name: 'Forgot-Reset',
          component: () => import('@/view/ForgotPasswordPage.vue'),
        },
        {
          path: '/recovery/done',
          name: 'Forgot-Done',
          component: () => import('@/view/ForgotPasswordPage.vue'),
        },
      ],
    },
  ],
})

export default router
