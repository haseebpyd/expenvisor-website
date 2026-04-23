import type { Metadata } from "next";

interface ToolMetadataConfig {
  name: string;
  description: string;
  keywords: string[];
  slug: string;
}

export function generateToolMetadata(config: ToolMetadataConfig): Metadata {
  const { name, description, keywords, slug } = config;
  const title = `${name} Calculator - Free 2025 | Expenvisor`;
  const url = `/tools/${slug}`;
  const fullUrl = `https://expenvisor.com${url}`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Expenvisor",
      type: "website",
      images: [
        {
          url: "https://expenvisor.com/og-tools.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://expenvisor.com/og-tools.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

