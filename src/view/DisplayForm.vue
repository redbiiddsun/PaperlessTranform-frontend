<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FormKitSchema } from '@formkit/vue'
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFormStore } from '@/store/form'
import { useBeforeUnload } from '@/utils/common'
import type { Form } from '@/services/form/types'

import { useUserStore } from '@/store/user'
import { getBuilderErrorMessage } from '@/utils/ErrorMessage'

const userStore = useUserStore()

const router = useRouter()

const showError = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')
const successMessage = ref('Form submitted successfully!')

const fetchUser = async () => {
  try {
    const { success, status } = await userStore.GetUser()
    if (!success) {
      console.error('Error fetching data', status)
    }
  } catch (error) {
    console.error('Unexpected error fetching data', error)
  }
}

onMounted(fetchUser)

const isLoggedIn = computed(() => !!userStore.user)
const fullName = computed(() => {
  return userStore.user ? `${userStore.user.firstname} ${userStore.user.lastname}` : ''
})

useBeforeUnload(true)

const formStore = useFormStore()
const loading = ref(false)

const route = useRoute()
const formId = route.params.id as string

const schema = ref<FormKitSchemaDefinition>()
const form = ref<Form>()
const data = ref({})

const fetchForm = async () => {
  try {
    const { success, status } = await formStore.GetForm(formId)
    if (!success) {
      console.error('Error fetching data', status)
    }
  } catch (error) {
    console.error('Unexpected error fetching data', error)
  } finally {
    if (formStore.Singleform) {
      form.value = formStore.Singleform
    }
    if (formStore.schema) {
      schema.value = formStore.schema
    }
    loading.value = false
  }
}

onMounted(() => {
  fetchForm()
})

const SendForm = async () => {
  console.log(data.value)
  const { success, status } = await formStore.SendForm(formId, { data: data.value })
  if (success) {
    showSuccess.value = true
  } else {
    showError.value = true
    errorMessage.value = getBuilderErrorMessage(status ?? 400)
  }
}
</script>

<template>
  <div
    class="relative w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-primary via-white to-primary p-6"
  >
    <!-- Error Message -->
    <div
      v-if="showError"
      class="bg-red-600 text-white p-6 rounded-xl shadow-lg z-30 transition-all duration-500 ease-in-out opacity-100"
    >
      <div class="flex items-center gap-4">
        <div class="text-3xl font-bold">⚠️</div>
        <div class="flex flex-col">
          <p class="text-xl font-semibold">{{ errorMessage }}</p>
          <p class="mt-2 text-sm">Please try again or contact support if the issue persists.</p>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="showSuccess"
      class=" bg-green-600 text-white p-6 rounded-xl shadow-lg z-30 transition-all duration-500 ease-in-out opacity-100"
    >
      <div class="flex items-center gap-4">
        <div class="text-3xl font-bold">✅</div>
        <div class="flex flex-col">
          <p class="text-xl font-semibold">{{ successMessage }}</p>
          <p class="mt-2 text-sm">Thank you for your submission! We will process it shortly.</p>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div
      class="flex flex-col gap-2 w-4/6 py-4 max-h-full justify-start items-center min-w-fit transition-[width] duration-300 max-w-[1080px]"
      :style="{ width: form?.width + 'px' }"
    >
      <div
        class="relative flex flex-col h-fit w-full rounded-lg p-4 border border-border bg-white shadow-lg"
      >
        <div class="absolute right-5 top-4 w-full text-right text-sm text-gray-600 mb-1">
          <template v-if="isLoggedIn">
            {{ fullName.toLocaleUpperCase() }}
          </template>
          <template v-else>
            <router-link
              :to="`/auth/login?redirect=${$route.fullPath}`"
              class="text-blue-600 hover:underline"
              >Login</router-link
            >
          </template>
        </div>

        <h2 class="text-2xl font-semibold text-primary text-start">{{ form?.name }}</h2>
        <p class="text-base text-text_b mt-2 text-start">{{ form?.description }}</p>
      </div>

      <!-- Check if form requires login and user is not logged in -->
      <div
        v-if="form?.requiredLogin && !isLoggedIn"
        class="w-full bg-red-100 rounded-lg p-4 text-center"
      >
        <p class="text-red-600 font-semibold">
          You must be logged in to access this form. Please log in first.
        </p>
      </div>

      <!-- Form content -->
      <div
        v-else
        class="w-full bg-white rounded-2xl shadow-2xl p-10 transition-all duration-700"
        :class="{ 'opacity-0': loading, 'opacity-100': !loading }"
      >
        <!-- Loading state -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-24 animate-pulse">
          <div class="loader mb-6"></div>
          <p class="text-blue-600 text-lg font-semibold">Loading your form...</p>
        </div>

        <!-- Form content -->
        <div v-else class="space-y-8">
          <FormKit
            v-if="schema"
            v-model="data"
            type="form"
            :data="data"
            :submit-label="'Submit'"
            @submit="SendForm()"
          >
            <div class="grid grid-cols-2 gap-2">
              <FormKitSchema v-for="(element, index) in schema" :key="index" :schema="element" />
            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Loader Styles */
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3b82f6; /* Tailwind's blue-500 */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Smooth fade-in for the form */
.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

/* Error Message Styling */
.error-message {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e53e3e; /* Tailwind's red-600 */
  color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 30;
  transition: opacity 0.5s ease-in-out;
}

.error-message p {
  font-size: 1.125rem;
  font-weight: bold;
}

.error-message small {
  font-size: 0.875rem;
}

/* Success Message Styling */
.success-message {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #38a169; /* Tailwind's green-600 */
  color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 30;
  transition: opacity 0.5s ease-in-out;
}

.success-message p {
  font-size: 1.125rem;
  font-weight: bold;
}

.success-message small {
  font-size: 0.875rem;
}
</style>

