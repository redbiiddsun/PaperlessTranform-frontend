<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FormKitSchema } from '@formkit/vue';
import { useFormStore } from '@/store/form';
import type { FormKitSchemaDefinition } from '@formkit/core';

const formStore = useFormStore()
const loading = ref(true)

const schema = ref<FormKitSchemaDefinition>([])

const fetchForm = async () => {
  try {
    const { success, status, } = await formStore.GetForm()
    if (!success) {
      console.error('Error fetching data', status)
    }
  } catch (error) {
    console.error('Unexpected error fetching data', error)
    schema.value = formStore.forms as FormKitSchemaDefinition
    loading.value = false
    console.log(schema)
  }
}

onMounted(() => {
    fetchForm()
})
</script>

<template>
    <div class="">
        <FormKitSchema :schema="schema" />
    </div>
</template>