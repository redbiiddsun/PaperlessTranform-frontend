import http from '../api'
import type { APIResponse } from '../types'
import type { Users, InputSignUp, InputSignIn } from './types'

async function SignUp(input: InputSignUp) {
    return await http.post<APIResponse<Users>>("/auth/signup", input)
}

async function SignIn(input: InputSignIn) {
    return await http.post<APIResponse<Users>>("/auth/signin", input)
}

export default {
    SignUp,
    SignIn
}