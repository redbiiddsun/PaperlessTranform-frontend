<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { FormType } from '@/utils/FormKitUtils'
import Switch from './SwitchBuilder.vue'

const currentValidation = computed(() => {
  const type = props.selectedItem?.$formkit as string
  const allItems = [...FormType.text, ...FormType.other]
  const matched = allItems.find((item) => item.type === type)
  return matched?.validation || []
})

const props = defineProps<{
  selectedItem: Record<string, unknown> | null
  schema: Array<Record<string, unknown>>
}>()

const emit = defineEmits<{
  (e: 'update:selectedItem', item: Record<string, unknown>): void
}>()

const showProperties = ref(true)
const showValidation = ref(false)
const showData = ref(false)

// Handle options for checkbox type
const addOption = () => {
  const options = Array.isArray(props.selectedItem?.options) ? [...props.selectedItem.options] : []
  options.push('')
  emit('update:selectedItem', { ...props.selectedItem, options })
}

const removeOption = (index: number) => {
  const options = Array.isArray(props.selectedItem?.options) ? [...props.selectedItem.options] : []
  options.splice(index, 1)
  emit('update:selectedItem', { ...props.selectedItem, options })
}

const updateOption = (index: number, value: string) => {
  const options = Array.isArray(props.selectedItem?.options) ? [...props.selectedItem.options] : []
  options[index] = value
  emit('update:selectedItem', { ...props.selectedItem, options })
}
</script>

<template>
  <div class="w-full overflow-y-scroll">
    <!-- Properties -->
    <div class="flex p-2 w-full justify-center items-center bg-primary/10">
      <p class="font-Noto w-full text-text_b">Properties</p>
      <Icon
        :icon="showProperties ? 'material-symbols-light:remove' : 'material-symbols-light:add'"
        class="text-text_b cursor-pointer"
        width="18"
        @click="showProperties = !showProperties"
      />
    </div>
    <Transition name="slide">
      <div v-if="showProperties" class="p-4 space-y-4 text-sm text-text_b">
        <div
          v-if="FormType.text.some((item) => item.type === (props.selectedItem?.$formkit as string))"
        >
          <label class="block mb-1">Type</label>
          <select
            :value="props.selectedItem?.$formkit"
            @change="
              emit('update:selectedItem', {
                ...props.selectedItem,
                $formkit: ($event.target as HTMLSelectElement).value,
              })
            "
            class="w-full p-2 border rounded"
          >
            <option v-for="(item, index) in FormType.text" :key="index">
              {{ item.type }}
            </option>
          </select>
        </div>

        <!-- Checkbox Options -->
        <div v-if="['checkbox', 'radio', 'select'].includes(props.selectedItem?.$formkit as string)">
          <label class="block mb-1">Options</label>
          <div v-for="(option, index) in props.selectedItem?.options || []" :key="index" class="flex items-center space-x-2 mb-1">
            <input
              type="text"
              :value="option"
              @input="updateOption(index, ($event.target as HTMLInputElement).value)"
              class="w-full p-2 border rounded"
              placeholder="Enter option"
            />
            <Icon
              icon="material-symbols:delete"
              @click="removeOption(index)"
              class="cursor-pointer text-red-500"
              width="18"
            />
          </div>
          <button
            @click="addOption"
            class="w-full text-primary p-2 border rounded mt-2"
          >
            Add Option
          </button>
        </div>

        <div>
          <label class="block mb-1">Name</label>
          <input
            :value="props.selectedItem?.name"
            @input="
              emit('update:selectedItem', {
                ...props.selectedItem,
                name: ($event.target as HTMLInputElement).value,
              })
            "
            type="text"
            class="w-full p-2 border rounded"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label class="block mb-1">Label</label>
          <input
            :value="props.selectedItem?.label"
            @input="
              emit('update:selectedItem', {
                ...props.selectedItem,
                label: ($event.target as HTMLInputElement).value,
              })
            "
            type="text"
            class="w-full p-2 border rounded"
            placeholder="Enter label"
          />
        </div>

        <div
          v-if="
            !['date', 'datetime-local', 'time', 'color'].includes(props.selectedItem?.$formkit as string)
          "
        >
          <label class="block mb-1">Placeholder</label>
          <input
            type="text"
            :value="props.selectedItem?.placeholder"
            @input="
              emit('update:selectedItem', {
                ...props.selectedItem,
                placeholder: ($event.target as HTMLInputElement).value,
              })
            "
            class="w-full p-2 border rounded"
            placeholder="Enter placeholder"
          />
        </div>

        <div>
          <label class="block mb-1">Description</label>
          <textarea
            :value="props.selectedItem?.help as string"
            @input="
              emit('update:selectedItem', {
                ...props.selectedItem,
                help: ($event.target as HTMLInputElement).value,
              })
            "
            rows="2"
            class="w-full p-2 border rounded"
            placeholder="Enter description"
          ></textarea>
        </div>
      </div>
    </Transition>

    <!-- Validation -->
    <div class="flex p-2 w-full justify-center items-center bg-primary/10">
      <p class="font-Noto w-full text-text_b">Validation</p>
      <Icon
        :icon="showValidation ? 'material-symbols-light:remove' : 'material-symbols-light:add'"
        class="text-text_b cursor-pointer"
        width="18"
        @click="showValidation = !showValidation"
      />
    </div>
    <Transition name="slide">
      <div v-if="showValidation" class="p-2 text-sm text-text_b">
        <div v-if="currentValidation.length">
          <div v-for="(rule, index) in currentValidation" :key="index">
            <Switch
              :validation="rule"
              :selectedItem="props.selectedItem"
              @update:selectedItem="emit('update:selectedItem', $event)"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
.slide-enter-to,
.slide-leave-from {
  max-height: 500px; /* adjust based on content */
  opacity: 1;
  transform: translateY(0);
}
</style>
