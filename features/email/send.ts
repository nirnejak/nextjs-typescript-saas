import { render } from "@react-email/components"
import type * as React from "react"
import { Resend } from "resend"

import { env } from "@/env"

import { emailEnabled } from "./config"

const resend = emailEnabled ? new Resend(env.RESEND_API_KEY) : null

interface Email {
  to: string
  subject: string
  react: React.ReactElement
}

// No "server-only" import: the Better Auth CLI loads this through
// features/auth/server.ts. env.ts already blocks server vars on the client

// Sends through Resend when configured, otherwise logs the email. Never
// throws, so a failed email can't break the action that triggered it
export const sendEmail = async ({
  to,
  subject,
  react,
}: Email): Promise<void> => {
  try {
    if (resend === null || env.EMAIL_FROM === undefined) {
      const text = await render(react, { plainText: true })
      console.info(`[email] to=${to} subject="${subject}"\n${text}`)
      return
    }
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      react,
    })
    if (error !== null) console.error("[email] send failed", error)
  } catch (error) {
    console.error("[email] send failed", error)
  }
}
