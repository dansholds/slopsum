import type React from "react"
import "./globals.css"
import { Inter, Fira_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] })
const fira = Fira_Sans({ weight: "400", subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The only Lorem Ipsum alternative you need" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Slopsum | on god fr" />
        <meta property="og:description" content="The only Lorem Ipsum alternative you need" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/opengraph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/opengraph.png" />
        <meta property="twitter:title" content="Slopsum | on god fr"></meta>
        <meta property="twitter:description" content="The only Lorem Ipsum alternative you need"></meta>
        <meta property="og:url" content="https://slopsum.com" />
        <title>Slopsum | on god fr</title>
      </head>
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
