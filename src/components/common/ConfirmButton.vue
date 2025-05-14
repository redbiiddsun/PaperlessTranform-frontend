<script setup lang="ts">
import { useFormStore } from '@/store/form'
import { useRouter } from 'vue-router'

const props = defineProps({
  disableMode: Boolean,
  fileUpload: File,
})

const router = useRouter()
const formStore = useFormStore()

const createForm = () => {
  if (props.fileUpload) {
    formStore.formfile = props.fileUpload
    router.push({
      path: '/add',
    })
  } else {
    console.warn('No file to upload')
  }
}
</script>

<template>
  <div>
    <button
      :disabled="disableMode"
      @click="createForm"
      class="px-6 py-2 bg-primary rounded-xl border border-primary cursor-pointer font-Poppins font-semibold text-text text-base disabled:text-subtext disabled:border-subtext disabled:bg-transparent disabled:cursor-not-allowed"
    >
      Confirm
    </button>
  </div>
</template>
