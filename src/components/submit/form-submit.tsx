"use client"
import { useCallback, useRef, useState, useTransition } from "react"
import { MousePointerClick } from "lucide-react"
import { type FormElementInstance, formElements } from "@/types/form-builder"
import { toast } from "@/hooks/use-toast"
import { useFormContext } from "@/context/form-context"
import { FormPreviewContainer } from "../form-preview-container"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type FormSubmitProps = Readonly<{
  formContent: FormElementInstance[]
  shareId: string
}>

export const FormSubmit = ({ formContent, shareId }: FormSubmitProps) => {
  const { dispatch } = useFormContext();
  const formValues = useRef<Record<string, string>>({})
  const formErrors = useRef<Record<string, boolean>>({})
  const [key, setKey] = useState(new Date().getTime())
  const [submitted, setSubmitted] = useState(false)
  const [loading, startTransition] = useTransition()

  const validateForm = useCallback(() => {
    formErrors.current = {}
    for (const field of formContent) {
      const currentValue = formValues.current[field.id] ?? ""
      const valid = formElements[field.type].validate(field, currentValue)
      if (!valid) formErrors.current[field.id] = true
    }
    return Object.keys(formErrors.current).length <= 0
  }, [formContent])

  const submitValue = (id: string, value: string) => {
    formValues.current[id] = value
  }

  const onSubmit = () => {
    if (!validateForm()) {
      setKey(new Date().getTime())
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      })
      return
    }

    try {
      const formId = parseInt(shareId)
      if (isNaN(formId)) throw new Error("Invalid form ID")
      
      dispatch({
        type: 'ADD_SUBMISSION',
        payload: {
          formId,
          content: formValues.current
        }
      });
      
      dispatch({
        type: 'INCREMENT_VISITS',
        payload: { formId }
      });
      
      setSubmitted(true);
      toast({
        title: "Success",
        description: "Form submitted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive"
      })
    }
  };

  if (submitted)
    return (
      <div className="flex flex-grow items-center justify-center p-8">
        <FormPreviewContainer
          key={key}
          className="self-center border shadow-lg"
        >
          <h3>Form submitted</h3>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now
          </p>
        </FormPreviewContainer>
      </div>
    )

  return (
    <div className="flex flex-grow items-center justify-center p-8">
      <FormPreviewContainer key={key} className="self-center border shadow-lg">
        {formContent.map((element) => {
          const FormComponent = formElements[element.type].formComponent

          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          )
        })}
        <Button
          className="mt-4"
          onClick={() => startTransition(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <MousePointerClick className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </FormPreviewContainer>
    </div>
  )
}