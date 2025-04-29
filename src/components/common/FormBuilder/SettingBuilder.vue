<script lang="ts" setup>
import { watch, reactive } from 'vue'

const props = defineProps<{
  widthForm: string
  data: {
    title?: string
    description?: string
    [key: string]: unknown
  }
}>()

const emit = defineEmits<{
  (e: 'update:widthForm', value: string): void
  (e: 'update:data', value: typeof props.data): void
}>()

// Create local reactive copy
const localData = reactive({ ...props.data })

// Emit changes upward if needed
watch(localData, (newVal) => {
  emit('update:data', { ...newVal })
})

// Sync with updated props (optional if props.data can change externally)
watch(
  () => props.data,
  (newData) => {
    Object.assign(localData, newData)
  },
  { deep: true }
)

watch(() => props.widthForm, (val) => {
  emit('update:widthForm', val)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label for="formWidth" class="text-sm text-text_b">Form Width</label>
      <input
        id="formWidth"
        type="number"
        :value="widthForm"
        min="480"
        max="1080"
        @input="$emit('update:widthForm', ($event.target as HTMLInputElement).value)"
        class="border border-border rounded px-2 py-1 text-sm"
        placeholder="e.g., 560px"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="formTitle" class="text-sm text-text_b">Form Title</label>
      <input
        id="formTitle"
        type="text"
        v-model="localData.title"
        class="border border-border rounded px-2 py-1 text-sm"
        placeholder="Enter form title"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="formDescription" class="text-sm text-text_b">Form Description</label>
      <textarea
        id="formDescription"
        v-model="localData.description"
        class="border border-border rounded px-2 py-1 text-sm"
        placeholder="Enter form description"
        rows="3"
      ></textarea>
    </div>
  </div>
</template>
