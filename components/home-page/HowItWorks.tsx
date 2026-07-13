"use client";

import { motion } from "framer-motion";
import { ChartNoAxesCombined, ImageIcon, Link2 } from "lucide-react";

const stages = [
  {
    number: "01",
    kicker: "Build",
    title: "Give the link a clear role.",
    description:
      "Choose a memorable path, add campaign tracking, and keep related links together from the start.",
    icon: Link2,
    color: "bg-primary text-primary-foreground",
  },
  {
    number: "02",
    kicker: "Shape",
    title: "Control the first impression.",
    description:
      "Design the title, description, and image people see before they click—across messages and social channels.",
    icon: ImageIcon,
    color: "bg-accent text-accent-foreground",
  },
  {
    number: "03",
    kicker: "Read",
    title: "See what moved people.",
    description:
      "Compare channels, locations, devices, and referrers without turning a simple campaign into a reporting project.",
    icon: ChartNoAxesCombined,
    color: "bg-success text-success-foreground",
  },
];

export default function HowItWorks() {
  return (
    <section id="workflow" className="border-b border-foreground bg-background px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">The workflow</span>
          <h2 className="mt-7 max-w-[9ch] text-[clamp(3.25rem,7vw,6.5rem)] font-black leading-[0.86] tracking-[-0.065em]">
            From draft to signal.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">
            Clickfold follows the natural shape of a campaign instead of making
            you learn a dashboard before you publish.
          </p>
        </div>

        <div className="border-t-2 border-foreground">
          {stages.map((stage, index) => (
            <motion.article
              key={stage.number}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 border-b-2 border-foreground py-10 sm:grid-cols-[5rem_1fr] sm:py-12"
            >
              <div className={`flex size-16 items-center justify-center ${stage.color}`}>
                <stage.icon className="size-7" />
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{stage.number}</span>
                  <span className="h-px w-10 bg-border" />
                  <span>{stage.kicker}</span>
                </div>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{stage.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{stage.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
