"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPassword } from "@/services/auth";
import AuthStudioShell from "./AuthStudioShell";

const schema = z.object({
  email: z.string().email("Email needs a complete address, including @."),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // The API always responds with success here regardless of whether the
    // email exists, so there's nothing to branch on beyond the request itself.
    await forgotPassword(data.email).catch(() => null);
    setSent(true);
  };

  return (
    <AuthStudioShell
      eyebrow="Account recovery"
      title="Reset your password."
      description="Enter the email on your account and we'll send a link to choose a new password."
    >
      {sent ? (
        <div className="border border-success bg-success/10 px-5 py-4">
          <div className="mb-2 flex items-center gap-2 font-bold text-success">
            <Check className="size-4" /> Check your inbox
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists for that email, a reset link is on its way. The link expires in 15 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="forgot-email" className="mb-2 block text-sm font-bold">Email address</label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "forgot-email-error" : undefined}
              {...register("email")}
              placeholder="you@example.com"
              className="min-h-12 w-full border border-input bg-background px-4 text-base outline-none placeholder:text-muted-foreground focus:border-ring"
            />
            {errors.email && <p id="forgot-email-error" className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="hard-shadow min-h-12 w-full border border-foreground bg-primary px-5 font-extrabold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}

      <p className="mt-7 text-sm text-muted-foreground">
        <Link href="/login" className="inline-flex items-center gap-2 font-bold text-primary underline underline-offset-4">
          <ArrowLeft className="size-3.5" />Back to sign in
        </Link>
      </p>
    </AuthStudioShell>
  );
}
