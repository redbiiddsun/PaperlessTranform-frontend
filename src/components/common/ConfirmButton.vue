<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  disableMode: Boolean,
  fileUpload: File,
})
const router = useRouter()

const createForm = () => {
  router.push('/add')
}
</script>

<template>
  <div>
    <button
      :disabled="props.disableMode"
      @click="createForm"
      class="px-6 py-2 bg-primary rounded-xl border border-primary cursor-pointer font-Poppins font-semibold text-text text-base disabled:text-subtext disabled:border-subtext disabled:bg-transparent disabled:cursor-not-allowed"
    >
      Confirm
    </button>
  </div>
</template>
