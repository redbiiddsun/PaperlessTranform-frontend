<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FormKitSchema } from '@formkit/vue'
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFormStore } from '@/store/form'
import { useBeforeUnload } from '@/utils/common'
import type { Form } from '@/services/form/types'

import { useUserStore } from '@/store/user'
import type { User } from '@/services/user/type'

const userStore = useUserStore()

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

const SendForm = () => {
  console.log('Form submitted with data:', data.value)
}
</script>

<template>
  <div
    class="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-primary via-white to-primary p-6"
  >
    <div
      class="flex flex-col gap-2 w-4/6 py-4 max-h-full justify-start items-center min-w-fit transition-[width] duration-300 max-w-[1080px]"
      :style="{ width: form?.width + 'px' }"
    >
      <div
        class="relative flex flex-col h-fit w-full rounded-lg p-4 border border-border bg-white shadow-lg"
      >
        <div class="absolute right-5 top-4 w-full text-right text-sm text-gray-600 mb-1">
          <template v-if="isLoggedIn">
            {{ fullName }}
          </template>
          <template v-else>
            <router-link to="/auth/login" class="text-blue-600 hover:underline">Login</router-link>
          </template>
        </div>

        <h2 class="text-2xl font-semibold text-primary text-start">{{ form?.name }}</h2>
        <p class="text-base text-text_b mt-2 text-start">{{ form?.description }}</p>
      </div>

      <!-- Check if form requires login and user is not logged in -->
      <div v-if="form?.requiredLogin && !isLoggedIn" class="w-full bg-red-100 rounded-lg p-4 text-center">
        <p class="text-red-600 font-semibold">You must be logged in to access this form. Please log in first.</p>
      </div>

      <!-- Form content -->
      <div
        v-else
        class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 transition-all duration-700"
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
</style>
