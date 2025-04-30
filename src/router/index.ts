import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/view/AuthPage.vue'),
      redirect: '/auth/login',
      meta: { guestOnly: true },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/components/pages/LoginForm.vue'),
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/components/pages/SignUpForm.vue'),
        },
      ],
    },
    {
      path: '/recovery',
      name: 'ForgotPassword',
      component: () => import('@/view/ForgotPassPage.vue'),
      redirect: '/recovery/email',
      meta: { guestOnly: true },
      children: [
        {
          path: 'email',
          name: 'EmailSubmit',
          component: () => import('@/components/pages/ForgotPassword/EmailSubmitForm.vue'),
        },
        {
          path: 'otp',
          name: 'OTPVerification',
          component: () => import('@/components/pages/ForgotPassword/OTPVerifyForm.vue'),
        },
        {
          path: 'reset',
          name: 'ResetPassword',
          component: () => import('@/components/pages/ForgotPassword/ResetPasswordForm.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'Body',
      component: () => import('@/view/DashboardPage.vue'),
      redirect: '/form',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'form',
          name: 'Dashboard',
          component: () => import('@/components/pages/FormDashboard.vue'),
        },
        {
          path: 'add',
          name: 'AddForm',
          component: () => import('@/components/pages/FormBuilder.vue'),
        },
      ],
    },
    {
      path: '/form/:id',
      name: 'FormView',
      component: () => import('@/view/DisplayForm.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const loggedIn = document.cookie.includes('session');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/auth/login')
  } else if (to.matched.some(record => record.meta.guestOnly) && loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
