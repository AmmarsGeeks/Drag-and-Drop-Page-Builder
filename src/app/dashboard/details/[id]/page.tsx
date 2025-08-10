"use client"

import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useFormContext } from "@/context/form-context"
import { ShareLink } from "@/components/form-details/share-link"
import { SubmissionsTable } from "@/components/form-details/submissions-table"
import { VisitButton } from "@/components/form-details/visit-button"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/button"

export default function DetailsPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { state } = useFormContext()
  const [form, setForm] = useState<any>(null)
  const [error, setError] = useState<{ error: string; status: number } | null>(null)
  
  useEffect(() => {
    const formId = parseInt(params.id)
    if (isNaN(formId)) {
      setError({ error: "Invalid form ID", status: 400 })
      return
    }
    
    const foundForm = state.forms.find(f => f.id === formId)
    if (!foundForm) {
      setError({ error: "Form not found", status: 404 })
      return
    }
    
    setForm(foundForm)
  }, [params.id, state.forms])

  if (error) return <FormError {...error} />
  if (!form) return <div>Loading...</div>

  const { visits, submissions } = form
  const submissionRate = visits ? (submissions / visits) * 100 : 0
  const bounceRate = 100 - submissionRate

  return (
    <section className="pb-10">
      <div className="container space-y-4 border-b py-8">
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2" size={20} />
            Back to dashboard
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-2">
          <h1 className="truncate">{form.name}</h1>
          <VisitButton shareId={form.shareId} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <ShareLink shareId={form.shareId} />
        </div>
        {form.description && (
          <p className="text-muted-foreground">{form.description}</p>
        )}
      </div>
     
      <div className="container pt-10">
        <h2 className="mb-4">Submissions</h2>
        {form.submissions > 0 ? (
          <SubmissionsTable form={form} />
        ) : (
          <p className="text-muted-foreground">
            No submissions yet. Share your form to start receiving submissions.
          </p>
        )}
      </div>
    </section>
  )
}