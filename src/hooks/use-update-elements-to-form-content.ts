import { useEffect, useState } from "react"
import type { Form } from "@prisma/client"
import type { FormElementInstance } from "@/types/form-builder"
import { useDesigner } from "./use-designer"

export const useUpdateElementsToFormContent = (form: Form) => {
  const { setElements, setSelectedElement } = useDesigner()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) return
    if (form.content && Array.isArray(form.content)) {
      const content = form.content as FormElementInstance[]
      setElements(content)
    }
    setSelectedElement(null)
    const loadingTimeout = setTimeout(() => setLoading(false), 200)
    return () => clearTimeout(loadingTimeout)
  }, [loading, form, setElements, setSelectedElement])

  return loading
}
