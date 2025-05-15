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

// Compute schema string to compare against validation rules
const schemaValue = computed(() => {
  const key = typeof props.validation.schema === 'function'
    ? props.validation.schema('0').split(':')[0] // use dummy for key
    : props.validation.schema.split(':')[0]

  return isOn.value
    ? typeof props.validation.schema === 'function'
      ? props.validation.schema(value.value)
      : props.validation.schema
    : key // key only, when not turned on
})


// Helper: check if validation is present in selectedItem.validation
function checkIsOn(validationString: string | undefined) {
  if (!validationString) return false
  const key = schemaValue.value.split(':')[0]
  return validationString
    .split('|')
    .some((v: string) => v.split(':')[0] === key)
}

// Reactive `isOn` synchronized with props.selectedItem.validation
const isOn = ref(false)

// Sync isOn when selectedItem.validation or schemaValue changes
watch(
  () => [props.selectedItem?.validation, schemaValue.value],
  ([validation]) => {
    isOn.value = checkIsOn(validation)

    const key = typeof props.validation.schema === 'function'
      ? props.validation.schema('0').split(':')[0]
      : props.validation.schema.split(':')[0]

    const match = validation
      ?.split('|')
      .find((v: string) => v.split(':')[0] === key)

    if (isOn.value && match) {
      value.value = match.includes(':') ? match.split(':')[1] : ''
    } else {
      value.value = ''
    }
  },
  { immediate: true }
)


const inputType = computed(() => {
  if (props.selectedItem?.$formkit === 'date') return 'date'
  if (props.selectedItem?.$formkit === 'datetime-local') return 'datetime-local'
  return 'text'
})

function updateValidation() {
  const currentValidation = props.selectedItem?.validation || ''
  let validationArray = currentValidation.split('|').filter(Boolean)

  const key = schemaValue.value.split(':')[0]

  // Remove any existing validation with the same key
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

// Watch input value and update validation accordingly
watch(value, () => {
  if (isOn.value) {
    updateValidation()
  }
})
</script>


<template>
  <div class="w-full flex gap-2 items-start p-2">
    <div
      @click="toggle"
      class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 mt-2 cursor-pointer"
      :class="{ 'bg-green-500': isOn }"
    >
      <div
        class="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300"
        :class="{ 'translate-x-4': isOn, 'translate-x-0': !isOn }"
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
        :type="inputType"
        v-model="value"
        @input="updateValidation()"
        class="mt-2 w-full p-1 border rounded text-sm"
        placeholder="Enter value"
      />
    </div>
  </div>
</template>
