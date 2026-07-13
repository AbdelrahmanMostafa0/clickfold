import type { Metadata } from "next";
import MyLinksPage from "@/components/links/my-links/MyLinksPage";
import React from "react";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "My Links",
  description: "Manage your Clickfold short links and review their status.",
  path: "/profile/my-links",
  noIndex: true,
  follow: false,
});

const page = () => {
  return (
    <AuthPageWrapper>
      <MyLinksPage />
    </AuthPageWrapper>
  );
};

export default page;
