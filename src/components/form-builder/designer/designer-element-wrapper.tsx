import { useState } from "react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { type FormElementInstance, formElements } from "@/types/form-builder"

import { useDesigner } from "@/hooks/use-designer"
import { Button } from "@/components/ui/button"

export const DesignerElementWrapper = (
  element: Readonly<FormElementInstance>
) => {
  const { removeElement, setSelectedElement, selectedElement } = useDesigner()

  const [isMouseOver, setIsMouseOver] = useState(false)

  const sharedData = { type: element.type, elementId: element.id }

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: { isTopHalfDesignerElement: true, ...sharedData },
  })

  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: { isBottomHalfDesignerElement: true, ...sharedData },
  })

  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: { isDesignerElement: true, ...sharedData },
  })

  if (draggable.isDragging) return null

  const DesignerElement = formElements[element.type].designerComponent

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-md text-foreground ring-1 ring-inset ring-primary/20 hover:cursor-pointer",
        selectedElement?.id === element.id && "ring-2 ring-primary/50"
      )}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div ref={topHalf.setNodeRef} className="absolute h-1/2 w-full" />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full"
      />
      {isMouseOver && (
        <>
          <div className="absolute right-0 z-10 h-full">
            <Button
              variant="destructive"
              className="h-full rounded-l-none"
              onClick={(e) => {
                e.stopPropagation() // prevent element from being selected when delete button is clicked
                removeElement(element.id)
                setSelectedElement(null)
              }}
            >
              <Trash2 />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-medium text-sm text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 h-1 w-full rounded-md rounded-b-none bg-ring" />
      )}
      <div
        className={cn(
          "flex items-center rounded-md bg-accent/40 px-4 py-3 opacity-60 transition-all duration-200",
          isMouseOver && "opacity-30"
        )}
      >
        <DesignerElement {...element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-1 w-full rounded-md rounded-t-none bg-ring" />
      )}
    </div>
  )
}
