<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen md:h-fit xl:h-fit gap-1 md:gap-2 xl:gap-2 p-8 md:px-28 md:py-16 xl:py-16 xl:px-28 md:rounded-2xl xl:rounded-2xl md:bg-text xl:bg-text md:border-4 xl:border-4 md:border-hightlight xl:border-hightlight">
    <!-- Logo -->
    <div alt="" class="w-[200px] h-[200px] bg-[#EAEAEA] rounded-lg"></div>

    <!-- Main Message -->
    <div class="flex flex-col p-4 w-auto h-fit items-center gap-1">
      <p class="font-Poppins font-bold text-4xl md:text-36 text-text_b text-nowrap">Forgot Your Account</p>
      <p class="font-Poppins font-normal text-[12px] md:text-base text-center text-subtext">Lorem ipsum dolor sit amet, consectetur.</p>
      <p class="font-Poppins font-normal text-[12px] md:text-base text-center text-subtext">Sed id sapien placerat, ultrices velit nec.</p>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-6 px-2 py-4 md:py-2 w-full h-fit">
      <!-- Email Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-2xl text-text_b">Email Address</p>
        <div class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center">
          <input
            type="email"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="example@mail.com"
          />
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-col md:w-full gap-4 px-0 py-4 items-center">
      <div class="flex flex-col gap-0 py-2 px-12 bg-gradient-to-tr from-primary to-hightlight rounded-2xl">
        <p class="font-Poppins font-bold text-2xl text-text tracking-[0.1em]">SUBMIT</p>
      </div>

      <a href="/login" class="font-Poppins font-bold text-16 text-secondary tracking-[0.1em]">Back to login</a>
    </div>
  </div>
</template>
