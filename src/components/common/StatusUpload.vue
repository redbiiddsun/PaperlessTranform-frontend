<script setup lang="ts">
import FileStatus from '@/components/common/FileStatus.vue'
</script>

<template>
  <div
    class="w-[360px] h-[360px] flex flex-row justify-center items-center gap-4 rounded-2xl bg-white xl:w-[520px] xl:h-[520px]"
  >
    <div class="w-full flex items-center justify-between mb-4">
      <p class=" font-Poppins font-semibold text-text_b text-xl">Status Uploaded</p>
      <button class="px-6 py-2 bg-success rounded-lg border-none">
        <p class="font-Poppins font-semibold text-text text-base">Confirm</p>
      </button>
    </div>

    <div class="w-full h-full flex flex-col gap-2 rounded-xl">
      <FileStatus fileName="File_Name.jpg" status="Complete" />
      <FileStatus fileName="File_Name.jpg" status="Complete" />
      <FileStatus fileName="File_Name.jpg" status="Complete" />
    </div>
  </div>
</template>
