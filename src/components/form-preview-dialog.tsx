import { ScanEye } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  formElements,
  type FormElementInstance,
  type UserFormSubmission,
} from "@/types/form-builder"

import { FormPreviewContainer } from "./form-preview-container"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

export type FormPreviewDialogProps = Readonly<{
  elements: FormElementInstance[]
  submission?: UserFormSubmission
}>

export const FormPreviewDialog = ({
  elements,
  submission,
}: FormPreviewDialogProps) => {
  const hasSubmission = submission !== undefined

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn("gap-2", hasSubmission && "size-8")}
          size={hasSubmission ? "icon" : "default"}
          variant={hasSubmission ? "secondary" : "outline"}
        >
          <ScanEye size={hasSubmission ? 20 : 16} />
          {!hasSubmission && "Preview"}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-screen max-w-full flex-grow flex-col gap-0 p-0">
        <header className="border-b px-4 py-2">
          <p className="text-lg font-bold">
            Form {hasSubmission && "Submission"} Preview
          </p>
          <p className="text-sm text-muted-foreground">
            {hasSubmission
              ? "This is how the form looked like when it was submitted."
              : "This is how your form will look like to users."}
          </p>
        </header>
        <section className="bg-graph flex flex-grow items-center justify-center overflow-y-auto p-4">
          <FormPreviewContainer>
            {elements.map((element) => {
              const FormComponent = formElements[element.type].formComponent

              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element}
                  defaultValue={
                    hasSubmission ? submission.content[element.id] : undefined
                  }
                  disabled={hasSubmission}
                />
              )
            })}
          </FormPreviewContainer>
        </section>
      </DialogContent>
    </Dialog>
  )
}
