import type { MetadataRoute } from "next";
import { getRequestOrigin } from "@/lib/request-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/about", "/terms", "/privacy"];
  const origin = await getRequestOrigin();

  return staticRoutes.map((route) => ({
    url: new URL(route, origin).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
