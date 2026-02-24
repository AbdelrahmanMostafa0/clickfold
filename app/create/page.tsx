"use client";

import CreateLinkForm from "@/components/links/create-link/CreateLinkForm";
import UnAutorithed from "@/components/links/create-link/UnAutorithed";
import { useUser } from "@/context/UserContext";

export default function CreatePage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-24 noise-bg relative">
        <div className="w-8 h-8 border-2 border-[#ff2d2d] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return <UnAutorithed />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 noise-bg relative">
      <CreateLinkForm />
    </main>
  );
}
