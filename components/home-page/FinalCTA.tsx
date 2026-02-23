"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
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
          Start baiting{" "}
          <span className="text-[#ff2d2d] glow-red-text">for free.</span>
        </h2>

        <p className="text-[#888] text-base sm:text-lg mb-10">
          No credit card. No shame. Just chaos.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-[#ff2d2d] hover:bg-[#e62626] text-white text-lg rounded-lg transition-colors glow-red"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
        >
          Create My First Bait Link
        </motion.button>

        <p className="text-[#444] text-xs mt-6">
          Free forever · No sign-up required to try
        </p>
      </motion.div>
    </section>
  );
}
