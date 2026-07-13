"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

export default function FinalCTA() {
  return (
    <section className="border-y border-foreground bg-primary px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
      >
        <div>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-primary-foreground/70">Your next campaign</span>
          <h2 className="mt-5 max-w-[12ch] text-[clamp(3.5rem,8vw,7.5rem)] font-black leading-[0.84] tracking-[-0.07em] text-primary-foreground">
            Give every click somewhere to report back.
          </h2>
        </div>
        <CTAButton className="bg-background text-foreground lg:mb-2" />
      </motion.div>
    </section>
  );
}
