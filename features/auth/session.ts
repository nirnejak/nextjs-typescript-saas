import "server-only"

import { headers } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { cache } from "react"

import { auth } from "./server"

// Deduped per request, so layouts and pages can both call it
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
)

export const requireSession = async () => {
  const session = await getSession()
  if (session === null) redirect("/sign-in/")
  return session
}

export const requireAdmin = async () => {
  const session = await requireSession()
  if (session.user.role !== "admin") notFound()
  return session
}
