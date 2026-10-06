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
        {enabledProviders.length === 0 &&
          process.env.NODE_ENV === "development" && (
            <p className="text-sm text-zinc-500">
              No sign-in provider is configured. Set the AUTH_GOOGLE_*,
              AUTH_APPLE_* or AUTH_TWITTER_* vars in .env to create an account;
              passkeys can be added after signing in.
            </p>
          )}
        <PasskeyButton mode="sign-in" />
      </div>
    </main>
  )
}

export default SignInPage
