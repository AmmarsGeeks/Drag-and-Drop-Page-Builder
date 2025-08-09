"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pilcrow } from "lucide-react"
import { z } from "zod"

import type {
  Field,
  FormElement,
  FormElementInstance,
} from "@/types/form-builder"

import { useDesigner } from "@/hooks/use-designer"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const type: Field = "paragraph"

const extraAttributes = { text: "Text here" }

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
})

type Properties = z.infer<typeof propertiesSchema>

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

export const paragraphFormElement: FormElement = {
  type,
  construct: (id: string) => ({ id, type, extraAttributes }),
  designerButton: { icon: Pilcrow, label: "Paragraph Field" },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  validate: () => true,
}

function DesignerComponent(elementInstance: Readonly<FormElementInstance>) {
  const element = elementInstance as CustomInstance

  const { text } = element.extraAttributes

  return (
    <div className="grid gap-2 text-left">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <p>{text}</p>
    </div>
  )
}

function PropertiesComponent(elementInstance: Readonly<FormElementInstance>) {
  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
  const form = useForm<Properties>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: element.extraAttributes,
  })

  function applyChanges(data: Properties) {
    updateElement(element.id, { ...element, extraAttributes: data })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") e.currentTarget.blur()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea {...field} onKeyDown={onKeyDown} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function FormComponent({
  elementInstance,
}: Readonly<{
  elementInstance: FormElementInstance
}>) {
  const element = elementInstance as CustomInstance
  const { text } = element.extraAttributes
  return <p>{text}</p>
}
