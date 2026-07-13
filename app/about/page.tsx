"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Rocket, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen container mx-auto text-white px-6 py-24 pt-32 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff2d2d]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00ff88]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h1
            className="text-5xl sm:text-7xl text-white mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What is <span className="text-[#ff2d2d]">LinkPulse</span>?
          </h1>
          <p className="text-xl text-[#888] max-w-2xl mx-auto">
            A link management platform for marketing campaigns. Shorten,
            organize, and track every click across your channels.
          </p>
        </motion.div>

        {/* Core Features / Pillars Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24"
        >
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ff2d2d]/30 transition-colors group">
            <Zap className="w-8 h-8 text-[#ff2d2d] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Fast Redirects</h3>
            <p className="text-[#999] text-sm">
              Links resolve server-side with no client-side delay, so your
              audience lands on the destination instantly.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4da6ff]/30 transition-colors group">
            <Rocket className="w-8 h-8 text-[#4da6ff] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
            <p className="text-[#999] text-sm">
              Track clicks, devices, locations, and referral sources in real
              time. Full visibility over your link&apos;s performance.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00ff88]/30 transition-colors group">
            <Shield className="w-8 h-8 text-[#00ff88] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Safe & Moderated</h3>
            <p className="text-[#999] text-sm">
              We enforce strict policies against phishing and malicious
              content to keep the platform trustworthy for everyone.
            </p>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          variants={itemVariants}
          className="space-y-8 text-[#bbb] leading-relaxed max-w-3xl mx-auto mb-16"
        >
          <h2
            className="text-4xl text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Mission
          </h2>
          <p className="text-lg">
            We built LinkPulse because most link shorteners stop at "here's
            your short URL." We wanted a tool that helps you organize links
            into campaigns and actually understand how they perform — who's
            clicking, from where, and on what device.
          </p>
          <p className="text-lg">
            Whether you're running a product launch, a newsletter, or a
            multi-channel ad campaign, LinkPulse gives you one place to manage
            and measure all of it.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-[#ff2d2d] text-white font-semibold rounded-lg hover:bg-[#ff2d2d]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,45,45,0.3)]"
          >
            Start Creating Links
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
