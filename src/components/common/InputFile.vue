<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['fileSelected'])

const fileInput = ref<HTMLInputElement | null>(null)

// Track if a file is being dragged over the area
const isDragging = ref(false)

const browseFile = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    emit('fileSelected', files)
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isDragging.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()

  const files = event.dataTransfer?.files
  if (files) {
    emit('fileSelected', Array.from(files))
    isDragging.value = false
  }
}
</script>

<template>
  <div
    class="w-80 h-80 flex flex-row justify-center items-center gap-4 p-4 rounded-2xl bg-gradient-to-tr from-primary to-hightlight via-75% md:w-[360px] md:h-[360px] xl:w-[520px] xl:h-[520px]"
  >
    <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileChange" />

    <!-- Drag-and-drop area -->
    <div
      class="w-full h-full flex flex-col justify-center items-center px-14 py-2 gap-3 border-4 border-text border-dashed border-spacing-2 rounded-xl"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <span class="pi pi-folder-open text-[80px] text-text ml-4"></span>
      <p class="font-Poppins font-semibold text-base text-nowrap text-text md:text-lg">
        {{ isDragging ? 'Drop Files Here' : 'Drag and Drop Files Here' }}
      </p>
      <div class="flex flex-row w-full gap-2 justify-center items-center">
        <div class="bg-text w-full h-[2px]"></div>
        <p class="font-Poppins font-semibold text-base text-text md:text-lg">OR</p>
        <div class="bg-text w-full h-[2px]"></div>
      </div>
      <!-- Browse File Button -->
      <button
        @click="browseFile"
        class="w-fit h-fit flex justify-center items-center px-12 py-4 bg-white rounded-2xl"
      >
        <p class="font-Poppins font-semibold text-base text-primary text-nowrap md:text-lg">
          Browse File
        </p>
      </button>
    </div>
  </div>
</template>
