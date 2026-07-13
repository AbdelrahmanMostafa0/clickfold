import { headers } from "next/headers";
import { SITE_URL } from "@/lib/metadata";

function firstHeaderValue(value: string | null) {
  return value?.split(",", 1)[0]?.trim();
}

export async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host =
    firstHeaderValue(requestHeaders.get("x-forwarded-host")) ||
    firstHeaderValue(requestHeaders.get("host"));

  if (!host) return SITE_URL.origin;

  const forwardedProtocol = firstHeaderValue(
    requestHeaders.get("x-forwarded-proto"),
  );
  const isLocalHost =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]");
  const protocol = forwardedProtocol || (isLocalHost ? "http" : "https");

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return SITE_URL.origin;
  }
}
