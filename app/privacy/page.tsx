import type { Metadata } from "next";
import PrivacyPage from "@/components/content/PrivacyPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Clickfold handles account information, campaign links, analytics data, and privacy choices.",
  path: "/privacy",
});

const page = () => {
  return <PrivacyPage />;
};

export default page;
