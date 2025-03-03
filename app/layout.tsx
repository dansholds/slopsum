import type React from "react"
import "./globals.css"
import { Inter, Fira_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const fira = Fira_Sans({ weight: "400", subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${inter.className} ${fira.className}`}>
        {children}
        <Toaster />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d073cd55-4ed4-4a3a-8882-9571aea4d3ac"
        ></script>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
