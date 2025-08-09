import { LayoutDesignerComponent, LayoutFormComponent, LayoutPropertiesComponent } from "./layout-element";

const LayoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  );

  
export const formElements = {
  // ... existing elements
  Layout: {
    designerComponent: LayoutDesignerComponent,
    formComponent: LayoutFormComponent,
    propertiesComponent: LayoutPropertiesComponent,
    designerButtonElement: {
      icon: LayoutIcon,
      label: "Layout",
    },
  },
};