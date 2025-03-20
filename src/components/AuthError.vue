<script lang="ts" setup>
defineProps(['msgErr'])

const emit = defineEmits(['close'])

</script>

<template>
  <div class="w-full border border-error rounded-md bg-opacity-10 bg-error p-4 flex justify-between items-center">
    <p class="font-Poppins font-semibold text-error text-sm">{{ msgErr }}</p>
    <button   @click="emit('close')" class="font-Poppins text-error hover:text-white">X</button> <!-- Icon X  -->
  </div>
</template>