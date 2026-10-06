"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "./server"
import { requireAdmin } from "./session"

export const banUser = async (userId: string): Promise<void> => {
  await requireAdmin()
  await auth.api.banUser({ body: { userId }, headers: await headers() })
  revalidatePath("/admin/")
}

export const unbanUser = async (userId: string): Promise<void> => {
  await requireAdmin()
  await auth.api.unbanUser({ body: { userId }, headers: await headers() })
  revalidatePath("/admin/")
}

export const impersonateUser = async (userId: string): Promise<void> => {
  await requireAdmin()
  await auth.api.impersonateUser({
    body: { userId },
    headers: await headers(),
  })
  redirect("/dashboard/")
}
