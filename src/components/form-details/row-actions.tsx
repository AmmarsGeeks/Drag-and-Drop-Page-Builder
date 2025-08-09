"use client"

import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import type { FormElementInstance } from "@/types/form-builder"
import { toast } from "@/hooks/use-toast"
import { FormPreviewDialog } from "../form-preview-dialog"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useFormContext } from "@/context/form-context"

type UserFormSubmission = {
  id: number
  formId: number
  content: Record<string, any>
}

type RowActionProps = Readonly<{
  elements: FormElementInstance[]
  submission: UserFormSubmission
}>

export const RowActions = ({ elements, submission }: RowActionProps) => {
  const [loading, startTransition] = useTransition()
  const { dispatch } = useFormContext()

  const deleteSubmission = async () => {
    try {
      dispatch({
        type: 'DELETE_SUBMISSION',
        payload: {
          formId: submission.formId,
          submissionId: submission.id
        }
      })
      
      toast({ 
        title: "Success", 
        description: "Submission deleted successfully" 
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FormPreviewDialog elements={elements} submission={submission} />
      <Button
        size="icon"
        variant="destructive"
        className="size-8"
        disabled={loading}
        onClick={() => {
          startTransition(deleteSubmission)
        }}
      >
        {loading ? <Spinner className="size-5" /> : <Trash2 size={20} />}
      </Button>
    </div>
  )
}