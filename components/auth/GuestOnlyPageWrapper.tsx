"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

const GuestOnlyPageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(callbackUrl);
    }
  }, [isLoading, user, callbackUrl, router]);

  if (isLoading || user) {
    return (
      <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-24 noise-bg">
        <div className="flex items-center gap-3 border-2 border-foreground bg-card px-5 py-4 hard-shadow" role="status">
          <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-bold">Opening your studio…</span>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};

export default GuestOnlyPageWrapper;
