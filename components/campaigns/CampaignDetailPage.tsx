"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Link2, MousePointerClick, ExternalLink } from "lucide-react";
import { getCampaignStats } from "@/services/campaigns";
import type { CampaignStats } from "@/types/analytics";
import StatCard from "@/components/analytics/StatCard";
import ClicksLineChart from "@/components/analytics/ClicksLineChart";
import BreakdownList from "@/components/analytics/BreakdownList";

export default function CampaignDetailPage({ id }: { id: string }) {
  const [data, setData] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const res = await getCampaignStats(id, 30);
      if (res?.success) {
        setData(res.data as CampaignStats);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center noise-bg">
        <div className="w-8 h-8 border-2 border-[#ff2d2d] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (notFound || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center noise-bg px-4">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Campaign not found</p>
          <Link href="/campaigns" className="text-[#ff2d2d] hover:underline text-sm">
            Back to Campaigns
          </Link>
        </div>
      </main>
    );
  }

  const { campaign, links, analytics } = data;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 noise-bg relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-[#888] hover:text-white text-sm transition-colors mb-4"
          >
            <ArrowLeft className="size-3.5" />
            Campaigns
          </Link>
          <h1 className="text-2xl font-semibold text-white">{campaign.name}</h1>
          {campaign.description && (
            <p className="text-[#666] text-sm mt-1">{campaign.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard label="Links in Campaign" value={links.length} icon={Link2} />
          <StatCard
            label="Total Clicks"
            value={analytics.totalClicks.toLocaleString()}
            icon={MousePointerClick}
            accent="#00ff88"
          />
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white text-sm font-medium mb-4">
            Clicks over time
          </h2>
          <ClicksLineChart data={analytics.clicksByDate} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BreakdownList title="Top Countries" items={analytics.topCountries} />
          <BreakdownList
            title="Top Devices"
            items={analytics.topDevices}
            accent="#4da6ff"
          />
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
          <h2 className="text-white text-sm font-medium mb-4">
            Links in this campaign
          </h2>
          {links.length === 0 ? (
            <p className="text-[#555] text-sm">
              No links in this campaign yet. Add one when creating a link.
            </p>
          ) : (
            <div className="space-y-2">
              {links.map((link) => (
                <div
                  key={link._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors"
                >
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
