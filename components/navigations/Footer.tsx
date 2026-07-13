import Link from "next/link";
import ClickfoldLogo from "@/components/brand/ClickfoldLogo";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  {
    href: "https://github.com/AbdelrahmanMostafa0/clickfold",
    label: "GitHub",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="ink-panel border-t border-foreground px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="space-y-5">
          <ClickfoldLogo inverted />
          <p className="max-w-sm text-sm leading-6 text-background/70">
            Campaign-ready links for independent marketers, creators, and small
            teams.
          </p>
        </div>
        <div className="space-y-5 md:text-right">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-semibold text-background/70 hover:text-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} Clickfold. Built as an independent
            product study.
          </p>
        </div>
      </div>
    </footer>
  );
}
