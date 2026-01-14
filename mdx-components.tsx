import * as React from "react"

import type { MDXComponents } from "mdx/types"
import { Link } from "next-view-transitions"
import { codeToHtml } from "shiki"

import classNames from "@/utils/classNames"

interface Props {
  children: React.ReactNode
}

const BlogWrapper: React.FC<Props> = ({ children }) => {
  return (
    <main
      className="
        mx-auto my-24 w-full max-w-170 px-4
        md:px-0
      "
    >
      <article
        className={classNames(
          "prose prose-zinc prose-img:mx-auto",
          "prose-p:opacity-85 prose-blockquote:opacity-85",
          "prose-headings:opacity-85 prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-h1:text-3xl prose-h1:leading-snug",
          "prose-pre:p-0 prose-pre:bg-[#20252B] prose-code:text-sm prose-pre:px-3",
          "prose-table:rounded-xl prose-table:overflow-hidden",
          "prose-thead:border-zinc-300 prose-th:bg-zinc-200 prose-tr:bg-zinc-100 prose-tr:border-zinc-300 ",
          "prose-th:py-3.5 prose-th:px-3 prose-td:py-3.5 prose-td:px-3"
        )}
      >
        {children}
      </article>
    </main>
  )
}

const components: MDXComponents = {
  code: async ({
    className = "",
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    const isInline = !className.includes("language-")

    const codeHTML = await codeToHtml(children as string, {
      lang: className != null ? className.replace(/language-/, "") : "text",
      theme: "plastic",
    })

    if (isInline) {
      return (
        <code
          className="
            rounded-sm bg-zinc-100 px-1.5 py-0.5 font-semibold text-blue-600
            before:hidden
            after:hidden
          "
          {...props}
        >
          {(children as string).replaceAll("`", "")}
        </code>
      )
    } else {
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    }
  },
  a: ({
    href = "",
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"a">) => {
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={`
            underline underline-offset-2
            hover:no-underline
          `}
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
          className={`
            underline underline-offset-2
            hover:no-underline
          `}
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
        className={`
          underline underline-offset-2
          hover:no-underline
        `}
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
