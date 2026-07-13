import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <span
            className="text-xl text-[#555]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LinkPulse
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d2d]" />
        </div>
        <p className="text-[#444] text-xs">
          © {new Date().getFullYear()} LinkPulse. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-[#555] text-xs hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/terms"
            className="text-[#555] text-xs hover:text-white transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-[#555] text-xs hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <a
            href="https://github.com/AbdelrahmanMostafa0/linkpulse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555] text-xs hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
