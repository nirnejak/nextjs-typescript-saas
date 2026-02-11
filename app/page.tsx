import * as motion from "motion/react-client"
import type * as React from "react"
import { BASE_TRANSITION } from "@/utils/animation"
import { getMetadata } from "@/utils/metadata"

export const metadata = getMetadata({
  path: "/",
  title: "Next.js App",
  description: "Next.js TypeScript SaaS Starter",
})

const Home: React.FC = () => {
  return (
    <main className="grid h-dvh place-content-center">
      <motion.h1
        initial={{ translateY: 20, opacity: 0, filter: `blur(10px)` }}
        animate={{ translateY: 0, opacity: 1, filter: "none" }}
        transition={{ delay: 0, ...BASE_TRANSITION }}
        className="font-bold text-5xl text-zinc-800 tracking-tighter dark:text-zinc-300"
      >
        Next.js TypeScript SaaS Starter!
      </motion.h1>
    </main>
  )
}

export default Home
