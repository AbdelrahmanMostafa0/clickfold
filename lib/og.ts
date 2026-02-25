import { Metadata } from "next";
import { Link } from "@/types/link";

/**
 * Builds Next.js Metadata for a b8lnk based on its ogMode:
 * - "custom" / "original" → uses link.og (API populates it for both)
 * - "none" → disables OG with noindex
 */
export function buildLinkMetadata(og: any): Metadata {
  if (og.ogMode === "none") {
    return {
      title: "",
      description: "",
      openGraph: null,
      twitter: null,
    };
  }

  const { title, description, image } = og;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(image ? { icons: { icon: image } } : {}),
  };
}
