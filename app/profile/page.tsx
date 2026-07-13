import ProfilePageClient from "@/components/profile/ProfilePageClient";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

export default function ProfilePage() {
  return (
    <AuthPageWrapper>
      <ProfilePageClient />
    </AuthPageWrapper>
  );
}
