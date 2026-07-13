import type { Metadata } from "next";
import ForgotPasswordPage from "@/components/auth/ForgotPasswordPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Forgot Password",
  description: "Request a secure password reset link for your Clickfold account.",
  path: "/forgot-password",
  noIndex: true,
  follow: false,
  includeImage: false,
});

const page = () => {
  return <ForgotPasswordPage />;
};

export default page;
