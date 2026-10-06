import type * as React from "react"

import { requireSession } from "@/features/auth/session"

interface Props {
  children: React.ReactNode
}

// Every page in (app) requires a signed-in user
const AppLayout: React.FC<Props> = async ({ children }) => {
  await requireSession()
  return children
}

export default AppLayout
