import * as React from "react"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

const AdminPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) return redirect("/auth/")

  return (
    <main>
      <section className="grid place-content-center h-dvh relative">
        <div className="flex flex-col gap-4">
          <p>
            Welcome{" "}
            <span className="underline underline-offset-2">
              {session.user.name}
            </span>
            !
          </p>
          <form
            action={async () => {
              "use server"
              await auth.api.signOut({
                headers: await headers(),
              })
              redirect("/auth/")
            }}
          >
            <button
              className="w-full px-3 py-2 text-sm cursor-pointer flex gap-2 items-center transition-colors bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-950 text-zinc-200"
              type="submit"
            >
              Sign Out
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default AdminPage
