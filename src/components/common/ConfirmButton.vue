<script setup lang="ts">
const props = defineProps({
  disableMode: Boolean,
})
</script>

<template>
  <div>
    <button
      :disabled="props.disableMode"
      class="px-6 py-2 bg-primary rounded-xl border border-primary cursor-pointer font-Poppins font-semibold text-text text-base disabled:text-subtext disabled:border-subtext disabled:bg-transparent disabled:cursor-not-allowed"
    >
      Confirm
    </button>
  </div>
</template>
