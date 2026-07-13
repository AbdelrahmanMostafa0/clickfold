"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Link2, Eye } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Pick a slug",
    description:
      "Choose a memorable slug or let us generate one. Group it under a campaign if you're tracking a launch.",
    step: "01",
  },
  {
    icon: Link2,
    title: "Set the destination",
    description:
      "Paste your real URL, add UTM parameters, and customize the OG preview shown when it's shared.",
    step: "02",
  },
  {
    icon: Eye,
    title: "Watch the analytics",
    description:
      "Share the link and track clicks in real time — location, device, browser, and referrer, all in your dashboard.",
    step: "03",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative noise-bg">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How it works
          </h2>
          <p className="text-[#666] text-sm">
            Three steps. Full visibility.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-[#111] border border-white/5 rounded-xl p-8 h-full hover:border-[#ff2d2d]/20 transition-all duration-300 group-hover:bg-[#131313]">
                {/* Step number */}
                <span
                  className="text-6xl text-[#1a1a1a] group-hover:text-[#ff2d2d]/10 transition-colors absolute top-4 right-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.step}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#ff2d2d]/10 flex items-center justify-center mb-5 group-hover:bg-[#ff2d2d]/20 transition-colors">
                  <step.icon className="w-5 h-5 text-[#ff2d2d]" />
                </div>

                {/* Content */}
                <h3
                  className="text-2xl text-white mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#777] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (desktop only) */}
              {step.step !== "03" && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#333] to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
