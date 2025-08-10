"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useFormContext } from "@/context/form-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

export const DeleteFormButton = ({ formId }: Readonly<{ formId: number }>) => {
  const [loading, startTransition] = useTransition()
  const { dispatch } = useFormContext()

  const handleDelete = async () => {
    try {
      dispatch({
        type: 'DELETE_FORM',
        payload: { id: formId }
      })
      
      toast({ 
        title: "Success", 
        description: "Form deleted successfully" 
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete form",
        variant: "destructive"
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Form</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            form?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              startTransition(handleDelete)
            }}
          >
            {loading && <Spinner className="mr-2" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}