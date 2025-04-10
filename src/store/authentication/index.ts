// stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Users, InputSignIn, InputSignUp } from '@/services/authentication/types'
import type { APIResponse } from '../../services/types'
import { API } from '../../services'
import { AxiosError } from 'axios'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<Users | null>(null)

  function initSchools(data: Users) {
    user.value = data
  }

  async function LoginUser(input: InputSignIn): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.auth.SignIn(input)
      if (status === 200) {
        initSchools(data.content)
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

  async function SignUpUser(input: InputSignUp): Promise<APIResponse<null>> {
    try {
      const { status } = await API.auth.SignUp(input)
      if (status === 201 || status === 200) {
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
    LoginUser,
    SignUpUser
  }
})
