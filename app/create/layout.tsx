import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Create a Link",
  description: "Create and customize a campaign-ready short link in Clickfold.",
  path: "/create",
  noIndex: true,
  follow: false,
});

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
