"use client"
import { useTransition } from "react"
import { ArrowUpToLine } from "lucide-react"
import { type FormElementInstance, inputFields } from "@/types/form-builder"
import { toast } from "@/hooks/use-toast"
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useFormContext } from "@/context/form-context"

type FormProps = {
  id: number
  content: FormElementInstance[]
}

export const PublishFormButton = ({
  id,
  content,
}: Readonly<FormProps>) => {
  const [loading, startTransition] = useTransition()
  const { dispatch } = useFormContext()

  const hasInput = content.some((element) =>
    inputFields.some((field) => field === element.type)
  )

  const publish = async () => {
    if (!hasInput) {
      toast({
        title: "Error",
        description: "Form must have at least one input field to be published",
        variant: "destructive",
      })
      return
    }

    try {
      dispatch({
        type: 'UPDATE_FORM_STATUS',
        payload: { id, status: "PUBLISHED" }
      })
      
      toast({ 
        title: "Success", 
        description: "Form published successfully" 
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish form",
        variant: "destructive"
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="logo-gradient gap-2 text-white hover:bg-gradient-to-l">
          <ArrowUpToLine className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Form</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              startTransition(publish)
            }}
          >
            {loading && <Spinner className="mr-2" />}
            Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}