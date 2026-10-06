import Link from "next/link"
import type * as React from "react"

import PasskeyButton from "@/features/auth/components/PasskeyButton"
import SignOutButton from "@/features/auth/components/SignOutButton"
import StopImpersonatingButton from "@/features/auth/components/StopImpersonatingButton"
import { requireSession } from "@/features/auth/session"
import ManageBillingButton from "@/features/billing/components/ManageBillingButton"
import { billingEnabled } from "@/features/billing/config"

export const metadata = { title: "Dashboard" }

const DashboardPage: React.FC = async () => {
  const { user, session } = await requireSession()

  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="flex w-72 flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome, {user.name}
        </h1>
        <p className="text-sm text-zinc-500">{user.email}</p>
        {user.role === "admin" && (
          <Link href="/admin/" className="text-sm underline">
            Admin
          </Link>
        )}
        {billingEnabled && <ManageBillingButton />}
        <PasskeyButton mode="add" />
        {session.impersonatedBy && <StopImpersonatingButton />}
        <SignOutButton />
      </div>
    </main>
  )
}

export default DashboardPage
