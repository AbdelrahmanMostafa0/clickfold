"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Megaphone, Link2, MousePointerClick } from "lucide-react";
import { getCampaigns } from "@/services/campaigns";
import type { Campaign } from "@/types/campaign";
import CampaignFormDialog from "./CampaignFormDialog";
import DeleteCampaignDialog from "./DeleteCampaignDialog";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const res = await getCampaigns();
    if (res?.success) {
      setCampaigns(res.data as Campaign[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 noise-bg relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Campaigns</h1>
            <p className="text-[#666] text-sm mt-1">
              Group links together to track them as one effort
            </p>
          </div>
          <CampaignFormDialog onSaved={fetchCampaigns} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#ff2d2d] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="bg-[#111] border border-white/5 rounded-xl p-12 text-center">
            <Megaphone className="size-8 text-[#444] mx-auto mb-4" />
            <p className="text-white font-medium mb-1">No campaigns yet</p>
            <p className="text-[#666] text-sm mb-6">
              Create one to start grouping links and tracking performance
              together.
            </p>
            <CampaignFormDialog onSaved={fetchCampaigns} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-[#111] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors group flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Link
                    href={`/campaigns/${campaign._id}`}
                    className="text-white font-medium hover:text-[#ff2d2d] transition-colors truncate"
                  >
                    {campaign.name}
                  </Link>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <CampaignFormDialog
                      campaign={campaign}
                      onSaved={fetchCampaigns}
                    />
                    <DeleteCampaignDialog
                      campaignId={campaign._id}
                      campaignName={campaign.name}
                      onDeleted={fetchCampaigns}
                    />
                  </div>
                </div>
                {campaign.description && (
                  <p className="text-[#666] text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                )}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-[#888]">
                    <Link2 className="size-3.5" />
                    {campaign.linksCount ?? 0} links
                  </span>
                  <span className="flex items-center gap-1.5 text-[#00ff88]">
                    <MousePointerClick className="size-3.5" />
                    {(campaign.totalClicks ?? 0).toLocaleString()} clicks
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
