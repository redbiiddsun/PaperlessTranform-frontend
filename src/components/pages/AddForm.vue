<script lang="ts" setup>
import { ref } from 'vue'
import { FormKitSchema } from '@formkit/vue'

import { json } from '@/data/json'
import { jsonToSchema, FormType } from '@/utils/FormKitUtils'

const schema = ref(jsonToSchema(json))
const data = ref({})
</script>

<template>
  <div class="font-Noto py-8 px-2 gap-2 w-full h-fit flex justify-center items-start">
    <!-- left -->
    <div class="w-1/4 flex flex-col justify-center items-start border border-border rounded-lg overflow-hidden">
      <div class="flex w-full ">
        <button class="w-1/2 text-center text-text font-bold text-base md:text-xl px-4 py-2 bg-primary/80">Element</button>
        <button class="w-1/2 text-center text-text font-bold text-base md:text-xl px-4 py-2 bg-primary">Tree</button>
      </div>


    </div>

    <!-- Middle -->
    <div
      class="flex flex-col w-2/4 rounded-lg px-16 py-12 border border-border bg-presurface bg-opacity-40"
    >
      <FormKit type="form" v-model="data">
        <FormKitSchema :schema="schema" />
      </FormKit>
      <!-- Show formData at the bottom -->
      <div class="w-full p-4 bg-gray-100 border-t border-gray-300 mt-4">
        <h2 class="font-bold mb-2">Current Form Data:</h2>
        <pre class="bg-white p-2 rounded border overflow-x-auto text-sm">{{ schema }}</pre>
        <h2 class="font-bold mb-2">Data Value:</h2>
        <pre class="bg-white p-2 rounded border overflow-x-auto text-sm">{{ data }}</pre>
      </div>
    </div>

    <!-- Right -->
    <div class="w-1/4 flex flex-col justify-center items-start py-2 px-4">
      <p class="text-text_b font-bold text-base md:text-xl">Customize Your Form</p>
    </div>
  </div>
</template>
