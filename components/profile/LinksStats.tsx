import { BarChart3, Link2 } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export const LinksStats = () => {
  return (
    <div className="md:col-span-1 space-y-6">
      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-white/5 rounded-xl p-6"
      >
        <h2 className="text-white text-lg font-medium flex items-center gap-2 mb-4">
          <BarChart3 className="size-4 text-[#ff2d2d]" /> Stats Overview
        </h2>
        <div className="space-y-4">
          <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/5">
            <p className="text-[#888] text-xs uppercase tracking-wider mb-1">
              Total b8lnks
            </p>
            <p className="text-2xl text-white font-semibold">42</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/5">
            <p className="text-[#888] text-xs uppercase tracking-wider mb-1">
              Total Clicks
            </p>
            <p className="text-2xl text-[#00ff88] font-semibold glow-green-text">
              10,482
            </p>
          </div>
        </div>
      </motion.section>

      {/* Top Links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#111] border border-white/5 rounded-xl p-6 flex flex-col"
      >
        <h2 className="text-white text-lg font-medium flex items-center gap-2 mb-4">
          <Link2 className="size-4 text-[#ff2d2d]" /> Top Performing
        </h2>

        <div className="space-y-3 flex-1">
          {/* Dummy links */}
          {[
            { slug: "free-iphone", clicks: 3200 },
            { slug: "rick-roll-hd", clicks: 2150 },
            { slug: "nitro-gift", clicks: 1800 },
          ].map((link, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[#444] text-xs font-mono">{i + 1}.</span>
                <p className="text-sm text-white truncate max-w-[120px]">
                  /{link.slug}
                </p>
              </div>
              <p className="text-xs text-[#00ff88] font-medium">
                {link.clicks.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <Link href="/create">
            <Button className="w-full bg-white/5 hover:bg-white/10 text-[#ff2d2d] border border-[#ff2d2d]/20 transition-all group">
              <Plus className="size-4 mr-2 group-hover:scale-125 transition-transform" />
              Create New b8lnk
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};
