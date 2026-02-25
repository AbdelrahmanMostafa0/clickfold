import { getLinkOg } from "@/services/links";
import { Link } from "@/types/link";
import { buildLinkMetadata } from "@/lib/og";
import LinkRedirectClient from "@/components/links/LinkRedirectClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const res = await getLinkOg(slug);
  const link: Link | null = res?.data ?? null;

  if (!link) {
    return { title: "Link Not Found" };
  }

  if (!link.isActive) {
    return { title: "Link Inactive" };
  }

  return buildLinkMetadata(link);
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return <LinkRedirectClient slug={slug} />;
};

export default page;
