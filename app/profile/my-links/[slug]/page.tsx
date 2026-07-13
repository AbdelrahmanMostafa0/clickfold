import type { Metadata } from "next";
import LinkAnalyticsPage from "@/components/links/my-links/LinkAnalyticsPage";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return createPageMetadata({
    title: "Link Analytics",
    description: "Review clicks, referrers, devices, and locations for a Clickfold link.",
    path: `/profile/my-links/${encodeURIComponent(slug)}`,
    noIndex: true,
    follow: false,
  });
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <AuthPageWrapper>
      <LinkAnalyticsPage slug={slug} />
    </AuthPageWrapper>
  );
};

export default page;
