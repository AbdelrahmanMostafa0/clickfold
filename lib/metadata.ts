import type { Metadata } from "next";

export const SITE_NAME = "Clickfold";
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://clickfold.app",
);

export const DEFAULT_DESCRIPTION =
  "Create branded short links, control social previews, organize campaigns, and understand every click with focused analytics for independent teams.";

export const DEFAULT_OG_IMAGE = {
  url: "/clickfold-campaign-links-og.jpg",
  width: 1200,
  height: 630,
  alt: "Clickfold — Every link has a job",
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  follow?: boolean;
  includeImage?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  follow = true,
  includeImage = true,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const images = includeImage ? [DEFAULT_OG_IMAGE] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? {
          index: false,
          follow,
          nocache: true,
          googleBot: { index: false, follow, noimageindex: !includeImage },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
