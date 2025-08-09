import Link from "next/link"
import { siteConfig } from "@/config/site"

export const Logo = () => (
  <Link href="/" className="text-xl font-bold text-primary">
    {siteConfig.title}.
  </Link>
)
