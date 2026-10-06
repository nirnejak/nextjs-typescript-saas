import type * as React from "react"

import config from "@/config"

// https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
// Test at https://search.google.com/test/rich-results
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: config.appName,
      description: config.appDescription,
      url: `${config.baseUrl}/`,
    },
    {
      "@type": "Organization",
      name: config.appName,
      url: `${config.baseUrl}/`,
      logo: `${config.baseUrl}/icon`,
    },
  ],
}

export const renderSchemaTags = (): React.ReactNode => (
  <script
    type="application/ld+json"
    // Escape "<" so content can't close the script tag
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema).replaceAll("<", "\\u003c"),
    }}
  />
)
