declare module "*.svg" {
  //eslint-disable-next-line @typescript-eslint/no-require-imports
  import React = require("react")
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module "*.json" {
  const content: string
  export default content
}

declare module "*.wav"

declare module "*.mdx" {
  import type * as React from "react"
  const content: React.ComponentType<Record<string, unknown>>
  export default content
}
