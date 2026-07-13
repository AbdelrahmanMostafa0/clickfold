"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import Unauthorized from "../links/create-link/Unauthorized";

const AuthPageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return (
      <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-24 noise-bg">
        <div className="flex items-center gap-3 border-2 border-foreground bg-card px-5 py-4 hard-shadow" role="status">
          <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-bold">Opening your studio…</span>
        </div>
      </main>
    );
  }
  if (!user) {
    return <Unauthorized />;
  }

  return <>{children}</>;
};

export default AuthPageWrapper;
