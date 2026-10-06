import type { Metadata } from "next"

import config from "@/config"

interface MetadataArgs {
  path: string
  title: string
  description: string
  image?: string
}

// Page-level metadata. Site-wide defaults live in app/layout.tsx
export const getMetadata = ({
  path,
  title,
  description,
  image,
}: MetadataArgs): Metadata => {
  // A page-level openGraph replaces the inherited one, so point at the
  // generated app/opengraph-image.tsx explicitly (trailing slash avoids a 308)
  const images = [image ?? "/opengraph-image/"]

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: config.appName,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: config.twitterSite,
      creator: config.twitterCreator,
      title,
      description,
      images,
    },
  }
}
