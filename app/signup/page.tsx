import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterPage from "@/components/auth/RegisterPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Create an Account",
  description: "Create a Clickfold account and start building campaign-ready short links.",
  path: "/signup",
  noIndex: true,
});

const page = () => {
  return (
    <Suspense>
      <RegisterPage />
    </Suspense>
  );
};

export default page;
