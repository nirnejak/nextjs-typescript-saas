import { redirect } from "next/navigation"
import type * as React from "react"

import PasskeyButton from "@/features/auth/components/PasskeyButton"
import SignInButtons from "@/features/auth/components/SignInButtons"
import { enabledProviders } from "@/features/auth/providers"
import { getSession } from "@/features/auth/session"
import { getMetadata } from "@/utils/metadata"

export const metadata = getMetadata({
  path: "/sign-in/",
  title: "Sign in",
  description: "Sign in to your account",
})

const SignInPage: React.FC = async () => {
  if ((await getSession()) !== null) redirect("/dashboard/")

  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="flex w-72 flex-col gap-3">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">Sign in</h1>
        <SignInButtons providers={enabledProviders} />
        <PasskeyButton mode="sign-in" />
      </div>
    </main>
  )
}

export default SignInPage
