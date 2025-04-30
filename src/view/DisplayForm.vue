<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { FormKitSchema } from '@formkit/vue'
import type { FormKitSchemaDefinition } from '@formkit/core'
import { useFormStore } from '@/store/form'

const formStore = useFormStore()
const loading = ref(false)

const route = useRoute()
const formId = route.params.id as string

const schema = ref<FormKitSchemaDefinition>()
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
    if (formStore.schema){
      schema.value = formStore.schema as FormKitSchemaDefinition
      console.log(schema.value)

    }
    loading.value = false
  }
}

onMounted(() => {
  fetchForm()
})
</script>

<template>
  <div
    class="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-primary via-white to-primary p-6"
  >
    <div
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
          class="grid grid-cols-2 space-y-6"
        >
          <FormKitSchema v-for="(element, index) in schema" :key="index" :schema="element" />
        </FormKit>
        <pre wrap>{{ data }}</pre>
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
