import Link from "next/link";

interface ClickfoldLogoProps {
  href?: string;
  compact?: boolean;
  inverted?: boolean;
  className?: string;
}

function ClickfoldMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1129 1304"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M1067.5 365.4L750 599.9V376.4H313.5V958.9H750V724.4L1067.5 971.4L802.5 1230.9H250.5L0 971.4V348.9L313.5 100.4H813L1067.5 365.4Z"
        fill="#0044D4"
      />
      <path d="M751 100.4L750 599.9L1068 365.4L813 100.4H751Z" fill="#0044D4" />
      <path d="M750 1230.9V725.4L1066.5 971.9L803 1230.9H750Z" fill="#0044D4" />
      <path d="M313 100.4V376.4L131 245.9L313 100.4Z" fill="#0044D4" />
      <rect x="267" y="959.4" width="47" height="271" fill="#0044D4" />
    </svg>
  );
}

export default function ClickfoldLogo({
  href = "/",
  compact = false,
  inverted = false,
  className = "",
}: ClickfoldLogoProps) {
  const content = (
    <span
      className={`inline-flex items-center gap-2.5 ${inverted ? "text-background" : "text-foreground"} ${className}`}
      aria-label="Clickfold home"
    >
      <ClickfoldMark className="h-9 w-auto shrink-0" />
      {!compact && (
        <span
          className="flex items-baseline text-[1.35rem] font-black uppercase leading-none tracking-[-0.065em] sm:text-[1.5rem]"
          style={{ fontFamily: "var(--font-anybody)" }}
          aria-hidden="true"
        >
          <span>click</span>
          <span className="text-accent">fold</span>
        </span>
      )}
    </span>
  );

  return href ? (
    <Link href={href} className="inline-flex" aria-label="Clickfold home">
      {content}
    </Link>
  ) : (
    content
  );
}

export { ClickfoldMark };
