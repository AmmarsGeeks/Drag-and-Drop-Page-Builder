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