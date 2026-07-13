"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Eye, EyeOff, Check, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { goeyToast } from "goey-toast";
import { resetPassword } from "@/services/auth";
import { getApiErrorMessage } from "@/lib/utils";
import AuthStudioShell from "./AuthStudioShell";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters").max(30),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword(token, data.password);
      setSuccess(true);
    } catch (error: unknown) {
      goeyToast.error(getApiErrorMessage(error, "This reset link is expired or invalid."));
    }
  };

  if (success) {
    return (
      <AuthStudioShell
        eyebrow="Account recovery"
        title="Password updated."
        description="You can now sign in with your new password."
      >
        <div className="border border-success bg-success/10 px-5 py-4">
          <div className="mb-2 flex items-center gap-2 font-bold text-success">
            <Check className="size-4" /> Reset complete
          </div>
          <p className="text-sm text-muted-foreground">Your password has been changed successfully.</p>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="hard-shadow mt-7 min-h-12 w-full border border-foreground bg-primary px-5 font-extrabold text-primary-foreground"
        >
          Go to sign in
        </button>
      </AuthStudioShell>
    );
  }

  return (
    <AuthStudioShell
      eyebrow="Account recovery"
      title="Choose a new password."
      description="This link is only valid for 15 minutes and can only be used once."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="reset-password" className="mb-2 block text-sm font-bold">New password</label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "reset-password-error" : undefined}
              {...register("password")}
              placeholder="At least 8 characters"
              className="min-h-12 w-full border border-input bg-background px-4 pr-12 text-base outline-none placeholder:text-muted-foreground focus:border-ring"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p id="reset-password-error" className="mt-2 text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="reset-confirm-password" className="mb-2 block text-sm font-bold">Confirm password</label>
          <input
            id="reset-confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? "reset-confirm-password-error" : undefined}
            {...register("confirmPassword")}
            placeholder="Re-enter your new password"
            className="min-h-12 w-full border border-input bg-background px-4 text-base outline-none placeholder:text-muted-foreground focus:border-ring"
          />
          {errors.confirmPassword && <p id="reset-confirm-password-error" className="mt-2 text-sm text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !token}
          className="hard-shadow flex min-h-12 w-full items-center justify-center gap-2 border border-foreground bg-primary px-5 font-extrabold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-55"
        >
          <KeyRound className="size-4" />{isSubmitting ? "Updating…" : "Update password"}
        </button>
      </form>

      <p className="mt-7 text-sm text-muted-foreground">
        <Link href="/login" className="font-bold text-primary underline underline-offset-4">Back to sign in</Link>
      </p>
    </AuthStudioShell>
  );
}
