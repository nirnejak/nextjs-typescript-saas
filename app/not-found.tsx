import * as React from "react"

import { Link } from "next-view-transitions"

import { getMetadata } from "@/utils/metadata"

export const metadata = getMetadata({
  path: "/",
  title: "Not Found | Next.js App",
  description: "Page not found on Next.js TypeScript SaaS Starter",
})

const NotFound: React.FC = () => {
  return (
    <main>
      <section className="grid min-h-dvh place-content-center">
        <div className="text-center">
          <h1 className="mb-5 text-5xl font-bold tracking-tighter text-zinc-800 dark:text-zinc-300">
            404
          </h1>
          <p className="text-base text-zinc-800 dark:text-zinc-300 tracking-tight">
            The page you&apos;re looking for cannot be found. Go{" "}
            <Link
              href="/"
              className="font-semibold hover:underline focus:underline"
            >
              Home
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default NotFound
