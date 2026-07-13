import { ArrowUpRight } from "lucide-react";

const reads = [
  { label: "Newsletter", clicks: "1,284", share: "58%", color: "bg-primary" },
  { label: "Instagram", clicks: "732", share: "33%", color: "bg-accent" },
  { label: "Pop-up QR", clicks: "189", share: "9%", color: "bg-success" },
];

export default function StatsBar() {
  return (
    <section className="ink-panel px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <span className="eyebrow text-background before:bg-primary">A clear read</span>
          <h2 className="mt-7 max-w-[11ch] text-5xl font-black leading-[0.9] tracking-[-0.055em] text-background sm:text-6xl">
            Know which route carried the campaign.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-background/65">
            Clickfold keeps the useful signal close: clicks over time, channel
            share, locations, devices, and referrers.
          </p>
        </div>

        <div className="border-y border-background/25">
          {reads.map((read, index) => (
            <div key={read.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-background/20 py-6 last:border-b-0 sm:gap-6">
              <span className={`size-3 ${read.color}`} />
              <div>
                <p className="font-bold text-background">{read.label}</p>
                <p className="text-sm text-background/50">{read.clicks} demo clicks</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="data-number text-3xl font-black text-background sm:text-4xl">{read.share}</span>
                {index === 0 && <ArrowUpRight className="size-5 text-primary" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
