import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/private/", "/admin/", "/api/"],
        crawlDelay: 0,
      },
    ],
    sitemap: "https://expenvisor.com/sitemap.xml",
    host: "https://expenvisor.com",
  };
}
