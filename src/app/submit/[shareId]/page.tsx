"use client"

import { useEffect, useState } from "react"
import { useFormContext } from "@/context/form-context"
import { FormError } from "@/components/form-error"
import { FormSubmit } from "@/components/submit/form-submit"
import type { FormElementInstance } from "@/types/form-builder"

const link = { href: "/", text: "Back to home" }

export default function SubmitPage({
  params,
}: Readonly<{ params: { shareId: string } }>) {
  const { state } = useFormContext()
  const [formContent, setFormContent] = useState<FormElementInstance[] | null>(null)
  const [error, setError] = useState<{ error: string; status: number } | null>(null)

  const { dispatch } = useFormContext();

  
  useEffect(() => {
    const form = state.forms.find(f => f.shareId === params.shareId)
    
    if (!form) {
      setError({ error: "Invalid form share link", status: 400 })
      return
    }
    
    if (form.status !== "PUBLISHED") {
      setError({ error: "This form is not published", status: 403 })
      return
    }
    
    // Increment visits
    dispatch({
      type: 'INCREMENT_VISITS',
      payload: { formId: form.id }
    })
    
    setFormContent(form.content as FormElementInstance[])
  }, [params.shareId, state.forms])

  if (error) return <FormError link={link} {...error} />
  if (!formContent) return <div>Loading form...</div>

  return <FormSubmit formContent={formContent} shareId={params.shareId} />
}