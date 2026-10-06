import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import type * as React from "react"
import { ViewTransition } from "react"

import config from "@/config"
import classNames from "@/utils/classNames"
import { renderSchemaTags } from "@/utils/schema"

import "./main.css"

const sansFont = Inter({
  variable: "--sans-font",
  subsets: ["latin"],
  display: "swap",
})

const monoFont = localFont({
  variable: "--mono-font",
  src: [
    {
      path: "../fonts/JetBrainsMono-Regular.ttf",
      weight: "regular",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: { default: config.appName, template: `%s | ${config.appName}` },
  description: config.appDescription,
  applicationName: config.appName,
  creator: config.creator,
  authors: [{ name: config.authorName, url: config.authorUrl }],
  keywords: config.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { capable: true, title: config.appName },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
  ],
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html
      lang="en"
      className={classNames(sansFont.variable, monoFont.variable)}
    >
      <head>{renderSchemaTags()}</head>

      <body className="overflow-x-hidden bg-zinc-50 font-sans dark:bg-zinc-900">
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  )
}

export default RootLayout
