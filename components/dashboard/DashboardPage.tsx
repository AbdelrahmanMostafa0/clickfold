"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link2, MousePointerClick, TrendingUp, ExternalLink } from "lucide-react";
import { userLinksStats } from "@/services/links";
import type { LinkStats } from "@/types/analytics";
import StatCard from "@/components/analytics/StatCard";
import ClicksLineChart from "@/components/analytics/ClicksLineChart";
import BreakdownList from "@/components/analytics/BreakdownList";

export default function DashboardPage() {
  const [stats, setStats] = useState<LinkStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const res = await userLinksStats(30);
      if (res?.success) {
        setStats(res.data as LinkStats);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center noise-bg">
        <div className="w-8 h-8 border-2 border-[#ff2d2d] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const totalLinks = stats?.totalLinks ?? 0;
  const totalClicks = stats?.totalClicks ?? 0;
  const activeLinks = stats?.activeLinks ?? 0;
  const topLinks = stats?.topLinks ?? [];
  const analytics = stats?.analytics;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 noise-bg relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="text-[#666] text-sm mt-1">
              Last 30 days across all your links
            </p>
          </div>
          <Link
            href="/create"
            className="px-4 py-2 bg-[#ff2d2d] hover:bg-[#ff2d2d]/90 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Create Link
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Links" value={totalLinks} icon={Link2} />
          <StatCard
            label="Total Clicks"
            value={totalClicks.toLocaleString()}
            icon={MousePointerClick}
            accent="#00ff88"
          />
          <StatCard
            label="Active Links"
            value={activeLinks}
            icon={TrendingUp}
            accent="#4da6ff"
          />
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white text-sm font-medium mb-4">
            Clicks over time
          </h2>
          <ClicksLineChart data={analytics?.clicksByDate ?? []} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BreakdownList
            title="Top Countries"
            items={analytics?.topCountries ?? []}
          />
          <BreakdownList
            title="Top Devices"
            items={analytics?.topDevices ?? []}
            accent="#4da6ff"
          />
          <BreakdownList
            title="Top Referrers"
            items={analytics?.topReferrers ?? []}
            accent="#ff2d2d"
          />
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white text-sm font-medium mb-4">
            Top Performing Links
          </h2>
          {topLinks.length === 0 ? (
            <p className="text-[#555] text-sm">
              No links yet.{" "}
              <Link href="/create" className="text-[#ff2d2d] hover:underline">
                Create your first link
              </Link>
              .
            </p>
          ) : (
            <div className="space-y-2">
              {topLinks.map((link, i) => (
                <div
                  key={link._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[#444] text-xs font-mono w-4">
                      {i + 1}.
                    </span>
                    <div className="min-w-0">
                      <Link
                        href={`/profile/my-links/${link.slug}`}
                        className="text-sm text-white hover:text-[#ff2d2d] transition-colors truncate block"
                      >
                        /{link.slug}
                      </Link>
                      <a
                        href={link.destination}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#666] hover:text-[#888] truncate flex items-center gap-1"
                      >
                        {link.destination}
                        <ExternalLink className="size-2.5 shrink-0" />
                      </a>
                    </div>
                  </div>
                  <span className="text-xs text-[#00ff88] font-medium shrink-0 ml-2">
                    {link.clicks.toLocaleString()} clicks
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
