"use client"

import { useRouter } from "next/navigation"
import type * as React from "react"

import { authClient } from "@/features/auth/client"

const SignOutButton: React.FC = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => {
        void authClient.signOut().then(() => {
          router.push("/sign-in/")
        })
      }}
      className="w-full cursor-pointer bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
    >
      Sign out
    </button>
  )
}

export default SignOutButton
