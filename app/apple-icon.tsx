import { ImageResponse } from "next/og"

import config from "@/config"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

const AppleIcon = (): ImageResponse =>
  new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderRadius: 0,
        background: "#18181b",
        color: "#fafafa",
        fontSize: 110,
        fontWeight: 700,
      }}
    >
      {config.appName.charAt(0)}
    </div>,
    size
  )

export default AppleIcon
