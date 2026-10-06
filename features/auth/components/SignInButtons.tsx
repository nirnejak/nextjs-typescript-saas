"use client"

import { GoogleFill, XFill } from "akar-icons"
import type * as React from "react"

import { authClient } from "@/features/auth/client"
import type { Provider } from "@/features/auth/providers"

const AppleIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    width={16}
    height={16}
    viewBox="0 0 814 1000"
    fill="currentColor"
  >
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
  </svg>
)

const PROVIDERS: Record<Provider, { label: string; icon: React.ReactNode }> = {
  google: { label: "Continue with Google", icon: <GoogleFill size={16} /> },
  apple: { label: "Continue with Apple", icon: <AppleIcon /> },
  twitter: { label: "Continue with X", icon: <XFill size={16} /> },
}

interface Props {
  providers: Provider[]
}

const SignInButtons: React.FC<Props> = ({ providers }) => {
  return providers.map((provider) => (
    <button
      key={provider}
      type="button"
      onClick={() => {
        void authClient.signIn.social({
          provider,
          callbackURL: "/dashboard/",
        })
      }}
      className="flex w-full cursor-pointer items-center gap-2 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
    >
      {PROVIDERS[provider].icon}
      {PROVIDERS[provider].label}
    </button>
  ))
}

export default SignInButtons
