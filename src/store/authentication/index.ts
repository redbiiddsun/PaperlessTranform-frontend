import { defineStore } from 'pinia'
import type { InputOTP, InputRequestForgot, InputResetPassword, InputSignIn, InputSignUp } from '@/services/authentication/types'
import type { APIResponse } from '../../services/types'
import { API } from '../../services'
import { AxiosError } from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<string>()
  const refCode = ref<string>()
  
  async function LoginUser(input: InputSignIn): Promise<APIResponse<null>> {
    try {
      const { status } = await API.auth.SignIn(input)
      if (status === 200) {
        return {
          success: true,
          content: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      console.log(_error.response?.data)
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

  async function RequestReset(input: InputRequestForgot): Promise<APIResponse<null>> {
    try {
      const { status, content } = await API.auth.RequestForgot(input)
      if (status === 201 || status === 200) {
        token.value = content.token
        refCode.value = content.refCode
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

  async function VerifyOTP(input: InputOTP): Promise<APIResponse<null>> {
    try {
      const { status, content } = await API.auth.VerifyOTP(input)
      if (status === 201 || status === 200) {
        token.value = content.token
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
  
  async function ResetPassword(input: InputResetPassword): Promise<APIResponse<null>> {
    try {
      const { status } = await API.auth.ResetPassword(input)
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
    token,
    refCode,
    LoginUser,
    SignUpUser,
    RequestReset,
    VerifyOTP,
    ResetPassword
  }
})
