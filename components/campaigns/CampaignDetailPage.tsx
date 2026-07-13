"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Link2, Loader2, MousePointerClick } from "lucide-react";
import { getCampaignStats } from "@/services/campaigns";
import type { CampaignStats } from "@/types/analytics";
import StatCard from "@/components/analytics/StatCard";
import ClicksLineChart from "@/components/analytics/ClicksLineChart";
import BreakdownList from "@/components/analytics/BreakdownList";
import RangeSelector from "@/components/analytics/RangeSelector";

export default function CampaignDetailPage({ id }: { id: string }) {
  const [data, setData] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const response = await getCampaignStats(id, days);
      if (response?.success) setData(response.data as CampaignStats);
      else setNotFound(true);
      setLoading(false);
    };
    fetchStats();
  }, [id, days]);

  if (loading && !data) {
    return (
      <main id="main-content" className="studio-grid grid min-h-screen place-items-center px-4">
        <div className="flex items-center gap-3 border border-foreground bg-card px-5 py-4 font-bold">
          <Loader2 className="size-5 animate-spin text-primary" /> Reading campaign…
        </div>
      </main>
    );
  }

  if (notFound || !data) {
    return (
      <main id="main-content" className="studio-grid grid min-h-screen place-items-center px-4">
        <div className="hard-shadow max-w-lg border-2 border-foreground bg-card p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Missing campaign</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.045em]">This campaign is no longer in the index.</h1>
          <Link href="/campaigns" className="mt-7 inline-flex items-center gap-2 font-bold text-primary underline underline-offset-4"><ArrowLeft className="size-4" />Back to campaigns</Link>
        </div>
      </main>
    );
  }

  const { campaign, links, analytics } = data;

  return (
    <main id="main-content" className="studio-grid min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="border-b-2 border-foreground pb-9">
          <Link href="/campaigns" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Campaign index</Link>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <span className="eyebrow">Campaign read · {days} days</span>
              <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl">{campaign.name}</h1>
              {campaign.description && <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{campaign.description}</p>}
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-accent-foreground">{links.length} routes</span>
              <RangeSelector value={days} onChange={setDays} />
            </div>
          </div>
        </header>

        <section aria-label="Campaign summary" className="mt-8 grid gap-4 sm:grid-cols-2">
          <StatCard label="Links in campaign" value={links.length} icon={Link2} />
          <StatCard label="Total clicks" value={analytics.totalClicks.toLocaleString()} icon={MousePointerClick} accent="var(--success)" />
        </section>

        <section className="studio-panel mt-8 p-5 sm:p-7" aria-labelledby="campaign-clicks">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">Performance</p>
          <h2 id="campaign-clicks" className="mb-7 mt-1 text-2xl font-black tracking-[-0.035em]">Clicks over time</h2>
          <ClicksLineChart data={analytics.clicksByDate} />
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Campaign audience">
          <BreakdownList title="Top countries" items={analytics.topCountries} />
          <BreakdownList title="Top devices" items={analytics.topDevices} accent="var(--success)" />
        </section>

        <section className="mt-8 border-y-2 border-foreground" aria-labelledby="campaign-routes">
          <h2 id="campaign-routes" className="border-b border-border py-5 text-2xl font-black tracking-[-0.035em]">Routes in this campaign</h2>
          {links.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">No links are assigned yet. Choose this campaign when building a link.</p>
          ) : (
            <div className="divide-y divide-border">
              {links.map((link, index) => (
                <div key={link._id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5">
                  <span className="data-number text-xs font-black text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <Link href={`/profile/my-links/${link.slug}`} className="block truncate font-bold hover:text-primary">/{link.slug}</Link>
                    <a href={link.destination} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground"><span className="truncate">{link.destination}</span><ExternalLink className="size-3 shrink-0" /></a>
                  </div>
                  <div className="text-right"><p className="data-number font-black text-success">{link.clicks.toLocaleString()}</p><p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">clicks</p></div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
