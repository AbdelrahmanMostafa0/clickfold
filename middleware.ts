import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-real-client-ip", ip);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: "/l/:slug*",
};
