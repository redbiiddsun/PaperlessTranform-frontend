import { defineStore } from 'pinia'
import type { User } from '@/services/user/type'
import type { APIResponse } from '../../services/types'
import { API } from '../../services'
import { AxiosError } from 'axios'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>()

  function initForm(data: User) {
    user.value = data
  }
  async function GetUser(): Promise<APIResponse<null>> {
    try {
      const { status, content } = await API.user.GetUser()

      if (status === 200) {
        if (content) {
          initForm(content)
        }
        return {
          success: true,
          content: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      }
    }
    return {
      success: false,
      content: null,
      status: 400,
    }
  }

  return {
    user,
    GetUser,
  }
})
