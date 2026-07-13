import CampaignsPage from "@/components/campaigns/CampaignsPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const page = () => {
  return (
    <AuthPageWrapper>
      <CampaignsPage />
    </AuthPageWrapper>
  );
};

export default page;
