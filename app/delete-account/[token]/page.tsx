"use client";

import { AlertTriangle, ArrowLeft, Check, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { goeyToast } from "goey-toast";
import { Button } from "@/components/ui/button";
import { confirmDeleteAccount } from "@/services/profile";
import { useUser } from "@/context/UserContext";
import { getApiErrorMessage } from "@/lib/utils";

export default function DeleteAccountConfirmPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const { refetchUser } = useUser();

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await confirmDeleteAccount(token);
      setIsSuccess(true);
      refetchUser();
    } catch (error: unknown) {
      goeyToast.error(getApiErrorMessage(error, "The confirmation link is expired or invalid."));
    } finally {
      setIsDeleting(false);
    }
  };

  if (isSuccess) {
    return (
      <main id="main-content" className="min-h-screen px-4 py-32 noise-bg">
        <section className="mx-auto max-w-3xl border-2 border-foreground bg-card hard-shadow">
          <div className="grid sm:grid-cols-[160px_1fr]">
            <div className="flex min-h-40 items-center justify-center border-b-2 border-foreground bg-success sm:border-b-0 sm:border-r-2">
              <Check className="size-14 text-success-foreground" />
            </div>
            <div className="p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-success">Workspace closed</p>
              <h1 className="mt-3 text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>Your data is deleted.</h1>
              <p className="mt-5 leading-7 text-muted-foreground">The account and its campaign routes have been permanently removed.</p>
              <Button onClick={() => router.push("/")} variant="outline" className="mt-8 border-2 border-foreground bg-background">
                <ArrowLeft className="size-4" />Return to Clickfold
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen px-4 py-32 noise-bg">
      <section className="mx-auto max-w-3xl border-2 border-foreground bg-card hard-shadow">
        <div className="border-b-2 border-foreground bg-destructive p-6 text-destructive-foreground sm:p-8">
          <AlertTriangle className="size-8" />
        </div>
        <div className="p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-destructive">Final confirmation</p>
          <h1 className="mt-3 text-5xl leading-none sm:text-6xl" style={{ fontFamily: "var(--font-display)" }}>Close this workspace?</h1>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">This permanently removes your account, campaign links, analytics, and settings. This action cannot be undone.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting || !token} className="border-2 border-foreground bg-destructive text-destructive-foreground">
              <Trash2 className="size-4" />{isDeleting ? "Deleting workspace…" : "Delete everything"}
            </Button>
            <Button variant="outline" onClick={() => router.push("/")} disabled={isDeleting} className="border-2 border-foreground bg-background">
              Keep my workspace
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
