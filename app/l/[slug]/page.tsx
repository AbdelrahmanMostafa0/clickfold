import { cache } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getLinkOg } from "@/services/links";
import { Link } from "@/types/link";
import { buildLinkMetadata } from "@/lib/og";
import { createPageMetadata } from "@/lib/metadata";
import LinkNotFound from "@/components/links/LinkNotFound";
import LinkInactive from "@/components/links/LinkInactive";

const BOT_UA_PATTERN =
  /bot|crawl|spider|facebookexternalhit|Twitterbot|Slackbot|Discordbot|LinkedInBot|TelegramBot|WhatsApp|SkypeUriPreview|Applebot|Pinterest|vkShare|redditbot/i;

// Shared between generateMetadata and the page render for a single request.
const fetchLinkOg = cache(async (slug: string) => {
  const res = await getLinkOg(slug);
  return (res?.data as Link | null) ?? null;
});

type RedirectResult =
  | { status: "not-found" }
  | { status: "inactive" }
  | { status: "active"; destination: string };

async function recordClickAndResolve(
  slug: string,
  incomingHeaders: Headers,
): Promise<RedirectResult> {
  // middleware.ts captures the real visitor IP at the very first hop
  // (browser -> this app) and stamps it on the request; read that instead
  // of re-deriving it here, so there's a single source of truth for it.
  const visitorIp =
    incomingHeaders.get("x-real-client-ip") ||
    incomingHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    incomingHeaders.get("x-real-ip") ||
    "";

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/links/redirect/${slug}`,
  );
  if (visitorIp) url.searchParams.set("ip", visitorIp);

  const res = await fetch(url, {
    headers: {
      "user-agent": incomingHeaders.get("user-agent") ?? "",
      referer: incomingHeaders.get("referer") ?? "",
      // Kept as a fallback in case the query param is ever stripped;
      // this fetch is server-to-server so it isn't the visitor's own
      // x-forwarded-for chain anymore, just a best-effort mirror of it.
      "x-forwarded-for": visitorIp,
      "x-vercel-ip-country": incomingHeaders.get("x-vercel-ip-country") ?? "",
      "x-vercel-ip-city": incomingHeaders.get("x-vercel-ip-city") ?? "",
    },
    cache: "no-store",
  });

  if (!res.ok) return { status: "not-found" };

  const body = await res.json().catch(() => null);
  const link: Link | null = body?.data ?? null;
  if (!link) return { status: "not-found" };
  if (!link.isActive) return { status: "inactive" };
  return { status: "active", destination: link.destination };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = await fetchLinkOg(slug);

  if (!link) {
    return createPageMetadata({
      title: "Link Not Found",
      description: "This Clickfold short link could not be found.",
      path: `/l/${encodeURIComponent(slug)}`,
      noIndex: true,
      follow: false,
      includeImage: false,
    });
  }

  if (!link.isActive) {
    return createPageMetadata({
      title: "Link Inactive",
      description: "This Clickfold short link is no longer active.",
      path: `/l/${encodeURIComponent(slug)}`,
      noIndex: true,
      follow: false,
      includeImage: false,
    });
  }

  return buildLinkMetadata(link, slug);
}

export default async function LinkRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const incomingHeaders = await headers();
  const userAgent = incomingHeaders.get("user-agent") ?? "";
  const isBot = BOT_UA_PATTERN.test(userAgent);

  if (isBot) {
    // Crawlers don't run JS and don't need a click recorded — they only
    // need generateMetadata's OG tags, already resolved for this request.
    const link = await fetchLinkOg(slug);
    if (!link) return <LinkNotFound />;
    if (!link.isActive) return <LinkInactive />;
    return null;
  }

  const result = await recordClickAndResolve(slug, incomingHeaders);

  if (result.status === "not-found") return <LinkNotFound />;
  if (result.status === "inactive") return <LinkInactive />;

  redirect(result.destination);
}
