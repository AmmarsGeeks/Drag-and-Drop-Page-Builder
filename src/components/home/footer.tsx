import { siteConfig } from "@/config/site"

export const Footer = () => (
  <footer className="flex justify-end border-t p-4 text-muted-foreground">
    &copy; {new Date().getFullYear()} {siteConfig.title}.
  </footer>
)
