import type { Metadata } from "next";
import { Link } from "@/types/link";
import { absoluteUrl, SITE_NAME } from "@/lib/metadata";

function canonicalDestination(destination: string, fallbackPath: string) {
  try {
    const url = new URL(destination);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : absoluteUrl(fallbackPath);
  } catch {
    return absoluteUrl(fallbackPath);
  }
}

/**
 * Builds Next.js Metadata for a link based on its ogMode:
 * - "custom" / "original" → uses link.og (API populates it for both)
 * - "none" → disables OG with noindex
 */
export function buildLinkMetadata(link: Link, slug: string): Metadata {
  const shortLinkUrl = absoluteUrl(`/l/${encodeURIComponent(slug)}`);
  const canonical = canonicalDestination(
    link.destination,
    `/l/${encodeURIComponent(slug)}`,
  );

  if (link.ogMode === "none") {
    return {
      title: { absolute: SITE_NAME },
      alternates: { canonical },
      robots: { index: false, follow: true, nocache: true },
      openGraph: null,
      twitter: null,
    };
  }

  const { title, description, image } = link.og;

  return {
    title: { absolute: title || SITE_NAME },
    description,
    alternates: { canonical },
    robots: { index: false, follow: true, nocache: true },
    openGraph: {
      title,
      description,
      url: shortLinkUrl,
      siteName: SITE_NAME,
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(image ? { icons: { icon: image } } : {}),
  };
}
