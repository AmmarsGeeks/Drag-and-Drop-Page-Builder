import Link from "next/link"
import { ChevronRight, Import } from "lucide-react"
import { useRef } from "react"
import { useDesigner } from "@/hooks/use-designer"
import { FormPreviewDialog } from "@/components/form-preview-dialog"
import { SaveFormButton } from "./save-form-button"
import { PublishFormButton } from "./publish-form-button"
import { EditFormDetailsDialog } from "./edit-form-details-dialog"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useFormContext } from "@/context/form-context"
import type { FormElementInstance } from "@/types/form-builder"

type Form = {
  id: number
  name: string
  description: string
  content: FormElementInstance[]
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  shareId: string
  visits: number
  submissions: number
}

export const FormBuilderHeader = (form: Readonly<Form>) => {
  const { elements, setElements } = useDesigner()
  const { dispatch } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    try {
      const jsonString = JSON.stringify(elements, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement("a")
      a.href = url
      a.download = `form-${form.name}-design.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast({
        title: "Exported successfully",
        description: "Your design has been exported as JSON",
      })
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Could not export design",
        variant: "destructive"
      })
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result
        if (typeof content !== "string") return
        
        const parsedElements = JSON.parse(content)
        
        // Basic validation
        if (!Array.isArray(parsedElements)) {
          throw new Error("Invalid format: expected an array")
        }
        
        // More advanced validation could be added here
        const isValid = parsedElements.every((el: any) => 
          el && typeof el === "object" && "type" in el && "id" in el
        )
        
        if (!isValid) {
          throw new Error("Invalid elements format")
        }
        
        setElements(parsedElements)
        
        // Update form context immediately
        dispatch({
          type: 'UPDATE_FORM_CONTENT',
          payload: { id: form.id, content: parsedElements }
        })
        
        toast({
          title: "Imported successfully",
          description: "Design has been imported",
        })
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid JSON file format",
          variant: "destructive"
        })
      } finally {
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
    }
    reader.readAsText(file)
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b-2 p-4">
      <div className="flex items-center truncate text-lg font-medium text-muted-foreground">
        <Link href="/dashboard" className="text-foreground hover:underline">
          Dashboard
        </Link>
        <ChevronRight size={20} />
        {form.name}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
          id="import-file"
        />
        
        <Button
          variant="outline"
          onClick={() => document.getElementById('import-file')?.click()}
          className="gap-2"
        >
          <Import size={16} />
          Import
        </Button>
        
        <Button
          variant="outline"
          onClick={handleExport}
          className="gap-2"
        >
          {/* <Export size={16} /> */}
          Export
        </Button>
        
        {form.status === "DRAFT" && <EditFormDetailsDialog {...form} />}
        <FormPreviewDialog elements={elements} />
        {form.status === "DRAFT" && (
          <>
            <SaveFormButton {...form} />
            <PublishFormButton {...form} />
          </>
        )}
      </div>
    </header>
  )
}