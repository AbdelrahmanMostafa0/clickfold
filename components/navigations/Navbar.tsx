"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span
            className="text-3xl tracking-wider text-white group-hover:text-[#ff2d2d] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            b8lnk
          </span>
          <span className="w-2 h-2 rounded-full bg-[#ff2d2d] group-hover:bg-[#00ff88] transition-colors animate-pulse" />
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-[#888] hover:text-white transition-colors"
          >
            How it works
          </a>
          <Link
            href="/signup"
            className="text-sm text-[#888] hover:text-white transition-colors"
          >
            Sign up
          </Link>
          <Link
            href="/login"
            className="text-sm px-4 py-2 border border-[#ff2d2d]/30 text-[#ff2d2d] hover:bg-[#ff2d2d]/10 rounded transition-all"
          >
            Log in
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="sm:hidden text-white p-2" aria-label="Menu">
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="0" y1="1" x2="20" y2="1" />
            <line x1="0" y1="7" x2="20" y2="7" />
            <line x1="0" y1="13" x2="20" y2="13" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
