import * as motion from "motion/react-client"
import type * as React from "react"

import WaitlistForm from "@/features/waitlist/components/WaitlistForm"
import { BASE_TRANSITION } from "@/utils/animation"

const Home: React.FC = () => {
  return (
    <main className="grid h-dvh place-content-center place-items-center gap-8 px-4">
      <motion.h1
        initial={{ translateY: 20, opacity: 0, filter: `blur(10px)` }}
        animate={{ translateY: 0, opacity: 1, filter: "none" }}
        transition={{ delay: 0, ...BASE_TRANSITION }}
        className="text-5xl font-bold tracking-tighter text-zinc-800 dark:text-zinc-300"
      >
        Next.js TypeScript SaaS Starter!
      </motion.h1>
      <WaitlistForm />
    </main>
  )
}

export default Home
