<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthError from '@/components/pages/AuthError.vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/authentication'
import { getAuthErrorMessage } from '@/utils/ErrorMessage'

const router = useRouter()
const route = useRoute()

const user = ref({
  email: '',
  password: '',
})

const authStore = useAuthStore()
const err = ref('')
const showError = ref(false)

const login = async () => {
  const { success, status } = await authStore.LoginUser({
    email: user.value.email.toLocaleLowerCase(),
    password: user.value.password,
  })
  if (success) {
    const allowedPaths = ['/form']
    const redirectPath = (route.query.redirect as string) || '/'

    if (allowedPaths.some((path) => redirectPath.startsWith(path))) {
      router.push(redirectPath)
    } else {
      router.push('/form')
    }
    router.push(redirectPath)
  } else {
    err.value = getAuthErrorMessage(status as number)
    showError.value = true

    setTimeout(() => {
      showError.value = false
    }, 3000)
  }
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-screen h-fit min-h-screen md:min-h-0 xl:h-screen gap-1 md:gap-2 p-8 md:px-28 md:py-16 xl:py-2 md:rounded-2xl xl:rounded-none md:bg-text md:border-4 md:border-hightlight xl:border-none xl:p-28 xl:absolute xl:left-0 xl:w-[45%]"
  >
    <!-- Logo -->
    <img src="../../assets/logo.png" class="w-52 h-52 bg-[#EAEAEA] rounded-2xl">

    <!-- Main Message -->
    <div class="flex flex-col p-4 w-fit h-fit items-center gap-1">
      <p class="font-Poppins font-bold text-4xl md:text-4xl text-text_b">Login</p>
      <p
        class="hidden sm:block font-Poppins font-normal text-[12px] md:text-base text-center text-subtext mt-4"
      >
        Log in to easily manage your forms and boost productivity with digital transformation.
      </p>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-6 px-2 py-4 md:py-2 w-full h-fit">
      <!-- Email Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-xl text-text_b">Email Address</p>
        <div class="flex flex-col gap-0 px-2 py-3 border-b-4 border-secondary w-full">
          <input
            v-model="user.email"
            type="email"
            class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
            placeholder="example@email.com"
          />
        </div>
      </div>
      <!-- Password Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-xl text-text_b">Password</p>
        <div class="flex flex-col gap-0 px-2 py-3 w-full border-b-4 border-secondary">
          <input
            v-model="user.password"
            type="password"
            class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
            placeholder="••••••••••"
          />
        </div>
      </div>

      <!-- Forgot and Sign Up -->
      <div class="flex flex-row w-full h-fit">
        <router-link
          to="/recovery/email"
          class="font-Poppins font-light text-xs md:text-base text-subtext w-full text-nowrap cursor-pointer hover:underline hover:text-hightlight"
        >
          Forgot Password
        </router-link>

        <router-link
          to="signup"
          class="font-Poppins font-light text-xs md:text-base text-subtext w-fit text-nowrap cursor-pointer hover:underline hover:text-hightlight"
        >
          Create New Account
        </router-link>
      </div>
    </div>

    <AuthError v-if="showError" :msgErr="err" @close="showError = false" />

    <!-- Submit Button -->
    <div class="flex flex-row w-full gap-4 px-0 py-4 justify-center items-center">
      <button
        @click="login()"
        :disabled="!user.email || !user.password"
        class="flex flex-col justifyitems-center items-center gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl font-bold text-text cursor-pointer disabled:border disabled:border-subtext/70 disabled:bg-none disabled:font-normal disabled:text-subtext/70 disabled:cursor-not-allowed w-full lg:w-3/4"
      >
        <p class="font-Poppins text-2xl tracking-[0.1em]">Login</p>
      </button>
    </div>
  </div>
</template>

<!-- disabled:border disabled:border-hightlight disabled:bg-none disabled:text-subtext disabled:cursor-not-allowed -->
