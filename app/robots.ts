import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/admin/",
          "/api/",
          "/_next/",
          "/.next/",
          "/node_modules/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/private/",
          "/admin/",
          "/api/",
          "/_next/",
          "/.next/",
          "/node_modules/",
        ],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/private/",
          "/admin/",
          "/api/",
          "/_next/",
          "/.next/",
          "/node_modules/",
        ],
        crawlDelay: 0,
      },
    ],
    sitemap: "https://expenvisor.com/sitemap.xml",
    host: "https://expenvisor.com",
  };
}
