import http from '../api'
import type { APIResponse } from '../types'
import type { FormKitSchemaDefinition } from '@formkit/core';

// import type { Users, InputSignUp, InputSignIn } from './types'

async function GetOneForm() {
    const result = await http.get<APIResponse<FormKitSchemaDefinition>>("/test-schema")
    return result
}

// async function SignIn(input: InputSignIn) {
//     return await http.post<APIResponse<Users>>("/auth/signin", input)
// }

export default {
    GetOneForm,
}