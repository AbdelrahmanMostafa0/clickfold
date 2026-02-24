"use client";

import { motion } from "framer-motion";
import { Ban, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LinkInactive() {
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
          className="mx-auto w-20 h-20 rounded-2xl bg-[#888]/10 border border-[#888]/20 flex items-center justify-center mb-6"
        >
          <Ban className="size-9 text-[#888]" />
        </motion.div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl text-white mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Link Disabled
        </h1>

        {/* Description */}
        <p className="text-[#666] text-sm leading-relaxed mb-8">
          This b8lnk has been deactivated by its owner
          <br />
          and is no longer available.
        </p>

        {/* Action */}
        <Link href="/">
          <Button className="bg-[#333] hover:bg-[#444] text-white font-semibold transition-all">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
