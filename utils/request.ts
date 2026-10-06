import "server-only"

import { isIP } from "node:net"

import { headers } from "next/headers"

// Trusts x-real-ip, then x-forwarded-for only when it holds a single valid IP,
// so a client can't spoof a fresh value per request by appending to the chain.
// Vercel sets both headers; behind your own proxy, have it overwrite x-real-ip.
// Requests without a usable IP share the "unknown" bucket
export const getClientIp = async (): Promise<string> => {
  const headerList = await headers()
  for (const name of ["x-real-ip", "x-forwarded-for"]) {
    const value = headerList.get(name)?.trim()
    if (value !== undefined && isIP(value) !== 0) return value
  }
  return "unknown"
}
