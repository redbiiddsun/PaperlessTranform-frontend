import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { APIResponse } from '../../services/types'
import type { FormKitSchemaDefinition } from '@formkit/core';
import { API } from '../../services'
import { AxiosError } from 'axios'

export const useFormStore = defineStore('formStore', () => {
  const forms = ref<FormKitSchemaDefinition[]>([])

  function initForm(data: FormKitSchemaDefinition[]) {
    forms.value = data
  }

  async function GetForm(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.form.GetOneForm()
      if (status === 200) {
        if (data && Array.isArray(data)) {
          initForm(data)
        } else {
          console.error('Received null content from API');
        }
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
    GetForm,
  }
})
