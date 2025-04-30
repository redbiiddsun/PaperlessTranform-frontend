<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const isOn = ref(props.modelValue)

function toggle() {
  isOn.value = !isOn.value
  emits('update:modelValue', isOn.value)
}
</script>

<template>
  <div class="flex">
    <div
      @click="toggle"
      class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
      :class="{ 'bg-green-500': isOn }"
    >
      <div
        class="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300"
        :class="{ 'translate-x-6  ': isOn, 'translate-x-0': !isOn }"
      ></div>
    </div>
  </div>
</template>
