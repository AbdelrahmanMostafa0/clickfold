"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import UnAutorithed from "../links/create-link/UnAutorithed";

const AuthPageWarpper = ({ children }: { children: React.ReactNode }) => {
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

  return <>{children}</>;
};

export default AuthPageWarpper;
