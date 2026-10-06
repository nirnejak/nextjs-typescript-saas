import { ImageResponse } from "next/og"

import config from "@/config"

export const alt = config.appName
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const OpengraphImage = (): ImageResponse =>
  new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 96,
        background: "#fafafa",
      }}
    >
      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#18181b",
        }}
      >
        {config.appName}
      </div>
      <div style={{ marginTop: 24, fontSize: 40, color: "#71717a" }}>
        {config.appDescription}
      </div>
    </div>,
    size
  )

export default OpengraphImage
