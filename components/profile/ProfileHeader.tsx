import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";

const ProfileHeader = ({
  avatarPreview,
}: {
  avatarPreview: string | null | undefined;
}) => {
  const { user, isLoading, refetchUser } = useUser();
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="flex items-center gap-4 flex-wrap sm:justify-start justify-center border-b border-white/10 pb-6">
      <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center overflow-hidden">
        {(avatarPreview as string) || (user?.avatar as string) ? (
          <Image
            src={(avatarPreview as string) || (user?.avatar as string)}
            alt={user?.name || ""}
            className="w-full h-full object-cover"
            width={64}
            height={64}
          />
        ) : (
          <span className="text-xl font-bold text-[#ff2d2d]">
            {userInitials}
          </span>
        )}
      </div>
      <div className="text-center sm:text-start">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          {user?.name}
        </h1>
        <p className="text-[#666] text-sm">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
