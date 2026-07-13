import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Read the terms that govern acceptable use, content, availability, and account responsibilities for Clickfold.",
  path: "/terms",
});

const sections = [
  {
    title: "Acceptance of terms",
    body: <p>By accessing and using Clickfold, you agree to these Terms of Service. If you do not agree, do not use the service.</p>,
  },
  {
    title: "Acceptable use",
    body: (
      <div className="space-y-4">
        <p>Clickfold is intended for marketing, analytics, and general link management. Do not use it to distribute malware, phishing pages, illegal content, harassment, doxxing, or targeted abuse.</p>
        <p className="font-bold text-destructive">Accounts and links that violate these rules may be removed without notice.</p>
      </div>
    ),
  },
  {
    title: "Service availability",
    body: <p>We work to keep redirects and dashboards available, but cannot guarantee uninterrupted service. Clickfold is not liable for losses caused by temporary outages or failed redirects.</p>,
  },
  {
    title: "Your content",
    body: <p>You are responsible for the links, images, titles, and descriptions you publish. Only use content that you own or have permission to use.</p>,
  },
  {
    title: "Changes to these terms",
    body: <p>These terms may change as the project develops. Continuing to use Clickfold after an update means you accept the revised terms.</p>,
  },
];

export default function TermsPage() {
  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="border-b-2 border-foreground pb-12">
          <span className="eyebrow">Legal notes</span>
          <h1 className="mt-7 text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.86] tracking-[-0.065em]">Terms of service</h1>
          <p className="mt-5 text-sm font-semibold text-muted-foreground">Last updated July 2026</p>
        </header>
        <div className="divide-y-2 divide-foreground">
          {sections.map((section, index) => (
            <section key={section.title} className="grid gap-5 py-10 md:grid-cols-[5rem_0.75fr_1.25fr] md:gap-8">
              <span className="data-number text-sm font-black text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="text-2xl font-black tracking-[-0.035em]">{section.title}</h2>
              <div className="max-w-2xl text-base leading-7 text-muted-foreground">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
