<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const user = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const signup = () => {
  validatePasswords()
  console.log('User:', user.value)
}

const error = ref('')

const validatePasswords = () => {
  if (user.value.password !== user.value.confirmPassword) {
    error.value = 'Password and Confirm Password do not match'
    alert(error.value)
  } else {
    error.value = ''
  }
}

</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-full h-screen md:h-fit xl:h-screen gap-1 md:gap-2 p-8 md:px-28 md:py-16 xl:py-8 md:rounded-2xl xl:rounded-none md:bg-text md:border-4 md:border-hightlight xl:border-none"
  >
    <!-- Logo -->
    <div alt="" class="w-[200px] h-[200px] bg-[#EAEAEA] rounded-lg"></div>

    <!-- Main Message -->
    <div class="flex flex-col px-4 w-auto h-fit items-center gap-1 whitespace-nowrap">
      <p class="font-Poppins font-bold text-3xl md:text-4xl text-text_b text-nowrap">
        Create Your Account
      </p>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-6 px-2 py-2 md:py-2 w-full h-fit">
      <!-- Name Input -->
      <div class="flex flex-col gap-1">
        <p class="font-Poppins font-bold text-24 text-text_b">Name</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="user.name"
            type="text"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="Nattawut Pianok"
          />
        </div>
      </div>

      <!-- Email Input -->
      <div class="flex flex-col gap-1">
        <p class="font-Poppins font-bold text-2xl text-text_b">Email Address</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="user.email"
            type="email"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="example@mail.com"
          />
        </div>
      </div>

      <!-- Password Input -->
      <div class="flex flex-col gap-1">
        <p class="font-Poppins font-bold text-2xl text-text_b">Password</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="user.password"
            type="password"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="***********"
          />
        </div>
      </div>

      <!-- Confirm Password Input -->
      <div class="flex flex-col gap-1">
        <p class="font-Poppins font-bold text-2xl text-text_b">Confirm Password</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="user.confirmPassword"
            type="password"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="***********"
          />
        </div>

        <!-- Already Have Account -->
        <div class="flex flex-row px-0 w-80 mt-1 md:w-full justify-end">
          <p class="font-Poppins font-light text-xs md:text-base text-subtext">
            Already have an account
          </p>
          <RouterLink
            to="/login"
            class="font-Poppins font-light text-xs md:text-base text-subtext w-fit text-nowrap cursor-pointer underline hover:underline hover:text-hightlight ml-1"
            >Login</RouterLink
          >
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-row md:w-full gap-4 items-center">
      <button
        @click="signup"
        :disabled="!user.name || !user.email || !user.password || !user.confirmPassword"
        class="flex flex-col gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl font-bold text-text cursor-pointer disabled:border disabled:border-subtext/70 disabled:bg-none disabled:font-normal disabled:text-subtext/70 disabled:cursor-not-allowed"
      >
        <p class="font-Poppins text-2xl tracking-[0.1em]">Sign Up</p>
      </button>
    </div>
  </div>
</template>
