"use client";

import { useState, useRef } from "react";

import { useUser } from "@/context/UserContext";
import Unauthorized from "@/components/links/create-link/Unauthorized";
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
    <main className="min-h-screen pt-24 pb-20 px-4 noise-bg relative">
      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader avatarPreview={avatarPreview} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LinksStats />
          <div className="md:col-span-2 space-y-6">
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
