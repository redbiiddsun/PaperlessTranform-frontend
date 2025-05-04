import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { APIResponse } from '../../services/types'
import type { FormKitSchemaDefinition } from '@formkit/core'
import { API } from '../../services'
import { AxiosError } from 'axios'
import type { Form, FormSchema, InputCreateForm } from '@/services/form/types'

export const useFormStore = defineStore('formStore', () => {
  const forms = ref<Form[]>([])
  const Singleform = ref<Form>()
  const schema = ref<FormSchema[]>()

  function initForm(data: Form[]) {
    forms.value = data
  }

  function initSingleForm(data: Form) {
    Singleform.value = data
  }

  function initSchema(data: Form) {
    schema.value = data.schemas
  }

  function removeForm(id: string) {
    const idx = forms.value.findIndex((s) => s.id === id);
    if (idx === -1) return;
    forms.value.splice(idx, 1);
    console.log(forms.value)
  }

  async function GetManyForm(): Promise<APIResponse<null>> {
    try {
      const { status, content } = await API.form.GetForms()
      if (status === 200) {
        if (content) {
          initForm(content)
        }
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

  async function GetForm(formId: string): Promise<APIResponse<null>> {
    try {
      const { status, content } = await API.form.GetOneForm(formId)
      if (status === 200) {
        if (content) {
          initSchema(content)
          initSingleForm(content)
        }
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

  async function CreateForm(input: InputCreateForm): Promise<APIResponse<null>> {
    try {
      const { status } = await API.form.AddForm(input)
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
  async function DeleteForm (formId: string): Promise<APIResponse<null>> {
    try {
      const { status } = await API.form.deleteForm(formId)
      if (status === 200) {
        removeForm(formId)
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

  return {
    forms,
    Singleform,
    schema,
    initSchema,
    GetForm,
    GetManyForm,
    CreateForm,
    DeleteForm
  }
})
