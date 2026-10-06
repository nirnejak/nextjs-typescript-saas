import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import type * as React from "react"

import classNames from "@/utils/classNames"

interface Props {
  children: React.ReactNode
}

const BlogWrapper: React.FC<Props> = ({ children }) => {
  return (
    <main className="mx-auto my-24 w-full max-w-170 px-4 md:px-0">
      <article
        className={classNames(
          "prose prose-zinc prose-img:mx-auto",
          "prose-blockquote:opacity-85 prose-p:opacity-85",
          "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:opacity-85",
          "prose-h1:text-3xl prose-h1:leading-snug",
          "prose-pre:bg-[#20252B] prose-pre:p-0 prose-pre:px-3 prose-code:text-sm",
          // Inline code only; typography already resets `pre code`
          "prose-code:before:hidden prose-code:after:hidden [&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:bg-zinc-100 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
          "prose-table:overflow-hidden prose-table:rounded-xl",
          "prose-thead:border-zinc-300 prose-tr:border-zinc-300 prose-th:bg-zinc-200 prose-tr:bg-zinc-100",
          "prose-td:px-3 prose-th:px-3 prose-td:py-3.5 prose-th:py-3.5"
        )}
      >
        {children}
      </article>
    </main>
  )
}

const components: MDXComponents = {
  a: ({
    href = "",
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={`underline underline-offset-2 hover:no-underline`}
          {...props}
        >
          {children}
        </Link>
      )
    }
    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          className={`underline underline-offset-2 hover:no-underline`}
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline underline-offset-2 hover:no-underline`}
        {...props}
      >
        {children}
      </a>
    )
  },
}

export function useMDXComponents(
  otherComponents: MDXComponents
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
    wrapper: BlogWrapper,
  }
}
