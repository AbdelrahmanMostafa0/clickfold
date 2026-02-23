"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const platforms = ["iMessage", "WhatsApp", "Discord"] as const;
type Platform = (typeof platforms)[number];

const ogData = {
  title: "You Won a Free iPhone 16 Pro",
  description:
    "Congratulations! Click to claim your prize before it expires. Limited time offer.",
  url: "b8lnk.com/free-iphone-claim",
  siteName: "b8lnk.com",
};

function IMessagePreview() {
  return (
    <div className="max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="bg-[#1c1c1e] rounded-2xl p-4 border border-white/5">
        {/* Chat header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-xs text-white">
            J
          </div>
          <div>
            <p className="text-white text-sm font-medium">Jake</p>
            <p className="text-[#666] text-xs">iMessage</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3">
          <div className="flex justify-start">
            <div className="bg-[#333] rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">yo check this out 💀</p>
            </div>
          </div>

          {/* Link preview bubble */}
          <div className="flex justify-start">
            <div className="bg-[#333] rounded-2xl rounded-bl-sm overflow-hidden max-w-[85%]">
              {/* OG Image */}
              <div className="bg-gradient-to-br from-[#ff2d2d]/20 to-[#ff2d2d]/5 h-32 flex items-center justify-center border-b border-white/5">
                <div className="text-center">
                  <div className="text-4xl mb-1">🎉</div>
                  <span className="text-[#ff2d2d] text-xs font-bold">
                    CLAIM NOW
                  </span>
                </div>
              </div>
              {/* OG Meta */}
              <div className="px-3 py-2.5">
                <p className="text-[#999] text-[10px] uppercase tracking-wider mb-0.5">
                  {ogData.siteName}
                </p>
                <p className="text-white text-sm font-semibold leading-tight mb-1">
                  {ogData.title}
                </p>
                <p className="text-[#888] text-xs line-clamp-2">
                  {ogData.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#0b84fe] rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">bro what is this 😂</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppPreview() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-[#0b141a] rounded-2xl p-4 border border-white/5">
        {/* Chat header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-xs text-white font-bold">
            M
          </div>
          <div>
            <p className="text-white text-sm font-medium">Mike 🐐</p>
            <p className="text-[#667781] text-xs">online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3">
          <div className="flex justify-start">
            <div className="bg-[#202c33] rounded-xl rounded-bl-sm overflow-hidden max-w-[85%]">
              {/* Link preview */}
              <div className="border-l-4 border-[#00a884]">
                <div className="bg-gradient-to-br from-[#ff2d2d]/20 to-[#ff2d2d]/5 h-28 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1">📱</div>
                    <span className="text-[#ff2d2d] text-xs font-bold">
                      FREE iPHONE
                    </span>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <p className="text-[#00a884] text-xs mb-0.5">
                    {ogData.siteName}
                  </p>
                  <p className="text-white text-sm font-semibold leading-tight mb-1">
                    {ogData.title}
                  </p>
                  <p className="text-[#8696a0] text-xs line-clamp-2">
                    {ogData.description}
                  </p>
                </div>
              </div>
              <div className="px-3 py-2">
                <p className="text-[#53bdeb] text-sm underline">{ogData.url}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#005c4b] rounded-xl rounded-br-sm px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">No way this is real 💀💀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscordPreview() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-[#313338] rounded-2xl p-4 border border-white/5">
        {/* Channel header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <span className="text-[#80848e] text-lg">#</span>
          <span className="text-white text-sm font-medium">general</span>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold text-sm shrink-0">
              D
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#f3b3e1] text-sm font-semibold">
                  darklord42
                </span>
                <span className="text-[#80848e] text-[10px]">
                  Today at 4:20 PM
                </span>
              </div>
              <p className="text-[#dbdee1] text-sm mb-2">
                @everyone check this out lmao
              </p>

              {/* Discord embed */}
              <div className="border-l-4 border-[#ff2d2d] bg-[#2b2d31] rounded-r-lg overflow-hidden max-w-sm">
                <div className="p-3">
                  <p className="text-[#00a8fc] text-xs mb-1">
                    {ogData.siteName}
                  </p>
                  <p className="text-[#00a8fc] text-sm font-semibold hover:underline cursor-pointer mb-1">
                    {ogData.title}
                  </p>
                  <p className="text-[#dbdee1] text-xs">{ogData.description}</p>
                </div>
                <div className="bg-gradient-to-br from-[#ff2d2d]/20 to-[#ff2d2d]/5 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-1">🏆</div>
                    <span className="text-[#ff2d2d] text-xs font-bold">
                      WINNER!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ed4245] flex items-center justify-center text-white font-bold text-sm shrink-0">
              S
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#e8c358] text-sm font-semibold">
                  skeptic_steve
                </span>
                <span className="text-[#80848e] text-[10px]">
                  Today at 4:21 PM
                </span>
              </div>
              <p className="text-[#dbdee1] text-sm">
                bruh thats definitely a b8lnk 😭
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OGPreview() {
  const [activePlatform, setActivePlatform] = useState<Platform>("iMessage");

  return (
    <section className="py-24 px-6 relative noise-bg">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff2d2d]/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            They&apos;ll never know{" "}
            <span className="text-[#ff2d2d]">what hit them</span>
          </h2>
          <p className="text-[#666] text-sm max-w-md mx-auto">
            Customize your link&apos;s title, description, and preview image.
            Here&apos;s what it looks like when someone shares your bait.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activePlatform === platform
                  ? "bg-[#ff2d2d] text-white"
                  : "bg-[#1a1a1a] text-[#888] hover:text-white border border-white/5"
              }`}
            >
              {platform}
            </button>
          ))}
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activePlatform === "iMessage" && <IMessagePreview />}
            {activePlatform === "WhatsApp" && <WhatsAppPreview />}
            {activePlatform === "Discord" && <DiscordPreview />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
