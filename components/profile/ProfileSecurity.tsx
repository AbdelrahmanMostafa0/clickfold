import { motion } from "framer-motion";
import { Settings, ShieldAlert } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goeyToast } from "goey-toast";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { updatePassword } from "@/services/profile";
import { getApiErrorMessage } from "@/lib/utils";
import { useState } from "react";

const ProfileSecurity = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const passwordSchema = z
    .object({
      password: z.string().min(1, "Current password is required"),
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
    setPasswordError(null);
    try {
      await updatePassword(data);
      goeyToast.success("Password updated successfully");
      resetPassword();
    } catch (error: unknown) {
      setPasswordError(getApiErrorMessage(error, "Failed to update password"));
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="border-2 border-foreground bg-card p-6"
    >
      <h2 className="text-foreground text-lg font-medium flex items-center gap-2 mb-6">
        <Settings className="size-4 text-primary" /> Security
      </h2>

      <form
        onSubmit={handlePasswordSubmit(onPasswordUpdate)}
        className="space-y-4 pb-6 border-b border-border mb-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
              Current Password
            </Label>
            <Input
              type="password"
              {...registerPassword("password")}
              className="bg-background border-input text-foreground focus-visible:ring-primary/20"
            />
            {passwordErrors.password && (
              <p className="mt-1.5 text-xs text-destructive" role="alert">
                {passwordErrors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
              New Password
            </Label>
            <Input
              type="password"
              {...registerPassword("newPassword")}
              className="bg-background border-input text-foreground focus-visible:ring-primary/20"
            />
            {passwordErrors.newPassword && (
              <p className="mt-1.5 text-xs text-destructive" role="alert">
                {passwordErrors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">
              Confirm New Password
            </Label>
            <Input
              type="password"
              {...registerPassword("confirmPassword")}
              className="bg-background border-input text-foreground focus-visible:ring-primary/20"
            />
            {passwordErrors.confirmPassword && (
              <p className="mt-1.5 text-xs text-destructive" role="alert">
                {passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>

          {passwordError && (
            <p className="mt-1.5 text-xs text-destructive" role="alert">{passwordError}</p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isPasswordSubmitting}
            className="border-2 border-foreground bg-secondary text-foreground hover:bg-background"
          >
            <ShieldAlert className="size-4 mr-2" />
            {isPasswordSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>

      {/* Danger Zone */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-destructive">
          Danger Zone
        </h3>
        <p className="text-muted-foreground text-xs mb-4">
          Permanently delete your account and all associated links. This action
          cannot be reversed.
        </p>
        <DeleteAccountDialog />
      </div>
    </motion.section>
  );
};

export default ProfileSecurity;
