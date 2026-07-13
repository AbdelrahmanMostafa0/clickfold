"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Link2,
  Loader2,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { userLinksStats } from "@/services/links";
import type { LinkStats } from "@/types/analytics";
import StatCard from "@/components/analytics/StatCard";
import ClicksLineChart from "@/components/analytics/ClicksLineChart";
import BreakdownList from "@/components/analytics/BreakdownList";
import RangeSelector from "@/components/analytics/RangeSelector";

export default function DashboardPage() {
  const [stats, setStats] = useState<LinkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const response = await userLinksStats(days);
      if (response?.success) setStats(response.data as LinkStats);
      setLoading(false);
    };
    fetchStats();
  }, [days]);

  if (loading && !stats) {
    return (
      <main id="main-content" className="studio-grid grid min-h-screen place-items-center px-4">
        <div className="flex items-center gap-3 border border-foreground bg-card px-5 py-4 font-bold">
          <Loader2 className="size-5 animate-spin text-primary" />
          Reading your campaign activity…
        </div>
      </main>
    );
  }

  const totalLinks = stats?.totalLinks ?? 0;
  const totalClicks = stats?.totalClicks ?? 0;
  const activeLinks = stats?.activeLinks ?? 0;
  const topLinks = stats?.topLinks ?? [];
  const analytics = stats?.analytics;

  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b-2 border-foreground pb-9 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="eyebrow">Workspace · Last {days} days</span>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl">Campaign overview</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              A direct read of every active link, route, and audience signal.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <RangeSelector value={days} onChange={setDays} />
            <Link
              href="/create"
              className="hard-shadow inline-flex min-h-12 items-center justify-center gap-2 border border-foreground bg-primary px-5 py-3 font-extrabold text-primary-foreground"
            >
              Build a link <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </header>

        <section aria-label="Account summary" className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total links" value={totalLinks} icon={Link2} />
          <StatCard label="Total clicks" value={totalClicks.toLocaleString()} icon={MousePointerClick} accent="var(--success)" />
          <StatCard label="Active links" value={activeLinks} icon={TrendingUp} accent="var(--accent)" />
        </section>

        <section className="studio-panel mt-8 p-5 sm:p-7" aria-labelledby="clicks-over-time">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">Performance</p>
              <h2 id="clicks-over-time" className="mt-1 text-2xl font-black tracking-[-0.035em]">Clicks over time</h2>
            </div>
            <span className="bg-secondary px-3 py-1.5 text-xs font-bold">{days} days</span>
          </div>
          <ClicksLineChart data={analytics?.clicksByDate ?? []} />
        </section>

        <section aria-label="Audience breakdowns" className="mt-8 grid gap-4 md:grid-cols-3">
          <BreakdownList title="Top countries" items={analytics?.topCountries ?? []} />
          <BreakdownList title="Top devices" items={analytics?.topDevices ?? []} accent="var(--success)" />
          <BreakdownList title="Top referrers" items={analytics?.topReferrers ?? []} accent="var(--primary)" />
        </section>

        <section className="mt-8 border-y-2 border-foreground" aria-labelledby="top-links">
          <div className="flex items-center justify-between gap-4 border-b border-border py-5">
            <h2 id="top-links" className="text-2xl font-black tracking-[-0.035em]">Links carrying the most traffic</h2>
            <Link href="/profile/my-links" className="text-sm font-bold text-primary underline underline-offset-4">View all links</Link>
          </div>
          {topLinks.length === 0 ? (
            <div className="py-10">
              <p className="font-bold">No links have reported back yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                <Link href="/create" className="font-bold text-primary underline underline-offset-4">Build your first campaign link</Link> and share it to start the read.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {topLinks.map((link, index) => (
                <div key={link._id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5">
                  <span className="data-number text-sm font-black text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <Link href={`/profile/my-links/${link.slug}`} className="block truncate font-bold hover:text-primary">/{link.slug}</Link>
                    <a href={link.destination} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground">
                      <span className="truncate">{link.destination}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="data-number text-lg font-black text-success">{link.clicks.toLocaleString()}</p>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
