import LinkAnalyticsPage from "@/components/links/my-links/LinkAnalyticsPage";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <AuthPageWarpper>
      <LinkAnalyticsPage slug={slug} />
    </AuthPageWarpper>
  );
};

export default page;
