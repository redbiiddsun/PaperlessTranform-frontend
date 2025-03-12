<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-screen md:h-fit xl:h-screen gap-1 md:gap-2 p-8 md:px-28 md:py-16 xl:py-2 md:rounded-2xl xl:rounded-none md:bg-text md:border-4 md:border-hightlight xl:border-none">
    <!-- Logo -->
    <div alt="" class="w-[200px] h-[200px] bg-[#EAEAEA] rounded-lg"></div>

    <!-- Main Message -->
    <div class="flex flex-col p-4 w-auto h-fit items-center gap-1 whitespace-nowrap">
      <p class="font-Poppins font-bold text-4xl md:text-36 text-text_b text-nowrap">Create Your Account</p>
    </div>

    <!-- Form -->
    <div class="flex flex-col gap-6 px-2 py-4 md:py-2 w-full h-fit">
      <!-- Name Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-24 text-text_b">Name</p>
        <div class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full border-b-4 border-secondary items-center">
          <input
            type="text"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="Nattawut Pianok"
          />
        </div>
      </div>

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

      <!-- Password Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-2xl text-text_b">Password</p>
        <div class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full  border-b-4 border-secondary items-center">
          <input
            type="password"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="***********"
          />
        </div>
      </div>

      <!-- Confirm Password Input -->
      <div class="flex flex-col gap-2">
        <p class="font-Poppins font-bold text-2xl text-text_b">Confirm Password</p>
        <div class="flex flex-col gap-0 px-2 py-3 w-80 md:w-full  border-b-4 border-secondary items-center">
          <input
            type="password"
            class="font-Poppins font-normal text-16 placeholder-subtext bg-transparent outline-none w-full"
            placeholder="***********"
          />
        </div>
      </div>

      <!-- Already Have Account -->
      <div class="flex flex-row px-0 py-3 w-80 md:w-full justify-end">
        <p class="font-Poppins font-light text-xs md:text-base text-subtext">Already have an account</p>
        <a href="/login" class="font-Poppins font-light text-xs md:text-base text-subtext w-fit text-nowrap cursor-pointer underline hover:underline hover:text-hightlight ml-1 ">Login</a>
      </div>

    </div>

    <!-- Submit Button -->
    <div class="flex flex-row md:w-full gap-4 items-center">
      <a href="/login" class="flex flex-col gap-0 py-2 px-12 w-80 md:w-full bg-gradient-to-tr from-primary to-hightlight rounded-2xl cursor-pointer">
        <p class="font-Poppins font-bold text-2xl text-text text-center tracking-[0.1em]">Sign Up</p>
      </a>
    </div>
  </div>
</template>
