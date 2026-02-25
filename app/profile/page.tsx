import ProfilePageClient from "@/components/profile/ProfilePageClient";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

export default function ProfilePage() {
  return (
    <AuthPageWarpper>
      <ProfilePageClient />
    </AuthPageWarpper>
  );
}
