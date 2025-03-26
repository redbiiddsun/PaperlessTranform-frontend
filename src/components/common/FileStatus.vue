<script setup lang="ts">
const props = defineProps({
  fileName: String,
  status: String,
})
</script>


<template>
    <div class="w-full h-fit flex flex-row gap-3 px-3 py-4 items-center rounded-lg border border-text_b border-opacity-25">
        <!-- Img Icon -->
        <div class="w-10 h-11 bg-white xl:w-12 xl:h-[52px]"></div>
        <div class="w-full h-fit flex flex-col gap-2 justify-center items-center">
            <div class="w-full h-fit flex flex-row items-center gap-2">
                <p class="font-Poppins font-normal text-xs text-text_b w-full xl:text-base"> {{ props.fileName }}</p>
                <p class="font-Poppins font-normal text-xs xl:text-sm"> {{ props.status }}</p>
                <span class="pi pi-times hover:text-error cursor-pointer"></span>
            </div>
            <div class="w-full h-1 bg-[#B5B5B5]">
                <div class="w-[100%] h-1 bg-success"></div>
            </div>
        </div>
    </div>
</template>