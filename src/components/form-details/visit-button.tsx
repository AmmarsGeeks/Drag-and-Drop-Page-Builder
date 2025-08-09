"use client"

import Link from "next/link"
import { useMounted } from "@/hooks/use-mounted"
import { Button } from "../ui/button"

type VisitButtonProps = Readonly<{ shareId: string }>

export const VisitButton = ({ shareId }: VisitButtonProps) => {
  const mounted = useMounted()

  if (!mounted) return null

  const shareUrl = `${window.location.origin}/submit/${shareId}`

  return (
    <Button asChild className="w-44">
      <Link href={shareUrl} target="_blank" rel="noopener noreferrer">
        Visit
      </Link>
    </Button>
  )
}
