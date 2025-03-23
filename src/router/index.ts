import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      name: 'ForgotPassword',
      component: () => import('@/view/ForgotPassPage.vue'),
      redirect: '/auth/recovery/email',
      children: [
        {
          path: 'email',
          name: 'EmailSubmit',
          component: () => import('@/components/ForgotPassword/EmailSubmitForm.vue')
        },
        {
          path: 'otp',
          name: 'OTPVerification',
          component: () => import('@/components/ForgotPassword/OTPVerifyForm.vue')
        },
        {
          path: 'reset',
          name: 'ResetPassword',
          component: () => import('@/components/ForgotPassword/ResetPasswordForm.vue')
        }
      ],
    },
  ],
})

export default router
