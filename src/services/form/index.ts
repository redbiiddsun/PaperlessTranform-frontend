import http from '../api'
import type { APIResponse } from '../types'
// import type { Users, InputSignUp, InputSignIn } from './types'

async function GetOneForm() {
    return await http.post<APIResponse<null>>("/test-schema")
}

// async function SignIn(input: InputSignIn) {
//     return await http.post<APIResponse<Users>>("/auth/signin", input)
// }

export default {
    GetOneForm,
}