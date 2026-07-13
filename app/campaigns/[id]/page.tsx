import CampaignDetailPage from "@/components/campaigns/CampaignDetailPage";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <AuthPageWarpper>
      <CampaignDetailPage id={id} />
    </AuthPageWarpper>
  );
};

export default page;
