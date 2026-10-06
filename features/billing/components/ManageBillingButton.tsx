"use client"

import type * as React from "react"

import { authClient } from "@/features/auth/client"

const ManageBillingButton: React.FC = () => {
  return (
    <button
      type="button"
      onClick={() => {
        void authClient.customer.portal()
      }}
      className="w-full cursor-pointer border border-zinc-800 px-3 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      Manage billing
    </button>
  )
}

export default ManageBillingButton
