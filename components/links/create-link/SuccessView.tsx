"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Plus,
  ExternalLink,
  Globe,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { goeyToast } from "goey-toast";
import QrCodeCard from "@/components/links/QrCodeCard";

interface SuccessViewProps {
  link: {
    slug: string;
    destination: string;
    ogMode: "custom" | "original" | "none";
    og?: {
      title?: string;
      description?: string;
      image?: string;
    };
  };
  onCreateAnother: () => void;
}

export default function SuccessView({
  link,
  onCreateAnother,
}: SuccessViewProps) {
  const shortUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/l/${link.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    goeyToast.success("Link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="bg-[#111] border border-white/5 rounded-xl p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ff88]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00ff88]/3 rounded-full blur-[80px] pointer-events-none" />

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="relative text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="size-8 text-[#00ff88]" />
          </motion.div>
          <h2
            className="text-2xl sm:text-3xl text-white mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Link <span className="text-[#00ff88]">Created!</span>
          </h2>
          <p className="text-[#666] text-sm">Your link is ready to share</p>
        </motion.div>

        {/* Short URL display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="bg-[#0a0a0a] border border-white/8 rounded-lg p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#ff2d2d]/10 flex items-center justify-center shrink-0">
                <ExternalLink className="size-4 text-[#ff2d2d]" />
              </div>
              <span className="text-white text-sm font-medium truncate">
                {shortUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={copyToClipboard}
              className="shrink-0 bg-white/10 hover:bg-white/15 text-white border-0"
            >
              <Copy className="size-3.5 mr-1.5" />
              Copy
            </Button>
          </div>
          <p className="text-[10px] text-[#444] mt-2 text-center">
            Redirects to <span className="text-[#666]">{link.destination}</span>
          </p>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <QrCodeCard url={shortUrl} slug={link.slug} />
        </motion.div>

        {/* Link preview card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#888] text-xs uppercase tracking-wider mb-3">
            Link Preview
          </p>

          {link.ogMode === "custom" ? (
            <div className="bg-[#0a0a0a] border border-white/8 rounded-lg overflow-hidden">
              {/* Preview image */}
              {link.og?.image && (
                <div className="w-full h-44 bg-[#1a1a1a] overflow-hidden">
                  <img
                    src={link.og.image}
                    alt="OG preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Preview content */}
              <div className="p-4">
                <p className="text-[10px] text-[#444] uppercase tracking-wider mb-1.5">
                  {shortUrl.replace(/^https?:\/\//, "").split("/")[0]}
                </p>
                <h3 className="text-white text-sm font-medium leading-snug">
                  {link.og?.title || link.slug}
                </h3>
                {link.og?.description && (
                  <p className="text-[#888] text-xs mt-1 line-clamp-2 leading-relaxed">
                    {link.og.description}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#0a0a0a] border border-white/8 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    link.ogMode === "original"
                      ? "bg-blue-500/10"
                      : "bg-[#444]/10"
                  }`}
                >
                  {link.ogMode === "original" ? (
                    <Globe className="size-5 text-blue-400" />
                  ) : (
                    <EyeOff className="size-5 text-[#555]" />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {link.ogMode === "original"
                      ? "Using Original OG Data"
                      : "OG Metadata Disabled"}
                  </p>
                  <p className="text-[#666] text-xs mt-1 leading-relaxed">
                    {link.ogMode === "original"
                      ? "When shared, this link will display the destination page's original title, description, and image."
                      : "No Open Graph metadata will be shown when this link is shared on social media."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-3"
        >
          <Button
            type="button"
            onClick={onCreateAnother}
            className="flex-1 h-11 bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white font-semibold glow-red transition-all"
          >
            <Plus className="size-4 mr-1.5" />
            Create Another
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
