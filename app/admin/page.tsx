import * as React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/utils/auth"

const AdminPage: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) return redirect("/auth/")

  return (
    <main>
      <section className="relative grid h-dvh place-content-center">
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
              className="
                flex w-full cursor-pointer items-center gap-2 bg-zinc-800 px-3
                py-2 text-sm text-zinc-200 transition-colors
                hover:bg-zinc-700
                focus:bg-zinc-950
              "
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
