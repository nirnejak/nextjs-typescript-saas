"use client"

import { useRouter } from "next/navigation"
import type * as React from "react"

import { authClient } from "@/features/auth/client"

interface Props {
  disabled: boolean
}

const CheckoutButton: React.FC<Props> = ({ disabled }) => {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (session === null) {
          router.push("/sign-in/")
          return
        }
        void authClient.checkout({ slug: "pro" })
      }}
      className="w-full cursor-pointer bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {disabled ? "Billing not configured" : "Upgrade to Pro"}
    </button>
  )
}

export default CheckoutButton
