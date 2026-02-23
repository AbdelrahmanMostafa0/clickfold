"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  label: string;
  end: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
}

const stats: StatItem[] = [
  { label: "Links Created", end: 127430, suffix: "", prefix: "" },
  { label: "People Baited", end: 84291, suffix: "", prefix: "" },
  { label: "Click Rate on Sus Links", end: 99.1, suffix: "%", decimals: 1 },
];

function AnimatedNumber({
  end,
  suffix,
  prefix = "",
  decimals = 0,
  isInView,
}: StatItem & { isInView: boolean }) {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * end);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString();

  return (
    <span className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center flex-1">
            <div
              className="text-4xl sm:text-5xl text-white mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <AnimatedNumber {...stat} isInView={isInView} />
            </div>
            <p className="text-[#666] text-xs uppercase tracking-wider">
              {stat.label}
            </p>
            {i < stats.length - 1 && (
              <div
                className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-px h-8 bg-white/5"
                style={{ left: `${((i + 1) / stats.length) * 100}%` }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
