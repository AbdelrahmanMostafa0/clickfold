import type { MetadataRoute } from "next";
import { getRequestOrigin } from "@/lib/request-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getRequestOrigin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", origin).toString(),
    host: origin,
  };
}
