import http from '../api'
import type { APIResponse } from '../types'
import type { Form } from './types'

async function GetForms() {
  const response = await http.get('/form', { withCredentials: true })
  const formsResponse: APIResponse<Form[]> = {
    success: response.data.status === 'success',
    content: response.data.form,
    status: response.status,
  }
  return formsResponse
}

async function GetOneForm(formId: string) {
  const response = await http.get(`/form/${formId}`, { withCredentials: true })
  const formResponse: APIResponse<Form> = {
    success: response.data.status === 'success',
    content: response.data.form,
    status: response.status,
  }
  return formResponse
}

export default {
  GetOneForm,
  GetForms,
}
