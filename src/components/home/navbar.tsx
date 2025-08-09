import Link from "next/link"
import { Logo } from "../logo"
import { ThemeSwitcher } from "../theme-switcher"
import { Button } from "../ui/button"

export const Navbar = () => (
  <nav className="flex items-center justify-between border-b p-4">
    <Logo />
    <div className="flex items-center gap-2">
      <ThemeSwitcher />
     
      <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
    </div>
  </nav>
)
