import { LayoutElement } from "@/types/form-builder";
import { useDesigner } from "@/hooks/use-designer";

export const LayoutComponent = ({
  elementInstance,
}: {
  elementInstance: LayoutElement;
}) => {
  const { elements } = useDesigner();
  const children = elements.filter(el => el.parentId === elementInstance.id);
  
  return (
    <div className={`layout-${elementInstance.layoutType} p-4 rounded-lg border`}>
      {children.map(child => (
        <DesignerElementWrapper key={child.id} element={child} />
      ))}
    </div>
  );
};

export const LayoutDesignerComponent = ({
  elementInstance,
}: {
  elementInstance: LayoutElement;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-muted-foreground">Layout: {elementInstance.layoutType}</span>
      <div className={`layout-${elementInstance.layoutType} p-4 rounded-lg border border-dashed`}>
        Drop elements here
      </div>
    </div>
  );
};

export const LayoutPropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: LayoutElement;
}) => {
  return (
    <div className="space-y-4">
      <p>Layout Properties</p>
      {/* Add layout-specific properties here */}
    </div>
  );
};

export const LayoutDesignerButton = () => {
  const { addLayoutElement } = useDesigner();
  
  return (
    <button 
      onClick={() => addLayoutElement("header")}
      className="flex flex-col items-center gap-2"
    >
      <div className="border border-dashed rounded-lg w-16 h-12 flex items-center justify-center">
        <LayoutIcon />
      </div>
      <span>Header</span>
    </button>
  );
};

const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);