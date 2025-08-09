import Link from "next/link"
import { Button } from "./ui/button"

type FormErrorProps = Readonly<{
  error: string
  status?: number
  link?: { href: string; text: string }
}>

export const FormError = ({
  error,
  status,
  link = {
    href: "/dashboard",
    text: "Back to dashboard",
  },
}: FormErrorProps) => (
  <div className="flex flex-grow items-center justify-center p-4">
    <div className="flex max-w-lg flex-col items-center">
      {status && <p className="text-sm text-ring">{status}</p>}
      <h1 className="mb-2">Error</h1>
      <p className="mb-4 text-lg text-muted-foreground">{error}</p>
      <Button asChild>
        <Link href={link.href}>{link.text}</Link>
      </Button>
    </div>
  </div>
)
