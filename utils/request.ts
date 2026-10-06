import "server-only"

import { headers } from "next/headers"

export const getClientIp = async (): Promise<string> => {
  const headerList = await headers()
  const forwardedFor = headerList.get("x-forwarded-for")
  return (
    forwardedFor?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown"
  )
}
