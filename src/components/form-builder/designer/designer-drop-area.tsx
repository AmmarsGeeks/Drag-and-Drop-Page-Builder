import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import type { FormElementInstance } from "@/types/form-builder"
import { DesignerElementWrapper } from "./designer-element-wrapper"

export const DropArea = ({
  elements,
}: Readonly<{ elements: FormElementInstance[] }>) => {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  })

  return (
    <div
      ref={droppable.setNodeRef}
      className={cn(
        "m-auto flex h-full min-w-60 max-w-4xl flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background",
        droppable.isOver && "ring-4"
      )}
    >
      {!elements.length &&
        (droppable.isOver ? (
          <div className="w-full p-4">
            <div className="h-28 rounded-md bg-primary/20" />
          </div>
        ) : (
          <p className="flex flex-grow items-center p-4 text-3xl font-bold text-muted-foreground">
            Drop here
          </p>
        ))}
      {elements.length > 0 && (
        <div className="flex w-full flex-col gap-2 p-4">
          {elements.map((element) => (
            <DesignerElementWrapper key={element.id} {...element} />
          ))}
        </div>
      )}
    </div>
  )
}
