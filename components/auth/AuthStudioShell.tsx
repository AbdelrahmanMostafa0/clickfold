import type { ReactNode } from "react";
import ClickfoldLogo from "@/components/brand/ClickfoldLogo";

export default function AuthStudioShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl border-2 border-foreground bg-card lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="ink-panel hidden min-h-[42rem] flex-col justify-between p-10 lg:flex">
          <ClickfoldLogo inverted />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Campaign note 01</p>
            <p className="mt-5 max-w-[10ch] text-6xl font-black leading-[0.86] tracking-[-0.06em] text-background">
              Build the link. Read the response.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2" aria-hidden="true">
            <span className="h-3 bg-primary" />
            <span className="h-3 bg-accent" />
            <span className="h-3 bg-success" />
          </div>
        </aside>

        <section className="p-6 sm:p-10 lg:p-14">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-6 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">{description}</p>
          <div className="mt-9">{children}</div>
        </section>
      </div>
    </main>
  );
}
