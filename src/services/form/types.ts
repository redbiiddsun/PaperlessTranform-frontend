import type { FormKitSchemaDefinition } from '@formkit/core';

export type Form = {
  id: string
  name: string
  createdAt: Date
  userId: string
  schemas: FormKitSchemaDefinition[]
  requiredLogin: boolean
  updatedAt: Date
}
