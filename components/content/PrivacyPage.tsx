const sections = [
  {
    title: "What we collect",
    body: "Account information includes your name, email address, and encrypted password or Google authentication token. Click activity includes timestamps, referrers, device details, and general location data used to build campaign reports.",
  },
  {
    title: "How we use it",
    body: "We use this information to authenticate your account, operate redirects, create aggregate link reports, secure the service, and improve product reliability.",
  },
  {
    title: "Data sharing",
    body: "We do not sell your data or share it with advertisers. Information is only shared when required by law or with infrastructure providers needed to operate the service.",
  },
  {
    title: "Cookies",
    body: "Clickfold uses essential session cookies to keep you signed in and protect account actions. It does not add third-party advertising pixels.",
  },
  {
    title: "Your control",
    body: "You can delete your account and its associated links from your profile. Deleted information is removed from active application databases.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="grid gap-8 border-b-2 border-foreground pb-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="eyebrow">Plain-language policy</span>
            <h1 className="mt-7 text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.86] tracking-[-0.065em]">Privacy at Clickfold</h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">The short version: collect what the product needs, do not sell it, and give you control.</p>
        </header>
        <div className="divide-y-2 divide-foreground">
          {sections.map((section, index) => (
            <section key={section.title} className="grid gap-5 py-10 md:grid-cols-[5rem_0.75fr_1.25fr] md:gap-8">
              <span className="data-number text-sm font-black text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="text-2xl font-black tracking-[-0.035em]">{section.title}</h2>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
