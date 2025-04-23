<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="w-full p-4 bg-gray-100 border-t border-gray-300 mt-4">
    <code>
      <pre class="bg-white p-2 rounded border overflow-x-auto text-sm"
        >{{ data }}
      </pre>
    </code>
  </div>
</template>
