"use client"

import { useState } from "react"
import type { Form } from "@prisma/client"
import { Edit } from "lucide-react"

import { DetailsForm } from "@/components/details-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const EditFormDetailsDialog = (form: Readonly<Form>) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Edit size={16} className="mr-2" />
          Edit Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Form Details</DialogTitle>
        </DialogHeader>
        <DetailsForm
          defaultValues={form}
          closeModal={() => {
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
