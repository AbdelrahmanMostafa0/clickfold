"use client";

import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CTAButton from "./CTAButton";

export default function FinalCTA() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <section className="py-32 px-6 relative noise-bg overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff2d2d]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2
          className="text-5xl sm:text-6xl md:text-7xl text-white mb-4 leading-[0.95]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Start tracking{" "}
          <span className="text-[#ff2d2d] glow-red-text">for free.</span>
        </h2>

        <p className="text-[#888] text-base sm:text-lg mb-10">
          No credit card required. Set up your first campaign in minutes.
        </p>

        <CTAButton />
      </motion.div>
    </section>
  );
}
