"use client"

import { SeparatorHorizontal } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { Field, FormElement } from "@/types/form-builder"

const type: Field = "separator"

export const separatorFormElement: FormElement = {
  type,
  construct: (id: string) => ({ id, type }),
  designerButton: { icon: SeparatorHorizontal, label: "Separator Field" },
  designerComponent: () => (
    <div className="grid w-full gap-2">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  ),
  propertiesComponent: () => <p>No properties available for this element</p>,
  formComponent: () => <Separator />,
  validate: () => true,
}
