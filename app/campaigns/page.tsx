import CampaignsPage from "@/components/campaigns/CampaignsPage";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

const page = () => {
  return (
    <AuthPageWarpper>
      <CampaignsPage />
    </AuthPageWarpper>
  );
};

export default page;
