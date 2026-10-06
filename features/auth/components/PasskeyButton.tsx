"use client"

import { useRouter } from "next/navigation"
import * as React from "react"

import { authClient } from "@/features/auth/client"

interface Props {
  mode: "sign-in" | "add"
}

const PasskeyButton: React.FC<Props> = ({ mode }) => {
  const router = useRouter()
  const [message, setMessage] = React.useState<string | null>(null)

  const handleClick = async (): Promise<void> => {
    setMessage(null)
    const { error } =
      mode === "sign-in"
        ? await authClient.signIn.passkey()
        : await authClient.passkey.addPasskey()
    if (error) {
      setMessage(error.message ?? "Passkey request failed")
      return
    }
    if (mode === "sign-in") router.push("/dashboard/")
    else setMessage("Passkey added")
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => void handleClick()}
        className="w-full cursor-pointer border border-zinc-800 px-3 py-2 text-sm transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800 dark:hover:bg-zinc-800"
      >
        {mode === "sign-in" ? "Sign in with a passkey" : "Add a passkey"}
      </button>
      {message !== null && (
        <p role="status" className="text-xs text-zinc-500">
          {message}
        </p>
      )}
    </div>
  )
}

export default PasskeyButton
