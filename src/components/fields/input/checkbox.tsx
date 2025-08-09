"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckSquare } from "lucide-react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import type {
  Field,
  FormComponentProps,
  FormElement,
  FormElementInstance,
} from "@/types/form-builder"

import { useDesigner } from "@/hooks/use-designer"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const type: Field = "checkbox"

const extraAttributes = {
  label: "Checkbox Field",
  helperText: "Helper text",
  required: false,
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
})

type Properties = z.infer<typeof propertiesSchema>

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

export const checkboxFormElement: FormElement = {
  type,
  construct: (id: string) => ({ id, type, extraAttributes }),
  designerButton: { icon: CheckSquare, label: "Checkbox Field" },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  validate: (elementInstance: FormElementInstance, currentValue: string) => {
    const element = elementInstance as CustomInstance
    if (element.extraAttributes.required) return currentValue === "true"
    return true
  },
}

function DesignerComponent(elementInstance: Readonly<FormElementInstance>) {
  const element = elementInstance as CustomInstance
  const { label, helperText, required } = element.extraAttributes
  const id = `checkbox-${element.id}`

  return (
    <div className="flex items-start gap-2">
      <Checkbox id={id} disabled={true} className="pointer-events-none" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
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
    updateElement(element.id, {
      ...element,
      extraAttributes: data,
    })
  }

  function onKeyDown(
    e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>
  ) {
    if (e.key === "Enter") e.currentTarget.blur()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={onKeyDown} />
              </FormControl>
              <FormDescription>
                The label of the text field. It will be displayed above the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={onKeyDown} />
              </FormControl>
              <FormDescription>
                The helper text of the text field. It will be displayed below
                the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border px-3 py-2">
              <div>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Whether the text field is required or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onKeyDown={onKeyDown}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function FormComponent(props: FormComponentProps) {
  const element = props.elementInstance as CustomInstance

  const [value, setValue] = useState<boolean>(props.defaultValue === "true")
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(props.isInvalid === true)
  }, [props.isInvalid])

  const { label, helperText, required } = element.extraAttributes

  const id = `checkbox-${element.id}`

  return (
    <div className="flex items-start gap-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-destructive")}
        disabled={props.disabled}
        onCheckedChange={(checked) => {
          let value = false
          if (checked) value = true

          setValue(value)
          if (!props.submitValue) return
          const stringValue = value.toString()
          const valid = checkboxFormElement.validate(element, stringValue)
          setError(!valid)
          props.submitValue(element.id, stringValue)
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(error && "text-destructive")}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    </div>
  )
}
