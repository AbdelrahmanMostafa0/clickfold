"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, MessageCircle, Send, Sparkles } from "lucide-react";

const platforms = ["Messages", "WhatsApp", "Discord"] as const;
type Platform = (typeof platforms)[number];

const platformStyles: Record<Platform, { shell: string; bubble: string; accent: string }> = {
  Messages: {
    shell: "bg-[#f0f0f2] text-[#202024]",
    bubble: "bg-[#d8d8dc]",
    accent: "bg-[#1677ff] text-white",
  },
  WhatsApp: {
    shell: "bg-[#e8e1d6] text-[#18231f]",
    bubble: "bg-[#ffffff]",
    accent: "bg-[#d8f8c6] text-[#183126]",
  },
  Discord: {
    shell: "bg-[#313338] text-[#f2f3f5]",
    bubble: "bg-[#2b2d31]",
    accent: "bg-[#5865f2] text-white",
  },
};

function ShareCard({ platform }: { platform: Platform }) {
  const style = platformStyles[platform];

  return (
    <motion.div
      key={platform}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`mx-auto w-full max-w-md border border-foreground p-4 sm:p-5 ${style.shell}`}
    >
      <div className="flex items-center gap-3 border-b border-current/15 pb-4">
        <div className={`flex size-9 items-center justify-center ${style.accent}`}>
          <MessageCircle className="size-4" />
        </div>
        <div>
          <p className="text-sm font-bold">Summer launch crew</p>
          <p className="text-xs opacity-55">{platform}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className={`w-fit max-w-[88%] px-3 py-2 text-sm ${style.bubble}`}>
          The field notes are live—this edition turned out beautifully.
        </div>
        <div className={`w-[92%] overflow-hidden ${style.bubble}`}>
          <div className="grid min-h-36 place-items-center bg-primary p-5 text-primary-foreground">
            <div className="text-center">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-70">Issue 08</p>
              <p className="mt-2 text-3xl font-black leading-none tracking-[-0.05em]">Summer field notes</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] opacity-50">clickfold.app</p>
            <p className="mt-1 font-bold">How small ideas find a bigger audience</p>
            <p className="mt-1 text-xs leading-5 opacity-60">A practical dispatch for independent campaign builders.</p>
          </div>
        </div>
        <div className={`ml-auto flex w-fit items-center gap-2 px-3 py-2 text-sm ${style.accent}`}>
          Sending this on <Send className="size-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function OGPreview() {
  const [activePlatform, setActivePlatform] = useState<Platform>("Messages");

  return (
    <section className="studio-grid border-b border-foreground px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="eyebrow">Share preview</span>
          <h2 className="mt-7 max-w-[10ch] text-[clamp(3.5rem,7vw,6.75rem)] font-black leading-[0.86] tracking-[-0.065em]">
            Make the click feel considered.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
            Control the title, description, and artwork people see before they
            visit. The same campaign can feel native wherever it travels.
          </p>

          <div className="mt-9 border-y border-foreground">
            <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-border py-5">
              <ImageIcon className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="font-bold">Artwork with a purpose</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Give every link a campaign-specific visual instead of the destination page default.</p>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 py-5">
              <Sparkles className="mt-0.5 size-5 text-accent" />
              <div>
                <p className="font-bold">One edit, every channel</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Update the preview once and keep the campaign presentation consistent.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-5 z-10 rotate-2 bg-success px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-success-foreground sm:-right-5">
            Preview desk
          </div>
          <div className="hard-shadow border-2 border-foreground bg-card p-4 sm:p-7">
            <div className="mb-7 flex flex-wrap gap-2" role="tablist" aria-label="Preview channel">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  role="tab"
                  aria-selected={activePlatform === platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`min-h-11 border px-4 py-2 text-sm font-bold ${
                    activePlatform === platform
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <ShareCard platform={activePlatform} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
