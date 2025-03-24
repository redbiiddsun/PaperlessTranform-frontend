<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

</script>
<template>
  <div>
    <RouterLink :to="props.link"  class="w-full h-fit flex flex-col justify-center items-start p-2 hover:bg-[#EBEBEB]">
      <p class="font-Poppins font-medium text-sm text-text_b">{{ props.name }}</p>
    </RouterLink>
  </div>
</template>
