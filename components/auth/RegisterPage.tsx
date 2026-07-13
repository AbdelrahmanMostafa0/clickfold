"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { userRegister } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import GoogleLoginButton from "./GoogleButton";
import AuthStudioShell from "./AuthStudioShell";

const registerSchema = z.object({
  name: z.string().min(2, "Please enter at least two characters."),
  email: z.string().email("Email needs a complete address, including @."),
  password: z.string().min(6, "Password needs at least six characters."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
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
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormValues) => {
    setError("");
    try {
      await userRegister(data);
      refetchUser();
      router.replace(callbackUrl);
    } catch (caught: unknown) {
      const response = caught as { response?: { data?: { message?: string } } };
      setError(response.response?.data?.message || "We couldn't create the account. Review the details and try again.");
    }
  };

  const fieldClass = "min-h-12 w-full border border-input bg-background px-4 text-base outline-none placeholder:text-muted-foreground focus:border-ring";

  return (
    <AuthStudioShell
      eyebrow="Open your desk"
      title="Start with one purposeful link."
      description="Create a free workspace for campaign links, share previews, QR codes, and clear performance reads."
    >
      {error && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mb-6 border border-destructive bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
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
          <label htmlFor="register-name" className="mb-2 block text-sm font-bold">Your name</label>
          <input id="register-name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "register-name-error" : undefined} {...register("name")} placeholder="Alex Morgan" className={fieldClass} />
          {errors.name && <p id="register-name-error" className="mt-2 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="register-email" className="mb-2 block text-sm font-bold">Email address</label>
          <input id="register-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "register-email-error" : undefined} {...register("email")} placeholder="you@example.com" className={fieldClass} />
          {errors.email && <p id="register-email-error" className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="register-password" className="mb-2 block text-sm font-bold">Password</label>
          <div className="relative">
            <input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "register-password-error" : "register-password-hint"} {...register("password")} placeholder="At least six characters" className={`${fieldClass} pr-12`} />
            <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password ? <p id="register-password-error" className="mt-2 text-sm text-destructive">{errors.password.message}</p> : <p id="register-password-hint" className="mt-2 text-xs text-muted-foreground">Use at least six characters.</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="hard-shadow min-h-12 w-full border border-foreground bg-primary px-5 font-extrabold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-55">
          {isSubmitting ? "Creating your desk…" : "Create my workspace"}
        </button>
      </form>

      <p className="mt-7 text-sm text-muted-foreground">
        Already have a workspace?{" "}
        <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-primary underline underline-offset-4">Sign in</Link>
      </p>
    </AuthStudioShell>
  );
}
