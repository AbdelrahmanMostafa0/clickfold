"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-24 mx-auto container relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[120px] pointer-events-none" />

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
            Privacy Policy
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
              1. What we collect
            </h2>
            <p className="mb-4">
              We collect the minimum amount of information necessary to make
              b8lnk work. If you create an account, we store your email address,
              name, and an encrypted password (or Google auth token).
            </p>
            <p>
              When people click your bait links, we collect anonymous usage data
              (like timestamps, referrers, and general location data) to provide
              you with stats. We do not track individual users across the
              internet or collect personally identifiable information from your
              victims—err, visitors.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              2. How we use it
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, maintain, and improve our services.</li>
              <li>To authenticate your login and secure your account.</li>
              <li>To compile aggregate statistics about links.</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              3. Data sharing
            </h2>
            <p>
              We don&apos;t sell your data. We don&apos;t share your data with
              advertisers. We only share data when required by law, or with
              trusted third-party service providers (like our hosting providers)
              who need it to keep the servers running.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              4. Cookies
            </h2>
            <p>
              We use standard session cookies to keep you logged in. That&apos;s
              about it. No creepy third-party tracking pixels here.
            </p>
          </section>

          <section>
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              5. Your rights
            </h2>
            <p>
              You can delete your account and all associated links at any time
              from your dashboard. Once deleted, it&apos;s gone from our active
              databases.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
