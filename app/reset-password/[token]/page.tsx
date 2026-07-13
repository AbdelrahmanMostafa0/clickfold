import type { Metadata } from "next";
import ResetPasswordPage from "@/components/auth/ResetPasswordPage";
import { createPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;

  return createPageMetadata({
    title: "Reset Password",
    description: "Choose a new password for your Clickfold account.",
    path: `/reset-password/${encodeURIComponent(token)}`,
    noIndex: true,
    follow: false,
    includeImage: false,
  });
}

const page = () => {
  return <ResetPasswordPage />;
};

export default page;
