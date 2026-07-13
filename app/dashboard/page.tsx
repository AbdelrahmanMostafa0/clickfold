import type { Metadata } from "next";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description: "View your Clickfold campaign and link performance overview.",
  path: "/dashboard",
  noIndex: true,
  follow: false,
});

const page = () => {
  return (
    <AuthPageWrapper>
      <DashboardPage />
    </AuthPageWrapper>
  );
};

export default page;
