import { useState } from "react"
import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core"

import { formElements, type Field } from "@/types/form-builder"
import { useDesigner } from "@/hooks/use-designer"
import { SideBarButtonDragOverlay } from "./designer/sidebar/side-bar-button"

export const DragOverlayWrapper = () => {
  const { elements } = useDesigner()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>

  const isSideBarButton = draggedItem.data?.current?.isDesignerButton

  if (isSideBarButton) {
    const type = draggedItem.data?.current?.type as Field
    node = <SideBarButtonDragOverlay formElement={formElements[type]} />
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((element) => element.id === elementId)

    if (!element) node = <div>Element not found</div>
    else {
      const DesignerElementComponent =
        formElements[element.type].designerComponent

      node = (
        <div className="pointer-events-none flex w-full rounded-md border-border bg-accent/40 px-4 py-2 opacity-80">
          <DesignerElementComponent {...element} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
