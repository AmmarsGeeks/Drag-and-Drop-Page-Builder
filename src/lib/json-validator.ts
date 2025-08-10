import type { FormElementInstance } from "@/types/form-builder"

export const validateFormDesignJSON = (data: any): data is FormElementInstance[] => {
  if (!Array.isArray(data)) return false
  
  return data.every(element => {
    // Basic structure validation
    if (typeof element !== "object" || element === null) return false
    if (typeof element.id !== "string") return false
    if (typeof element.type !== "string") return false
    
    // Additional validation could be added for specific element types
    return true
  })
}