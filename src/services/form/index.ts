import http from '../api'
import type { APIResponse } from '../types'
import type { Form, InputCreateForm, InputFormData, OutputFormData } from './types'

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

async function AddForm(input: InputCreateForm) {
  const response = await http.post<APIResponse<Form>>('/form', input, {
    withCredentials: true,
  })
  return response
}

async function deleteForm(formId: string) {
  const response = await http.delete<APIResponse<Form>>(`/form/${formId}`, {
    withCredentials: true,
  })
  return response
}

async function SubmitForm(formId: string, input: InputFormData) {
  const response = await http.post<APIResponse<Form>>(`/form/${formId}/submit`, input, {
    withCredentials: true,
  })
  return response
}

async function GetResultForm(formId: string) {
  const response = await http.get(`/form/${formId}/result`, { withCredentials: true })
  const formsResponse: APIResponse<OutputFormData> = {
    success: response.data.status === 'success',
    content: response.data.form_result,
    status: response.status,
  }
  return formsResponse
}

export default {
  GetOneForm,
  GetForms,
  AddForm,
  deleteForm,
  SubmitForm,
  GetResultForm
}
