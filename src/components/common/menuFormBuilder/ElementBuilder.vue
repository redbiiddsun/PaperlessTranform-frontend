<script lang="ts" setup>
import draggable from 'vuedraggable'
import FormBuilderComponent from '../../common/FormBuilderComponent.vue'
import { FormType } from '@/utils/FormKitUtils'

defineProps<{
  AddFormItem: (item: { type: string }) => unknown
}>()

const allFormTypes = [...FormType.text, ...FormType.other]
</script>

<template>
    <draggable
      :list="allFormTypes"
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
</template>
