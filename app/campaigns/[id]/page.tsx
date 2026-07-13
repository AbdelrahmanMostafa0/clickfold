import type { Metadata } from "next";
import CampaignDetailPage from "@/components/campaigns/CampaignDetailPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: "Campaign Details",
    description: "Review campaign links and performance in Clickfold.",
    path: `/campaigns/${encodeURIComponent(id)}`,
    noIndex: true,
    follow: false,
  });
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <AuthPageWrapper>
      <CampaignDetailPage id={id} />
    </AuthPageWrapper>
  );
};

export default page;
