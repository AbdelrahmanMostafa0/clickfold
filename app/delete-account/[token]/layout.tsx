import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;

  return createPageMetadata({
    title: "Delete Account",
    description: "Confirm the permanent deletion of a Clickfold account.",
    path: `/delete-account/${encodeURIComponent(token)}`,
    noIndex: true,
    follow: false,
    includeImage: false,
  });
}

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
