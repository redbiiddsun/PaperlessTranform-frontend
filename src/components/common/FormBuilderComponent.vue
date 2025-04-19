<script setup lang="ts">
  import { Icon } from '@iconify/vue'

defineProps({
  name: String,
  help: String,
  icon: {
    type: String,
    default: '',
  },
  description: String,
})
</script>

<template>
  <div class="flex flex-row w-full items-center p-2 gap-4 rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] cursor-pointer  transition-all duration-300">
    <div class="border bg-presurface p-2 rounded-md">
      <Icon :icon="icon" width="16" class="text-gray-600"/>
    </div>
    <div class="flex flex-col">
      <p class="font-Noto font-bold text-text_b text-sm">{{ name }}</p>
      <p class="font-Noto font-light text-subtext text-xs">{{ description }}</p>
    </div>
  </div>
</template>
