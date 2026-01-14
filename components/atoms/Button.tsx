import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import classNames from "@/utils/classNames"

const buttonVariants = cva("rounded-md", {
  variants: {
    variant: {
      primary: "bg-white",
      secondary: "bg-gray-400",
    },
    size: {
      sm: "px-5 py-1.5 text-sm",
      md: "px-6 py-2",
      lg: "px-8 py-3 text-lg",
    },
    defaultVariants: {
      // eslint-disable-next-line better-tailwindcss/no-unknown-classes
      variant: "secondary",
      // eslint-disable-next-line better-tailwindcss/no-unknown-classes
      size: "md",
    },
  },
})

export interface Props
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<Props> = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  )
}

export default Button
