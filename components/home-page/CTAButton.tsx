"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function CTAButton({ className = "" }: { className?: string }) {
  const { user } = useUser();
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ x: 2, y: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16 }}
      onClick={() => router.push(user ? "/create" : "/signup?callbackUrl=/create")}
      className={`hard-shadow inline-flex min-h-12 items-center justify-center gap-2 border border-foreground bg-primary px-6 py-3 text-base font-extrabold text-primary-foreground ${className}`}
    >
      {user ? "Build another link" : "Build a campaign link"}
      <ArrowUpRight className="size-4" />
    </motion.button>
  );
}
