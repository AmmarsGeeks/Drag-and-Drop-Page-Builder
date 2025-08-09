"use client"

import { LayoutDesignerButton } from "@/components/form-builder/form-elements/layout-element";

const LAYOUTS = [
  { type: "header", label: "Header" },
  { type: "hero", label: "Hero Section" },
  { type: "footer", label: "Footer" },
];

export const LayoutLibrary = () => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-4">Layout Sections</h3>
      <div className="grid grid-cols-2 gap-4">
        {LAYOUTS.map(layout => (
          <div key={layout.type} className="flex flex-col items-center">
            <LayoutDesignerButton layoutType={layout.type} />
            <span className="text-xs mt-1">{layout.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};