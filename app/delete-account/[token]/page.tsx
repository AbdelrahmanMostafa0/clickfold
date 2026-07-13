"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { goeyToast } from "goey-toast";
import { useRouter, useParams } from "next/navigation";
import { confirmDeleteAccount } from "@/services/profile";
import { useUser } from "@/context/UserContext";

export default function DeleteAccountConfirmPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const { refetchUser } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await confirmDeleteAccount(token);
      setIsSuccess(true);
      refetchUser();
    } catch (error: any) {
      goeyToast.error(
        error.response?.data?.message ||
          "Failed to delete account. The link may be expired or invalid.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#111] border border-white/5 rounded-2xl p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#ff2d2d]/10 p-4 rounded-full">
              <Trash2 className="size-12 text-[#ff2d2d]" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-3">
            Account Deleted
          </h1>
          <p className="text-[#888] mb-8 text-sm">
            Your account and all associated data have been successfully deleted.
            We're sorry to see you go!
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white py-6"
          >
            <ArrowLeft className="size-5 mr-2" />
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#111] border border-white/5 rounded-2xl p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-[#ff2d2d]/10 p-4 rounded-full">
            <AlertTriangle className="size-12 text-[#ff2d2d]" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          Final Confirmation
        </h1>

        <p className="text-[#888] text-center mb-6 text-sm">
          You are about to permanently delete your account. This action cannot
          be undone and you will lose all your data, links, and settings
          immediately.
        </p>

        <div className="space-y-3 mt-8">
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isDeleting || !token}
            className="w-full bg-[#ff2d2d] text-white hover:bg-[#ff2d2d]/90 py-6"
          >
            <Trash2 className="size-5 mr-2" />
            {isDeleting ? "Deleting Account..." : "Yes, Delete My Account"}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            disabled={isDeleting}
            className="w-full bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white py-6"
          >
            <ArrowLeft className="size-5 mr-2" />
            Cancel and Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
