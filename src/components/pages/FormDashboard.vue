<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import ListForm from '@/components/common/FormCard.vue'
import InputFile from '../common/InputFile.vue'
import StatusUpload from '../common/StatusUpload.vue'
import { useFormStore } from '@/store/form'
import type { Form } from '@/services/form/types'

import '@/assets/transiton.css'
import 'primeicons/primeicons.css'

const formStore = useFormStore()
const forms = ref<Form[]>([])
const loading = ref(true)

const fetchForm = async () => {
  try {
    const { success, status } = await formStore.GetManyForm()
    if (!success) {
      console.error('Error fetching data', status)
    }
  } catch (error) {
    console.error('Unexpected error fetching data', error)
  } finally {
    if (formStore.forms) {
      forms.value = formStore.forms
    }
    loading.value = false
  }
}

const selectedFiles = ref<File | undefined>(undefined)

const screenWidth = ref(window.innerWidth)

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth), fetchForm()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

const transitionName = computed(() => {
  return screenWidth.value >= 768 && screenWidth.value <= 1024 ? 'slideRight' : 'slideDown'
})

const handleFiles = (files: File) => {
  selectedFiles.value = files
}

const updateFileList = (updatedFiles: File) => {
  selectedFiles.value = updatedFiles
}

const searchKeyword = ref('')

const filteredForms = computed(() => {
  return forms.value.filter((form) => {
    if (typeof form === 'object' && form !== null && 'name' in form) {
      return form.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    }
    return false
  })
})
</script>

<template>
  <div class="w-full h-fit flex flex-col gap-4 p-4 xl:flex-row">
    <div class="flex flex-col items-start justify-center w-full h-fit gap-4 py-1 xl:w-fit">
      <div class="flex flex-row w-full items-center">
        <p
          class="font-Poppins font-semibold text-base md:text-2xl text-text_b w-full text-start text-nowrap px-4"
        >
          Add New Form
        </p>
        <RouterLink
          :to="{ name: 'AddForm' }"
          class="flex items-center w-11 hover:w-72 gap-2 font-Poppins font-semibold text-base md:text-2xl text-white bg-primary border mr-2 p-2 hover:border-primary hover:text-primary rounded-full hover:bg-white cursor-pointer transition-all duration-300 group"
        >
          <i class="pi pi-plus"></i>
          <p class="hidden group-hover:block text-sm whitespace-nowrap">Create Form Manually</p>
        </RouterLink>
      </div>
      <div
        class="flex flex-col items-start justify-center w-full h-fit px-4 gap-4 md:flex-row xl:flex-col"
      >
        <InputFile @fileSelected="handleFiles" class="z-40" />
        <transition :name="transitionName">
          <StatusUpload
            v-if="selectedFiles !== undefined"
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
            v-model="searchKeyword"
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
      <!-- No Data -->
      <div
        v-if="filteredForms.length === 0 && !loading"
        class="w-full h-48 flex justify-center items-center"
      >
        <p class="font-Poppins text-lg md:text-xl text-gray-500">No forms found.</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-wrap w-full h-fit gap-1 md:gap-2 xl:gap-6">
        <div
          v-for="index in 6"
          :key="index"
          class="w-44 h-52 overflow-hidden bg-gray-200 animate-pulse md:w-60 md:h-[272px] xl:w-72 xl:h-[300px]"
        ></div>
      </div>

      <!-- Body -->
      <div class="flex flex-wrap w-full h-fit gap-1 md:gap-2 xl:gap-6">
        <ListForm
          v-for="(form, index) in filteredForms"
          :key="index"
          class="w-44 h-52 overflow-hidden md:w-60 md:h-[272px] xl: xl:"
          :form="form"
        />
      </div>
    </div>
  </div>
</template>
