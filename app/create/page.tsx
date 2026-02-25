"use client";

import CreateLinkForm from "@/components/links/create-link/CreateLinkForm";
import AuthPageWarpper from "@/components/auth/AuthPageWarpper";

export default function CreatePage() {
  return (
    <AuthPageWarpper>
      <main className="min-h-screen flex items-center justify-center px-4 py-24 noise-bg relative">
        <CreateLinkForm />
      </main>
    </AuthPageWarpper>
  );
}
