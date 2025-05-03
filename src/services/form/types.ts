export type FormSchema = {
  id: number
  $formkit: string
  name: string
  label: string
  value: string
  validation?: string
  help?: string
  placeholder?: string
  outerClass: string
}

export type Form = {
  id: string
  name: string
  description: string
  width: string
  createdAt: Date
  userId: string
  schemas: FormSchema[]
  requiredLogin: boolean
  updatedAt: Date
}

export type InputCreateForm = {
  name: string
  description: string
  width: string
  schemas: FormSchema[]
  requiredLogin: boolean
}