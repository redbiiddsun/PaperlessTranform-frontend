<script setup lang="ts">
import FileStatus from '@/components/common/FileStatus.vue'
import ConfirmButton from './ConfirmButton.vue'

import '@/assets/transiton.css'

const props = defineProps<{ fileUpload: File }>()
const emit = defineEmits(['updateFiles'])

const removeFile = () => {
  emit('updateFiles', undefined)
}

</script>

<template>
  <div
    class="w-[360px] h-fit px-2 flex flex-col justify-start items-center gap-4 rounded-2xl overflow-hidden bg-white xl:w-[520px] xl:max-h-none xl:min-h-0 xl:h-fit"
  >
    <div class="w-full h-[50px] flex items-center justify-between xl:mb-4">
      <p class="font-Poppins font-semibold text-text_b text-xl">Status Uploaded</p>
      <ConfirmButton :disableMode="props.fileUpload === undefined" :fileUpload="fileUpload"/>
    </div>

    <div
      class="w-full h-fit flex flex-col gap-2 rounded-xl border border-subtext border-opacity-25 overflow-y-scroll xl:overflow-visible xl:max-h-none xl:border-none xl:h-fit"
    >
        <transition name="slideLeft" tag="div" class="w-full flex flex-col gap-2">
        <FileStatus
          :fileName="props.fileUpload.name || 'unknown file'"
          :status="100"
          @remove="removeFile"
        />
      </transition>
    </div>
  </div>
</template>
