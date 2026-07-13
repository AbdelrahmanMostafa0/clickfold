"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MousePointerClick,
  Users,
  Copy,
  ExternalLink,
} from "lucide-react";
import { goeyToast } from "goey-toast";
import { getLinkAnalytics } from "@/services/links";
import type { LinkAnalytics } from "@/types/analytics";
import StatCard from "@/components/analytics/StatCard";
import ClicksLineChart from "@/components/analytics/ClicksLineChart";
import BreakdownList from "@/components/analytics/BreakdownList";

export default function LinkAnalyticsPage({ slug }: { slug: string }) {
  const [data, setData] = useState<LinkAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const res = await getLinkAnalytics(slug, 30);
      if (res?.success) {
        setData(res.data as LinkAnalytics);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, [slug]);

  const copyToClipboard = () => {
    const shortUrl = `${window.location.origin}/l/${slug}`;
    navigator.clipboard.writeText(shortUrl);
    goeyToast.success("Link copied to clipboard");
  };

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
          <p className="text-white text-lg mb-4">Link not found</p>
          <Link
            href="/profile/my-links"
            className="text-[#ff2d2d] hover:underline text-sm"
          >
            Back to My Links
          </Link>
        </div>
      </main>
    );
  }

  const { link, analytics } = data;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 noise-bg relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link
            href="/profile/my-links"
            className="inline-flex items-center gap-1.5 text-[#888] hover:text-white text-sm transition-colors mb-4"
          >
            <ArrowLeft className="size-3.5" />
            My Links
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-white truncate">
                /{link.slug}
              </h1>
              <a
                href={link.destination}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#666] hover:text-[#888] flex items-center gap-1 mt-1"
              >
                {link.destination}
                <ExternalLink className="size-3 shrink-0" />
              </a>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-colors flex items-center gap-2 border border-white/10"
            >
              <Copy className="size-3.5" />
              Copy Link
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Clicks"
            value={analytics.totalClicks.toLocaleString()}
            icon={MousePointerClick}
            accent="#00ff88"
          />
          <StatCard
            label="Unique Visitors"
            value={analytics.uniqueVisitors.toLocaleString()}
            icon={Users}
            accent="#4da6ff"
          />
          <StatCard
            label="Status"
            value={link.isActive ? "Active" : "Inactive"}
            icon={MousePointerClick}
            accent={link.isActive ? "#00ff88" : "#888"}
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
            title="Top Cities"
            items={analytics.topCities}
            accent="#4da6ff"
          />
          <BreakdownList
            title="Top Devices"
            items={analytics.topDevices}
            accent="#4da6ff"
          />
          <BreakdownList
            title="Top Browsers"
            items={analytics.topBrowsers}
            accent="#ff2d2d"
          />
        </div>
      </div>
    </main>
  );
}
