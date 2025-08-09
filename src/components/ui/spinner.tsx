import { cn } from "@/lib/utils"

export const Spinner = ({ className }: Readonly<{ className?: string }>) => (
  <div
    className={cn(
      "inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
      className
    )}
    aria-label="loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
)
