"use client";

import { useState } from "react";

import { useUser } from "@/context/UserContext";
import ProfileHeader from "./ProfileHeader";
import { LinksStats } from "./LinksStats";
import AvatarUpdate from "./AvatarUpdate";
import InfoUpdate from "./InfoUpdate";
import ProfileSecurity from "./ProfileSecurity";

export default function ProfilePageClient() {
  const { user } = useUser();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <ProfileHeader avatarPreview={avatarPreview} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.72fr_1.28fr]">
          <LinksStats />
          <div className="space-y-6">
            <AvatarUpdate
              avatarPreview={avatarPreview}
              userInitials={userInitials}
              setAvatarPreview={setAvatarPreview}
            />
            <InfoUpdate />
            <ProfileSecurity />
          </div>
        </div>
      </div>
    </main>
  );
}
