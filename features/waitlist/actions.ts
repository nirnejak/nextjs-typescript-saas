"use server"

import { z } from "zod"

import { db } from "@/db"
import { emailEnabled } from "@/features/email/config"
import { sendEmail } from "@/features/email/send"
import WaitlistEmail from "@/features/email/templates/WaitlistEmail"
import { rateLimit } from "@/utils/rate-limit"
import { getClientIp } from "@/utils/request"

import { waitlist } from "./schema"

export interface WaitlistState {
  status: "idle" | "success" | "error"
  message: string
}

const schema = z.object({ email: z.email().max(255) })

export const joinWaitlist = async (
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> => {
  const parsed = schema.safeParse({ email: formData.get("email") })
  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email address" }
  }

  try {
    const { allowed } = await rateLimit(`waitlist:${await getClientIp()}`, {
      limit: 5,
      windowMs: 60_000,
    })
    if (!allowed) {
      return { status: "error", message: "Too many attempts, try again soon" }
    }

    const email = parsed.data.email.toLowerCase()
    const inserted = await db
      .insert(waitlist)
      .values({ email })
      .onConflictDoNothing()
      .returning({ id: waitlist.id })

    if (inserted.length > 0 && emailEnabled) {
      await sendEmail({
        to: email,
        subject: "You're on the waitlist",
        react: WaitlistEmail(),
      })
    }
  } catch (error) {
    console.error("[waitlist] failed", error)
    return { status: "error", message: "Something went wrong, try again" }
  }

  // Same message for new and existing emails, so the form can't be used to
  // check who has signed up
  return { status: "success", message: "You're on the list!" }
}
