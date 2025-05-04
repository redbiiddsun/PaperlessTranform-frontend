<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/user'
import type { User } from '@/services/user/type'

const userStore = useUserStore()
const user = ref<User>({
  id: '',
  firstname: '',
  lastname: '',
  email: '',
})

const fetchUser = async () => {
  try {
    const { success, status } = await userStore.GetUser()
    if (!success) {
      console.error('Error fetching data', status)
    }
  } catch (error) {
    console.error('Unexpected error fetching data', error)
  } finally {
    if (userStore.user) {
      user.value = userStore.user
    }
  }
}

onMounted(fetchUser)

const updateProfile = () => {
  // You can add your API call or mutation here to save the updated user data
  alert(`Updated profile: ${user.value.firstname} ${user.value.lastname}`)
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center p-6">
    <div class="max-w-4xl w-full bg-presurface rounded-lg shadow-lg p-6">
      <!-- Profile Header -->
      <h2 class="text-2xl font-semibold text-text_b mb-4">Profile Settings</h2>

      <!-- Profile Form -->
      <div class="space-y-6">
        <!-- Name Fields -->
        <div class="flex gap-4">
          <div class="w-1/2">
            <label for="firstname" class="block text-sm font-semibold text-subtext"
              >First Name</label
            >
            <input
              v-model="user.firstname"
              type="text"
              id="firstname"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>
          <div class="w-1/2">
            <label for="lastname" class="block text-sm font-semibold text-subtext">Last Name</label>
            <input
              v-model="user.lastname"
              type="text"
              id="lastname"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-semibold text-subtext">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
          />
        </div>

        <button
          @click="updateProfile"
          class="w-full py-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional transitions if you don't already have them in `transition.css` */
.slideRight-enter-active,
.slideRight-leave-active {
  transition: all 0.3s ease;
}
.slideRight-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slideRight-enter-to {
  transform: translateX(0);
  opacity: 1;
}
</style>
