"use client"

import * as React from "react"

import { joinWaitlist, type WaitlistState } from "@/features/waitlist/actions"
import classNames from "@/utils/classNames"

const initialState: WaitlistState = { status: "idle", message: "" }

const WaitlistForm: React.FC = () => {
  const [state, formAction, isPending] = React.useActionState(
    joinWaitlist,
    initialState
  )

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="flex-1 border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700 disabled:opacity-60"
        >
          {isPending ? "Joining..." : "Join waitlist"}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={classNames(
          "min-h-5 text-sm",
          state.status === "error" ? "text-red-600" : "text-zinc-500"
        )}
      >
        {state.message}
      </p>
    </form>
  )
}

export default WaitlistForm
