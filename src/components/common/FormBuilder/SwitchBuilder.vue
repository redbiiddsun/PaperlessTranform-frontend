<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const emits = defineEmits(['update:selectedItem'])
const props = defineProps<{
  selectedItem: Record<string, any> | null
  validation: {
    name: string
    description: string
    schema: string | ((...args: any[]) => string)
  }
}>()

const value = ref('')

const schemaValue = computed(() => {
  return typeof props.validation.schema === 'function'
    ? props.validation.schema(value.value || '0')
    : props.validation.schema
})

const isOn = ref(
  props.selectedItem?.validation
    ?.split('|')
    .some((v: string) => v.split(':')[0] === schemaValue.value.split(':')[0])
)

function updateValidation() {
  const currentValidation = props.selectedItem?.validation || ''
  let validationArray = currentValidation.split('|').filter(Boolean)

  const key = schemaValue.value.split(':')[0]

  validationArray = validationArray.filter((v: string) => v.split(':')[0] !== key)

  if (isOn.value) {
    validationArray.push(schemaValue.value)
  }

  emits('update:selectedItem', {
    ...props.selectedItem,
    validation: validationArray.join('|'),
  })
}

function toggle() {
  isOn.value = !isOn.value
  updateValidation()
}

watch(value, () => {
  if (isOn.value) {
    updateValidation()
  }
})
</script>


<template>
  <div class="flex gap-2 items-start p-2">
    <div
      @click="toggle"
      class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 mt-2 cursor-pointer"
      :class="{ 'bg-green-500': isOn }"
    >
      <div
        class="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300"
        :class="{ 'translate-x-4  ': isOn, 'translate-x-0': !isOn }"
      ></div>
    </div>
    <div class="w-full flex flex-col font-Noto">
      <p class="text-base text-text_b">
        {{ validation.name }}
      </p>
      <p class="text-xs text-subtext line-clamp-2">
        {{ validation.description }}
      </p>
      <input
        v-if="typeof validation.schema === 'function' && isOn"
        type="string"
        v-model="value"
        @input="updateValidation()"
        class="mt-2 w-24 p-1 border rounded text-sm"
        placeholder="Enter value"
      />
    </div>
  </div>
</template>
