import type { Metadata } from "next"
import { Inter } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import "./globals.css"
import { FormProvider } from "@/context/form-context"
import { DesignerProvider } from "@/components/providers/designer-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...siteConfig,
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesignerProvider>
              <FormProvider>
                      <NextTopLoader />
                      <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                      >
                            {children}
                        <Toaster />
                    </ThemeProvider>
              </FormProvider>
        </DesignerProvider>

       
      </body>
    </html>
  )
}
