import http from '../api'
import type { APIResponse } from '../types'
import type {
  authMessage,
  InputSignUp,
  InputSignIn,
  InputRequestForgot,
  InputOTP,
  InputResetPassword,
  forgotMessage,
} from './types'

async function SignUp(input: InputSignUp) {
  return await http.post<APIResponse<authMessage>>('/auth/signup', input)
}

async function SignIn(input: InputSignIn) {
  return await http.post<APIResponse<authMessage>>('/auth/signin', input)
}

async function RequestForgot(input: InputRequestForgot) {
  const response = await http.post('/auth/request-reset', input)
  const requestResponse: APIResponse<forgotMessage> = {
    success: response.data.status === 'success',
    content: {
      status: response.data.status,
      message: response.data.message,
      refCode: response.data.refCode,
      token: response.data.token,
    },
    status: response.status,
  }
  return requestResponse
}

async function VerifyOTP(input: InputOTP) {
  const response = await http.post('/auth/verify-otp', input)
  const requestResponse: APIResponse<forgotMessage> = {
    success: response.data.status === 'success',
    content: {
      status: response.data.status,
      message: response.data.message,
      refCode: response.data.refCode || '',
      token: response.data.token,
    },
    status: response.status,
  }
  return requestResponse
}

async function ResetPassword(input: InputResetPassword) {
  return await http.post<APIResponse<forgotMessage>>('/auth/reset-password', input)
}

export default {
  SignUp,
  SignIn,
  RequestForgot,
  VerifyOTP,
  ResetPassword,
}
