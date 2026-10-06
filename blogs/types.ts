import type { StaticImageData } from "next/image"

export interface BlogMetadata {
  title: string
  description: string
  // ISO date, e.g. "2025-02-04"
  publishedOn: string
  cover: StaticImageData
}
