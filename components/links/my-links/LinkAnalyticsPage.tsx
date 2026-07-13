"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Copy, MousePointerClick, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { goeyToast } from "goey-toast";
import { getLinkAnalytics } from "@/services/links";
import type { LinkAnalytics } from "@/types/analytics";
import StatCard from "@/components/analytics/StatCard";
import ClicksLineChart from "@/components/analytics/ClicksLineChart";
import BreakdownList from "@/components/analytics/BreakdownList";
import QrCodeCard from "@/components/links/QrCodeCard";
import { Button } from "@/components/ui/button";
import RangeSelector from "@/components/analytics/RangeSelector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LinkAnalyticsPage({ slug }: { slug: string }) {
  const [data, setData] = useState<LinkAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const res = await getLinkAnalytics(slug, days);
      if (res?.success) setData(res.data as LinkAnalytics);
      else setNotFound(true);
      setLoading(false);
    };
    fetchAnalytics();
  }, [slug, days]);

  const shortUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/l/${slug}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    goeyToast.success("Route copied");
  };

  if (loading && !data) {
    return (
      <main id="main-content" className="flex min-h-screen items-center justify-center noise-bg">
        <div className="flex items-center gap-3 border-2 border-foreground bg-card px-5 py-4 hard-shadow" role="status">
          <div className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-bold">Reading the route…</span>
        </div>
      </main>
    );
  }

  if (notFound || !data) {
    return (
      <main id="main-content" className="min-h-screen px-4 py-32 noise-bg">
        <section className="mx-auto max-w-xl border-2 border-foreground bg-card p-8 hard-shadow sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Analytics / unavailable</p>
          <h1 className="mt-3 text-5xl leading-none" style={{ fontFamily: "var(--font-display)" }}>No route to read.</h1>
          <p className="mt-5 leading-7 text-muted-foreground">This route may have been removed or is not part of your workspace.</p>
          <Link href="/profile/my-links" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:underline"><ArrowLeft className="size-4" />Back to routes</Link>
        </section>
      </main>
    );
  }

  const { link, analytics } = data;

  return (
    <main id="main-content" className="min-h-screen px-4 pb-20 pt-28 noise-bg sm:pt-32">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="border-2 border-foreground bg-card hard-shadow">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="p-6 sm:p-9">
              <Link href="/profile/my-links" className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-3.5" />Route index
              </Link>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Route signal / last {days} days</p>
              <h1 className="truncate text-5xl leading-none sm:text-7xl" style={{ fontFamily: "var(--font-display)" }}>/{link.slug}</h1>
              <a href={link.destination} target="_blank" rel="noreferrer" className="mt-5 flex max-w-2xl items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <span className="truncate">{link.destination}</span><ArrowUpRight className="size-4 shrink-0" />
              </a>
              <div className="mt-6">
                <RangeSelector value={days} onChange={setDays} />
              </div>
            </div>
            <div className="border-t-2 border-foreground bg-secondary p-6 lg:border-l-2 lg:border-t-0 sm:p-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Ready to place</p>
              <Button onClick={copyToClipboard} className="w-full border-2 border-foreground bg-primary font-bold text-primary-foreground hard-shadow">
                <Copy className="size-4" />Copy route
              </Button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Route summary">
          <StatCard label="Total clicks" value={analytics.totalClicks.toLocaleString()} icon={MousePointerClick} accent="var(--primary)" />
          <StatCard label="Unique visitors" value={analytics.uniqueVisitors.toLocaleString()} icon={Users} accent="var(--accent)" />
          <StatCard label="Route state" value={link.isActive ? "Live" : "Paused"} icon={MousePointerClick} accent={link.isActive ? "var(--success)" : "var(--muted-foreground)"} />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="border-2 border-foreground bg-card p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
              <div><p className="text-xs font-bold uppercase tracking-wider text-primary">Traffic rhythm</p><h2 className="mt-1 text-2xl" style={{ fontFamily: "var(--font-display)" }}>Clicks over time</h2></div>
              <span className="text-xs text-muted-foreground">{days} days</span>
            </div>
            <ClicksLineChart data={analytics.clicksByDate} />
          </div>
          <QrCodeCard url={shortUrl} slug={link.slug} />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="Traffic breakdowns">
          <BreakdownList title="Top countries" items={analytics.topCountries} />
          <BreakdownList title="Top cities" items={analytics.topCities} accent="var(--accent)" />
          <BreakdownList title="Top devices" items={analytics.topDevices} accent="var(--success)" />
          <BreakdownList title="Top browsers" items={analytics.topBrowsers} accent="var(--primary)" />
          <BreakdownList title="Top OS" items={analytics.topOS} accent="var(--accent)" />
          <BreakdownList title="Top referrers" items={analytics.topReferrers} accent="var(--success)" />
        </section>

        <section className="border-2 border-foreground bg-card" aria-labelledby="recent-clicks">
          <div className="flex items-center justify-between gap-4 border-b border-border p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Live feed</p>
              <h2 id="recent-clicks" className="mt-1 text-2xl" style={{ fontFamily: "var(--font-display)" }}>Recent clicks</h2>
            </div>
          </div>
          {analytics.recentClicks.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground sm:p-8">No visits recorded yet in this window.</p>
          ) : (
            <Table>
              <TableHeader className="border-b border-foreground bg-secondary">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Location</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Browser / OS</TableHead>
                  <TableHead>Referrer</TableHead>
                  <TableHead className="text-right">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.recentClicks.map((click, index) => (
                  <TableRow key={`${click.createdAt}-${index}`} className="border-border hover:bg-secondary/60">
                    <TableCell className="font-semibold">{click.city && click.city !== "Unknown" ? `${click.city}, ${click.country}` : click.country || "Unknown"}</TableCell>
                    <TableCell className="capitalize text-muted-foreground">{click.device || "Unknown"}</TableCell>
                    <TableCell className="text-muted-foreground">{[click.browser, click.os].filter(Boolean).join(" / ") || "Unknown"}</TableCell>
                    <TableCell className="max-w-[14rem] truncate text-muted-foreground">{click.referer || "Direct"}</TableCell>
                    <TableCell className="whitespace-nowrap text-right text-sm text-muted-foreground">{formatDistanceToNow(new Date(click.createdAt), { addSuffix: true })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </div>
    </main>
  );
}
