const routes = [
  { channel: "Newsletter", slug: "field-notes", tone: "bg-primary text-primary-foreground" },
  { channel: "Instagram", slug: "summer-cut", tone: "bg-accent text-accent-foreground" },
  { channel: "Poster QR", slug: "scan-here", tone: "bg-success text-success-foreground" },
  { channel: "Podcast", slug: "listen-in", tone: "bg-foreground text-background" },
  { channel: "Partners", slug: "press-room", tone: "bg-secondary text-secondary-foreground" },
];

export default function SlugCarousel() {
  return (
    <section className="overflow-hidden border-b border-foreground px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <span className="eyebrow">One campaign, many routes</span>
            <h2 className="mt-6 max-w-[10ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-6xl">
              Name links like you mean it.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
            Clear paths build trust before the click and make campaign reports
            readable after it.
          </p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {routes.map((route, index) => (
            <div
              key={route.slug}
              className={`route-strip min-h-40 border border-foreground p-4 ${route.tone} ${index === 1 ? "lg:translate-y-6" : ""} ${index === 3 ? "lg:-translate-y-4" : ""}`}
            >
              <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] opacity-70">{route.channel}</p>
              <p className="mt-10 text-sm font-semibold opacity-70">clickfold.app/</p>
              <p className="break-words text-2xl font-black tracking-[-0.04em]">{route.slug}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
