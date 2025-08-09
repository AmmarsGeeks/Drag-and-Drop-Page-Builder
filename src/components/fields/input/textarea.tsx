"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Text } from "lucide-react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import type {
  Field,
  FormComponentProps,
  FormElement,
  FormElementInstance,
} from "@/types/form-builder"

import { useDesigner } from "@/hooks/use-designer"
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
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const type: Field = "textarea"

const extraAttributes = {
  label: "Textarea Field",
  placeHolder: "Value here...",
  helperText: "Helper text",
  required: false,
  rows: 3,
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  placeHolder: z.string().max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  rows: z.number().min(1).max(10),
})

type Properties = z.infer<typeof propertiesSchema>

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

export const textareaFormElement: FormElement = {
  type,
  construct: (id: string) => ({ id, type, extraAttributes }),
  designerButton: { icon: Text, label: "Textarea Field" },
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  validate: (elementInstance: FormElementInstance, currentValue: string) => {
    const element = elementInstance as CustomInstance
    if (element.extraAttributes.required) return currentValue.length > 0
    return true
  },
}

function DesignerComponent(elementInstance: Readonly<FormElementInstance>) {
  const element = elementInstance as CustomInstance

  const { label, helperText, required, placeHolder } = element.extraAttributes

  return (
    <div className="grid w-full gap-2 text-left">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        readOnly
        disabled
        placeholder={placeHolder}
        className="pointer-events-none"
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
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

  function onKeyDown(
    e: React.KeyboardEvent<
      HTMLInputElement | HTMLButtonElement | HTMLDivElement
    >
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
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={onKeyDown} />
              </FormControl>
              <FormDescription>
                The placeholder of the text field. It will be displayed inside
                the field.
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
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Rows ({form.watch("rows")})</FormLabel>
              </div>
              <FormControl className="mt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
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

  const [value, setValue] = useState(props.defaultValue ?? "")
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(props.isInvalid === true)
  }, [props.isInvalid])

  const { label, helperText, required, placeHolder, rows } =
    element.extraAttributes

  return (
    <div className="grid gap-2">
      <Label className={cn(error && "text-destructive")}>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        disabled={props.disabled}
        placeholder={placeHolder}
        rows={rows}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (!props.submitValue) return
          const valid = textareaFormElement.validate(element, value)
          setError(!valid)
          if (!valid) return
          props.submitValue(element.id, value)
        }}
        value={value}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}
