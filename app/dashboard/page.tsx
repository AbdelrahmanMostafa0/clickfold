import DashboardPage from "@/components/dashboard/DashboardPage";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

const page = () => {
  return (
    <AuthPageWarpper>
      <DashboardPage />
    </AuthPageWarpper>
  );
};

export default page;
