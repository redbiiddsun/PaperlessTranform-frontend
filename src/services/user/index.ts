import http from '../api'
import type { APIResponse } from '../types'
import type { User } from './type'

async function GetUser() {
  const response = await http.get('/user', { withCredentials: true })

  const userResult: APIResponse<User> = {
    success: response.data.status === 'success',
    content: response.data.user,
    status: response.status
  }
  
  return userResult
}

export default {
    GetUser
}
