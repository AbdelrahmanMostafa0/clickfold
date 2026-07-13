import type { Metadata } from "next";
import CampaignsPage from "@/components/campaigns/CampaignsPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Campaigns",
  description: "Organize and manage your Clickfold link campaigns.",
  path: "/campaigns",
  noIndex: true,
  follow: false,
});

const page = () => {
  return (
    <AuthPageWrapper>
      <CampaignsPage />
    </AuthPageWrapper>
  );
};

export default page;
