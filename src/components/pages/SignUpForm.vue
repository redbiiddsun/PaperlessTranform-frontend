<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthError from '@/components/pages/AuthError.vue'
import { validatePasswords, validateEmail } from '@/utils/validation.js'

const user = ref({
  fname: '',
  lname: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const err = ref('')
const showError = ref(false)

const signup = () => {
  err.value = ''
  showError.value = false

  const emailError = validateEmail(user.value)
  if (emailError) {
    err.value = emailError
    showError.value = true
    return
  }

  const passwordError = validatePasswords(user.value)
  if (passwordError) {
    err.value = passwordError
    showError.value = true
    return
  }
  console.log('User:', user.value)
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-screen h-fit min-h-screen md:min-h-0 xl:h-screen gap-1 md:gap-2 p-8 md:px-24 md:py-16 xl:py-8 md:rounded-2xl xl:rounded-none md:bg-text md:border-4 md:border-hightlight xl:border-none xl:absolute xl:right-0 xl:w-[45%]"
  >
    <!-- Logo -->
    <div alt="" class="w-52 h-52 bg-[#EAEAEA] rounded-lg"></div>

    <!-- Main Message -->
    <div class="flex flex-col p-4 w-fit h-fit items-center gap-1">
      <p class="font-Poppins font-bold text-3xl md:text-4xl text-text_b text-nowrap">Sign Up</p>
      <p
        class="hidden sm:block font-Poppins font-normal text-[12px] md:text-base text-center text-subtext mt-2"
      >
        Sign up to create and manage your forms easily, making work faster and hassle-free!
      </p>
    </div>

    <!-- Form -->

    <div class="flex flex-col gap-6 px-2 py-4 md:py-4 w-full h-fit">
      <!-- Name Input -->
      <div class="flex flex-col md:flex-row md:gap-4">
        <div class="flex flex-col gap-1 w-full">
          <p class="font-Poppins font-bold text-xl text-text_b">First Name</p>
          <div
            class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
          >
            <input
              v-model="user.fname"
              type="text"
              class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
              placeholder="FirstName"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-Poppins font-bold text-xl text-text_b">Last Name</p>
          <div
            class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
          >
            <input
              v-model="user.lname"
              type="text"
              class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
              placeholder="LastName"
            />
          </div>
        </div>
      </div>

      <!-- Email Input -->
      <div class="flex flex-col gap-1">
        <p class="font-Poppins font-bold text-xl text-text_b">Email Address</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="user.email"
            type="email"
            class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
            placeholder="example@mail.com"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="flex flex-col md:flex-row md:gap-4">
        <div class="flex flex-col w-full gap-1">
          <p class="font-Poppins font-bold text-xl text-text_b">Password</p>
          <div
            class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
          >
            <input
              v-model="user.password"
              type="password"
              class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
              placeholder="••••••••••"
            />
          </div>
        </div>

        <!-- Confirm Password Input -->
        <div class="flex flex-col w-full gap-1">
          <p class="font-Poppins font-bold text-xl text-text_b text-nowrap">Confirm Password</p>
          <div
            class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
          >
            <input
              v-model="user.confirmPassword"
              type="password"
              class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
              placeholder="••••••••••"
            />
          </div>
        </div>
      </div>

      <!-- Already Have Account -->
      <div class="flex flex-row w-full h-fit justify-end">
        <p class="font-Poppins font-light text-xs md:text-base text-subtext">
          Already have an account
        </p>
        <router-link
          to="login"
          class="font-Poppins font-light text-xs md:text-base text-subtext w-fit text-nowrap cursor-pointer underline hover:underline hover:text-hightlight ml-1"
          >Login</router-link
        >
      </div>
    </div>
    <AuthError v-if="showError" :msgErr="err" @close="showError = false" />

    <!-- Submit Button -->
    <div class="flex flex-row md:w-full gap-4 justify-center items-center">
      <button
        @click="signup"
        :disabled="
          !user.fname || !user.lname || !user.email || !user.password || !user.confirmPassword
        "
        class="flex flex-col justifyitems-center items-center gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl font-bold text-text cursor-pointer disabled:border disabled:border-subtext/70 disabled:bg-none disabled:font-normal disabled:text-subtext/70 disabled:cursor-not-allowed w-full lg:w-3/4"
      >
        <p class="font-Poppins text-2xl tracking-[0.1em]">Sign Up</p>
      </button>
    </div>
  </div>
</template>
