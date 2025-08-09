"use client"
import { useRef } from "react"
import { useFormContext } from "@/context/form-context"
import { toast } from "@/hooks/use-toast"

export const StateManager = () => {
  const {  dispatch } = useFormContext()
  const fileInputRef = useRef<HTMLInputElement>(null)



  const handleImportFullState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result
        if (typeof content !== "string") return
        
        const parsedState = JSON.parse(content)
        
        // Validate basic structure
        if (!parsedState || typeof parsedState !== "object") {
          throw new Error("Invalid format")
        }
        if (!Array.isArray(parsedState.forms)) {
          throw new Error("Invalid forms format")
        }
        
        dispatch({ type: 'INIT_STATE', payload: parsedState })
        
        toast({
          title: "State imported",
          description: "All forms and submissions have been imported",
        })
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid state file format",
          variant: "destructive"
        })
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = ""
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex gap-2 p-4 border-t">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportFullState}
        accept=".json"
        className="hidden"
        id="import-full-state"
      />
    
    </div>
  )
}