"use client"

import { useRouter } from "next/navigation"
import type * as React from "react"

import { authClient } from "@/features/auth/client"

const StopImpersonatingButton: React.FC = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        void authClient.admin.stopImpersonating().then(() => {
          router.push("/admin/")
          router.refresh()
        })
      }}
      className="w-full cursor-pointer bg-amber-500 px-3 py-2 text-sm text-zinc-950 transition-colors hover:bg-amber-400"
    >
      Stop impersonating
    </button>
  )
}

export default StopImpersonatingButton
