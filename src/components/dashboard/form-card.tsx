"use client"

import Link from "next/link"
import { formatDistance } from "date-fns"
import { CalendarRange, Edit, View } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DeleteFormButton } from "./delete-form-button"

type FormCardProps = {
  id: number
  name: string
  description?: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  submissions: number
  visits: number
  updatedAt: string | Date // Accept both string and Date
}

export const FormCard = (form: Readonly<FormCardProps>) => {
  // Ensure updatedAt is a valid Date object
  const updatedAt = typeof form.updatedAt === 'string' 
    ? new Date(form.updatedAt) 
    : form.updatedAt

  return (
    <Card
      key={form.id}
      className="flex flex-col overflow-hidden rounded-md border shadow-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate">{form.name}</span>
          {form.status === "PUBLISHED" ? (
            <Badge>Published</Badge>
          ) : form.status === "DRAFT" ? (
            <Badge variant="outline">Draft</Badge>
          ) : (
            <Badge variant="secondary">Archived</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow truncate text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter
        className={cn(
          "flex items-center justify-end",
          form.status !== "DRAFT" && "justify-between"
        )}
      >
        {form.status !== "DRAFT" && (
          <section className="flex items-center gap-2">
            <CalendarRange className="text-muted-foreground" />
            {form.submissions}
            <View className="text-muted-foreground" />
            {form.visits}
          </section>
        )}
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            className="h-9 gap-2"
            variant={form.status === "DRAFT" ? "secondary" : "default"}
          >
            {form.status === "DRAFT" ? (
              <Link href={`/dashboard/builder/${form.id}`}>
                <Edit size={16} /> Edit
              </Link>
            ) : (
              <Link href={`/dashboard/details/${form.id}`}>
                <View size={16} /> View
              </Link>
            )}
          </Button>
          <DeleteFormButton formId={form.id} />
        </div>
      </CardFooter>
    
    </Card>
  )
}