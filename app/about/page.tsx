"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, ImageIcon, Link2 } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Build with context",
    copy: "A short link is more useful when its campaign, channel, tracking, and destination live together.",
    icon: Link2,
    color: "bg-primary text-primary-foreground",
  },
  {
    number: "02",
    title: "Present with care",
    copy: "The share preview is part of the campaign—not technical metadata hidden at the bottom of a form.",
    icon: ImageIcon,
    color: "bg-accent text-accent-foreground",
  },
  {
    number: "03",
    title: "Read without noise",
    copy: "Clicks, locations, devices, and referrers should answer a question instead of creating another dashboard chore.",
    icon: ChartNoAxesCombined,
    color: "bg-success text-success-foreground",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 border-b-2 border-foreground pb-16 lg:grid-cols-[1.18fr_0.82fr] lg:items-end"
        >
          <div>
            <span className="eyebrow">About Clickfold</span>
            <h1 className="mt-7 max-w-[11ch] text-[clamp(4rem,9vw,8rem)] font-black leading-[0.83] tracking-[-0.07em]">
              A campaign tool with an editorial point of view.
            </h1>
          </div>
          <div className="border border-foreground bg-card p-6 lg:rotate-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Independent product study</p>
            <p className="mt-5 text-xl font-bold leading-8">
              Clickfold explores how link management can feel focused,
              expressive, and useful to one person running real campaigns.
            </p>
          </div>
        </motion.header>

        <section className="py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="eyebrow">Why it exists</span>
              <h2 className="mt-6 max-w-[9ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-6xl">Links should carry more context.</h2>
            </div>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                Most link shorteners end after producing a smaller URL. Clickfold
                treats the link as a campaign asset: something you name, present,
                distribute, and learn from.
              </p>
              <p>
                It is designed for independent marketers, creators, and small
                teams running launches, newsletters, social posts, QR placements,
                and client work without enterprise reporting overhead.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t-2 border-foreground" aria-label="Product principles">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="grid gap-6 border-b-2 border-foreground py-10 sm:grid-cols-[5rem_1fr]"
            >
              <div className={`flex size-16 items-center justify-center ${principle.color}`}>
                <principle.icon className="size-7" />
              </div>
              <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">{principle.number}</p>
                  <h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">{principle.title}</h3>
                </div>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">{principle.copy}</p>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="mt-20 grid gap-8 bg-primary p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-foreground/70">Start with one route</p>
            <h2 className="mt-4 max-w-[12ch] text-5xl font-black leading-[0.88] tracking-[-0.055em] text-primary-foreground sm:text-6xl">Build a link that knows its campaign.</h2>
          </div>
          <Link href="/signup" className="hard-shadow inline-flex min-h-12 items-center justify-center gap-2 border border-foreground bg-background px-5 py-3 font-extrabold text-foreground">
            Create a workspace <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
