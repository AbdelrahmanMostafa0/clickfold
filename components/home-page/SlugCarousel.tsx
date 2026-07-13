"use client";

import { motion } from "framer-motion";

const row1Slugs = [
  "spring-launch",
  "product-hunt",
  "email-blast-03",
  "instagram-bio",
  "partner-referral",
  "podcast-ad",
  "linkedin-post",
  "beta-invite",
  "affiliate-q3",
  "press-kit",
  "demo-request",
  "app-download",
];

const row2Slugs = [
  "holiday-promo",
  "webinar-replay",
  "case-study",
  "twitter-thread",
  "newsletter-cta",
  "youtube-desc",
  "landing-v2",
  "referral-program",
  "early-access",
  "changelog",
  "conference-2026",
  "trial-signup",
];

function SlugPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-4 py-2 mx-2 bg-[#111] border border-white/5 rounded-full text-xs text-[#888] whitespace-nowrap hover:border-[#ff2d2d]/30 hover:text-[#ff2d2d] transition-all cursor-default select-none">
      <span className="text-[#444] mr-1.5">linkpulse.app/</span>
      {text}
    </span>
  );
}

export default function SlugCarousel() {
  return (
    <section className="py-16 overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Row 1 — scrolling left */}
        <div className="mb-4">
          <div className="flex animate-marquee-left w-max">
            {[...row1Slugs, ...row1Slugs].map((slug, i) => (
              <SlugPill key={`r1-${i}`} text={slug} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolling right */}
        <div>
          <div className="flex animate-marquee-right w-max">
            {[...row2Slugs, ...row2Slugs].map((slug, i) => (
              <SlugPill key={`r2-${i}`} text={slug} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
