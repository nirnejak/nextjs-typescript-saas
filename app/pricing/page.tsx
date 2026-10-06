import type * as React from "react"

import CheckoutButton from "@/features/billing/components/CheckoutButton"
import { billingEnabled } from "@/features/billing/config"
import { getMetadata } from "@/utils/metadata"

export const metadata = getMetadata({
  path: "/pricing/",
  title: "Pricing",
  description: "Plans and pricing",
})

const PricingPage: React.FC = () => {
  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="flex w-72 flex-col gap-3 border border-zinc-200 p-6 dark:border-zinc-800">
        <h1 className="text-2xl font-semibold tracking-tight">Pro</h1>
        <p className="text-sm text-zinc-500">Everything, unlimited.</p>
        <CheckoutButton disabled={!billingEnabled} />
      </div>
    </main>
  )
}

export default PricingPage
