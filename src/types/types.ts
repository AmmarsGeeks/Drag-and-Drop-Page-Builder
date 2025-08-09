// src/types/form.ts
export type FormStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export type Form = {
  id: number
  name: string
  description: string
  content: FormElementInstance[]
  status: FormStatus
  shareId: string
  visits: number
  submissions: number
  updatedAt: string | Date
}

export type FormSubmission = {
  id: number
  formId: number
  content: Record<string, any>
}