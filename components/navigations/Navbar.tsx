"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavMenu from "@/components/navigations/NavMenu";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (pathname.includes("/l/")) return null;
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

        {/* Nav Menu */}
        <NavMenu />
      </div>
    </motion.nav>
  );
}
