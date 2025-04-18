<script lang="ts" setup>
import { ref } from 'vue'
import { FormKitSchema } from '@formkit/vue'

import { json } from '@/data/json'
import { jsonToSchema, FormType } from '@/utils/FormKitUtils'

const schema = ref(jsonToSchema(json))
const data = ref({})
const toggleAdd = ref(false)
</script>

<template>
  <div class="font-Noto py-8 px-2 w-full h-fit flex justify-center items-start">
    <!-- left -->
    <div class="w-1/4 flex flex-col gap-8 justify-center items-start py-2 px-4">
      <p class="text-b_text font-bold text-base md:text-xl">Edit Your Form</p>
      <div class="flex flex-col gap-2 w-full">
        <div class="flex space-x-2 gap-2 w-full" v-for="(item, index) in schema" :key="index">
          <input type="text" :name="item.name" v-model="schema[index].label" class="p-2 w-3/5" />
          <select v-model="schema[index].$formkit" class="w-2/5">
            <option
              v-for="(option, index) in FormType"
              :key="index"
              :value="option"
              :selected="option === item.$formkit"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-4">
          <button
            class="w-full p-2 bg-gray-100 border border-border rounded-lg hover:scale-95"
            @click="toggleAdd = true"
          >
            <p class="font-Noto font-semibold w-full text-center text-b_text">Add</p>
          </button>
          <div v-if="toggleAdd" class="border border-border bg-gray-100 p-4 flex flex-col gap-4  rounded-lg ">
            <div class="flex gap-4">
              <label for="" class="w-12">Name</label> <input type="text" class="w-full" />
            </div>
            <div class="flex gap-4">
              <label for="" class="w-12">Type</label>
              <select class="w-full">
                <option v-for="(option, index) in FormType" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="flex w-full gap-2">
              <button class="w-1/2 p-2 bg-gray-100 border border-border rounded-lg hover:scale-95">
                <p class="font-Noto font-semibold w-full text-center text-b_text">Confirm</p>
              </button>
              <button class="w-1/2 p-2 bg-gray-100 border border-border rounded-lg hover:scale-95" @click="toggleAdd = false">
                <p class="font-Noto font-semibold w-full text-center text-b_text">Cancle</p>
              </button>
            </div>
          </div>
        </div>
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
    <div class="w-1/4 flex flex-col justify-center items-start px-4">
      <p class="text-b_text font-bold text-base md:text-xl">Customize Your Form</p>
    </div>
  </div>
</template>
