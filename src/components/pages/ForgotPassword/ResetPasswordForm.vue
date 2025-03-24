<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const confirmPass = ref('')
const router = useRouter()

const submitNewPassword = () => {
  router.push('/recovery/email')
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div class="flex flex-col gap-6 px-2 py-4 md:py-2 w-full h-fit">
      <!-- Password  -->
      <div class="flex flex-col gap-2 w-full">
        <p class="font-Poppins font-bold text-xl text-text_b">New Password</p>
        <div
          class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
        >
          <input
            v-model="password"
            type="password"
            class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
            placeholder="••••••••••"
          />
        </div>
      </div>
    </div>
    <!-- Confirm Password -->
    <div class="flex flex-col gap-2 w-full">
      <p class="font-Poppins font-bold text-xl text-text_b">Confirm New Password</p>
      <div
        class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center"
      >
        <input
          v-model="confirmPass"
          type="password"
          class="font-Poppins font-normal text-base placeholder-subtext bg-transparent outline-none w-full"
          placeholder="••••••••••"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-col w-full gap-4 px-0 py-4 justify-center items-center">
      <button
        @click="submitNewPassword"
        :disabled="!password || !confirmPass"
        class="flex flex-col justifyitems-center items-center gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl font-bold text-text cursor-pointer disabled:border disabled:border-subtext/70 disabled:bg-none disabled:font-normal disabled:text-subtext/70 disabled:cursor-not-allowed w-full lg:w-3/4"
      >
        <p class="font-Poppins text-2xl tracking-[0.1em]">Submit</p>
      </button>
    </div>
  </div>
</template>
