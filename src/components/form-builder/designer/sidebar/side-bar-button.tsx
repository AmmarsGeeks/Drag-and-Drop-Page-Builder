import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import type { FormElement } from "@/types/form-builder"
import { Button } from "@/components/ui/button"

type SideBarButtonProps = Readonly<{ formElement: FormElement }>

export const SideBarButton = ({ formElement }: SideBarButtonProps) => {
  const { label, icon: Icon } = formElement.designerButton
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: { type: formElement.type, isDesignerButton: true },
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex h-28 w-28 cursor-grab flex-col gap-2",
        draggable.isDragging && "ring-2"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export const SideBarButtonDragOverlay = ({
  formElement,
}: SideBarButtonProps) => {
  const { label, icon: Icon } = formElement.designerButton

  return (
    <Button
      variant="outline"
      className="flex h-28 w-28 cursor-grab flex-col gap-2"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}
