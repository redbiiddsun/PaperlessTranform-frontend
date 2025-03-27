<script setup lang="ts">
import FileStatus from '@/components/common/FileStatus.vue'
import ConfirmButton from './ConfirmButton.vue'
import { useRouter } from 'vue-router';

import '@/assets/transiton.css'

const props = defineProps<{ fileUpload: File[] }>()
const emit = defineEmits(['updateFiles'])
const router = useRouter();

console.log('File Value:', props.fileUpload)

const removeFile = (fileName: string) => {
  const updatedFiles = props.fileUpload.filter((file) => file.name !== fileName)
  emit('updateFiles', updatedFiles)
}

const createForm = () => {
  router.push('/add')
}

</script>

<template>
  <div
    class="w-[360px] h-fit min-h-[360px] px-2 max-h-[360px] flex flex-row justify-center items-center gap-4 rounded-2xl overflow-hidden bg-white xl:w-[520px] xl:max-h-none"
  >
    <div class="w-full h-[50px] flex items-center justify-between xl:mb-4">
      <p class="font-Poppins font-semibold text-text_b text-xl">Status Uploaded</p>
      <ConfirmButton  @click="createForm" :disableMode="props.fileUpload.length === 0"/>
    </div>

    <div
      class="w-full h-[310px] flex flex-col gap-2 rounded-xl border border-subtext border-opacity-25 overflow-y-scroll xl:overflow-visible xl:max-h-none xl:border-none"
    >
      <transition-group name="slideLeft" tag="div" class="w-full flex flex-col gap-2">
        <FileStatus
          v-for="(file, index) in props.fileUpload"
          :key="index"
          :fileName="file.name || 'unknown file'"
          :status="90"
          @remove="removeFile"
        />
      </transition-group>
    </div>
  </div>
</template>
