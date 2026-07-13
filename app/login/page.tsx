import type { Metadata } from "next";
import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";
import GuestOnlyPageWrapper from "@/components/auth/GuestOnlyPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Log In",
  description: "Log in to manage your Clickfold links, campaigns, and analytics.",
  path: "/login",
  noIndex: true,
});

const page = () => {
  return (
    <Suspense>
      <GuestOnlyPageWrapper>
        <LoginPage />
      </GuestOnlyPageWrapper>
    </Suspense>
  );
};

export default page;
