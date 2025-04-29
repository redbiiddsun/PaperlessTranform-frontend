import http from '../api'
import type { APIResponse } from '../types'
import type { authMessage, InputSignUp, InputSignIn } from './types'

async function SignUp(input: InputSignUp) {
    return await http.post<APIResponse<authMessage>>("/auth/signup", input)
}

async function SignIn(input: InputSignIn) {
    return await http.post<APIResponse<authMessage>>("/auth/signin", input)
}

export default {
    SignUp,
    SignIn
}