import { env } from "@/env"

export const emailEnabled =
  env.RESEND_API_KEY !== undefined && env.EMAIL_FROM !== undefined
