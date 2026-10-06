import { headers } from "next/headers"
import type * as React from "react"

import {
  banUser,
  impersonateUser,
  unbanUser,
} from "@/features/auth/admin-actions"
import { auth } from "@/features/auth/server"
import { requireAdmin } from "@/features/auth/session"

export const metadata = { title: "Admin" }

const AdminPage: React.FC = async () => {
  const { user: currentUser } = await requireAdmin()
  const { users } = await auth.api.listUsers({
    query: { limit: 100, sortBy: "createdAt", sortDirection: "desc" },
    headers: await headers(),
  })

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Users</h1>
      <table className="w-full text-left text-sm">
        <thead className="text-zinc-500">
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-zinc-200">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.banned ? "banned" : user.role}</td>
              <td className="flex justify-end gap-3 py-2">
                {user.id !== currentUser.id && (
                  <>
                    {/* Better Auth doesn't allow impersonating admins */}
                    {user.role !== "admin" && (
                      <form action={impersonateUser.bind(null, user.id)}>
                        <button
                          type="submit"
                          className="cursor-pointer underline"
                        >
                          Impersonate
                        </button>
                      </form>
                    )}
                    <form
                      action={(user.banned ? unbanUser : banUser).bind(
                        null,
                        user.id
                      )}
                    >
                      <button
                        type="submit"
                        className="cursor-pointer underline"
                      >
                        {user.banned ? "Unban" : "Ban"}
                      </button>
                    </form>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default AdminPage
