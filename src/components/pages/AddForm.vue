<script lang="ts" setup>
import { ref } from 'vue'
import { FormKitSchema } from '@formkit/vue'
import { Icon } from '@iconify/vue'
import draggable from 'vuedraggable'

import { json } from '@/data/json'
import { jsonToSchema } from '@/utils/FormKitUtils'
import { useClickOutside } from '@/utils/builder'
import ElementBuilder from '../common/ElementBuilder.vue'

const schema = ref(jsonToSchema(json))
const data = ref({})

const selectedItem = ref<Record<string, unknown> | null>(null)
const builderRef = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)
const widthForm = ref('560px')
const currentMenu = ref('element')

useClickOutside([builderRef, sliderRef], () => {
  selectedItem.value = null
})

function AddFormItem(item: { type: string }) {
  const maxId = Math.max(0, ...schema.value.map((i) => i.id || 0))
  return {
    id: maxId + 1,
    $formkit: item.type,
    name: `${item.type}`,
    label: `New ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`,
  }
}

function selectItem(item: Record<string, unknown>) {
  selectedItem.value = item
}

function deleteItem(index: number) {
  if (index !== -1) {
    schema.value.splice(index, 1)
  }
}

function cloneItem(index: number) {
  if (index !== -1) {
    const clonedItem = { ...schema.value[index], name: `${schema.value[index].name} (copy)` }
    schema.value.splice(index + 1, 0, clonedItem)
  }
}
</script>

<template>
  <div
    class="relative font-Noto w-full flex justify-between items-start bg-primary/10 overflow-x-hidden"
    style="height: calc(100vh - 72px)"
  >
    <!-- left -->
    <div class="w-1/6 max-h-full flex flex-col justify-center items-start overflow-hidden bg-white">
      <div class="flex w-full">
        <button
          class="w-1/2 text-center text-text text-base px-4 py-2"
          :class="currentMenu === 'element' ? 'bg-primary/70' : 'bg-primary'"
          @click="currentMenu = 'element'"
        >
          Element
        </button>
        <button
          class="w-1/2 text-center text-text = text-base px-4 py-2"
          :class="currentMenu === 'component' ? 'bg-primary/70' : 'bg-primary'"
          @click="currentMenu = 'component'"
        >
          Components
        </button>
      </div>
      <ElementBuilder :AddFormItem="AddFormItem" />
    </div>

    <!-- Middle -->
    <div class="flex w-4/6 py-4 max-h-full overflow-y-scroll justify-center">
      <div
        class="flex flex-col h-fit rounded-lg px-16 py-12 border border-border bg-white bg-opacity-8k0 shadow-lg"
        :style="{ width: widthForm }"
      >
        <!-- <FormKit type="form" v-model="data">
          <div class="flex flex-col gap-6">
            <div
              v-for="(item, index) in schema"
              :key="index"
              class="border border-black p-2 rounded-lg"
            >
              <FormKitSchema :schema="item" />
            </div>
          </div>
        </FormKit> -->
        <div ref="builderRef">
          <draggable
            v-model="schema"
            item-key="name"
            class="flex flex-col gap-6"
            ghost-class="bg-blue-100"
            handle=".drag-handle"
            group="form"
          >
            <template #item="{ element, index }">
              <div
                class="relative hover:border border-primary p-2 flex items-center gap-2 drag-handle cursor-pointer group"
                :class="{ border: selectedItem?.name === element.name }"
                @click="selectItem(element)"
              >
                <div
                  class="absolute -top-6 left-0 pt-1 w-full justify-end gap-1"
                  :class="{
                    flex: selectedItem?.name === element.name,
                    'hidden group-hover:flex': selectedItem?.name !== element.name,
                  }"
                >
                  <div class="w-full">
                    <p class="font-Noto text-sm text-text bg-primary px-1 w-fit">
                      {{ element.name }}
                    </p>
                  </div>
                  <Icon
                    icon="material-symbols-light:content-copy-outline"
                    class="bg-primary text-text shadow cursor-pointer"
                    width="18"
                    @click="cloneItem(index)"
                  />
                  <Icon
                    icon="material-symbols-light:delete-outline"
                    class="bg-primary text-text shadow cursor-pointer"
                    width="18 "
                    @click="deleteItem(index)"
                  />
                </div>

                <!-- Actual FormKit schema -->
                <FormKitSchema :schema="element" />
              </div>
            </template>
          </draggable>
        </div>

        <!-- Show formData at the bottom -->
        <div class="w-full p-4 bg-gray-100 border-t border-gray-300 mt-4">
          <h2 class="font-bold mb-2">Current Form Data:</h2>
          <pre class="bg-white p-2 rounded border overflow-x-auto text-sm">{{ schema }}</pre>
          <h2 class="font-bold mb-2">Data Value:</h2>
          <pre class="bg-white p-2 rounded border overflow-x-auto text-sm">{{ data }}</pre>
        </div>
      </div>
    </div>

    <!-- Right -->
    <div class="w-1/6 max-h-full flex flex-col justify-center items-start overflow-hidden bg-white">
      <div class="flex w-full">
        <button class="w-1/2 text-center text-text text-base px-4 py-2 bg-primary/70">
          Setting
        </button>
        <button class="w-1/2 text-center text-text bg-primary text-base px-4 py-2">Preview</button>
      </div>

      <div class="flex flex-col w-full gap-1 p-2 max-h-full overflow-y-scroll"></div>
    </div>

    <!-- Slider -->
    <div
      ref="sliderRef"
      class="absolute w-1/6 h-full flex flex-col justify-start items-start overflow-hidden bg-white transition-all duration-300"
      :class="selectedItem ? 'right-0' : '-right-96'"
    >
      <div class="flex justify-center px-2 py-4 gap-1 items-center w-full bg-primary/10">
        <Icon
          icon="material-symbols-light:transit-enterexit"
          width="24"
          class="mt-1 text-text_b w-fit cursor-pointer"
          @click="selectedItem = null"
        />
        <p
          class="font-Noto text-text_b text-2xl whitespace-nowrap overflow-hidden text-ellipsis flex-1"
        >
          {{ selectedItem?.name }}
        </p>
        <div class="flex w-2/6 gap-1 justify-end">
          <Icon
            icon="material-symbols-light:content-copy-outline"
            width="24"
            class="text-text_b cursor-pointer"
            @click="cloneItem(selectedItem?.id as number)"
          />
          <Icon
            icon="material-symbols-light:delete-outline"
            width="24"
            class="text-text_b cursor-pointer"
            @click="deleteItem(selectedItem?.id as number)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
