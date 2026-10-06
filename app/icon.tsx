import { ImageResponse } from "next/og"

import config from "@/config"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

const Icon = (): ImageResponse =>
  new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderRadius: 8,
        background: "#18181b",
        color: "#fafafa",
        fontSize: 20,
        fontWeight: 700,
      }}
    >
      {config.appName.charAt(0)}
    </div>,
    size
  )

export default Icon
