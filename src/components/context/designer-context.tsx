import { type Dispatch, type SetStateAction, createContext } from "react"
import type { FormElementInstance } from "@/types/form-builder"

type DesignerContextType = {
  elements: FormElementInstance[]
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>
  addElement: (index: number, element: FormElementInstance) => void
  updateElement: (
    elementId: string,
    updatedElement: FormElementInstance
  ) => void
  removeElement: (elementId: string) => void
  selectedElement: FormElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
}

export const DesignerContext = createContext<DesignerContextType | null>(null)
