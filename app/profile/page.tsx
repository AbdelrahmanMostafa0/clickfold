import type { Metadata } from "next";
import ProfilePageClient from "@/components/profile/ProfilePageClient";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Profile Settings",
  description: "Manage your Clickfold profile, account, and security settings.",
  path: "/profile",
  noIndex: true,
  follow: false,
});

export default function ProfilePage() {
  return (
    <AuthPageWrapper>
      <ProfilePageClient />
    </AuthPageWrapper>
  );
}
