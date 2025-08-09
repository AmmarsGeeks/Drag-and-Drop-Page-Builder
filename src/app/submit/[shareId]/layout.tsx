import { Logo } from "@/components/logo"
import { ThemeSwitcher } from "@/components/theme-switcher"

export const metadata = { title: "Submit Form" }

export default function SubmitLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-background">
      <nav className="flex h-16 items-center justify-between border-b border-border px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex flex-grow">{children}</main>
    </div>
  )
}
