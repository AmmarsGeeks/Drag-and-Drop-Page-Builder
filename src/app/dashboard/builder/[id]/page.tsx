"use client"

import { FormBuilder } from "@/components/form-builder/form-builder"
import { FormError } from "@/components/form-error"
import { useFormContext } from "@/context/form-context"
import { Form } from "@/types/types"
import { useEffect, useState } from "react"

export default function BuilderPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { state, dispatch } = useFormContext()
  const [form, setForm] = useState<Form | null>(null)
  const [error, setError] = useState<{ error: string; status: number } | null>(null)

  useEffect(() => {
    const formId = parseInt(params.id);
    if (isNaN(formId)) {
      setError({ error: "Invalid form ID", status: 400 });
      return;
    }

    // Check both forms and pending forms
    const foundForm = state.forms.find(f => f.id === formId) || 
                     state.pendingForms[formId];

    if (!foundForm) {
      setError({ error: "Form not found", status: 404 });
    } else {
      setForm(foundForm);
      
      // If it was a pending form, confirm its creation
      if (state.pendingForms[formId]) {
        dispatch({
          type: 'CONFIRM_FORM_CREATION',
          payload: { id: formId }
        });
      }
    }
  }, [params.id, state.forms, state.pendingForms]);

  if (error) return <FormError {...error} />
  if (!form) return <div>Loading...</div>

  return <FormBuilder form={form} />
}