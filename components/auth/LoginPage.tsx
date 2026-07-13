"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { userLogin } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import GoogleLoginButton from "./GoogleButton";
import AuthStudioShell from "./AuthStudioShell";

const loginSchema = z.object({
  email: z.string().email("Email needs a complete address, including @."),
  password: z.string().min(1, "Please enter your password."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { refetchUser } = useUser();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    try {
      await userLogin(data.email, data.password);
      refetchUser();
      router.replace(callbackUrl);
    } catch (caught: unknown) {
      const response = caught as { response?: { data?: { message?: string } } };
      setError(response.response?.data?.message || "We couldn't sign you in. Check your email and password, then try again.");
    }
  };

  return (
    <AuthStudioShell
      eyebrow="Welcome back"
      title="Return to your campaign desk."
      description="Sign in to build links, shape share previews, and read campaign activity."
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-6 border border-destructive bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive"
        >
          {error}
        </motion.div>
      )}

      <GoogleLoginButton onError={setError} text="Continue with Google" />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">or use email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-bold">Email address</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            {...register("email")}
            placeholder="you@example.com"
            className="min-h-12 w-full border border-input bg-background px-4 text-base outline-none placeholder:text-muted-foreground focus:border-ring"
          />
          {errors.email && <p id="login-email-error" className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="login-password" className="block text-sm font-bold">Password</label>
            <Link href="/forgot-password" className="text-xs font-bold text-primary underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "login-password-error" : undefined}
              {...register("password")}
              placeholder="Your password"
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
          {errors.password && <p id="login-password-error" className="mt-2 text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="hard-shadow min-h-12 w-full border border-foreground bg-primary px-5 font-extrabold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isSubmitting ? "Signing in…" : "Sign in to Clickfold"}
        </button>
      </form>

      <p className="mt-7 text-sm text-muted-foreground">
        New to Clickfold?{" "}
        <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-primary underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthStudioShell>
  );
}
