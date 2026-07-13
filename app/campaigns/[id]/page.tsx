import CampaignDetailPage from "@/components/campaigns/CampaignDetailPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <AuthPageWrapper>
      <CampaignDetailPage id={id} />
    </AuthPageWrapper>
  );
};

export default page;
