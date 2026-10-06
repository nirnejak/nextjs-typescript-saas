import type * as React from "react"

import PasskeyButton from "@/features/auth/components/PasskeyButton"
import SignOutButton from "@/features/auth/components/SignOutButton"
import { requireSession } from "@/features/auth/session"

export const metadata = { title: "Dashboard" }

const DashboardPage: React.FC = async () => {
  const { user } = await requireSession()

  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="flex w-72 flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome, {user.name}
        </h1>
        <p className="text-sm text-zinc-500">{user.email}</p>
        <PasskeyButton mode="add" />
        <SignOutButton />
      </div>
    </main>
  )
}

export default DashboardPage
