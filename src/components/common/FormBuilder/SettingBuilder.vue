<script lang="ts" setup>
import { watch, reactive } from 'vue'

const props = defineProps<{
  widthForm: string
  formName: string
  formDescription: string
  requireLogin: boolean
}>()

const emit = defineEmits<{
  (e: 'update:widthForm', value: string): void
  (e: 'update:formName', value: string): void
  (e: 'update:formDescription', value: string): void
  (e: 'update:formRequiredLogin', value: boolean): void
}>()
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
        v-model="props.formName"
        @input="$emit('update:formName', ($event.target as HTMLInputElement).value)"
        class="border border-border rounded px-2 py-1 text-sm"
        placeholder="Enter form title"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="formDescription" class="text-sm text-text_b">Form Description</label>
      <textarea
        id="formDescription"
        v-model="props.formDescription"
        @input="$emit('update:formDescription', ($event.target as HTMLInputElement).value)"
        class="border border-border rounded px-2 py-1 text-sm"
        placeholder="Enter form description"
        rows="3"
      ></textarea>
    </div>

    <div class="flex gap-2">
      <input
        id="formRequiredLogin"
        type="checkbox"
        :checked="requireLogin"
        @input="$emit('update:formRequiredLogin', ($event.target as HTMLInputElement).checked)"
        class="border border-border rounded px-2 py-1 text-sm w-fit"
      />
      <label for="formDescription" class="text-sm text-text_b">Required Login</label>
    </div>
  </div>
</template>
