<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthError from '@/components/pages/AuthError.vue'
import { useAuthStore } from '@/store/authentication'


const digitCount = 6 // Adjust as needed
const digits = reactive(Array(digitCount).fill(''))
const otpContainer = ref<HTMLElement | null>(null)
const router = useRouter()
const authStore = useAuthStore()
const err = ref('')
const showError = ref(false)

const handleInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  digits[index] = target.value

  if (target.value && index < digitCount - 1) {
    ;(otpContainer.value?.children[index + 1] as HTMLInputElement)?.focus()
  }
}

const handleBackspace = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !digits[index] && index > 0) {
    ;(otpContainer.value?.children[index - 1] as HTMLInputElement)?.focus()
  }
}

const submitOTP = async () => {
  const otp = digits.join('')
  if (otp.length === digitCount) {
    err.value = ''
    showError.value = false

    const { success } = await authStore.VerifyOTP({
      token: authStore.token || '',
      otp: otp,
    })

    if (success) {
      router.push('/recovery/reset')
    } else {
      err.value = 'An unknown error occurred'
      showError.value = true
    }
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <div class="flex flex-col gap-6 py-4 md:py-2 w-full h-fit">
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-xl text-text_b">OTP Verification <p class="font-Poppins font-bold text-xs text-subtext">ref Code: {{ authStore.refCode }}</p></p>

        <div
          ref="otpContainer"
          class="flex mt-2 justify-around items-center w-full xl:justify-center 2xl:gap-16"
        >
          <input
            v-for="(digit, index) in digits"
            :key="index"
            v-model="digits[index]"
            type="text"
            class="w-16 h-[72px] text-center text-3xl font-bold border-4 border-secondary rounded-2xl outline-none"
            maxlength="1"
            @input="handleInput($event, index)"
            @keydown="handleBackspace($event, index)"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full gap-4 px-0 py-4 justify-center items-center">
      <button
        @click="submitOTP"
        :disabled="digits.some((d) => !d)"
        class="flex flex-col justify-center items-center gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl font-bold text-text cursor-pointer disabled:border disabled:border-subtext/70 disabled:bg-none disabled:font-normal disabled:text-subtext/70 disabled:cursor-not-allowed w-full lg:w-3/4"
      >
        <p class="font-Poppins text-2xl tracking-[0.1em]">Submit</p>
      </button>
    </div>
    <AuthError v-if="showError" :msgErr="err" @close="showError = false" />
  </div>
</template>
