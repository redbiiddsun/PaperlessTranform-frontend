<script setup lang="ts">
import '@/assets/transiton.css'
import { ref } from 'vue'

const IsMenuShow = ref(false)
const user = ref({
  fname: 'FirstName',
  lname: 'LastName'
})
</script>

<template>
  <div class="flex flex-col">
    <!-- NavBar -->
    <div class="flex flex-row gap-2 py-2 px-0 justify-center w-full h-[72px] bg-primary">
      <div class="flex flex-row gap-3 px-4 py-1 w-full h-fit">
        <!-- logo -->
        <img src="#" alt="" class="w-12 h-12 rounded-lg bg-white" />
        <p class="font-Poppins font-bold text-2xl hidden md:block text-text">Paperless Transform</p>
      </div>
      <div class="w-fit h-fit flex flex-row gap-4 px-2 py-0 items-center justify-center">
        <!-- Icon Setting-->
        <div class="w-8 h-8 bg-white"></div>
        <div class="w-fit h-fit">
          <div
            class="w-fill h-fit flex flex-row gap-3 px-2 py-1 rounded-lg items-center justify-center"
          >
            <!-- Profile Image -->
            <img src="#" alt="" class="bg-white rounded-full w-12 h-12" />
            <div class="w-fit h-fit flex flex-col gap-[2px]">
              <p class="font-Poppins font-medium text-sm text-text">{{ user.fname }}</p>
              <p class="font-Poppins font-medium text-sm text-text">{{ user.lname }}</p>
            </div>
            <!-- Icon Dropdown -->
            <button class="w-6 h-6 bg-white" @click="IsMenuShow = !IsMenuShow"></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Navbar Menu -->
    <div
      v-if="IsMenuShow"
      class="w-fit h-fit flex flex-col px-2 bg-white border border-hightlight rounded-b-lg fixed top-[72px] right-3"
    >
      <div class="w-full h-fit flex flex-col justify-center items-start gap-1 p-1">
        <p class="font-Poppins text-xs text-text_b">Account</p>
        <div class="flex flex-row gap-[2px] p-1 border-b border-hightlight">
          <!-- Profile Image -->
          <img src="#" alt="" class="bg-black rounded-full w-12 h-12" />
          <div class="w-44 h-fit flex flex-col justify-center items-start gap-1 p-1">
            <p class="font-Poppins font-semibold text-sm text-text_b overflow-hidden text-ellipsis">
              {{ user.fname }}
            </p>
            <p class="font-Poppins font-normal text-sm text-subtext overflow-hidden text-ellipsis">
              {{ user.lname }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full h-fit flex flex-col justify-center items-start p-2">
        <p class="font-Poppins font-medium text-sm text-text_b">Profile</p>
      </div>
      <div class="w-full h-fit flex flex-col justify-center items-start p-2">
        <p class="font-Poppins font-medium text-sm text-text_b">About Us</p>
      </div>
      <div class="w-full h-fit flex flex-col justify-center items-start p-2">
        <p class="font-Poppins font-medium text-sm text-text_b">Give Feedback</p>
      </div>
      <div class="w-full h-fit flex flex-col justify-center items-start p-2">
        <p class="font-Poppins font-medium text-sm text-text_b">Sign Out</p>
      </div>
    </div>
    <!-- Body -->
    <router-view v-slot="{ Component }">
      <transition name="slideRight" mode="out-in">
        <component :is="Component" v-if="Component" />
      </transition>
    </router-view>
  </div>
</template>
