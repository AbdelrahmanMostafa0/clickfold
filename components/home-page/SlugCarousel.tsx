"use client";

import { motion } from "framer-motion";

const row1Slugs = [
  "girls-in-your-area",
  "free-robux-generator",
  "irs-final-notice",
  "click-or-lose-account",
  "leaked-celebrity-dms",
  "youve-been-selected",
  "verify-your-identity",
  "claim-your-reward",
  "hot-singles-nearby",
  "nigerian-prince-offer",
  "free-vbucks-2024",
  "your-icloud-hacked",
];

const row2Slugs = [
  "confirm-bank-details",
  "exclusive-footage-leak",
  "you-won-1000-dollars",
  "urgent-security-alert",
  "download-free-movies",
  "secret-onlyfans-leak",
  "password-expired-now",
  "apple-id-suspended",
  "get-rich-quick-method",
  "fbi-warning-notice",
  "bitcoin-giveaway-live",
  "update-payment-info",
];

function SlugPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-4 py-2 mx-2 bg-[#111] border border-white/5 rounded-full text-xs text-[#888] whitespace-nowrap hover:border-[#ff2d2d]/30 hover:text-[#ff2d2d] transition-all cursor-default select-none">
      <span className="text-[#444] mr-1.5">b8lnk.com/</span>
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
