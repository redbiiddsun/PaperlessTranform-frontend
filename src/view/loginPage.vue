<script setup lang="ts">

</script>

<template>
    <div class="bg-white p-8 rounded-lg w-[440px] h-[956px] flex flex-col justify-center">
        <!-- Profile Image Placeholder -->
        <div class="flex justify-center mb-4">
        <div class="w-[200px] h-[200px] bg-gray-300 rounded-lg"></div>
        </div>

        <!-- Title -->
        <h2 class="font-bold font-Poppins text-36 text-center">Login</h2>
        <p class="font-medium font-Poppins text-12 text-subtext text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p class="font-medium font-Poppins text-12 text-subtext text-center">Sed id sapien placerat, ultrices velit nec, auctor libero.</p>
        <p class="font-medium font-Poppins text-12 text-subtext text-center">Phasellus sagittis mattis malesuada.</p>

        <!-- Email Input -->
        <div class="mt-6">
        <label class="font-bold font-Poppins text-24">Email Address</label>
        <input
            type="email"
            class="w-full mt-1 p-2 border-b-4 border-secondary focus:outline-none"
            placeholder="example@mail.com"
        />
        </div>

        <!-- Password Input -->
        <div class="mt-4">
        <label class="font-bold font-Poppins text-24">Password</label>
        <input
            type="password"
            class="w-full mt-1 p-2 border-b-4 border-secondary focus:outline-none"
            placeholder="***********" />
        </div>

        <!-- Links -->
        <div class="flex justify-between font-Poppins font-light text-12 text-subtext mt-4">
        <a href="#" class="hover:underline">Create New Account</a>
        <a href="#" class="hover:underline">Forgot Password</a>
        </div>

        <!-- Login Button -->
        <div class="flex justify-end">
            <button class="w-[172px] h-[52px] px-[48px] py-[8px] rounded-[16px] mt-10 bg-gradient-to-r from-highlight to-primary transition-all duration-300 shadow-md text-white font-bold font-Poppins text-24 tracking-[2.4px]">Login</button>
        </div>
    </div>
</template>  