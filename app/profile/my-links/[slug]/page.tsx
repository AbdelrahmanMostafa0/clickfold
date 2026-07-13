import LinkAnalyticsPage from "@/components/links/my-links/LinkAnalyticsPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <AuthPageWrapper>
      <LinkAnalyticsPage slug={slug} />
    </AuthPageWrapper>
  );
};

export default page;
