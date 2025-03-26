<script setup lang="ts"></script>

<template>
    <div
      type="text"
      class="w-80 h-80 flex flex-row justify-center items-center gap-4 p-4 rounded-2xl bg-gradient-to-tr from-primary to-hightlight via-75% md:w-[360px] md:h-[360px] xl:w-[520px] xl:h-[520px]"
    >
        <div class="w-full h-full flex flex-col justify-center items-center px-14 py-2 gap-3 border-4 border-text border-dashed border-spacing-2 rounded-xl">
            <span class="pi pi-folder-open text-[80px] text-text ml-4"></span>
            <p class="font-Poppins font-semibold text-base  text-nowrap text-text md:text-lg">Drop and Drag Files Here</p>
            <div class="flex flex-row w-full gap-2 justify-center items-center">
                <div class="bg-text w-full h-[2px]"></div>
                <p class="font-Poppins font-semibold text-base text-text md:text-lg">OR</p>
                <div class="bg-text w-full h-[2px]"></div>
            </div>
            <!-- Browse File Button -->
            <div class="w-fit h-fit flex justify-center items-center px-12 py-4 bg-white rounded-2xl">
                <p class="font-Poppins font-semibold text-base text-primary text-nowrap md:text-lg">Browse File</p>
            </div>
        </div>
    </div>
</template>
