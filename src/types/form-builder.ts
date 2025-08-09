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
  
  export type FormElementInstance = {
    id: string
    type: Field
    extraAttributes?: Record<string, any>
  }
  
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

  