<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const router = useRouter()

const submitEmail = () => {
  router.push('/recovery/otp')
}
</script>
<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div class="flex flex-col gap-6 px-2 py-4 md:py-2 w-full h-fit">
      <!-- Email Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-xl text-text_b">Email Address</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="email"
            type="email"
            class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
            placeholder="example@mail.com"
          />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-col w-full gap-4 px-0 py-4 justify-center items-center">
      <button
        @click="submitEmail"
        :disabled="!email"
        class="flex flex-col justifyitems-center items-center gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl font-bold text-text cursor-pointer disabled:border disabled:border-subtext/70 disabled:bg-none disabled:font-normal disabled:text-subtext/70 disabled:cursor-not-allowed w-full lg:w-3/4"
      >
        <p class="font-Poppins text-2xl tracking-[0.1em]">Submit</p>
      </button>
    </div>

    <RouterLink
      to="/auth/login"
      class="font-Poppins font-bold text-base text-secondary tracking-[0.1em]"
      >Back to login</RouterLink
    >
  </div>
</template>
