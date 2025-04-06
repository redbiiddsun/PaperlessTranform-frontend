<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ListForm from '@/components/common/FormCard.vue'
import InputFile from '../common/InputFile.vue'
import StatusUpload from '../common/StatusUpload.vue'

import '@/assets/transiton.css'
import 'primeicons/primeicons.css'

import { forms } from '@/data/form' // Mock Data

const selectedFiles = ref<File[]>([])

const screenWidth = ref(window.innerWidth)

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

const transitionName = computed(() => {
  return screenWidth.value >= 768 && screenWidth.value <= 1024 ? 'slideRight' : 'slideDown'
})

const handleFiles = (files: File[]) => {
  const newFiles = files.filter(
    (newFile) => !selectedFiles.value.some((existFile) => existFile.name === newFile.name),
  )

  selectedFiles.value = [...selectedFiles.value, ...newFiles]
  console.log(
    'New files added:',
    selectedFiles.value.map((file) => file.name),
  )
}

const updateFileList = (updatedFiles: File[]) => {
  selectedFiles.value = updatedFiles
  console.log(
    'Updated files:',
    selectedFiles.value.map((file) => file.name),
  )
}


const searchKeyword = ref('')

const filteredForms = computed(() => {
  return forms.filter((form) =>
    form.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

</script>

<template>
  <div class="w-full h-fit flex flex-col gap-4 p-4 xl:flex-row">
    <div class="flex flex-col items-start justify-center w-full h-fit gap-4 py-1 xl:w-fit">
      <div class="flex flex-row w-full">
        <p
          class="font-Poppins font-semibold text-base md:text-2xl text-text_b w-full text-start text-nowrap px-4"
        >
          Add New Form
        </p>
      </div>
      <div class="flex flex-col items-center justify-center w-full h-fit px-4 gap-4 md:flex-row xl:flex-col">
        <InputFile @fileSelected="handleFiles" class="z-40"/>
        <transition :name="transitionName">
          <StatusUpload
            v-show="selectedFiles.length > 0"
            :fileUpload="selectedFiles"
            @updateFiles="updateFileList"
          />
        </transition>
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
            v-model="searchKeyword  "
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
          v-for="(form, index) in filteredForms"
          :key="index"
          class="w-44 h-52 overflow-hidden md:w-60 md:h-[272px] xl: xl:"
          :name="form.name"
          :date="form.date"
        />
      </div>
    </div>
  </div>
</template>
