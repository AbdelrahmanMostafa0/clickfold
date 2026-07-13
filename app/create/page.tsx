"use client";

import CreateLinkForm from "@/components/links/create-link/CreateLinkForm";
import AuthPageWrapper from "@/components/auth/AuthPageWrapper";

export default function CreatePage() {
  return (
    <AuthPageWrapper>
      <main id="main-content" className="min-h-screen px-4 py-28 noise-bg sm:py-32">
        <CreateLinkForm />
      </main>
    </AuthPageWrapper>
  );
}
