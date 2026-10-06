"use client"

import * as Sentry from "@sentry/nextjs"
import * as React from "react"

interface Props {
  error: Error & { digest?: string }
}

const GlobalError: React.FC<Props> = ({ error }) => {
  React.useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body className="grid min-h-dvh place-content-center font-sans">
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>
      </body>
    </html>
  )
}

export default GlobalError
