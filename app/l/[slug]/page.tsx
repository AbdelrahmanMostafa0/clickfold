import RedirectWithPopups from "@/components/links/RedirectWithPopups";
import LinkNotFound from "@/components/links/LinkNotFound";
import LinkInactive from "@/components/links/LinkInactive";
import { getLinkOg, redirectLink } from "@/services/links";
import { Link } from "@/types/link";
import { buildLinkMetadata } from "@/lib/og";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const res = await getLinkOg(slug);
  const og: any | null = res?.data ?? null;

  if (!og) {
    return { title: "Link Not Found" };
  }

  return buildLinkMetadata(og);
}
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const res = await redirectLink(slug);
  const link: Link | null = res?.data ?? null;

  /* Link doesn't exist */
  if (!link) {
    return <LinkNotFound />;
  }

  /* Link is deactivated */
  if (!link.isActive) {
    return <LinkInactive />;
  }

  /* Sus popups enabled → show chaos first */
  if (link.susPopups) {
    return <RedirectWithPopups link={link} />;
  }

  /* Normal redirect */
  redirect(link.destination);
};

export default page;
