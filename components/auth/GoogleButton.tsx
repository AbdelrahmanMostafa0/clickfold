"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Loader2 } from "lucide-react";
import { googleLogin } from "@/services/auth";
import { useUser } from "@/context/UserContext";

interface GoogleLoginButtonProps {
  onError?: (error: string) => void;
  text?: string;
}

export default function GoogleLoginButton({
  onError,
  text,
}: GoogleLoginButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { refetchUser } = useUser();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await googleLogin(tokenResponse.access_token);

        if (res.data.success) {
          refetchUser();
          router.replace(callbackUrl || "/");
          // router.refresh();
        }
      } catch (error) {
        console.error("Google login error:", error);
        if (onError) {
          onError("Google login failed");
        }
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
      if (onError) {
        onError("Google login failed");
      }
    },
  });

  return (
    <Button
      type="button"
      variant="secondary"
      // className=
      className="w-full"
      //   className="w-full bg-white dark:bg-white cursor-pointer hover:bg-white dark:hover:bg-white hover:text-black  dark:text-black drop-shadow-md"
      onClick={() => login()}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <div className="flex items-center gap-2">
          <GoogleIcon className="h-5 w-5" />
          {text ? text : "Login with Google"}
        </div>
      )}
    </Button>
  );
}
