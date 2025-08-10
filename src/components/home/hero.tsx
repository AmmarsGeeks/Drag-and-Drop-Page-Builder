import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Features } from "./features"

export const Hero = () => (
  <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
    <div>
      <h1 className="tracking-light mb-4 font-bold leading-tight text-primary">
        Design.
        <br />
        Build.
        <br />
        Launch with
        <br />
        <span className="text-ring">{siteConfig.title}</span>
      </h1>
    
      <Button
        asChild
        className="mt-6 bg-ring/80 text-white hover:bg-ring/70"
      >
        <Link href="/dashboard">Start Building</Link>
      </Button>
    </div>

   <Features />
  </div>
)