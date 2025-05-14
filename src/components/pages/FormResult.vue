<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFormStore } from '@/store/form'

import 'primeicons/primeicons.css'

const route = useRoute()
const formId = route.params.id as string
const formStore = useFormStore()

const loading = ref(true)
const filterText = ref('')
const visibleColumns = ref<string[]>([])

const data = computed(() => formStore.formResult || [])
const filteredData = computed(() => {
  return data.value.filter((entry) =>
    Object.values(entry).some((value) =>
      String(value).toLowerCase().includes(filterText.value.toLowerCase()),
    ),
  )
})

onMounted(async () => {
  loading.value = true
  await formStore.RecieveFormResult(formId)
  await formStore.GetForm(formId)
  visibleColumns.value = Object.keys(data.value?.[0] || {})
  loading.value = false
})

const toggleColumn = (col: string) => {
  if (visibleColumns.value.includes(col)) {
    visibleColumns.value = visibleColumns.value.filter((c) => c !== col)
  } else {
    // Ensure the column is added back to its original position in the array
    const allColumns = Object.keys(data.value?.[0] || {});
    const index = allColumns.indexOf(col);
    
    // Insert the column at the correct position
    visibleColumns.value.splice(index, 0, col);
  }
}

const exportCSV = () => {
  if (!data.value.length) return
  const csvRows = [visibleColumns.value.join(',')]
  data.value.forEach((row) => {
    const rowData = visibleColumns.value.map((col) => JSON.stringify(row[col] ?? '')).join(',')
    csvRows.push(rowData)
  })
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `form-result-${formId}.csv`
  link.click()
}

const copyShareLink = async () => {
  try {
    const url = `${window.location.origin}/form/${formId}`
    await navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  } catch (err) {
    alert('Failed to copy the link.')
    console.error(err)
  }
}
</script>

<template>
  <div
    class="w-full min-h-screen bg-gradient-to-br from-primary via-white to-primary p-6 font-Inter"
  >
    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-primary mb-4">{{ formStore.Singleform?.name }}</h2>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 items-center mb-4">
        <input
          v-model="filterText"
          type="text"
          placeholder="Search data..."
          class="border border-gray-300 rounded-md px-4 py-2 w-72 focus:outline-none focus:ring focus:ring-primary"
        />

        <button
          @click="exportCSV"
          class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <i class="pi pi-download"></i> Export CSV
        </button>
        <button
          @click="copyShareLink"
          class="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
        >
          <i class="pi pi-link"></i> Copy Share Link
        </button>
      </div>

      <!-- Column Selector -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="col in Object.keys(data[0] || {})"
          :key="col"
          class="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
        >
          <button @click="toggleColumn(col)" class="hover:underline text-primary">
            {{ col }}
          </button>
          <i
            @click="toggleColumn(col)"
            :class="visibleColumns.includes(col) ? 'pi pi-eye' : 'pi pi-eye-slash'"
            class="text-primary text-sm cursor-pointer"
          ></i>
        </span>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="space-y-4">
        <div class="h-6 bg-gray-300 rounded animate-pulse" v-for="i in 10" :key="i" />
      </div>

      <!-- Empty State -->
      <div v-else-if="!data.length" class="text-center text-gray-500 py-20">
        <p class="text-lg font-medium">No form results submitted yet.</p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-auto max-h-[70vh] border rounded-lg">
        <table class="min-w-full table-auto text-sm">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th
                v-for="col in visibleColumns"
                :key="col"
                class="px-4 py-2 font-medium text-gray-700 whitespace-nowrap"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in filteredData"
              :key="index"
              class="even:bg-gray-50 hover:bg-gray-100"
            >
              <td
                v-for="col in visibleColumns"
                :key="col"
                class="px-4 py-2 border-t max-w-xs truncate"
              >
                {{ row[col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #999;
}
</style>
