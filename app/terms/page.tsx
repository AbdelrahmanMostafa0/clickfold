"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen container mx-auto  text-white px-6 py-24  relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="mb-16">
          <h1
            className="text-5xl sm:text-6xl text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Terms of Service
          </h1>
          <p className="text-[#666] text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-[#bbb] leading-relaxed">
          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using b8lnk, you accept and agree to be bound by
              these Terms of Service. If you don&apos;t agree to these terms,
              simply don&apos;t use the service.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-[#ff2d2d] mb-4 glow-red-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              2. Acceptable Use (The Important Part)
            </h2>
            <p className="mb-4">
              b8lnk is designed for humor, pranks, and social experiments.{" "}
              <strong className="text-white">
                It is NOT designed for malicious activities.
              </strong>
            </p>
            <p className="mb-4">You agree not to use b8lnk to link to:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#888]">
              <li>Malware, viruses, or any harmful code.</li>
              <li>Actual phishing sites designed to steal credentials.</li>
              <li>
                Illegal content, including CSAM, terroristic content, or
                non-consensual explicit media.
              </li>
              <li>Harassment, doxxing, or targeted abuse of individuals.</li>
            </ul>
            <p className="mt-4 text-[#ff2d2d] font-semibold">
              We reserve the right to immediately terminate accounts and delete
              links that violate these rules, without warning.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              3. Service Availability
            </h2>
            <p>
              We try our best to keep the servers running, but we don&apos;t
              guarantee 100% uptime. Things break. We are not liable for any
              damages resulting from the service being unavailable or links not
              redirecting properly.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              4. User Content
            </h2>
            <p>
              You are solely responsible for the links you create and the
              metadata (images, titles, descriptions) you attach to them.
              Don&apos;t use copyrighted material you don&apos;t have the right
              to use.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              5. Changes to Terms
            </h2>
            <p>
              We may modify these terms at any time. Continued use of the
              service constitutes acceptance of any modified terms.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
