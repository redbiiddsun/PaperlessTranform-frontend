<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Form } from '@/services/form/types'
import { useFormStore } from '@/store/form'
import { useRouter } from 'vue-router'

const props = defineProps<{ form: Form }>()
const router = useRouter()
const formStore = useFormStore()

const timeEdited = computed(() => {
  if (!props.form.updatedAt) return 'Unknown time'
  const now = new Date()
  const inputDate = new Date(props.form.updatedAt)

  const adjustedInputDate = new Date(inputDate.getTime() + 7 * 60 * 60 * 1000)

  const diffInSeconds = Math.floor((now.getTime() - adjustedInputDate.getTime()) / 1000)
  if (diffInSeconds < 60) return 'just now'
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 365) return `${diffInDays} days ago`
  return `${Math.floor(diffInDays / 365)} years ago`
})

const isHovered = ref(false)

const DeleteForm = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this form?')
  if (!confirmed) return

  const { success } = await formStore.DeleteForm(props.form.id)
  if (success) {
    router.push('/form')
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-3 p-2 rounded-xl border border-opacity-25 bg-white group cursor-pointer"
  >
    <!-- Form Image -->
    <div
      class="relative w-full h-full"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Trash Icon -->
      <button
        class="bg-white absolute top-4 right-4 px-2 py-1 rounded-lg transition-opacity duration-300 z-10 text-red-600"
        :class="isHovered ? 'opacity-100' : 'opacity-0'"
        @click.stop.prevent="DeleteForm"
        title="Delete"
      >
        <span class="pi pi-trash"></span>
      </button>

      <!-- Image -->
      <RouterLink :to="`/form/${props.form.id}`">
        <img
          src=""
          alt=""
          class="bg-gray-500 w-full h-full rounded-xl object-cover group-hover:scale-95 transition-all duration-300"
        />
      </RouterLink>
    </div>

    <!-- Form Info -->
    <div class="flex flex-col w-full h-fit gap-1">
      <p
        class="font-Inter font-medium text-base md:text-xl text-text_b text-nowrap overflow-hidden text-ellipsis"
      >
        {{ props.form.name }}
      </p>
      <p class="font-Poppins font-light text-xs text-subtext">Edited {{ timeEdited }}</p>
    </div>
  </div>
</template>
