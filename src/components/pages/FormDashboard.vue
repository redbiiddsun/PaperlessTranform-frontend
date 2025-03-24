<script setup lang="ts">
import ListForm from '@/components/common/FormCard.vue'
import { ref } from 'vue'

// Mock Data
const forms = ref([
  { name: "Registration Form", date: new Date() },                      // Just now
  { name: "Survey Form", date: new Date(Date.now() - 5 * 60 * 1000) },   // 5 minutes ago
  { name: "Feedback Form", date: new Date(Date.now() - 2 * 60 * 60 * 1000) }, // 2 hours ago
  { name: "Job Application", date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }, // 1 day ago
  { name: "Contact Form", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }  // 3 days ago
])
</script>

<template>
  <div class="w-full h-fit flex flex-col gap-4 p-4">
    <button
      class="flex flex-col justify-center items-center bg-gradient-to-tr from-hightlight to-primary via-75% w-full h-fit py-20 rounded-2xl"
    >
      <p class="font-Poppins font-medium text-[32px] text-text">Add New Form</p>
    </button>

    <div class="w-full h-fit flex flex-col justify-center items-center gap-2">
      <div class="flex flex-row items-center gap-2 w-full">
        <p class="font-Poppings font-semibold text-base text-text_b w-full text-start text-nowrap">
          Recent Forms
        </p>
        <div class="flex flex-row w-fit h-fit py-1">
          <input
            type="text"
            class="w-52 h-9 px-4 border rounded-[32px] border-black text-xs font-normal placeholder:text-subtext placeholder:font-Poppins placeholder:text-xs placeholder:font-normal text-start"
            placeholder="Search by Name"
          />
          <!-- Icon Search -->
          <div class="w-8 h-8 bg-white hidden md:block"></div>
        </div>
      </div>
      <!-- Wrap -->
      <div class="flex flex-wrap w-full h-fit gap-1 md:gap-4">
        <ListForm 
          v-for="(form, index) in forms" 
          :key="index" 
          class="w-44 h-52 overflow-hidden"
          :name="form.name"
          :date="form.date"
        />
      </div>
    </div>
  </div>
</template>
