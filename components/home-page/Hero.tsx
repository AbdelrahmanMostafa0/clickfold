"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import CTAButton from "./CTAButton";

const exampleSlugs = [
  "summer-sale",
  "launch-2026",
  "newsletter-july",
  "webinar-signup",
  "black-friday",
];

export default function Hero() {
  const [slug, setSlug] = useState("");
  const [currentExample, setCurrentExample] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % exampleSlugs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const { user } = useUser();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 noise-bg overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2d2d]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#00ff88]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Short links.
          <br />
          <span className="text-[#ff2d2d] glow-red-text">
            Full picture.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-[#888] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Shorten links, group them into campaigns, and track every click —
          geo, device, and referrer data included.
        </motion.p>
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-8 flex items-center justify-center"
          >
            <span className="text-[#555] text-xs mr-2">try:</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentExample}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-[#00ff88] text-sm font-mono"
              >
                linkpulse.app/{exampleSlugs[currentExample]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
