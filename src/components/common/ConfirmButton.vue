  <script setup lang="ts">
  import { useRouter } from 'vue-router'

  const props = defineProps({
    disableMode: Boolean,
    fileUpload: File,
  })

  const router = useRouter()

  const createForm = () => {
    if (props.fileUpload) {
      // Convert file to URL for transfer
      const fileUrl = URL.createObjectURL(props.fileUpload)
      router.push({ 
        path: '/add', 
        query: { fileUrl } 
      })
    } else {
      console.warn('No file to upload')
    }
  }
  </script>

  <template>
    <div>
      <button
        :disabled="disableMode"
        @click="createForm"
        class="px-6 py-2 bg-primary rounded-xl border border-primary cursor-pointer font-Poppins font-semibold text-text text-base disabled:text-subtext disabled:border-subtext disabled:bg-transparent disabled:cursor-not-allowed"
      >
        Confirm
      </button>
    </div>
  </template>
