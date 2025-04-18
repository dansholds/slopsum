// app/layout.tsx
import "./globals.css";
import { Inter, Fira_Sans } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
const fira = Fira_Sans({ weight: "400", subsets: ["latin"] });

// Use dynamic import to avoid SSR for your UI toaster
const Toaster = dynamic(() => import("@/components/ui/toaster"), {
  ssr: false,
});

export const metadata = {
  title: "Slopsum | on god fr",
  description: "The only Lorem Ipsum alternative you need",
  generator: "v0.dev",
  themeColor: "#ffffff",
  openGraph: {
    title: "Slopsum | on god fr",
    description: "The only Lorem Ipsum alternative you need",
    type: "website",
    url: "https://slopsum.com",
    images: "/opengraph.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slopsum | on god fr",
    description: "The only Lorem Ipsum alternative you need",
    images: "/opengraph.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${fira.className}`}>
      <body>
        {children}
        {/* Client‑only toaster */}
        <Toaster />
        {/* Defer analytics for faster interactivity */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="d073cd55-4ed4-4a3a-8882-9571aea4d3ac"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
