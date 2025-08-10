import { checkboxFormElement } from "@/components/fields/input/checkbox"
import { dateFormElement } from "@/components/fields/input/date"
import { numberFormElement } from "@/components/fields/input/number"
import { selectFormElement } from "@/components/fields/input/select"
import { textFormElement } from "@/components/fields/input/text"
import { textareaFormElement } from "@/components/fields/input/textarea"

import { paragraphFormElement } from "@/components/fields/layout/paragraph"
import { separatorFormElement } from "@/components/fields/layout/separator"
import { spacerFormElement } from "@/components/fields/layout/spacer"
import { subTitleFormElement } from "@/components/fields/layout/sub-title"
import { titleFormElement } from "@/components/fields/layout/title"

export const inputFields = [
  "checkbox",
  "date",
  "number",
  "select",
  "text",
  "textarea",
] as const

export type FormStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export type LayoutElement = {
  type: "Layout";
  layoutType: "header" | "hero" | "footer";
  children: FormElementInstance[];
};

export const layoutFields = [
  "paragraph",
  "separator",
  "spacer",
  "subTitle",
  "title",
] as const

export type Field = (typeof inputFields | typeof layoutFields)[number]



export type BaseFormElementInstance = {
  id: string
  type: Field
  extraAttributes?: Record<string, any>
}

export type LayoutElementInstance = BaseFormElementInstance & {
  type: "Layout"
  layoutType: "header" | "hero" | "footer"
  children?: string[] // Array of child element IDs
}

export type FormElementInstance = BaseFormElementInstance | LayoutElementInstance


export type FormComponentProps = Readonly<{
  elementInstance: FormElementInstance
  submitValue?: (key: string, value: string) => void
  defaultValue?: string
  disabled?: boolean
  isInvalid?: boolean
}>

export type FormElement = {
  type: Field
  construct: (id: string) => FormElementInstance
  designerButton: { icon: React.ElementType; label: string }
  designerComponent: React.FC<FormElementInstance>
  propertiesComponent: React.FC<FormElementInstance>
  formComponent: React.FC<FormComponentProps>
  validate(formElement: FormElementInstance, currentValue: string): boolean
}

// Custom FormSubmission type to replace Prisma's
export type FormSubmission = {
  id: number
  formId: number
  content: Record<string, string | undefined>
  createdAt: Date | string
}

export type UserFormSubmission = Omit<FormSubmission, "content"> & {
  content: { [key: string]: string | undefined }
}

export const formElements: Record<Field, FormElement> = {
  paragraph: paragraphFormElement,
  separator: separatorFormElement,
  spacer: spacerFormElement,
  subTitle: subTitleFormElement,
  title: titleFormElement,
  checkbox: checkboxFormElement,
  date: dateFormElement,
  number: numberFormElement,
  select: selectFormElement,
  text: textFormElement,
  textarea: textareaFormElement,
}