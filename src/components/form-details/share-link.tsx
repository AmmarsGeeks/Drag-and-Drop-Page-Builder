"use client"

import { Share } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"
import { toast } from "@/hooks/use-toast"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type ShareLinkProps = Readonly<{ shareId: string }>

export const ShareLink = ({ shareId }: ShareLinkProps) => {
  const mounted = useMounted()

  if (!mounted) return null

  const shareUrl = `${window.location.origin}/submit/${shareId}`

  return (
    <div className="flex flex-grow items-center gap-4">
      <Input value={shareUrl} readOnly />
      <Button
        className="min-w-44"
        onClick={async () => {
          await navigator.clipboard.writeText(shareUrl)
          toast({
            title: "Copied",
            description: "Link copied to clipboard.",
          })
        }}
      >
        <Share className="mr-2 h-4 w-4" />
        Share Link
      </Button>
    </div>
  )
}
