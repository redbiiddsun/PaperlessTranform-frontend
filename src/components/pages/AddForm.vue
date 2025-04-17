<script lang="ts" setup>
import { reactive } from 'vue'
import { json } from '@/data/survey_json'
// import { FormKitSchema } from '@formkit/vue'

const formData = reactive<Record<string, unknown>>({})
</script>

<template>
  <div class="py-8 px-2 w-full h-fit flex justify-center items-start">
    <!-- left -->
     <div class="w-1/3 flex flex-col justify-center items-center">Left</div>
    
     <!-- Middle -->
    <div class="flex flex-col w-1/3">
      <FormKit
        v-for="(item, index) in json"
        :key="index"
        :type="item.type"
        :name="item.original_field"
        :id="index"
        :label="item.original_field"
        help="This will be used for your account."
        v-model="formData[item.original_field]"
      />

      <!-- Show formData at the bottom -->
      <div class="w-full p-4 bg-gray-100 border-t border-gray-300 mt-4">
        <h2 class="font-bold mb-2">Current Form Data:</h2>
        <pre class="bg-white p-2 rounded border overflow-x-auto text-sm">{{ formData }}</pre>
      </div>
    </div>

    <!-- Right -->
    <div class="w-1/3 flex flex-col justify-center items-center">Right</div>
  </div>
</template>
