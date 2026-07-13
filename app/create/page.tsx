"use client";

import CreateLinkForm from "@/components/links/create-link/CreateLinkForm";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

export default function CreatePage() {
  return (
    <AuthPageWrapper>
      <main className="min-h-screen flex items-center justify-center px-4 py-24 noise-bg relative">
        <CreateLinkForm />
      </main>
    </AuthPageWrapper>
  );
}
