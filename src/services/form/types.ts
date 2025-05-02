export type Form = {
  id: string
  name: string
  description: string
  width: string
  createdAt: Date
  userId: string
  schemas: string
  requiredLogin: boolean
  updatedAt: Date
}

export type InputCreateForm = {
  name: string
  description: string
  width: string
  createdAt: Date
  schemas: string
  requiredLogin: boolean
  updatedAt: Date
}
