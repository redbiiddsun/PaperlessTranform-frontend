<script setup lang="ts">
const props = defineProps<{ fileName: string; status: number }>()
const emit = defineEmits(['remove'])

const removeFile = () => {
  emit('remove', props.fileName)
}

const getStatusText = (status: number) => {
  if (status === 0) {
    return { text: 'Cancel', color: 'text-error', width: '5%', barColor: 'bg-error' }
  } else if (status === 100) {
    return { text: 'Complete', color: 'text-success', width: '100%', barColor: 'bg-success' }
  } else if (status >= 1 && status <= 99) {
    return { text: `${status}%`, color: 'text-primary', width: `${status}%`, barColor: 'bg-primary' }
  }
  return { text: '', color: '', width: '0%', barColor: '' }
}

const status = getStatusText(props.status)
</script>

<template>
    <div class="w-full h-fit flex flex-row gap-3 px-3 py-4 items-center rounded-lg border border-text_b border-opacity-25">
        <!-- Img Icon -->
        <div class="w-10 h-11 bg-white xl:w-12 xl:h-[52px]"></div>
        <div class="w-full h-fit flex flex-col gap-2 justify-center items-center">
            <div class="w-full h-fit flex flex-row items-center gap-2">
                <p class="font-Poppins font-normal text-xs text-text_b w-full xl:text-base"> 
                  {{ props.fileName }}
                </p>
                <p :class="status.color" class="font-Poppins font-normal text-xs xl:text-sm">
                  {{ status.text }}
                </p>
                <span class="pi pi-times hover:text-error cursor-pointer" @click="removeFile"></span>
            </div>
            <div class="w-full h-1 bg-[#B5B5B5]">
                <div :class="status.barColor" :style="{ width: status.width }" class="h-1"></div>
            </div>
        </div>
    </div>
</template>
