"use client"

import { DndContext } from "@dnd-kit/core"
import { useFormBuilderSensors } from "@/hooks/use-form-builder-sensors"
import { useUpdateElementsToFormContent } from "@/hooks/use-update-elements-to-form-content"
import { Spinner } from "../ui/spinner"
import { Designer } from "./designer/designer"
import { DragOverlayWrapper } from "./drag-overlay-wrapper"
import { FormPublishedCard } from "./form-published-card"
import { FormBuilderHeader } from "./header/form-builder-header"
import { FormElementInstance } from "@/types/form-builder"

type Form = {
  id: number
  name: string
  description: string
  content: FormElementInstance[]
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  shareId: string
  visits: number
  submissions: number
}

type FormBuilderProps = Readonly<{ form: Form }>

export const FormBuilder = ({ form }: FormBuilderProps) => {
  const sensors = useFormBuilderSensors()
  const loading = useUpdateElementsToFormContent(form)

  if (loading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner className="size-12" />
      </div>
    )

  const shareUrl = `${window.location.origin}/submit/${form.shareId}`

  if (form.status === "PUBLISHED")
    return <FormPublishedCard shareUrl={shareUrl} formId={form.id} />

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-grow flex-col overflow-x-hidden">
        <FormBuilderHeader {...form} />
        <Designer />
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}