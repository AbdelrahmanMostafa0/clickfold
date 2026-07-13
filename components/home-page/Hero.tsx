"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight, CircleCheck, MousePointer2 } from "lucide-react";
import CTAButton from "./CTAButton";

const channels = [
  { name: "Newsletter", path: "/field-notes", clicks: "1,284", color: "bg-primary" },
  { name: "Instagram", path: "/summer-cut", clicks: "732", color: "bg-accent" },
  { name: "Pop-up QR", path: "/scan-here", clicks: "189", color: "bg-success" },
];

export default function Hero() {
  return (
    <section className="studio-grid relative overflow-hidden border-b border-foreground px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow mb-7">Campaign link studio</span>
          <h1 className="max-w-[11ch] text-[clamp(4rem,10vw,7.75rem)] font-black leading-[0.82] tracking-[-0.07em]">
            Every link has a <span className="text-primary">job.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Build campaign-ready links, shape how they appear, and see what
            earns attention—without an enterprise analytics maze.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <CTAButton />
            <Link
              href="#workflow"
              className="inline-flex min-h-11 items-center gap-2 px-1 font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4"
            >
              See the workflow
              <ArrowDownRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 1.5 }}
          animate={{ opacity: 1, x: 0, rotate: -1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:ml-auto lg:w-[94%]"
        >
          <div className="absolute -left-5 -top-6 z-10 bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-accent-foreground sm:-left-8">
            Live campaign
          </div>
          <div className="hard-shadow route-strip border-2 border-foreground bg-card p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-foreground pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Summer field notes
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Three routes. One read.
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-success/20 px-3 py-1.5 text-xs font-bold text-success-foreground">
                <CircleCheck className="size-3.5" /> Live
              </span>
            </div>

            <div className="divide-y divide-border">
              {channels.map((channel, index) => (
                <motion.div
                  key={channel.path}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + index * 0.09 }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5"
                >
                  <span className={`size-3 ${channel.color}`} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-bold">{channel.name}</p>
                    <p className="truncate text-sm text-muted-foreground">clickfold.app{channel.path}</p>
                  </div>
                  <div className="text-right">
                    <p className="data-number text-xl font-black">{channel.clicks}</p>
                    <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">clicks</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-2 grid gap-4 bg-foreground p-4 text-background sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-center gap-3">
                <MousePointer2 className="size-5 text-primary" />
                <p className="text-sm font-semibold">
                  Newsletter is carrying 58% of this campaign.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-background/60">Demo data</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
