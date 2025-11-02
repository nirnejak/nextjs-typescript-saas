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
      <section className="p-6 md:p-15 h-dvh">
        <div className="grid place-content-center h-full bg-zinc-100 relative">
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
                className="border-dashed w-full border border-zinc-300 transition-colors focus:border-zinc-800 hover:border-zinc-800 bg-zinc-50 px-3 py-2 text-sm cursor-pointer text-center"
                type="submit"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminPage
