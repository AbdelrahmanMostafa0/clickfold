import DashboardPage from "@/components/dashboard/DashboardPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const page = () => {
  return (
    <AuthPageWrapper>
      <DashboardPage />
    </AuthPageWrapper>
  );
};

export default page;
