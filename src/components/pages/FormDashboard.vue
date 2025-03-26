<script setup lang="ts">
import { ref } from 'vue'
import ListForm from '@/components/common/FormCard.vue'
import InputFile from '../common/InputFile.vue'

import 'primeicons/primeicons.css'
import StatusUpload from '../common/StatusUpload.vue'

// Mock Data
const forms = ref([
  { name: 'Registration Form', date: new Date() }, // Just now
  { name: 'Survey Form', date: new Date(Date.now() - 5 * 60 * 1000) }, // 5 minutes ago
  { name: 'Feedback Form', date: new Date(Date.now() - 2 * 60 * 60 * 1000) }, // 2 hours ago
  { name: 'Job Application', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }, // 1 day ago
  { name: 'Contact Form', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }, // 3 days ago
])
</script>

<template>
  <div class="w-full h-fit flex flex-col gap-4 p-4 md:flex-row">
    <div class="flex flex-col items-start justify-center w-full h-fit gap-4 py-1 md:w-fit">
      <p class="font-Poppins font-semibold text-base md:text-2xl text-text_b w-full text-start text-nowrap px-4">Add New Form</p>
      <div class="flex flex-row items-center justify-center w-full h-fit px-4 gap-4 md:flex-col md:justify-start">
        <InputFile />
        <StatusUpload class="hidden md:block"/>
      </div>
    </div>

    <div class="w-full h-fit flex flex-col justify-center items-center gap-2">
      <div class="flex flex-row items-center gap-2 w-full">
        <p
          class="font-Poppins font-semibold text-base md:text-2xl text-text_b w-full text-start text-nowrap"
        >
          Recent Forms
        </p>
        <div class="flex flex-row w-fit h-fit py-1 items-center gap-2">
          <input
            type="text"
            class="font-Poppins w-52 h-9 px-4 border rounded-[32px] border-black text-xs font-normal placeholder:text-subtext placeholder:font-Poppins placeholder:text-xs placeholder:font-normal text-start md:w-72 md:h-10 md:text-base md:placeholder:text-base xl:w-96 xl:h-10"
            placeholder="Search by Name"
          />
          <!-- Icon Search -->
          <div class="w-fit h-fit hidden md:block">
            <span class="text-2xl pi pi-search"></span>
          </div>
        </div>
      </div>
      <!-- Wrap -->
      <div class="flex flex-wrap w-full h-fit gap-1 md:gap-2 xl:gap-6">
        <ListForm
          v-for="(form, index) in forms"
          :key="index"
          class="w-44 h-52 overflow-hidden md:w-60 md:h-[272px] xl: xl:"
          :name="form.name"
          :date="form.date"
        />
      </div>
    </div>
  </div>
</template>
