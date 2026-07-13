import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function ProfileHeader({ avatarPreview }: { avatarPreview?: string | null }) {
  const { user } = useUser();
  const userInitials = user?.name
    ? user.name.split(" ").map((name: string) => name[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  const avatar = avatarPreview || user?.avatar;

  return (
    <header className="grid gap-7 border-b-2 border-foreground pb-9 sm:grid-cols-[auto_1fr] sm:items-end">
      <div className="flex size-24 items-center justify-center overflow-hidden border-2 border-foreground bg-primary">
        {avatar ? (
          <Image src={avatar} alt={user?.name || "Profile image"} className="h-full w-full object-cover" width={96} height={96} />
        ) : (
          <span className="text-3xl font-black text-primary-foreground">{userInitials}</span>
        )}
      </div>
      <div>
        <span className="eyebrow">Profile and security</span>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">{user?.name || "Your workspace"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>
      </div>
    </header>
  );
}
