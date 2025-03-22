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
        ]
      },
  ],
})

export default router
