import { formElements } from "@/types/form-builder"
import { Separator } from "@/components/ui/separator"
import { SideBarButton } from "./side-bar-button"

export const FormElementsSidebar = () => (
  <>
    <h5 className="font-medium text-muted-foreground">
      Drag and drop elements
    </h5>
    <Separator className="my-2 h-[1px] bg-border" />
    <div className="grid grid-cols-1 place-items-center gap-2 md:grid-cols-2">
      <h6 className="col-span-1 my-2 place-self-start text-sm font-medium text-muted-foreground md:col-span-2">
        Layout elements
      </h6>
      <SideBarButton formElement={formElements.title} />
      <SideBarButton formElement={formElements.subTitle} />
      <SideBarButton formElement={formElements.paragraph} />
      <SideBarButton formElement={formElements.separator} />
      <SideBarButton formElement={formElements.spacer} />
      <h6 className="col-span-1 my-2 place-self-start text-sm font-medium text-muted-foreground md:col-span-2">
        Form elements
      </h6>
      <SideBarButton formElement={formElements.text} />
      <SideBarButton formElement={formElements.textarea} />
      <SideBarButton formElement={formElements.number} />
      <SideBarButton formElement={formElements.date} />
      <SideBarButton formElement={formElements.select} />
      <SideBarButton formElement={formElements.checkbox} />
    </div>
  </>
)
