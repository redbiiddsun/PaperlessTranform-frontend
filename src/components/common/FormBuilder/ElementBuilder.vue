<script lang="ts" setup>
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import FormBuilderComponent from './FormBuilderComponent.vue'
import { FormType } from '@/utils/FormKitUtils'

defineProps<{
  AddFormItem: (item: { type: string }) => unknown
}>()

const allFormTypes = [...FormType.text, ...FormType.other]

// search input
const searchTerm = ref('')

// filtered list based on search
const filteredFormTypes = computed(() =>
  allFormTypes.filter(item =>
    item.type.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search form items..."
      class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <draggable
      :list="filteredFormTypes"
      :clone="AddFormItem"
      item-key="type"
      class="flex flex-col gap-2"
      ghost-class="bg-blue-100"
      handle=".drag-handle"
      :group="{ name: 'form', pull: 'clone', put: false }"
    >
      <template #item="{ element }">
        <FormBuilderComponent
          :name="element.type"
          :icon="`${element.icon}`"
          :description="element.description"
          class="drag-handle cursor-move"
        />
      </template>
    </draggable>
  </div>
</template>
