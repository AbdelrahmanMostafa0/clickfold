"use client";
import { Link } from "@/types/link";
import SusPopups from "../ui/SusPopups";
import { useRouter } from "next/navigation";

const RedirectWithPopups = ({ link }: { link: Link }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen fixed z-[100] noise-bg">
      <SusPopups
        isActive={link.susPopups}
        onComplete={() => router.replace(link.destination)}
        duration={3500}
      />
    </div>
  );
};

export default RedirectWithPopups;
