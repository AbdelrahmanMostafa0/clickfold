import { motion } from "framer-motion";
import { Settings, ShieldAlert, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

const ProfileSecurity = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const passwordSchema = z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type PasswordValues = z.infer<typeof passwordSchema>;
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordUpdate = async (data: PasswordValues) => {
    toast.info("Password update API not implemented yet");
    resetPassword();
  };

  const onDeleteAccount = async () => {
    if (
      confirm(
        "Are you absolute sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      setIsDeleting(true);
      setTimeout(() => {
        toast.error("Account deletion API not implemented yet");
        setIsDeleting(false);
      }, 1000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[#111] border border-white/5 rounded-xl p-6"
    >
      <h2 className="text-white text-lg font-medium flex items-center gap-2 mb-6">
        <Settings className="size-4 text-[#ff2d2d]" /> Security
      </h2>

      <form
        onSubmit={handlePasswordSubmit(onPasswordUpdate)}
        className="space-y-4 pb-6 border-b border-white/10 mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
              Current Password
            </Label>
            <Input
              type="password"
              {...registerPassword("currentPassword")}
              className="bg-[#0a0a0a] border-white/8 text-white focus-visible:ring-[#ff2d2d]/20"
            />
            {passwordErrors.currentPassword && (
              <p className="text-[#ff2d2d] text-xs mt-1.5">
                {passwordErrors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
              New Password
            </Label>
            <Input
              type="password"
              {...registerPassword("newPassword")}
              className="bg-[#0a0a0a] border-white/8 text-white focus-visible:ring-[#ff2d2d]/20"
            />
            {passwordErrors.newPassword && (
              <p className="text-[#ff2d2d] text-xs mt-1.5">
                {passwordErrors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-[#888] text-xs uppercase tracking-wider mb-2 block">
              Confirm New Password
            </Label>
            <Input
              type="password"
              {...registerPassword("confirmPassword")}
              className="bg-[#0a0a0a] border-white/8 text-white focus-visible:ring-[#ff2d2d]/20"
            />
            {passwordErrors.confirmPassword && (
              <p className="text-[#ff2d2d] text-xs mt-1.5">
                {passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isPasswordSubmitting}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            <ShieldAlert className="size-4 mr-2" />
            {isPasswordSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>

      {/* Danger Zone */}
      <div>
        <h3 className="text-[#ff2d2d] text-sm font-medium mb-2 uppercase tracking-wide">
          Danger Zone
        </h3>
        <p className="text-[#888] text-xs mb-4">
          Permanently delete your account and all associated b8lnks. This action
          cannot be reversed.
        </p>
        <Button
          variant="destructive"
          onClick={onDeleteAccount}
          disabled={isDeleting}
          className="bg-transparent border border-[#ff2d2d]/30 text-[#ff2d2d] hover:bg-[#ff2d2d] hover:text-white transition-all w-full sm:w-auto"
        >
          <Trash2 className="size-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </motion.section>
  );
};

export default ProfileSecurity;
