import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { APIResponse } from '../../services/types'
import type { FormKitSchemaDefinition } from '@formkit/core'
import { API } from '../../services'
import { AxiosError } from 'axios'
import type { Form } from '@/services/form/types'

export const useFormStore = defineStore('formStore', () => {
  const forms = ref<Form[]>([])
  const schema = ref<FormKitSchemaDefinition[]>([])
  function initForm(data: Form[]) {
    forms.value = data
    schema.value = (Array.isArray(data) ? data : [data]).map((form) => form.schemas).flat()
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

  return {
    forms,
    schema,
    GetForm,
    GetManyForm,
  }
})
