"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import api from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { userLogin } from "@/services/auth";
import GoogleLoginButton from "./GoogleButton";
import { useUser } from "@/context/UserContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { refetchUser } = useUser();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");

    try {
      await userLogin(data.email, data.password);
      refetchUser();
      router.replace(callbackUrl || "/");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 mx-auto container relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-3xl text-white tracking-wider"
                style={{ fontFamily: "var(--font-display)" }}
              >
                LinkPulse
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#ff2d2d] ml-1 animate-pulse" />
            </Link>
            <h1
              className="text-3xl text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back
            </h1>
            <p className="text-[#666] text-sm">Log in to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 rounded-lg px-4 py-3 mb-6 text-[#ff2d2d] text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Google Login */}
          <div className="mb-6">
            <div className="flex justify-center [&>div]:w-full!">
              <GoogleLoginButton
                onError={(error) => setError(error)}
                text="Login with Google"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[#444] text-xs uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Email/Password Form via React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[#888] text-xs mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#ff2d2d]/50 transition-colors placeholder:text-[#333]"
              />
              {errors.email && (
                <p className="text-[#ff2d2d] text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#888] text-xs mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white text-sm outline-none focus:border-[#ff2d2d]/50 transition-colors placeholder:text-[#333]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#ff2d2d] text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#ff2d2d] hover:bg-[#e62626] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all glow-red"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-[#555] text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup${callbackUrl ? `?callbackUrl=${callbackUrl}` : ""}`}
              className="text-[#ff2d2d] hover:text-[#ff4444] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
