import Link from "next/link";

interface ClickfoldLogoProps {
  href?: string;
  compact?: boolean;
  inverted?: boolean;
  className?: string;
}

// A sheet of paper with its top-right corner folded down and a cursor on it
function ClickfoldMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <path
        d="M7 2H20L28 10V27Q28 30 25 30H7Q4 30 4 27V5Q4 2 7 2Z"
        className="fill-primary"
      />
      <path d="M20 2V8Q20 10 22 10H28Z" className="fill-accent" />
      <path
        d="M10.5 11.5V24.5L13.9 21.4L16.3 26.4L18.6 25.3L16.3 20.4L20.8 20.1Z"
        fill="#ffffff"
      />
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
          className="flex items-baseline text-[1.35rem] font-extrabold leading-none tracking-[-0.04em] sm:text-[1.5rem]"
          style={{ fontFamily: "var(--font-bricolage)" }}
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
