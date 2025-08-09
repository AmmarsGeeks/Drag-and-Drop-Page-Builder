import { cn } from "@/lib/utils"

type FormPreviewContainerProps = Readonly<React.HTMLAttributes<HTMLDivElement>>

export const FormPreviewContainer = ({
  className,
  ...props
}: FormPreviewContainerProps) => (
  <div
    className={cn(
      "flex max-w-[620px] flex-grow flex-col gap-4 self-stretch overflow-y-auto rounded-xl bg-background p-6",
      className
    )}
    {...props}
  />
)
