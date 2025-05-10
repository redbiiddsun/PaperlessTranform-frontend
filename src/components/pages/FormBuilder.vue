<script lang="ts" setup>
import { ref } from 'vue'
import { FormKitSchema } from '@formkit/vue'
import { Icon } from '@iconify/vue'
import draggable from 'vuedraggable'
import { useRoute, useRouter } from 'vue-router'

import { defaultJson, jsonTemp } from '@/data/json'
import { jsonToSchema, type jsonForm } from '@/utils/FormKitUtils'
import { useClickOutside } from '@/utils/builder'
import ElementBuilder from '../common/FormBuilder/ElementBuilder.vue'
import PreviewBuilder from '../common/FormBuilder/PreviewBuilder.vue'
import SettingBuilder from '../common/FormBuilder/SettingBuilder.vue'
import ItemSettingBuilder from '../common/FormBuilder/ItemSettingBuilder.vue'
import { useBeforeUnload } from '@/utils/common'
import { useFormStore } from '@/store/form'
import { getBuilderErrorMessage } from '@/utils/ErrorMessage'

const router = useRouter()
const route = useRoute()


const schema = ref(jsonToSchema(jsonTemp));

const IsManual = ref([]);

if (route.query.schema) {
  try {
    IsManual.value = typeof route.query.schema === 'string' 
      ? JSON.parse(route.query.schema) 
      : [];
    schema.value = IsManual.value;
  } catch (error) {
    console.error("Invalid schema format:", error);
    IsManual.value = [];
  }
}


useBeforeUnload(true)
const data = ref({})

const selectedItem = ref<Record<string, unknown> | null>(null)
const builderRef = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)
const currentMenu = ref('element')
const currentView = ref('setting')

const formName = ref('Form Name')
const formDescription = ref('From Description')
const widthForm = ref<string>('720')
const formStore = useFormStore()
const requireLogin = ref(false)
const showError = ref(false)
const errorMessage = ref('')

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
  const maxId = Math.max(0, ...schema.value.map((i) => i.id || 0))

  if (index !== -1) {
    const clonedItem = {
      ...schema.value[index],
      label: `${schema.value[index].label} (copy)`,
      name: `${schema.value[index].name} (copy)`,
      id: maxId + 1,
    }
    schema.value.splice(index + 1, 0, clonedItem)
  }
}

function expandItem(index: number) {
  if (index !== -1) {
    const outerClass = schema.value[index].outerClass || ''

    if (outerClass) {
      const updatedClass = outerClass
        .split(' ')
        .filter((cls) => cls !== 'col-span-1') // remove col-span-1
        .concat('col-span-2') // add col-span-2
        .join(' ')

      schema.value[index].outerClass = updatedClass
    } else {
      schema.value[index].outerClass = 'col-span-2'
    }
  }
}

function collapseItem(index: number) {
  if (index !== -1) {
    const outerClass = schema.value[index].outerClass || ''

    if (outerClass) {
      const updatedClass = outerClass
        .split(' ')
        .filter((cls) => cls !== 'col-span-2') // remove col-span-1
        .concat('col-span-1') // add col-span-2
        .join(' ')

      schema.value[index].outerClass = updatedClass
    } else {
      schema.value[index].outerClass = 'col-span-1'
    }
  }
}

const CreateForm = async () => {
  const { success, status } = await formStore.CreateForm({
    name: formName.value,
    description: formDescription.value,
    width: widthForm.value,
    schemas: schema.value,
    requiredLogin: requireLogin.value,
  })
  if (success) {
    router.push('/form')
  } else {
    showError.value = true
    errorMessage.value = getBuilderErrorMessage(status ?? 400)
  }
}
</script>

<template>
  <div
    class="relative font-Noto w-full flex justify-between items-start bg-primary/10 overflow-x-hidden"
    style="height: calc(100vh - 72px)"
  >
    <div v-if="showError" class="absolute w-full top-10 bg-red-500 text-white p-4 text-center">
      <p>{{ errorMessage }}</p>
    </div>
    <button
      @click="CreateForm()"
      class="absolute flex w-13 items-center gap-2 right-[18%] top-10 z-20 bg-primary rounded-full p-4 group cursor-pointer text-text hover:bg-transparent hover:text-primary hover:border border-primary transition-all duration-300"
    >
      <i class="pi pi-check"></i>
    </button>
    <!-- left -->
    <div
      class="w-1/6 max-h-full h-full flex flex-col justify-start items-start overflow-hidden bg-white"
    >
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
      <div class="flex flex-col w-full gap-1 p-2 max-h-full overflow-y-scroll">
        <ElementBuilder v-if="currentMenu === 'element'" :AddFormItem="AddFormItem" />
      </div>
    </div>

    <!-- Middle -->
    <div
      class="flex flex-col gap-2 w-4/6 py-4 max-h-full overflow-y-scroll justify-start items-center min-w-fit transition-[width] duration-300 max-w-[1080px]"
      :style="{ width: widthForm + 'px' }"
    >
      <div
        class="flex flex-col h-fit w-full rounded-lg p-4 border border-border bg-white bg-opacity-80 shadow-lg"
      >
        <h2 class="text-2xl font-semibold text-primary text-start">{{ formName }}</h2>
        <p class="text-base text-text_b mt-2 text-start">{{ formDescription }}</p>
      </div>
      <div
        class="flex flex-col w-full h-fit rounded-lg px-16 py-12 border border-border bg-white bg-opacity-80 shadow-lg"
      >
        <FormKit type="form" v-model="data" :actions="false">
          <div ref="builderRef">
            <draggable
              v-model="schema"
              item-key="name"
              class="grid grid-cols-2 gap-2"
              ghost-class="bg-blue-100"
              handle=".drag-handle"
              group="form"
            >
              <template #item="{ element, index }">
                <div
                  class="relative p-2 drag-handle cursor-pointer group hover:border border-primary"
                  :class="[element.outerClass, { border: selectedItem?.id === element.id }]"
                  @click="selectItem(element)"
                >
                  <div
                    v-if="selectedItem?.id === element.id"
                    class="absolute right-0 top-0 bg-primary bg-opacity-15 w-full h-full"
                    style="pointer-events: none"
                  ></div>
                  <div
                    class="absolute -top-6 left-0 pt-1 w-full justify-end gap-1"
                    :class="{
                      flex: selectedItem?.id === element.id,
                      'hidden group-hover:flex': selectedItem?.id !== element.id,
                    }"
                  >
                    <div class="w-full">
                      <p class="font-Noto text-sm text-text bg-primary px-1 w-fit">
                        {{ element.name }}
                      </p>
                    </div>
                    <Icon
                      v-if="element.outerClass?.includes('col-span-1') || !element.outerClass"
                      icon="material-symbols-light:expand-content-rounded"
                      class="bg-primary text-text shadow cursor-pointer"
                      width="18"
                      @click="expandItem(index)"
                    />
                    <Icon
                      v-if="element.outerClass?.includes('col-span-2')"
                      icon="material-symbols-light:collapse-content-rounded"
                      class="bg-primary text-text shadow cursor-pointer"
                      width="18"
                      @click="collapseItem(index)"
                    />
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
        </FormKit>
      </div>
    </div>

    <!-- Right -->
    <div
      class="w-1/6 max-h-full h-full flex flex-col justify-start items-start overflow-hidden bg-white"
    >
      <div class="flex w-full">
        <button
          class="w-1/2 text-center text-text text-base px-4 py-2"
          :class="currentView === 'setting' ? 'bg-primary/70' : 'bg-primary'"
          @click="currentView = 'setting'"
        >
          Setting
        </button>
        <button
          class="w-1/2 text-center text-text text-base px-4 py-2"
          :class="currentView === 'preview' ? 'bg-primary/70' : 'bg-primary'"
          @click="currentView = 'preview'"
        >
          Preview
        </button>
      </div>
      <div class="flex flex-col w-full gap-1 p-2 max-h-full overflow-y-scroll">
        <SettingBuilder
          v-if="currentView === 'setting'"
          v-model:widthForm="widthForm"
          v-model:formName="formName"
          v-model:formDescription="formDescription"
          v-model:requireLogin="requireLogin"
        />
        <PreviewBuilder v-if="currentView === 'preview'" :data="data" />
      </div>
    </div>

    <!-- Slider -->
    <div
      ref="sliderRef"
      class="absolute w-1/6 h-full flex flex-col justify-start items-start overflow-hidden bg-white transition-all duration-300"
      :class="selectedItem && currentView != 'preview' ? 'right-0' : '-right-96'"
    >
      <div class="flex justify-center px-2 py-4 gap-1 items-center w-full bg-primary/10">
        <Icon
          icon="material-symbols-light:close"
          width="22"
          class="mt-2 text-text_b w-fit cursor-pointer"
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

      <ItemSettingBuilder
        :selectedItem="selectedItem"
        :schema="schema"
        @update:selectedItem="
          (updatedItem) => {
            selectedItem = updatedItem
            const index = schema.findIndex((item) => item.id === updatedItem.id)
            if (index !== -1) {
              schema[index] = {
                ...schema[index],
                ...updatedItem,
              }
            }
          }
        "
      />
    </div>
  </div>
</template>
