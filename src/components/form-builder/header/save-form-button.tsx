"use client"

import { useTransition } from "react"
import { Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useDesigner } from "@/hooks/use-designer"
import { useFormContext } from "@/context/form-context"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { validateFormDesignJSON } from "@/lib/json-validator"

export const SaveFormButton = ({ id }: { id: number }) => {
  const { elements } = useDesigner()
  const { dispatch } = useFormContext()
  const [loading, startTransition] = useTransition()

  const updateForm = async () => {
    try {
      // Validate elements before saving
      if (!validateFormDesignJSON(elements)) {
        throw new Error("Invalid form elements structure")
      }
      
      dispatch({
        type: 'UPDATE_FORM_CONTENT',
        payload: { id, content: elements }
      })
      
      toast({ 
        title: "Success", 
        description: "Form saved successfully" 
      })
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to save form",
        variant: "destructive"
      })
    }
  }

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateForm)
      }}
    >
      <Save className="h-4 w-4" />
      Save
      {loading && <Spinner />}
    </Button>
  )
}