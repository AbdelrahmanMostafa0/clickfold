"use client";

import { motion } from "framer-motion";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LinkNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 noise-bg relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mx-auto w-20 h-20 rounded-2xl bg-[#ff2d2d]/10 border border-[#ff2d2d]/20 flex items-center justify-center mb-6"
        >
          <SearchX className="size-9 text-[#ff2d2d]" />
        </motion.div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl text-white mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Link Not Found
        </h1>

        {/* Description */}
        <p className="text-[#666] text-sm leading-relaxed mb-8">
          This b8lnk doesn&apos;t exist or may have been removed.
          <br />
          Double-check the URL and try again.
        </p>

        {/* Action */}
        <Link href="/">
          <Button className="bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white font-semibold glow-red transition-all">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
